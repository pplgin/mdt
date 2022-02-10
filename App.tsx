import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { initZMSDK } from '@core/track';
import i18n from '@fe/i18n';
import { loadAppConfig } from 'states/global';

import { configureStore } from './store';
import localeLoaders from './locales';
import { loadUserInfo, handleWindowListener } from './bootstrap';
import Routes from './routes';

import './styles/global.scss';
import AppContainer from 'containers/app-container';
// import { initZMGPreload } from 'containers/zmx-area/preload';

const userInfo = loadUserInfo();
const store: any = configureStore({
  user: userInfo,
});

const rootEle = document.getElementById('app');

// 窗口监听
handleWindowListener();

initZMSDK();

if (process.env.NODE_ENV === 'development') {
  window.i18n = i18n;
}

loadAppConfig(userInfo).then(() => {
  render(
    <Provider store={store}>
      <AppContainer localeLoaders={localeLoaders}>
        <BrowserRouter basename="tch-air-classroom">
          <Routes />
        </BrowserRouter>
      </AppContainer>
    </Provider>,
    rootEle
  );
});
