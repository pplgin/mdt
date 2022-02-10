import { State, Effect } from 'jumpstate';
import { fetchChildZmxDetailBatch, fetchCSWHistoryBatch } from '@services/fetch-zmx-info';
import { objectMerge } from '@utils/object-utils';
import { DRAFTBOARD_NAME, EMPT_COURSE_TAPNAME, DOC_NORMAL_NAME } from 'constants/courseware';
import {
  COLOR_LIST,
  PEN_WIDTH_LIST,
  SHAPE_FILL_MODE_BORDER,
  DRAWTOOL_PENCIL,
  DRAWTOOL_ELLIPSE,
  DRAWTOOL_SHAPES,
  SHAPE_WIDTH_LIST,
  DRAWTOOL_ERASER_RECTANGLE,
  DRAWTOOL_MOUSE,
  DRAWTOOL_ERASER,
  ERASER_WIDTH_LIST,
  DRAWTOOL_TEXTTOOL,
  TEXT_SIZE_LIST,
} from 'constants/draw';
import { sendEvent } from '@core/track';

/**
 * 获取上一次使用的画笔配置
 */
const getLastWhiteboardStyle = () => {
  const defaultStyles = {
    [DRAWTOOL_PENCIL]: {
      toolKind: DRAWTOOL_PENCIL,
      strokeWidth: PEN_WIDTH_LIST[0], // 画笔大小
      stroke: COLOR_LIST[0].value, // 铅笔颜色
    },
    [DRAWTOOL_SHAPES]: {
      toolKind: DRAWTOOL_ELLIPSE,
      strokeWidth: SHAPE_WIDTH_LIST[0], // 画笔大小
      stroke: COLOR_LIST[0].value, // 铅笔颜色
      fillMode: SHAPE_FILL_MODE_BORDER,
    },
    [DRAWTOOL_ERASER_RECTANGLE]: {
      toolKind: DRAWTOOL_ERASER_RECTANGLE, // 区域清除
      strokeWidth: 2, // 区域删除
    },
    [DRAWTOOL_ERASER]: {
      toolKind: DRAWTOOL_ERASER, // 橡皮擦
      strokeWidth: ERASER_WIDTH_LIST[0],
      storke: '#EF4C4F',
    },
    [DRAWTOOL_TEXTTOOL]: {
      toolKind: DRAWTOOL_TEXTTOOL, // 文字大小
      fontFamily: 'Arial',
      fontSize: TEXT_SIZE_LIST[0],
      stroke: COLOR_LIST[0].value, // 铅笔颜色
    },
  };
  try {
    return objectMerge(defaultStyles, JSON.parse(localStorage.getItem('WHITEBOARD_STYES') || '{}'));
  } catch (error) {
    return defaultStyles;
  }
};

export interface IClassroomState {
  ppts: Record<string, any>;
  /** 下载状态cache */
  downloadCache: Record<string, boolean>;
  /** 白板数据cache */
  whiteboardCache: Record<string, any>;
  currentDocType: string;
  currentId: string;
  curToolKind: string;
  whiteboardStyle: Record<string, any>;
  /** 显示空课件状态 */
  showEmptyCourseTips: boolean;
  /** 画板显示 */
  showWhiteboard: boolean;
  lessonStatus: {
    /** 已经开始时间 */
    startedTime: number;
    /** 是否正在上课 */
    started: boolean;
    /** 课程结束 */
    ended: boolean;
  };
  /** 0=视频右布局；1=视频上布局 */
  pageLayoutType: 0 | 1;
  /** 左右布局时 视频布局方式 */
  displayType: 'grid' | 'list' | 'horizon';
}

export interface IClassroomAction {
  setEmptyCourseStats: (payload: boolean) => IClassroomState;
  setDownloadCache: (payload: IClassroomState['downloadCache']) => IClassroomState;
  setWhiteboardCache: (payload: string | number) => IClassroomState;
  updateLessonStatus: (payload: Partial<IClassroomState['lessonStatus']>) => IClassroomState;
  setCurrentDoc: (payload: any) => IClassroomState;
  setWhiteboard: (payload: boolean) => IClassroomState;
  updateDocInfos: (payload: any) => IClassroomState;
  removeDoc: (payload: string) => IClassroomState;
  setPPTInfo: (payload: any) => IClassroomState;
  setPPTListInfo: (payload: any) => IClassroomState;
  updateWhiteboardStyle: (payload: any) => IClassroomState;
  updateCurrentToolId: (payload: any) => IClassroomState;
  updateLayout: (payload: IClassroomState['pageLayoutType']) => IClassroomState;
  updateVideoDisplay: (payload: IClassroomState['displayType']) => IClassroomState;
}

