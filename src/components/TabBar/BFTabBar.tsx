import React, { useMemo } from 'react';
import {
  MaterialTopTabDescriptorMap,
  MaterialTopTabNavigationEventMap
} from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { TabNavigationState, ParamListBase, NavigationHelpers } from '@react-navigation/native';
import { View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Header } from '../Layout';
import Typography from '../Typography';
import styles from './bf-tab-bar-styles';

interface BFTabBarProps {
  title: string;
  subtitle?: string;
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>;
  descriptors: MaterialTopTabDescriptorMap;
  position: Animated.Adaptable<number>;
  children?: React.ReactNode;
}

const BFTabBar = ({
  title,
  subtitle,
  state,
  descriptors,
  navigation,
  position,
  children
}: BFTabBarProps) => {
  const desiredWidth = useMemo(() => Dimensions.get('screen').width / state.routes.length, [
    state.routes.length
  ]);

  const indicatorTranslateX = useMemo(() => {
    const array = [...Array(state.routes.length).keys()];
    return Animated.interpolate(position, {
      inputRange: array,
      outputRange: array.map((_, index) => index * desiredWidth)
    });
  }, [position, desiredWidth, state.routes.length]);

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabInnerContainer}>
        <Header title={title} subtitle={subtitle} />
        {children}
      </View>

      <View style={styles.tabs}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              style={styles.tabSize(state.routes.length)}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <Typography
                style={isFocused ? styles.tabTextActive : styles.tabTextInactive}
                fontFamily={isFocused ? 'trebleHeavy' : 'trebleRegular'}
              >
                {label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
      <Animated.View
        style={[
          styles.indicator,
          {
            width: desiredWidth,
            left: indicatorTranslateX
          }
        ]}
      />
    </View>
  );
};

export default BFTabBar;
