import React from 'react';
import { HomeIcon, ExploreIcon, ProgressIcon, CoachIcon, MyClubIcon } from '../Icon';
import Typography from '../Typography/Typography';
import styles from '../Typography/typography-styles';
import formatMessage from 'format-message';
import { Routes } from '../../router/routes';

const lookup: { [index: string]: (color: string) => JSX.Element } = {
  [Routes.Home]: (color: string) => <HomeIcon fill={color} />,
  [Routes.Programs]: (color: string) => <ExploreIcon fill={color} />,
  [Routes.Progress]: (color: string) => <ProgressIcon fill={color} />,
  [Routes.Coach]: (color: string) => <CoachIcon fill={color} />,
  [Routes.Club]: (color: string) => <MyClubIcon fill={color} />
};

export function bottomBarIcon(name: Routes) {
  return function ({ color }: { color: string }): JSX.Element {
    return lookup[name](color);
  };
}

export function bottomBarLabel(name: Routes) {
  const tabNameLookup: { [index: string]: string } = {
    [Routes.Home]: formatMessage('Home'),
    [Routes.Programs]: formatMessage('Explore'),
    [Routes.Progress]: formatMessage('Progress'),
    [Routes.Coach]: formatMessage('Coach'),
    [Routes.Club]: formatMessage('Clubs')
  };

  return function ({ color }: { color: string }): JSX.Element {
    return (
      <Typography
        style={{ color, ...styles.label }}
        fontFamily="regular"
        fontSize={11}
        lineHeight={12}
      >
        {tabNameLookup[name]}
      </Typography>
    );
  };
}
