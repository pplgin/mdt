import { State } from 'jumpstate';

export interface ISystemState {
  rtcStats: Record<string, any>;
  deviceInfo: Record<string, any>;
  videoStat: Record<string, any>;
  audioStat: Record<string, any>;
  netStat: Record<string, any>;
}

export interface ISystemAction {
  setRtcStats: (payload: any) => ISystemState;
  setUserVideoStats: (payload: any) => ISystemState;
  setUserAudioStats: (payload: any) => ISystemState;
  setUserNetStats: (payload: any) => ISystemState;
  setDeviceInfo: (payload: any) => ISystemState;
  setCurDeviceInfo: (payload: any) => ISystemState;
}

/**
 * 系统网络，cpu等数据信息
 */
const systemState = State<ISystemAction, ISystemState>('system', {
  // Initial State
  initial: {
    rtcStats: {
      cpuTotalUsage: 0,
    },
    deviceInfo: {},
    videoStat: {}, // 用户视频网络数据情况
    audioStat: {}, // 用户音频网络数据情况
    netStat: {}, //网络数据
  },
  /**
   * rtc相关状态
   */
  setRtcStats(state, payload) {
    return {
      ...state,
      rtcStats: payload,
    };
  },
  /**
   * rtc视频数据相关状态
   */
  setUserVideoStats(state, payload) {
    const { videoUid, ...rest } = payload;
    return {
      ...state,
      videoStat: {
        ...state.videoStat,
        [videoUid]: {
          ...state.videoStat[videoUid],
          ...rest,
        },
      },
    };
  },
  /**
   * rtc音频数据相关状态
   */
  setUserAudioStats(state, payload) {
    const { videoUid, ...rest } = payload;
    return {
      ...state,
      audioStat: {
        ...state.audioStat,
        [videoUid]: {
          ...state.audioStat[videoUid],
          ...rest,
        },
      },
    };
  },
  /**
   * 数据网络状态
   * @param payload
   */
  setUserNetStats(state, payload) {
    const { videoUid, ...rest } = payload;
    return {
      ...state,
      netStat: {
        ...state.netStat,
        [videoUid]: {
          ...state.netStat[videoUid],
          ...rest,
        },
      },
    };
  },
  /**
   * 设备信息
   */
  setDeviceInfo(state, payload) {
    return {
      ...state,
      deviceInfo: payload,
    };
  },
  /**
   * 当前设备
   */
  setCurDeviceInfo(state, payload) {
    const { id, type } = payload;
    if (!type || !id) {
      return state;
    }

    const curdevice = (state.deviceInfo[`${type}s`] || []).find((x: Record<string, any>) => x.id === id);

    if (!curdevice) {
      return state;
    }

    return {
      ...state,
      deviceInfo: {
        ...state.deviceInfo,
        [`cur${type}`]: curdevice,
      },
    };
  },
});
export default systemState;