/**
 * 教学区域状态Store
 */
const classroomStore = State<IClassroomAction, IClassroomState>('classroom', {
  // Initial State
  initial: {
    ppts: {
      [DRAFTBOARD_NAME]: {
        currentPage: 0,
        lesHash: DRAFTBOARD_NAME,
        docContents: [0],
        name: '黑板',
        id: DRAFTBOARD_NAME,
        ratio: 1.3,
        docType: DRAFTBOARD_NAME,
      },
    },
    downloadCache: {}, // 下载状态cache
    whiteboardCache: {}, // 白板数据cache
    currentDocType: DRAFTBOARD_NAME,
    currentId: DRAFTBOARD_NAME,
    curToolKind: DRAWTOOL_PENCIL,
    whiteboardStyle: getLastWhiteboardStyle(),
    showEmptyCourseTips: false, // 显示空课件状态
    showWhiteboard: true, // 画板显示
    lessonStatus: {
      startedTime: 0, // 已经开始时间，
      started: false, //是否正在上课
      ended: false, //课程
    },
    pageLayoutType: 1, // 0=视频右布局；1=视频上布局
    displayType: 'list', // 左右布局时 视频布局方式
  },
  /**
   * 设置课件状态
   */
  setEmptyCourseStats(state, payload) {
    return {
      ...state,
      showEmptyCourseTips: payload,
    };
  },
  /**
   * 下载状态缓存
   */
  setDownloadCache(state, payload) {
    return {
      ...state,
      downloadCache: {
        ...state.downloadCache,
        ...payload,
      },
    };
  },
  /**
   * 白板数据cache
   */
  setWhiteboardCache(state, payload) {
    const pageIdx = payload;
    return {
      ...state,
      whiteboardCache: {
        ...state.whiteboardCache,
        [pageIdx]: true,
      },
    };
  },

  /**
   * 更新当前课程状态
   */
  updateLessonStatus(state, payload) {
    return {
      ...state,
      lessonStatus: {
        ...state.lessonStatus,
        ...payload,
      },
    };
  },

  /**
   *设置当前展示的iframe
   * @param {*} state
   * @param {*} payload
   * @returns
   */
  setCurrentDoc(state, payload) {
    const { ppts = {} } = state;
    const { currentId, currentDocType, ...rest } = payload;
    const _currentDocType = currentDocType || (ppts[currentId] ? ppts[currentId].docType : state.currentDocType);
    return {
      ...state,
      ...rest,
      currentDocType: _currentDocType,
      currentId,
      showWhiteboard: [DOC_NORMAL_NAME, DRAFTBOARD_NAME].includes(_currentDocType),
      curToolKind: [DOC_NORMAL_NAME, DRAFTBOARD_NAME].includes(_currentDocType) ? DRAWTOOL_PENCIL : DRAWTOOL_MOUSE,
      showEmptyCourseTips: currentId === EMPT_COURSE_TAPNAME,
    };
  },
  /**
   *设置黑板状态显示
   */
  setWhiteboard(state, payload) {
    return {
      ...state,
      showWhiteboard: payload,
      curToolKind: payload ? DRAWTOOL_PENCIL : DRAWTOOL_MOUSE,
    };
  },
  /**
   *更新doc信息
   */
  updateDocInfos(state, payload) {
    const { ppts, currentId } = state;
    return {
      ...state,
      ppts: {
        ...ppts,
        [currentId]: {
          ...ppts[currentId],
          ...payload,
        },
      },
    };
  },
  /**
   *课件关闭移除ppt
   */
  removeDoc(state, payload) {
    const { ppts } = state;
    const _ppts = Object.assign({}, ppts);
    if (payload && _ppts[payload]) {
      delete _ppts[payload];
    }

    return {
      ...state,
      ppts: _ppts,
      currentId: DRAFTBOARD_NAME,
      currentDocType: DRAFTBOARD_NAME,
      showWhiteboard: true,
      curToolKind: DRAWTOOL_PENCIL,
    };
  },
  /**
   * 网络连接相关信息
   */
  setPPTInfo(state, payload) {
    const { id, docType } = payload;
    const { currentId, currentDocType } = state;
    return {
      ...state,
      currentDocType: id.toString() === currentId ? docType : currentDocType,
      curToolKind: docType === DOC_NORMAL_NAME ? DRAWTOOL_PENCIL : state.curToolKind,
      ppts: {
        ...state.ppts,
        [id]: {
          ...(state.ppts[id] || {}),
          ...payload,
        },
      },
    };
  },
  /**
   * 网络连接相关信息
   */
  setPPTListInfo(state, payload) {
    const { currentId, currentDocType } = state;
    return {
      ...state,
      currentDocType: payload[currentId]?.docType || currentDocType,
      ppts: {
        ...state.ppts,
        ...payload,
      },
    };
  },

  /**
   *画笔配置
   */
  updateWhiteboardStyle(state, payload) {
    const { curToolKind, ...rest } = payload;
    if (state.whiteboardStyle[curToolKind]) {
      const _styles = {
        ...state.whiteboardStyle,
        [curToolKind]: {
          ...state.whiteboardStyle[curToolKind],
          ...rest,
        },
      };
      localStorage.setItem('WHITEBOARD_STYES', JSON.stringify(_styles));
      return {
        ...state,
        curToolKind,
        showWhiteboard: true,
        whiteboardStyle: _styles,
      };
    }
    return {
      ...state,
      curToolKind,
      showWhiteboard: curToolKind !== DRAWTOOL_MOUSE, // 控制 白板显示
    };
  },
  /**
   *当前使用绘图工具索引
   */
  updateCurrentToolId(state, payload) {
    return {
      ...state,
      currentToolId: payload,
    };
  },
  /**
   * 切换课堂布局
   * payload: IPageLayoutType
   * @param state
   */
  updateLayout(state, payload) {
    return {
      ...state,
      pageLayoutType: payload,
    };
  },
  /**
   * 切换视频布局
   */
  updateVideoDisplay(state, payload) {
    return {
      ...state,
      displayType: payload,
    };
  },
});

