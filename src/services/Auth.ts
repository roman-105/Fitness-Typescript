import axios, { AxiosResponse } from 'axios';
import env from '../utils/environment';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import BFAxios from './BFAxios';

const authkey = 'AUTHKEY';

export interface IAuth {
  accessToken: string;
  accessTokenExpirationDate: number;
  refreshToken: string;
  refreshTokenExpirationDate: number;
}

axios.defaults.headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export async function doLogin(email: string, password: string): Promise<IAuth> {
  const results: AxiosResponse<IAuth | null> = await axios.post(
    `${env.AUTH_PROVIDER_URL}/auth/token`,
    {
      email,
      password
    }
  );
  if (!results.data) {
    throw new Error('server returned blank response');
  }
  await setStorageTokens(results.data);
  return results.data;
}

export async function doLogout(): Promise<void> {
  await purgeStorageTokens();
}

export async function updateBFAxios() {
  const tokens: IAuth | null = await getStorageTokens();

  if (!tokens) {
    throw Error('Storage tokens not found');
  }

  //set bearer & store it for later.
  BFAxios.defaults.headers.common = { Authorization: `Bearer ${tokens.accessToken}` };
}

export async function refreshAccessToken(refreshToken: string) {
  const results: AxiosResponse<IAuth | null> = await axios.post(
    `${env.AUTH_PROVIDER_URL}/auth/token/refresh`,
    {
      refreshToken
    }
  );
  if (!results.data) {
    throw new Error('server returned blank response');
  }

  await setStorageTokens(results.data);
  BFAxios.defaults.headers.common = { Authorization: `Bearer ${results.data.accessToken}` };
  return results.data;
}

export async function getStorageTokens(): Promise<IAuth | null> {
  return JSON.parse(await RNSecureKeyStore.get(authkey));
}

async function setStorageTokens(tokens: IAuth): Promise<void> {
  await RNSecureKeyStore.set(authkey, JSON.stringify(tokens), {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  });
}

async function purgeStorageTokens(): Promise<void> {
  await RNSecureKeyStore.remove(authkey);
}
