import React from 'react';
import WebView from 'react-native-webview';
import styles from './bf-webview-styles';
import { GenerateSSOUrl } from '../../utils/sso/SSOUtils';
import { useSelector } from 'react-redux';

interface BFWebviewProps {
  route: {
    params: {
      uri: string;
      deeplink?: string;
      injectedJS?: string;
    };
  };
}

const BFWebview = ({
  route: {
    params: { uri, deeplink, injectedJS }
  }
}: BFWebviewProps) => {
  const memberInfo = useSelector((state) => state.memberModel.member);
  if (deeplink && memberInfo?.id) {
    uri = GenerateSSOUrl(memberInfo.id, deeplink);
  }
  return (
    <WebView
      injectedJavaScriptBeforeContentLoaded={injectedJS}
      autoManageStatusBarEnabled={false}
      testID="webview"
      style={styles.webview}
      source={{ uri: uri ?? deeplink }}
    />
  );
};

export default BFWebview;
