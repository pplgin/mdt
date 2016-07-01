import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import HomeBannerData from './home.reducer';
import AlbumInfoData from './album.reducer';

const rootReducer = combineReducers({
  HomeBannerData,
  AlbumInfoData,
  routing:routerReducer
});

export default rootReducer;
