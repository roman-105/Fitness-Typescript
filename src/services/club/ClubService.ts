import BFAxios from '../BFAxios';
import env from '../../utils/environment';
import { IClubsResponse, IClubLessonResponse } from '../response-types';
import QS from 'qs';

const ClubService = {
  getClubInfo: async ({ clubIds }: { clubIds?: string[] }): Promise<IClubsResponse[]> => {
    const result = await BFAxios.post<IClubsResponse[]>(`${env.BF_BACKEND_URL}/clubs/search`, {
      clubIds
    });

    return result.data;
  },
  searchClubs: async ({
    query,
    latitude,
    longitude,
    radius
  }: {
    query?: string;
    latitude?: number;
    longitude?: number;
    radius?: number;
  }): Promise<IClubsResponse[]> => {
    const { data } = await BFAxios.get<IClubsResponse[]>(`${env.BF_BACKEND_URL}/clubs`, {
      params: {
        query,
        latitude,
        longitude,
        distance: radius
      }
    });
    return data;
  },
  getClubLessons: async ({
    roomId,
    clubId,
    title,
    from,
    to,
    kind,
    minDuration,
    maxDuration
  }: {
    roomId?: string;
    clubId: string;
    title?: string;
    from?: number;
    to?: number;
    kind?: string;
    minDuration?: number;
    maxDuration?: number;
  }): Promise<IClubLessonResponse[]> => {
    const result = await BFAxios.get<IClubLessonResponse[]>(
      `${env.BF_BACKEND_URL}/clubs/group-lessons`,
      {
        params: {
          roomid: roomId,
          clubId,
          title,
          from,
          to,
          kind,
          minDuration,
          maxDuration
        },
        paramsSerializer: (params) => QS.stringify(params, { arrayFormat: 'repeat' })
      }
    );

    return result.data;
  }
};

export default ClubService;
