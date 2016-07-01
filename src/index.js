import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)
// DomRootEle
const RootNode = document.querySelector('#container');

render(<Root store={store} history = {history} />,RootNode);
