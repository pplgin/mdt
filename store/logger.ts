// import Logger from '@core/logger';
// const logger = Logger.factory('redux/logger');
import { Action, Dispatch } from 'redux';
/**
 * 简要的action日志
 */
export default function createLogger() {
  return () => (next: Dispatch<any>) => (action: Action) => {
    // logger.log("action", action);
    next(action);
  };
}
