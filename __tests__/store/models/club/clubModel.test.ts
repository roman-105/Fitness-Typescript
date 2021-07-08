import { RootModel } from '../../../../src/store/models/index';
import { clubModel, ClubModelState } from '../../../../src/store/models/club';
import BFAxios from '../../../../src/services/BFAxios';
import MockAdapter from 'axios-mock-adapter';
import { clubResponseMock } from '../../../../__testConstants__/clubResponseMock';
import { IClub } from '../../../../src/store/models/club/clubModelAdapter';
import { IMember, IMemberData } from '../../../../src/store/models/member';
import { memberInfoResponseMock } from '../../../../__testConstants__/memberResponseMock';
import BFErrorTracking from '../../../../src/utils/tools/errorTracking';
import ClubModelAdapter from '../../../../src/store/models/club/clubModelAdapter';

const recordErrorStub = jest.spyOn(BFErrorTracking, 'recordError');

const transformClubsStub = jest.spyOn(ClubModelAdapter, 'transformClubs');

const BFAxiosMock = new MockAdapter(BFAxios);

const rootModel: Pick<RootModel, 'clubModel'> = {
  clubModel: { ...clubModel }
};

const club = clubResponseMock as IClub;
const clubs = [club];
const member = memberInfoResponseMock.member as IMember;
const info = memberInfoResponseMock.info as IMemberData;

let initialClubState: ClubModelState = { ...clubModel.state };

