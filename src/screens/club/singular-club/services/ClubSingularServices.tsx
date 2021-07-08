import React from 'react';
import { Container } from '../../../../components/Layout/Layout';
import { View } from 'react-native';
import { BFCollapsibleView } from '../../../../components/Collapsible';
import formatMessage from 'format-message';
import { IClubSingular } from '../../../../store/models/club';
import { BFTag } from '../../../../components/Tag';
import styles from './club-singular-services-styles';
import Typography from '../../../../components/Typography/Typography';

interface ClubSingularServicesProps {
  services: IClubSingular['services'];
}

const ClubSingularServices = ({ services }: ClubSingularServicesProps) => {
  return (
    <Container>
      <BFCollapsibleView
        header={
          <Typography fontFamily="trebleHeavy" fontSize={12} lineHeight={22}>
            {formatMessage('Services')}
          </Typography>
        }
      >
        <View style={styles.servicesContainer}>
          {services?.map((service) => {
            return <BFTag style={styles.tag} key={service.id} title={service.name} />;
          })}
        </View>
      </BFCollapsibleView>
    </Container>
  );
};

export default ClubSingularServices;
