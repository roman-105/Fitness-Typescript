import React from 'react';
import formatMessage from 'format-message';
import { View } from 'react-native';
import { BFCollapsibleView } from '../../../../components/Collapsible';
import { Container } from '../../../../components/Layout/Layout';
import Typography from '../../../../components/Typography';
import { IClubSingular } from '../../../../store/models/club';
import styles from './club-singular-opening-hours-styles';
import DateUtils from '../../../../utils/dateUtils';

interface ClubSingularOpeningHoursProps {
  hours: IClubSingular['hours'];
  holidayHours: IClubSingular['holidayHours'];
}

const ClubSingularOpeningHours = ({ hours, holidayHours }: ClubSingularOpeningHoursProps) => {
  return (
    <Container>
      <BFCollapsibleView
        header={
          <Typography fontFamily="trebleHeavy" fontSize={12} lineHeight={22}>
            {formatMessage('Opening hours')}
          </Typography>
        }
      >
        <View>
          {Object.keys(hours).map((day) => {
            const _day = day as keyof IClubSingular['hours'];
            return (
              <View style={styles.hoursContainer}>
                <Typography type="regularbfa" fontSize={12} capitalize>
                  {day}
                </Typography>
                <Typography
                  type="regularbfa"
                  fontSize={12}
                >{`${hours[_day].openIntervals[0].start} - ${hours[_day].openIntervals[0].end}`}</Typography>
              </View>
            );
          })}
        </View>
        {holidayHours && holidayHours.length !== 0 && (
          <View style={styles.holidaysContainer}>
            <BFCollapsibleView
              header={
                <Typography fontFamily="trebleHeavy" fontSize={12} lineHeight={22}>
                  {formatMessage('Show holidays schedule')}
                </Typography>
              }
            >
              {holidayHours?.map((holidayHour) => {
                return (
                  <View style={styles.hoursContainer}>
                    <Typography>{DateUtils.formatClubHolidayHours(holidayHour.date)}</Typography>
                    {!holidayHour.isClosed && (
                      <Typography
                        type="regularbfa"
                        fontSize={12}
                      >{`${holidayHour.start} - ${holidayHour.end}`}</Typography>
                    )}
                  </View>
                );
              })}
            </BFCollapsibleView>
          </View>
        )}
      </BFCollapsibleView>
    </Container>
  );
};

export default ClubSingularOpeningHours;
