import { createModel } from '@rematch/core';
import { RootModel } from '..';
import BFErrorTracking from '../../../utils/tools/errorTracking';
import MemberService from '../../../services/member/MemberService';
import { IMember, IMemberData } from './memberModelAdapter';
import MemberModelAdapter from './memberModelAdapter';

export interface MemberModelState {
  member?: IMember;
  info?: IMemberData;
}

export const memberModel = createModel<RootModel>()({
  state: {
    member: undefined,
    info: undefined
  } as MemberModelState,
  reducers: {
    setMember: (
      state,
      { member, info }: { member: IMember; info: IMemberData }
    ): MemberModelState => {
      state.member = member;
      state.info = info;
      return state;
    }
  },
  effects: (dispatch) => ({
    async getMemberInfo() {
      try {
        const memberData = MemberModelAdapter.transformMemberInfo(
          await MemberService.getMemberInfo()
        );

        dispatch.memberModel.setMember(memberData);
      } catch (err) {
        BFErrorTracking.recordError(err);
      }
    }
  })
});
