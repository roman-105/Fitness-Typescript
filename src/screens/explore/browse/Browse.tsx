import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import formatMessage from 'format-message';
import Typography from '../../../components/Typography';
import clubWorkoutsImage from '../../../assets/images/explore/club_workouts.png';
import homeWorkoutsImage from '../../../assets/images/explore/home_workouts.png';
import programsImage from '../../../assets/images/explore/programs.png';
import nutritionImage from '../../../assets/images/explore/nutrition.png';
import lifestyleImage from '../../../assets/images/explore/lifestyle.png';
import styles from './browse-styles';
import { Routes } from '../../../router/routes';
import FlatScroll from '../../../components/Layout/FlatScroll/FlatScroll';

const Browse = () => {
  const navigation = useNavigation();

  const items = [
    {
      source: clubWorkoutsImage,
      title: formatMessage('Club workouts'),
      subtitle: formatMessage('Spice up your gym routine'),
      onPress: () => navigation.navigate(Routes.ClubWorkouts)
    },
    {
      source: homeWorkoutsImage,
      title: formatMessage('Home workouts'),
      subtitle: formatMessage('Discover how you can train at home')
    },
    {
      source: programsImage,
      title: formatMessage('Programs'),
      subtitle: formatMessage('Reach your goals')
    },
    {
      source: nutritionImage,
      title: formatMessage('Nutrition'),
      subtitle: formatMessage('Delicious recipes')
    },
    {
      source: lifestyleImage,
      title: formatMessage('Lifestyle'),
      subtitle: formatMessage('Healthy habits')
    }
  ];

  const screenItems = items.map((item) => {
    return (
      <View testID="browse" style={styles.card}>
        <TouchableOpacity onPress={item.onPress}>
          <ImageBackground source={item.source} style={styles.image}>
            <View style={styles.overlay}>
              <Typography
                fontFamily="trebleHeavy"
                fontSize={24}
                lineHeight={29}
                light={true}
                uppercase={true}
              >
                {item.title}
              </Typography>
              <Typography fontFamily="trebleRegular" fontSize={12} lineHeight={16} light={true}>
                {item.subtitle}
              </Typography>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  });

  return <FlatScroll data={screenItems} />;
};

export default Browse;
