import { createModel } from '@rematch/core';
import { RootModel } from '..';
import BFErrorTracking from '../../../utils/tools/errorTracking';
import ClubService from '../../../services/club/ClubService';
import ClubModelAdapter from './clubModelAdapter';
import { IClub, IClubSingular, IClubLesson, IClubLessonSingular } from './clubModelAdapter';
import { BF_CLUBS_SEARCH_RADIUS } from '../../../utils/constants';
import MemberService from '../../../services/member/MemberService';
import dayjs from 'dayjs';
import { IClubLessonResponse } from '../../../services/response-types';

export interface ClubModelState {
  favoriteClubs?: IClub[];
  singularClub?: IClubSingular;
  search: {
    results?: IClub[];
    numResults?: number;
    selectedClub?: IClub;
  };
  lessons?: IClubLesson[];
  singularLesson?: IClubLessonSingular;
}

export const clubModel = createModel<RootModel>()({
  state: {
    favoriteClubs: undefined,
    singularClub: undefined,
    search: {
      results: undefined,
      numResults: undefined,
      selectedClub: undefined
    },
    lessons: undefined,
    singularLesson: undefined
  } as ClubModelState,
  reducers: {
    setFavoriteClubs: (state, clubs: IClub[]): ClubModelState => {
      state.favoriteClubs = clubs;
      return state;
    },
    setSingularClub: (state, club?: IClub): ClubModelState => {
      state.singularClub = ClubModelAdapter.transformSingularClub({ club });
      return state;
    },
    setSearchClubs: (state, clubs?: IClub[]): ClubModelState => {
      state.search.results = clubs;
      state.search.numResults = clubs?.length;
      return state;
    },
    setSelectedClub: (state, club?: IClub): ClubModelState => {
      state.search.selectedClub = club;
      return state;
    },
    setClubLessons: (state, lessons?: IClubLesson[]): ClubModelState => {
      state.lessons = lessons;
      return state;
    },
    setSingularLesson: (state, lesson: IClubLessonSingular): ClubModelState => {
      state.singularLesson = lesson;
      return state;
    }
  },
  effects: (dispatch) => ({
    async getFavoriteClubs(_, rootState) {
      try {
        const { member, info } = rootState.memberModel;
        if (member && info?.clubs) {
          const homeClubId = member.homeClubId;
          const memberClubs = await ClubModelAdapter.transformClubs({
            clubs: await ClubService.getClubInfo({ clubIds: [homeClubId, ...info.clubs] }),
            homeClubId: homeClubId
          });
          dispatch.clubModel.setFavoriteClubs(memberClubs);
        }
      } catch (err) {
        dispatch.clubModel.setFavoriteClubs([]);
        BFErrorTracking.recordError(err);
      }
    },
    async searchClubs(payload: {
      query?: string;
      latitude?: number;
      longitude?: number;
      skipRadius?: boolean;
    }) {
      try {
        dispatch.clubModel.setSearchClubs(undefined);
        const { query, latitude, longitude, skipRadius } = payload;
        const results = await ClubModelAdapter.transformClubs({
          clubs: (await ClubService.searchClubs({
            query,
            latitude,
            longitude,
            radius: skipRadius || query ? undefined : BF_CLUBS_SEARCH_RADIUS
          })) as IClub[],
          sortByDistance: true
        });
        dispatch.clubModel.setSearchClubs(results);
      } catch (err) {
        dispatch.clubModel.setSearchClubs(undefined);
        BFErrorTracking.recordError(err);
      }
    },
    async toggleFavorite(payload: { club: IClub }, rootState) {
      try {
        const { club } = payload;
        const isFavorite = rootState.clubModel.favoriteClubs?.find(
          (favClub) => favClub.clubId === club.clubId
        );

        // Optimistic result
        if (isFavorite) {
          dispatch.clubModel.setFavoriteClubs(
            rootState.clubModel.favoriteClubs?.filter(
              (favoriteClub) => favoriteClub.clubId !== isFavorite.clubId
            ) ?? []
          );
          await MemberService.deleteMemberClub([club.clubId]);
        } else {
          dispatch.clubModel.setFavoriteClubs([...(rootState.clubModel.favoriteClubs ?? []), club]);
          await MemberService.addMemberClub([club.clubId]);
        }
        dispatch.memberModel.getMemberInfo();
      } catch (err) {
        BFErrorTracking.recordError(err);
      }
    },
    async getSingularClubInfo(payload: { clubId: string }) {
      try {
        const { clubId } = payload;
        const clubResponse: IClub[] = await ClubModelAdapter.transformClubs({
          clubs: await ClubService.getClubInfo({ clubIds: [clubId] })
        });
        if (clubResponse && clubResponse.length > 0) {
          dispatch.clubModel.setSingularClub(clubResponse[0]);
        }
      } catch (err) {
        BFErrorTracking.recordError(err);
      }
    },
    async getClubLessons(payload: { clubId: string; filters?: any }) {
      try {
        const { clubId, filters } = payload;
        const from = Math.trunc(dayjs().valueOf() / 1000);
        const to = Math.trunc(dayjs().startOf('day').add(14, 'days').valueOf() / 1000);
        const lessons: IClubLesson[] | undefined = ClubModelAdapter.transformClubLessons({
          lessons: await ClubService.getClubLessons({ clubId, from, to, ...filters }),
          from,
          numDays: 14
        });

        dispatch.clubModel.setClubLessons(lessons);
      } catch (err) {
        BFErrorTracking.recordError(err);
      }
    },
    async getSingularClubLesson(payload: { clubId: string; lessonId: string }) {
      try {
        const { clubId, lessonId } = payload;

        const lessons: IClubLessonResponse[] | undefined = await ClubService.getClubLessons({
          clubId
        });

        const selectedLesson = lessons?.find((lesson) => lesson.id === lessonId);
        if (selectedLesson) {
          dispatch.clubModel.setSingularLesson(
            ClubModelAdapter.transformLesson({ lesson: selectedLesson })
          );
        }
      } catch (err) {
        BFErrorTracking.recordError(err);
      }
    }
  })
});
