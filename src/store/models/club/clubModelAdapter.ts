import { IClubsResponse, IClubLessonResponse } from '../../../services/response-types';
import formatMessage from 'format-message';
import { CONTENTFUL_24_7_SERVICE_ID } from '../../../services/contentful/contentful-constants';
import { dayNumberToString } from '../../../utils/utils';
import dayjs from 'dayjs';
import DateUtils from '../../../utils/dateUtils';
import { Dayjs } from 'dayjs';
import LocationUtils from '../../../utils/locationUtils';

export interface IClub extends IClubsResponse {
  key: string;
  isHomeClub?: boolean;
  distanceFromCurrentLocation?: number;
}

export interface IClubSingular extends IClub {
  // Current club status (Open, Closed, Temporary closed...)
  status: string;
}

export type LessonType = 'VGX' | 'LGX';

export interface IClubLessonData extends Omit<IClubLessonResponse, 'kind'> {
  key: string;
  image?: string;
  kind: LessonType;
  startDate: Dayjs;
  endDate: Dayjs;
  formattedTime?: string;
  inProgress: boolean;
}

export interface IClubLesson {
  title: string;
  data: IClubLessonData[] | { key: string }[];
}

export interface IClubLessonSingular extends IClubLessonData {}

const getCurrentClubStatus = (club: IClub) => {
  if (club.closed) return formatMessage('Temporarily closed');

  if (club.services.find((service) => service.id === CONTENTFUL_24_7_SERVICE_ID) !== undefined) {
    return formatMessage('Open 24/7');
  }
  const now = dayjs();
  const currentDayNumber = now.day();
  const currentDay = dayNumberToString[currentDayNumber];

  const openHour = club.hours[currentDay].openIntervals[0].start.split(':');
  const endHour = club.hours[currentDay].openIntervals[0].end.split(':');

  const openTime = now.hour(parseInt(openHour[0], 10)).minute(parseInt(openHour[1], 10));
  const endTime = now.hour(parseInt(endHour[0], 10)).minute(parseInt(endHour[1], 10));

  if (now.diff(openTime, 'minutes') < 0 || now.diff(endTime, 'minutes') > 0) {
    return formatMessage('Closed');
  }

  return formatMessage('Open till { hour }', {
    hour: club.hours[currentDay].openIntervals[0].end
  });
};

const ClubModelAdapter = {
  transformClubs: async ({
    clubs,
    homeClubId,
    sortByDistance
  }: {
    clubs: IClubsResponse[];
    homeClubId?: string;
    sortByDistance?: boolean;
  }): Promise<IClub[]> => {
    const clubList: IClub[] = [];

    const currentLocation = await LocationUtils.getCurrentLocation();

    for (const club of clubs) {
      clubList.push({
        ...club,
        key: club.clubId,
        isHomeClub: club.clubId === homeClubId,
        distanceFromCurrentLocation: currentLocation
          ? LocationUtils.calculateDistanceBetweenCoords(currentLocation, {
              latitude: club.location.lat,
              longitude: club.location.lon
            })
          : undefined
      });
    }

    // Sort clubs by proximity
    return sortByDistance
      ? clubList.sort((a: IClub, b: IClub): number => {
          if (
            a.distanceFromCurrentLocation &&
            b.distanceFromCurrentLocation &&
            a.distanceFromCurrentLocation < b.distanceFromCurrentLocation
          )
            return -1;
          return 1;
        })
      : clubList;
  },
  transformSingularClub: ({ club }: { club?: IClub }) => {
    if (club)
      return {
        ...club,
        status: getCurrentClubStatus(club)
      } as IClubSingular;
  },
  transformLesson: ({ lesson }: { lesson: IClubLessonResponse }): IClubLessonData => {
    const sDate = dayjs(parseInt(lesson.start, 10) * 1000);
    const eDate = dayjs(parseInt(lesson.endtime, 10) * 1000);

    return {
      ...lesson,
      image: lesson.imageid ? `https:${lesson.imageid}` : undefined,
      kind: lesson.kind as LessonType,
      startDate: sDate,
      endDate: eDate,
      formattedTime: `${DateUtils.formatToHour(sDate)} - ${DateUtils.formatDurationToMin(
        sDate,
        eDate
      )}`,
      inProgress:
        dayjs().valueOf() >= parseInt(lesson.start, 10) * 1000 &&
        dayjs().valueOf() <= parseInt(lesson.endtime, 10) * 1000,
      key: lesson.id
    };
  },
  transformClubLessons: ({
    lessons,
    from,
    numDays
  }: {
    lessons: IClubLessonResponse[];
    from: number;
    numDays: number;
  }): IClubLesson[] | undefined => {
    const lessonTitleLookUp = [formatMessage('Today'), formatMessage('Tomorrow')];
    let lessonDataList: IClubLessonData[] = [];
    const lessonList: IClubLesson[] = [];

    // Pre-fill array
    Array.from(Array(numDays).keys()).forEach((index) => {
      lessonList.push({
        title:
          lessonTitleLookUp[index] ??
          DateUtils.formatLessonDateTitle(dayjs(from * 1000).add(index, 'day')),
        data: []
      });
    });

    if (lessons.length) {
      let previousDay: number = dayjs(parseInt(lessons[0].start, 10) * 1000).date();

      lessons.forEach((lesson) => {
        const startDayjs = dayjs(parseInt(lesson.start, 10) * 1000);
        const startDate = startDayjs.date();

        if (startDate !== previousDay) {
          const index = startDayjs.diff(dayjs(from * 1000), 'days');
          lessonList[index] = {
            title:
              lessonTitleLookUp[index] ??
              DateUtils.formatLessonDateTitle(
                dayjs(parseInt(lesson.start, 10) * 1000).subtract(1, 'day')
              ),
            data: lessonDataList
          };

          lessonDataList = []; // Clear array
          previousDay = startDate;
        }

        lessonDataList.push(ClubModelAdapter.transformLesson({ lesson: lesson }));
      });

      return lessonList;
    }
  }
};

export default ClubModelAdapter;
