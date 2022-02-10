import { combineReducers } from 'redux';
import user from './user';
import global from './global';
import lesson from './lesson';
import classroom from './classroom';
import roomState from './room-state';
import system from './system';
import sticker from './sticker';

export default {};

/**
 * 初始化数据状态管理
 * @param {初始化数据} initialReducers
 */
export function createReducerManager(initialReducers: Record<string, any>) {
  const reducers = { ...initialReducers };
  let combinedReducer = combineReducers(reducers);

  return {
    getReducer: () => combinedReducer,
    reduce: (state: {}, action: any) => combinedReducer(state, action),
    add: (key: string, reducer: Record<string, any>) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    remove: (key: string) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      combinedReducer = combineReducers(reducers);
    },
  };
}

export const reducerManager = createReducerManager({
  user,
  global,
  lesson,
  classroom,
  roomState,
  system,
  sticker,
});
