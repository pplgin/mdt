import Logger from './logger';
import JSSDK from '@zm-fe/zm-jssdk-simple';
import { getClientVersion, getDeviceId } from '../utils/native-helper';
import { uuid } from '../utils/string-utils';
import { getState } from 'jumpstate';
import { ConnectState } from 'states/connect';
const logger = Logger.factory('track');

/**
 * 打点Id
 */
export const trackSessionId = uuid() as string;

/* 初始化埋点SDK */
export function initZMSDK() {
  const userInfo = getState<ConnectState>().user || {};
  // 配置sdk参数
  JSSDK.setConfig({
    environment: process.env.BUILD_TYPE === 'test' ? 'fat' : process.env.BUILD_TYPE,
    logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    history: true,
    trackWhiteList: [
      '//client-gateway.uat.zmops.cc',
      'https://test-chat-gateway.zmlearn.com',
      '//chat-gateway.zmlearn.com',
      'https://app-gateway.zmlearn.com',
    ],
  });

  // 配置上报公共属性
  JSSDK.setDefaults({
    appId: process.env.APPID,
    appVersion: getClientVersion(),
    userId: userInfo.userId,
    deviceId: getDeviceId(),
    sessionId: trackSessionId,
    roomSessionId: trackSessionId,
  });
}
/**
 * 新事件打点
 * @param {[string]} eventId [事件id]
 * @param {[object]} eventParam [打点参数]
 */
export function sendEvent({
  eventId,
  eventParam,
  lessonUid,
  ...opt
}: {
  eventId: string;
  lessonUid?: string;
  trackerType?: number;
  eventParam?: Record<string, any>;
}) {
  const { lessonUid: _lessonUid } = getState<ConnectState>().lesson.lessonInfo;
  const { userId } = getState<ConnectState>().user;
  // 处理错误信息堆栈
  if (eventParam && eventParam.err) {
    const error = eventParam.err;
    eventParam.err = error instanceof Error ? { message: error.message || '出错了,无错误信息！', stack: error.stack } : error;
  }

  logger.info('track event name', eventId, eventParam);
  JSSDK.sendEvent({
    eventId,
    eventParam,
    lessonUid: lessonUid || _lessonUid,
    userId,
    role: 'teacher',
    ...opt,
  });
}

/**
 * 打点日志
 * @param param0
 */
export function sendLog({ lessonUid, code, message }: { lessonUid?: string; code: string; message?: Record<string, any> }) {
  const { lessonUid: _lessonUid } = getState<ConnectState>().lesson.lessonInfo;
  const { userId } = getState<ConnectState>().user;
  if (message && message.err) {
    message.err =
      message.err instanceof Error ? { message: message.err.message || '出错了,无错误信息！', stack: message.err.stack } : message.err;
  }
  logger.info('track log name', code, message);
  JSSDK.sendLog({
    code,
    message,
    lessonUid: lessonUid || _lessonUid,
    userId,
    level: 'info',
  });
}
