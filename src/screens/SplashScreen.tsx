import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from '../types';
import { COLORS } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const honeycombHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      overflow: hidden;
    }

    body {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @-webkit-keyframes honeycomb {
      0%, 20%, 80%, 100% {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
      }

      30%, 70% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }

    @keyframes honeycomb {
      0%, 20%, 80%, 100% {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
      }

      30%, 70% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }

    .honeycomb {
      height: 24px;
      position: relative;
      width: 24px;
      transform: scale(2.8);
    }

    .honeycomb div {
      -webkit-animation: honeycomb 2.1s infinite backwards;
      animation: honeycomb 2.1s infinite backwards;
      background: #f3f3f3;
      height: 12px;
      margin-top: 6px;
      position: absolute;
      width: 24px;
    }

    .honeycomb div:after,
    .honeycomb div:before {
      content: '';
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      position: absolute;
      left: 0;
      right: 0;
    }

    .honeycomb div:after {
      top: -6px;
      border-bottom: 6px solid #f3f3f3;
    }

    .honeycomb div:before {
      bottom: -6px;
      border-top: 6px solid #f3f3f3;
    }

    .honeycomb div:nth-child(1) {
      -webkit-animation-delay: 0s;
      animation-delay: 0s;
      left: -28px;
      top: 0;
    }

    .honeycomb div:nth-child(2) {
      -webkit-animation-delay: 0.1s;
      animation-delay: 0.1s;
      left: -14px;
      top: 22px;
    }

    .honeycomb div:nth-child(3) {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
      left: 14px;
      top: 22px;
    }

    .honeycomb div:nth-child(4) {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
      left: 28px;
      top: 0;
    }

    .honeycomb div:nth-child(5) {
      -webkit-animation-delay: 0.4s;
      animation-delay: 0.4s;
      left: 14px;
      top: -22px;
    }

    .honeycomb div:nth-child(6) {
      -webkit-animation-delay: 0.5s;
      animation-delay: 0.5s;
      left: -14px;
      top: -22px;
    }

    .honeycomb div:nth-child(7) {
      -webkit-animation-delay: 0.6s;
      animation-delay: 0.6s;
      left: 0;
      top: 0;
    }
  </style>
</head>
<body>
  <div class="honeycomb">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</body>
</html>
`;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Onboarding'), 5000);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/bg.png')}
        style={styles.bg}
        resizeMode="cover"
      />
      <View style={styles.overlay} />

      <View style={styles.webViewWrap}>
        <WebView
          originWhitelist={['*']}
          source={{ html: honeycombHtml }}
          style={styles.webView}
          scrollEnabled={false}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          javaScriptEnabled
          domStorageEnabled
          androidLayerType="hardware"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.bgDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(13,27,75,0.6)',
  },
  webViewWrap: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  webView: {
    width: 220,
    height: 220,
    backgroundColor: 'transparent',
  },
});