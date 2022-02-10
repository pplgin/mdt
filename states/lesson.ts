import { State, Effect, getState } from 'jumpstate';

import { sendEvent } from '@core/track';
import Logger from '@core/logger';

import { getQueryObject } from '@utils/url-utils';

import * as fetchServers from '@services/fetch-server';
import { getZmlContentUrl } from '@services/fetch-zmx-info';
import { fetchLessonInfo } from '@services/lesson';

import { Message } from 'components/toast';

import roomStateStore from 'states/room-state';
import classroomStore from 'states/classroom';
import SocketEventListener from 'utils/socket';
import { getSwitchkeyCatch } from 'utils/storage';

import { LESSON_COURSETYPE_SMALL } from 'constants/lesson';
import { STUDENT_ROLE_NAME, TEACHER_ROLE_NAME } from 'constants/user';
import userStore from './user';
const logger = Logger.factory('lesson');

export interface ILessonState {
  lessonInfo: ILessonInfo & Record<string, any>;
  serverInfo: {
    socketHost: string;
    zmlHost: string;
    backupSocketUrl: string;
  };
}

export interface ILessonAction {
  setLessonInfo: (payload: Partial<ILessonState['lessonInfo']>) => ILessonState;
  setServerInfo: (payload: Partial<ILessonState['serverInfo']>) => ILessonState;
}

type LessonInfoExt = {
  studentInfo: {
    avatar: string;
    mobile: string;
    name: string;
    userId: number;
    videoUid: number;
  };
  teacherInfo: {
    mobile: string;
    name: string;
    nickname: string;
    userId: number;
    videoUid: number;
  };
};
/**
 * 教学区域状态Store
 */
const lessonStore = State<ILessonAction, ILessonState>('lesson', {
  // Initial State
  initial: {
    lessonInfo: {},
    serverInfo: {
      socketHost: '', //课堂sockethost
      zmlHost: '', // zml课堂host
      backupSocketUrl: '', // 降级socket链接
    },
  },
  /**
   * 更新课件
   * @param  {[type]} state [description]
   */
  setLessonInfo(state, payload) {
    return {
      ...state,
      lessonInfo: {
        ...state.lessonInfo,
        ...payload,
      },
    };
  },
  /**
   * 网络连接相关信息
   */
  setServerInfo(state, payload) {
    return {
      ...state,
      serverInfo: {
        ...state.serverInfo,
        ...payload,
      },
    };
  },
});

/**
 * 获取课程信息
 * @param  {[type]} payload [description]
 */
export const getLessonInfo = Effect('getLessonInfo', async () => {
  const { lessonUid }: Record<string, string> = getQueryObject(window.location.href);
  try {
    const res = await fetchLessonInfo({ lessonUid });
    const lessonInfo = {
      ...res,
      lessonStatus: 0,
      isWatcher: false,
      lessonUid,
    };
    lessonStore.setLessonInfo(lessonInfo);
    return lessonInfo;
  } catch (error) {
    sendEvent({
      eventId: 'fetch_lessonInfo_failed',
      eventParam: {
        error,
      },
      lessonUid,
    });
    // 弹窗提示
    Message.show({ message: error instanceof Error ? error.message : error.message || '获取课程信息失败,请稍后再试！' });
    throw error;
  }
});

/**
 * 获取socket uri 地址
 */
export const fetchSocketUri = Effect('fetchSocketUri', async (payload: Record<string, any> = {}) => {
  // 获取socket地址
  const { lessonInfo, failedCount = 0 } = payload;
  const { lessonUid, uid, courseType } = lessonInfo;
  // 获取小班课 socket, zml, zmg url地址
  const fetchServerName = courseType === LESSON_COURSETYPE_SMALL ? 'fetchSmallClassServer' : 'fetchOneToOneServer';
  try {
    const socketHost = await fetchServers[fetchServerName](lessonUid || uid);
    lessonStore.setServerInfo({
      socketHost,
    });
    return socketHost;
  } catch (error) {
    sendEvent({
      eventId: 'fetch_socket_uri_error',
      eventParam: {
        lessonUid,
        error,
      },
    });
    // 三次重试
    if (failedCount <= 2) {
      Message.show({ message: `获取课堂Socket失败！正在重试(${failedCount})……` });
      return fetchSocketUri({
        lessonInfo,
        failedCount: failedCount + 1,
      });
    }
    throw error;
  }
});

/**
 * 获取设备信息接口
 * @param  {[type]} payload [description]
 */
export const getZmlHost = Effect('getZmlHost', async () => {
  try {
    // zml地址
    const zmlHost = await getZmlContentUrl();
    lessonStore.setServerInfo({
      zmlHost,
    });
  } catch (error) {
    logger.error('ZmlHost初始化失败', error instanceof Error ? error.message : error.message || 'ZMLHost出错了！');
    // 弹窗提示
    Message.show({ message: error instanceof Error ? error.message : error.message || 'ZMLHost出错了！' });
  }
});

/**
 * 学生别急图, 掌小门。美美兔，呆呆熊
 */
const STUDENT_DEFAULT_BGIMG = [
  'https://web-data.zmlearn.com/image/tLcTCppgViPTtBCamUjHaM/img-zxm.png',
  'https://web-data.zmlearn.com/image/qh634oWrSA1uZd4De6SqxB/img%EF%BC%8Fhead%EF%BC%8Fsculpture%EF%BC%8Fmmt%402x.png',
  'https://web-data.zmlearn.com/image/auoiGLV5WZVv38bFKTdjHr/img%EF%BC%8Fhead%EF%BC%8Fsculpture%EF%BC%8Fddx%402x.png',
];

/**
 * 初始化教室准备
 */
export const initializeClassRoom = Effect('initializeClassRoom', async () => {
  try {
    const { user: userInfo } = getState();
    // 获取课程数据
    const lessonInfo: ILessonInfo & LessonInfoExt = await getLessonInfo();
    // 获取zmlhost
    getZmlHost();

    const { studentInfo, teacherInfo } = lessonInfo;
    // 学生角色列表
    const students = {
      [studentInfo.userId]: {
        ...studentInfo,
        videoUid: Number(studentInfo.videoUid) || studentInfo.userId,
        bgi: STUDENT_DEFAULT_BGIMG[0],
        role: STUDENT_ROLE_NAME,
        online: 0,
        hasVideo: true,
        hasAudio: true,
      },
    };

    const teacher = {
      ...userInfo,
      ...teacherInfo,
      videoUid: Number(teacherInfo.videoUid) || teacherInfo.userId,
      role: TEACHER_ROLE_NAME,
      roleName: '老师',
      bgi: 'https://web-data.zmlearn.com/image/eWMuy4464b1b6YfCBF2mGE/img%EF%BC%8Fhead%EF%BC%8Fsculpture%EF%BC%8Fteacher%402x.png',
    };

    // 报错本地用户信息
    userStore.setUserInfo(teacher);
    roomStateStore.setOnlineRoles({
      teacher,
      students,
    });
    // 设置缓存的页面布局类型
    classroomStore.updateLayout(getSwitchkeyCatch() || 0);

    // create connect socket
    const socketUrl = await fetchSocketUri({
      lessonInfo,
      failedCount: 0,
    });
    SocketEventListener.factory({
      socketUrl,
      lessonInfo,
      userInfo: teacher,
    });
  } catch (error) {
    throw error;
  }
});

export default lessonStore;
