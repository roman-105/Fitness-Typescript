import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { iconLookup } from '../Icon';
import styles from './header-styles';
import { Routes } from '../../router/routes';

interface HeaderProps {
  items: {
    icon: 'profile' | 'card' | 'search' | 'notifications' | 'settings';
    onPress?: () => void;
  }[];
  route: Routes;
}

const Header = ({ items, route }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      {items.map((item) => {
        const IconComponent = iconLookup[item.icon] ?? React.Fragment;
        return (
          <TouchableOpacity
            testID={`${route}-header-icon-${item.icon}`}
            style={styles.item}
            key={item.icon}
            onPress={item.onPress}
          >
            <IconComponent />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Header;
