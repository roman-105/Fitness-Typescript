import { IClub } from '../../store/models/club';
import env from '../../utils/environment';
import BFAxios from '../BFAxios';
import { IMemberInfoResponse } from '../response-types';

const MemberService = {
  getMemberInfo: async (): Promise<IMemberInfoResponse> => {
    const { data } = await BFAxios.get<IMemberInfoResponse>(`${env.BF_BACKEND_URL}/member/info`);
    return data;
  },
  addMemberClub: async (clubs: IClub['id'][]) => {
    return await BFAxios.post(`${env.BF_BACKEND_URL}/member/clubs`, {
      clubIds: clubs
    });
  },
  deleteMemberClub: async (clubs: IClub['id'][]) => {
    return await BFAxios.delete(`${env.BF_BACKEND_URL}/member/clubs`, {
      data: {
        clubIds: clubs
      }
    });
  }
};

export default MemberService;
