import { createStore, applyMiddleware } from 'redux';
import { CreateJumpstateMiddleware } from 'jumpstate';
import createLogger from './logger';
import { reducerManager } from '../states';

export let store: any = {};

/**
 * 动态切换reducer
 * @param {object} reducers
 */
export function injectAsyncReducer(reducers: Record<string, any> = {}) {
  Object.keys(reducers).forEach((key) => {
    if (!reducers[key]) {
      store.reducerManager.remove(key);
    } else {
      store.reducerManager.add(key, reducers[key]);
    }
  });
  store.replaceReducer(store.reducerManager.getReducer());
}

/**
 * 初始化store
 * @param  {Object} initialState [description]
 * @return {[type]}              [description]
 */
export function configureStore(initialState: Record<string, any> = {}) {
  const middlewares = [CreateJumpstateMiddleware()];
  // development mode set log
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }
  store = applyMiddleware(...middlewares)(createStore)(reducerManager.reduce, initialState);
  store.reducerManager = reducerManager;
  return store;
}
