import { IMemberDataResponse, IMemberInfoResponse } from '../../../services/response-types';
import { IMemberResponse } from '../../../services/response-types';

export interface IMemberData extends IMemberDataResponse {}

export interface IMember extends IMemberResponse {}

const MemberModelAdapter = {
  transformMemberInfo: (memberInfo: IMemberInfoResponse) => {
    return {
      info: {
        ...memberInfo.info
      } as IMemberData,
      member: {
        ...memberInfo.member,
        id: memberInfo.member.id.toUpperCase(),
        homeClubId: memberInfo.member.homeClubId.toUpperCase()
      } as IMember
    };
  }
};

export default MemberModelAdapter;