/**
 * 批量加载ppt并缓存
 */
export const loadZmxDetailBatch = Effect('loadZmxDetailBatch', (payload: Record<string, any>) => {
  const params = Object.values(payload).map((v) => {
    const { bu, coursewareType } = v.courseInfo;
    return {
      bu,
      historyId: v.id,
      coursewareType,
    };
  });
  return fetchChildZmxDetailBatch(params)
    .then((res: Array<Record<string, any>>) => {
      // 数组
      const pptInfoList = res
        .filter((v) => !!v)
        .reduce((_list: Record<string, any>, ppt: Record<string, any>) => {
          const { id } = ppt;
          const { courseInfo, ...rest } = payload[id];
          _list[id] = {
            ...rest,
            bu: courseInfo.bu,
            id,
            autoLoad: courseInfo.autoLoad,
            ...ppt,
          };
          return _list;
        }, {});
      classroomStore.setPPTListInfo(pptInfoList);
      return res;
    })
    .catch((err) => {
      sendEvent({
        eventId: 'fetch_pptInfo_error',
        eventParam: {
          params: JSON.stringify(payload),
          err,
        },
      });
    });
});

/**
 * 新版本课件SDK
 */
export const loadCSWHistoryBatch = Effect('loadCSWHistoryBatch', async (payload: Record<string, any>) => {
  try {
    const params = Object.values(payload).map((v) => {
      return {
        historyId: v.id,
      };
    });
    const res: Array<Record<string, any>> = await fetchCSWHistoryBatch(params);
    const pptInfoList = res
      .filter((v) => !!v)
      .reduce((_list: Record<string, any>, ppt: Record<string, any>) => {
        const { historyId } = ppt;
        const { courseInfo, ...rest } = payload[historyId];
        const { zmgDetail, ...pptInfo } = ppt;
        _list[historyId] = {
          ...rest,
          bu: courseInfo.bu,
          id: historyId,
          autoLoad: courseInfo.autoLoad,
          ...zmgDetail,
          ...pptInfo,
        };
        return _list;
      }, {});
    classroomStore.setPPTListInfo(pptInfoList);
    return res;
  } catch (err) {
    sendEvent({
      eventId: 'fetch_pptInfo_error',
      eventParam: {
        params: JSON.stringify(payload),
        err,
      },
    });
    return err;
  }
});

export default classroomStore;
