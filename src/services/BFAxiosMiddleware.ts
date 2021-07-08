import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DefaultRootState } from 'react-redux';
import BFErrorTracking from '../utils/tools/errorTracking';
import { refreshAccessToken, getStorageTokens } from './Auth';
import BFAxios from './BFAxios';
import perf from '@react-native-firebase/perf';

let isRequestingToken: boolean = false;
let pendingResolves: any[] = [];

const blockUntilAccessToken = async (accessTokenExpirationDate: number, refreshToken: string) => {
  if (!isRequestingToken && accessTokenExpirationDate <= Date.now() - 60000) {
    try {
      isRequestingToken = true;

      const { accessToken } = await refreshAccessToken(refreshToken);

      pendingResolves.forEach(({ resolve }) => {
        resolve(accessToken);
      });
      pendingResolves = [];
      isRequestingToken = false;

      return Promise.resolve(accessToken);
    } catch (error) {
      pendingResolves.forEach(({ reject }) => {
        reject(error);
      });
      isRequestingToken = false;
      pendingResolves = [];
      throw error;
    }
  }

  if (isRequestingToken) {
    return new Promise((resolve, reject) => {
      pendingResolves.push({ resolve, reject });
    });
  }

  return Promise.resolve(null);
};

const perfMonitoringRequest = async (config: AxiosRequestConfig) => {
  try {
    if (config.url && config.method) {
      const httpMetric = perf().newHttpMetric(config.url, (config.method as any).toUpperCase());
      // @ts-ignore
      config.metadata = { httpMetric };

      await httpMetric.start();
    }
  } catch {
    return config;
  }
};

const perfMonitoringResponse = async (response: AxiosResponse) => {
  // @ts-ignore
  const { httpMetric } = response.config.metadata;

  httpMetric.setHttpResponseCode(response.status);
  httpMetric.setResponseContentType(response.headers['content-type'] ?? null);
  await httpMetric.stop();
};

export const BFAxiosMiddleware = ({
  getState,
  dispatch
}: {
  getState: () => any;
  dispatch: any;
}) => {
  const whitelist = ['/auth/token', '/auth/token/refresh'];

  BFAxios.interceptors.request.use(async (config: AxiosRequestConfig) => {
    try {
      perfMonitoringRequest(config);

      if (config.url && whitelist.includes(config.url)) return config;

      const storageTokens = await getStorageTokens();

      if (!storageTokens || !storageTokens.accessTokenExpirationDate) return config;

      const newToken = await blockUntilAccessToken(
        storageTokens.accessTokenExpirationDate,
        storageTokens.refreshToken
      );
      if (newToken !== null) {
        // @ts-ignore
        config._retry = true;
        config.headers.Authorization = `Bearer ${newToken}`;
        return config;
      }

      return config;
    } catch (err) {
      BFErrorTracking.recordError(err);
      return config;
    }
  });

  BFAxios.interceptors.response.use(
    (response) => {
      try {
        perfMonitoringResponse(response);
      } finally {
        return response;
      }
    },
    (error) => {
      try {
        perfMonitoringResponse(error.response);

        const state = getState() as DefaultRootState;
        // Handle logout when accessToken is invalid or expired
        if (error.response.status === 401 || error.response.status === 403) {
          if (state.authModel.isAuthenticated) {
            dispatch({
              type: 'authModel/Logout'
            });
          }
        }
      } finally {
        return Promise.reject(error);
      }
    }
  );

  return (next: any) => (action: any) => next(action);
};
