import React, { ReactElement } from 'react';
import { View } from 'react-native';
import styles from './footer-styles';

import Typography from '../Typography';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ExternalIcon, ArrowRightIcon } from '../Icon/';
import { BFIScreenBottomButton } from '../../store/models/screens';
import { SvgUri } from 'react-native-svg';
import { Routes } from '../../router/routes';
import formatMessage from 'format-message';
import theme from '../../theme';

interface itemProps {
  left: () => JSX.Element;
  text: string;
  right: () => JSX.Element;
  onPress: () => void;
}

interface FooterProps {
  children?: JSX.Element[];
}

function handlePress(navigation: any, type: 'External' | 'Internal', dispatch: any, link?: string) {
  if (link) {
    if (type === 'External') {
      navigation.navigate(Routes.Webview, { deeplink: link });
    } else {
      if (Object.values(Routes).includes(link.toUpperCase() as Routes)) {
        navigation.navigate(link.toUpperCase());
      } else {
        dispatch.snackbarModel.report({
          message: formatMessage('no screen {link} found', { link })
        });
      }
    }
  } else {
    // throw a snackbar with no content found.
    dispatch.snackbarModel.report({ message: formatMessage('no link found') });
  }
}

function Footer({ children }: FooterProps): JSX.Element | null {
  if (children && children.length > 0) {
    return (
      <View style={styles.footerContainer}>
        <Typography fontSize={14} fontFamily="trebleHeavy">
          Quick services
        </Typography>
        <View style={styles.childrenContainer}>{children}</View>
      </View>
    );
  }
  return null;
}

function FooterItem({ left, text, right, onPress }: itemProps): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          {left()}
          <Typography fontSize={14} lineHeight={14} style={styles.text} fontFamily="medium">
            {text}
          </Typography>
        </View>
        {right()}
      </View>
    </TouchableOpacity>
  );
}

interface FooterFromConfigProps {
  config?: BFIScreenBottomButton[];
  dispatch: any;
  navigation: any;
}

export function FooterFromConfig(props: FooterFromConfigProps): ReactElement | null {
  if (!props.config) {
    return null;
  }
  return (
    <Footer>
      {/* show 3 buttons maximum */}
      {props.config.slice(0, 3).map((button, index) => (
        <FooterItem
          key={index}
          text={button.label}
          left={() => <SvgUri uri={`http:${button.icon}`} />}
          right={() =>
            button.type === 'External' ? (
              <ExternalIcon stroke={theme.colors.black} />
            ) : (
              <ArrowRightIcon fill={theme.colors.black} />
            )
          }
          onPress={() => handlePress(props.navigation, button.type, props.dispatch, button.link)}
        />
      ))}
    </Footer>
  );
}
