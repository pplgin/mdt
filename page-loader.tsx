import React from 'react';
import Logger from '@core/logger';
import { PageLoading, PageError } from './page-status';
import { injectAsyncReducer } from '../store';

// 日志
const logger = Logger.factory('page-loader');

interface PreloadLoaderOptions {
  onEnter?: (params: object) => void;
  Loading?: React.ReactType;
  loader: () => void;
  ErrorComp?: React.ReactType;
  reducer?: {};
}
interface StateStoreOptions {
  Component: null | React.ReactElement;
  promise?: Promise<any>;
}
/**
 * 预加载逐渐
 * @param {组件}} 组件
 * @param {redux} reducer
 */
function perLoad(component: () => void, reducer: Record<string, any> = {}): Record<string, any> {
  const state: StateStoreOptions = {
    Component: null,
  }; //返回state
  const reducerKeys = Object.keys(reducer);
  const storeReducer: Record<string, any> = {};
  let promiseList = reducerKeys.map((key: string) => {
    return reducer[key]().then((res: any) => {
      storeReducer[key] = res.default;
      return res;
    });
  });
  promiseList = [component(), ...promiseList];
  state.promise = Promise.all(promiseList)
    .then(([component]) => {
      injectAsyncReducer(storeReducer);
      return component.default;
    })
    .catch((err) => {
      throw err;
    });
  return state;
}

/**
 * 页面加载配置
 */
export default function PageLoader({ onEnter, reducer, loader, Loading = PageLoading, ErrorComp = PageError }: PreloadLoaderOptions) {
  let stateStore: Record<string, any> = {};

  if (onEnter && typeof onEnter !== 'function') {
    throw new Error('Config onEnter must be function');
  }

  return class PLoader extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      stateStore = perLoad(loader, reducer);
    }

    readonly state = {
      PageComponent: stateStore.Component,
      isLoading: true,
      hasError: false,
      errorInfo: null,
    };

    async componentDidMount() {
      try {
        const pageComponent = await stateStore.promise;
        if (onEnter) {
          await onEnter(this.props);
        }
        this.setState({
          PageComponent: pageComponent,
        });
      } catch (err) {
        logger.error(err.stack, JSON.stringify(err.message));
        this.setState({
          hasError: true,
          errorInfo: JSON.stringify(err.message || '哦，出错了！'),
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }

    componentWillUnmount() {
      // remove dynamic reducer
      if (reducer) {
        const storeNames = Object.keys(reducer);
        injectAsyncReducer(
          storeNames.reduce((o: Record<string, any>, key: string) => {
            o[key] = false;
            return o;
          }, {})
        );
      }
    }

    render() {
      const { isLoading, PageComponent, hasError, errorInfo } = this.state;
      if (isLoading) {
        return <Loading />;
      }

      if (hasError) {
        return <ErrorComp errmsg={`Oops！出错了！${errorInfo}`} />;
      }

      return <PageComponent {...this.props} />;
    }
  };
}