describe('clubModel tests', () => {
  beforeEach(() => {
    rootModel.clubModel = require('../../../../src/store/models/club').clubModel;
    initialClubState = {
      favoriteClubs: undefined,
      search: { results: undefined, numResults: undefined, selectedClub: undefined }
    };
  });

  afterEach(() => {
    BFAxiosMock.reset();
    recordErrorStub.mockReset();
    transformClubsStub.mockReset();
  });

  describe('reducers', () => {
    it('setFavoriteClub should store favorite club data', () => {
      const result: ClubModelState = rootModel.clubModel.reducers.setFavoriteClubs(
        initialClubState,
        clubs
      );

      expect(result.favoriteClubs).toHaveLength(clubs.length);
      expect(result.favoriteClubs).not.toBeUndefined();
    });
    it('setSearchClubs should store clubs in search object', () => {
      const result: ClubModelState = rootModel.clubModel.reducers.setSearchClubs(
        initialClubState,
        clubs
      );

      expect(result.search.results).toHaveLength(clubs.length);
      expect(result.search.numResults).toEqual(clubs.length);
    });
    it('setSearchClubs should set undefined results if passing undefiend', () => {
      const result: ClubModelState = rootModel.clubModel.reducers.setSearchClubs(
        {
          ...initialClubState,
          search: {
            results: clubs,
            numResults: clubs.length
          }
        },
        undefined
      );

      expect(result.search.results).toBeUndefined();
      expect(result.search.numResults).toBeUndefined();
    });
    it('setSelectedClub should store the selected club', () => {
      const result: ClubModelState = rootModel.clubModel.reducers.setSelectedClub(
        initialClubState,
        club
      );

      expect(result.search.selectedClub?.clubId).toEqual(club.clubId);
    });
    it('setSelectedClub should store undefined if passing undefined', () => {
      const result: ClubModelState = rootModel.clubModel.reducers.setSelectedClub(
        {
          ...initialClubState,
          search: {
            selectedClub: club
          }
        },
        undefined
      );

      expect(result.search.selectedClub).toBeUndefined();
    });
  });

  describe('effects', () => {
    it('getFavoriteClubs should request and store favorite club data', async () => {
      const dispatch: any = { clubModel: { setFavoriteClubs: jest.fn() } };
      BFAxiosMock.onPost(/clubs\/search/).reply(200, clubs);

      await rootModel.clubModel
        .effects(dispatch)
        // @ts-ignore
        .getFavoriteClubs({}, { memberModel: { member: member, info: info } });

      expect(dispatch.clubModel.setFavoriteClubs).toHaveBeenCalled();
      expect(dispatch.clubModel.setFavoriteClubs).not.toHaveBeenCalledWith([]);
      expect(recordErrorStub).not.toHaveBeenCalled();
    });

    it('getFavoriteClubs should not execute request if no member data is stored', async () => {
      const dispatch: any = { clubModel: { setFavoriteClubs: jest.fn() } };
      BFAxiosMock.onPost(/clubs\/search/).reply(200, clubs);

      await rootModel.clubModel
        .effects(dispatch)
        // @ts-ignore
        .getFavoriteClubs({}, { memberModel: {} });

      expect(dispatch.clubModel.setFavoriteClubs).not.toHaveBeenCalled();
      expect(recordErrorStub).not.toHaveBeenCalled();
    });
    it('getFavoriteClubs should store [] if request fails', async () => {
      const dispatch: any = { clubModel: { setFavoriteClubs: jest.fn() } };
      BFAxiosMock.onPost(/clubs\/search/).reply(400);

      await rootModel.clubModel
        .effects(dispatch)
        // @ts-ignore
        .getFavoriteClubs({}, { memberModel: { member: member, info: info } });

      expect(dispatch.clubModel.setFavoriteClubs).toHaveBeenCalled();
      expect(dispatch.clubModel.setFavoriteClubs).toHaveBeenCalledWith([]);
      expect(recordErrorStub).toHaveBeenCalled();
    });
    it('searchClubs should request and store clubs data', async () => {
      const dispatch: any = { clubModel: { setSearchClubs: jest.fn() } };
      transformClubsStub.mockResolvedValue(clubs);
      BFAxiosMock.onGet(/clubs/).reply(200, clubs);

      await rootModel.clubModel.effects(dispatch).searchClubs({ latitude: 10, longitude: 20 });

      expect(dispatch.clubModel.setSearchClubs).toHaveBeenCalled();
      expect(dispatch.clubModel.setSearchClubs).toHaveBeenCalledWith(clubs);
      expect(recordErrorStub).not.toHaveBeenCalled();
    });
    it('searchClubs should store undefined if request fails', async () => {
      const dispatch: any = { clubModel: { setSearchClubs: jest.fn() } };
      BFAxiosMock.onGet(/clubs/).reply(400);

      await rootModel.clubModel.effects(dispatch).searchClubs({ latitude: 10, longitude: 20 });

      expect(dispatch.clubModel.setSearchClubs).toHaveBeenCalled();
      expect(dispatch.clubModel.setSearchClubs).toHaveBeenCalledWith(undefined);
      expect(recordErrorStub).toHaveBeenCalled();
    });
    it('toggleFavorite should add club to favorites if it wasnt a favorite', async () => {
      const dispatch: any = {
        memberModel: { getMemberInfo: jest.fn() },
        clubModel: { setFavoriteClubs: jest.fn() }
      };
      BFAxiosMock.onPost(/member\/clubs/).reply(200);

      await rootModel.clubModel
        .effects(dispatch)
        // @ts-ignore
        .toggleFavorite({ club }, { clubModel: { favoriteClubs: [] } });

      // Optimistic result
      expect(dispatch.clubModel.setFavoriteClubs).toHaveBeenCalledWith([club]);
      expect(dispatch.memberModel.getMemberInfo).toHaveBeenCalled();
      expect(recordErrorStub).not.toHaveBeenCalled();
    });

    it('toggleFavorite should record error if request fails', async () => {
      const dispatch: any = { memberModel: { getMemberInfo: jest.fn() } };
      BFAxiosMock.onPost(/member\/clubs/).reply(500);

      await rootModel.clubModel
        .effects(dispatch)
        // @ts-ignore
        .toggleFavorite({ club }, { clubModel: { favoriteClubs: [] } });

      expect(dispatch.memberModel.getMemberInfo).not.toHaveBeenCalled();
      expect(recordErrorStub).toHaveBeenCalled();
    });

    it('toggleFavorite remove club from favorites is it is already a favorite', async () => {
      const dispatch: any = {
        memberModel: { getMemberInfo: jest.fn() },
        clubModel: { setFavoriteClubs: jest.fn() }
      };
      BFAxiosMock.onDelete(/member\/clubs/).reply(200);

      await rootModel.clubModel
        .effects(dispatch)
        // @ts-ignore
        .toggleFavorite({ club }, { clubModel: { favoriteClubs: [club] } });

      // Optimistic result
      expect(dispatch.clubModel.setFavoriteClubs).toHaveBeenCalledWith([]);
      expect(dispatch.memberModel.getMemberInfo).toHaveBeenCalled();
      expect(recordErrorStub).not.toHaveBeenCalled();
    });

    it('getSingularClubInfo should get club info', async () => {
      const dispatch: any = { clubModel: { setSingularClub: jest.fn() } };
      transformClubsStub.mockResolvedValue([club]);
      BFAxiosMock.onPost(/clubs\/search/).reply(200, [club]);

      await rootModel.clubModel.effects(dispatch).getSingularClubInfo({ clubId: club.id });

      expect(dispatch.clubModel.setSingularClub).toHaveBeenCalled();
      expect(recordErrorStub).not.toHaveBeenCalled();
    });

    it('getSingularClubInfo should not store clubInfo if request fails', async () => {
      const dispatch: any = { clubModel: { setSingularClub: jest.fn() } };
      BFAxiosMock.onPost(/clubs\/search/).reply(500);

      await rootModel.clubModel.effects(dispatch).getSingularClubInfo({ clubId: club.id });

      expect(dispatch.clubModel.setSingularClub).not.toHaveBeenCalled();
      expect(recordErrorStub).toHaveBeenCalled();
    });
  });
});
