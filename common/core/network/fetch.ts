import * as Axios from 'axios';
import Logger from '@core/logger';
const logger = Logger.factory('network/fetch');
// 空方法
const noop = () => null;

export const APP_NAME_HEADERS = {
  'App-Version': '1.0.0',
  'App-Name': 'KidsPC',
  'Api-Version': '1.0.0',
};

interface ResCode {
  code: string | number;
}
/**
 * 接口请求
 * @param {*} 方法类型
 */
const request =
  (method: Axios.Method) =>
  ({ url, headers, data = {}, params = {}, onUploadProgress = noop, timeout = 2000, cancelToken }: Axios.AxiosRequestConfig) => {
    let accessToken = null;
    try {
      accessToken = localStorage.getItem('accessToken') || localStorage.getItem('oauthToken');
    } catch (error) {
      logger.error('get accessToken failed!', JSON.stringify(error));
    }
    return Axios.default({
      url,
      method,
      headers: {
        ...APP_NAME_HEADERS,
        ...headers,
        accessToken,
      },
      params,
      data,
      onUploadProgress,
      timeout,
      cancelToken,
    })
      .then((res) => {
        if (res.status === 200) {
          const result = res.data;
          if (result.code === '0') {
            return result.data;
          }
          throw result;
        }
        throw res.data;
      })
      .catch((err) => {
        logger.error(`fetch: ${url} error, params: ${JSON.stringify(data)}`, JSON.stringify(err));
        throw err;
      });
  };

export const get = request('get');
export const post = request('post');
