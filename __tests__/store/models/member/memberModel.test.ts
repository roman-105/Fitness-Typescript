import { RootModel } from '../../../../src/store/models/index';
import { memberModel, MemberModelState } from '../../../../src/store/models/member';
import { IMember, IMemberData } from '../../../../src/store/models/member/memberModelAdapter';
import { memberInfoResponseMock } from '../../../../__testConstants__/memberResponseMock';
import BFAxios from '../../../../src/services/BFAxios';
import MockAdapter from 'axios-mock-adapter';
import BFErrorTracking from '../../../../src/utils/tools/errorTracking';
import MemberModelAdapter from '../../../../src/store/models/member/memberModelAdapter';

const recordErrorStub = jest.spyOn(BFErrorTracking, 'recordError');
const transformMemberInfoStub = jest.spyOn(MemberModelAdapter, 'transformMemberInfo');

const BFAxiosMock = new MockAdapter(BFAxios);

const rootModel: Pick<RootModel, 'memberModel'> = {
  memberModel: { ...memberModel }
};

let initialMemberState: MemberModelState = { ...memberModel.state };

describe('memberModel tests', () => {
  beforeEach(() => {
    rootModel.memberModel = require('../../../../src/store/models/member').memberModel;
    initialMemberState = { member: undefined, info: undefined };
  });

  afterEach(() => {
    BFAxiosMock.reset();
    recordErrorStub.mockReset();
    transformMemberInfoStub.mockReset();
  });

  describe('reducers', () => {
    it('setMember should store member data', () => {
      const member = memberInfoResponseMock.member as IMember;
      const info = memberInfoResponseMock.info as IMemberData;
      const result: MemberModelState = rootModel.memberModel.reducers.setMember(
        initialMemberState,
        { member: member, info: info }
      );
      expect(result.member?.id).toEqual(member.id);
      expect(result.info?.clubs).not.toBeUndefined();
    });
  });

  describe('effects', () => {
    it('getMemberInfo should get memberInfo data and store it', async () => {
      const dispatch: any = { memberModel: { setMember: jest.fn() } };
      BFAxiosMock.onGet(/member\/info/).reply(200, memberInfoResponseMock);
      transformMemberInfoStub.mockReturnValue(memberInfoResponseMock);

      await rootModel.memberModel.effects(dispatch).getMemberInfo();

      expect(dispatch.memberModel.setMember).toHaveBeenCalled();
      expect(dispatch.memberModel.setMember).toHaveBeenCalledWith(memberInfoResponseMock);
      expect(recordErrorStub).not.toHaveBeenCalled();
    });

    it('getMemberInfo should not store data and record error if api request fails', async () => {
      const dispatch: any = { memberModel: { setMember: jest.fn() } };
      BFAxiosMock.onGet(/member\/info/).reply(400);

      await rootModel.memberModel.effects(dispatch).getMemberInfo();

      expect(dispatch.memberModel.setMember).not.toHaveBeenCalled();
      expect(recordErrorStub).toHaveBeenCalled();
    });
  });
});
