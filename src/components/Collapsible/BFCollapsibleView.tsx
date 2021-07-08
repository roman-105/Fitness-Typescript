import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import { ChevronRight } from '../Icon';
import theme from '../../theme';
import styles from './bf-collapsible-view-styles';
import { ViewStyle, View } from 'react-native';

interface BFCollapsibleViewProps {
  header: React.ReactNode;
  children: React.ReactNode;
  style?: ViewStyle;
}

const BFCollapsibleView = ({ header, children, style }: BFCollapsibleViewProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  return (
    <View style={style}>
      <TouchableOpacity style={styles.headerContainer} onPress={() => setIsCollapsed(!isCollapsed)}>
        {header}
        <ChevronRight
          style={isCollapsed ? styles.iconCollapsed : styles.iconNotCollapsed}
          fill={theme.colors.primary.asphaltGrey}
        />
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
    </View>
  );
};

export default BFCollapsibleView;
