import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import formatMessage from 'format-message';

const DateUtils = {
  formatClubHolidayHours: (date: string) => {
    return dayjs(date).format('MMMM D');
  },
  formatLessonDateTitle: (day: Dayjs) => {
    return day.format('dddd MMM Do');
  },
  formatSingularLessonDateTitle: (day: Dayjs) => {
    return day.format('ddd Do MMM');
  },
  formatToHour: (day: Dayjs) => {
    return day.format('HH:mm');
  },
  formatDurationToMin: (startDate: Dayjs, endDate: Dayjs) => {
    const duration = endDate.valueOf() - startDate.valueOf();
    return `${Math.trunc(duration / 1000 / 60)} ${formatMessage('min')}`;
  },
  formatHoursToMinutes: (time?: string) => {
    // Time must be "hh:mm:ss"
    const timeArr = time && time.split(':');

    if (timeArr && timeArr.length > 1) {
      const minutes = parseInt(timeArr[0], 10) * 60 + parseInt(timeArr[1], 10);
      return `${minutes} min`;
    }
    return '';
  },
  formatDateToDayOfTheWeek: (date: Dayjs) => {
    return date.format('ddd');
  }
};

export default DateUtils;
