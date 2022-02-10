/* eslint-disable @typescript-eslint/camelcase */
import { State, Effect } from 'jumpstate';
import i18n, { getDefaultLanguage } from '@fe/i18n';
import { getAppConfig } from '@services/global';
import Logger from '@core/logger';
import { sendEvent } from '@core/track';
import { getClientVersion } from '@utils/native-helper';
import { getQueryString } from '@utils/url-utils';

const logger = Logger.factory('state/global');

export interface IRtcConfig {
  setParameters: Array<any>;
  setVideoEncoderConfiguration: ISetVideoEncoderConfiguration;
  beautyOptions: IBeautyOption;
}

export interface ISetVideoEncoderConfiguration {
  width: number;
  height: number;
  frameRate: number;
  bitrate: number;
  orientation: number;
}

export interface IBeautySetting {
  /** 亮度 */
  colorLevel: number;
  /** 红润 */
  redLevel: number;
  /** 大眼 */
  eyeLarger: number;
  /** 瘦脸 */
  cheek: number;
}

export interface IBeautyOption {
  filter_level: number;
  color_level: number;
  red_level: number;
  blur_level: number;
  nonshin_blur_scale: number;
  face_shape: number;
  face_shape_level: number;
  eye_enlarging: number;
  eye_bright: number;
  is_beauty_on: number;
  cheek_thinning: number;
  filter_name: string;
}

export interface IGlobalState {
  /** 强制走本地化 */
  disableCsLocal: boolean;
  /** 即构通道开关 */
  zegoSwitch: boolean;
  /** 开启美颜 */
  enableBeauty: boolean;
  /** 开启3.0课件 */
  enableCWSdk: boolean;
  /** 开启随机选人 */
  enableRandomChoose: boolean;
  /** 和美颜开关一起配合使用 */
  beautySetting: IBeautySetting;
  /** 音视频设置 */
  rtcConfig: IRtcConfig;
  /** 能量果上限 */
  energyFruitLimit: number;
  /** 全屏上台分辨率 */
  stairResolution: {
    width?: number;
    height?: number;
    enable: boolean;
  };
  /** 全屏上台截屏 */
  enableScreenshot: boolean;
  local: string;
}

export interface IGlobalAction {
  setCommonData: (payload: Partial<IGlobalState>) => IGlobalState;
  setLocal: (payload: string) => IGlobalState;
}

/**
 * 全局数据处理
 */
const globalStore = State<IGlobalAction, IGlobalState>('global', {
  initial: {
    disableCsLocal: false, // 强制走本地化
    zegoSwitch: false, //即构通道开关
    enableBeauty: true, // 开启美颜
    enableCWSdk: true, //开启3.0课件
    enableRandomChoose: false, // 开启随机选人
    beautySetting: {
      // 和美颜开关一起配合使用
      colorLevel: 1, // 亮度
      redLevel: 1, // 红润
      eyeLarger: 0.5, // 大眼
      cheek: 1, // 瘦脸
    },
    rtcConfig: {
      // 音视频设置
      setParameters: [
        { 'che.video.videoCaptureType': 0 }, // 音视频采集方式
      ],
      setVideoEncoderConfiguration: {
        width: 320,
        height: 240,
        frameRate: 15,
        bitrate: 0,
        orientation: 1,
      },
      beautyOptions: {
        filter_level: 1.0,
        color_level: 0.2,
        red_level: 0.5,
        blur_level: 5.0,
        nonshin_blur_scale: 0.45,
        face_shape: 3,
        face_shape_level: 1.0,
        eye_enlarging: 0,
        eye_bright: 0,
        is_beauty_on: 1.0,
        cheek_thinning: 0.2,
        filter_name: 'origin',
      },
    },
    stairResolution: {
      enable: false,
    },
    enableScreenshot: false,
    energyFruitLimit: 20, // 能量果上限
    local: getDefaultLanguage()
  },
  /**
   * 更新课件
   */
  setCommonData(state, payload) {
    logger.info('global data change', state, payload);
    return {
      ...state,
      ...payload,
    };
  },
  setLocal(state, payload) {
    return {
      ...state,
      local: payload
    }
  }
});

/**
 * 加载App全局配置(如开关，美颜参数等)
 */
export const loadAppConfig = Effect('loadAppConfig', async (payload: UserProps, getState: Function) => {
  const { beautySetting, rtcConfig, stairResolution } = getState().global;
  // 科目限制
  const subject = decodeURIComponent(getQueryString('subject') || '');
  try {
    if (global.rtcEngine) {
      global.rtcEngine.release();
      global.rtcEngine = null;
    }

    const res: Record<string, any> = await getAppConfig({
      grayCodeList: ['GRAY_JIGOU', 'GRAY_BEAUTY', 'GRAY_DISABLE_CSLOCAL', 'GRAY_CW_SDKINFO', 'GRAY_RANDOM_CHOOSE', 'GRAY_KPC_SCREENSHOT'],
      planCodeList: ['PLAN_ENERGY', 'PLAN_UPSTAIR_RESOLUTION', 'PLAN_ELOQUENCE_SOURCES'],
      map: {
        userId: payload?.userId?.toString(),
        version: getClientVersion(),
        role: 'teacher',
        platform: window?.process?.platform || 'pc',
        subject,
      },
    }).catch((err) => {
      sendEvent({
        eventId: 'load_global_config_error',
        eventParam: {
          err,
          type: 'getAppConfig',
        },
      });
      return {
        PLAN_ENERGY: {},
      };
    });

    const config = {
      zegoSwitch: !!res['GRAY_JIGOU'],
      enableBeauty: !!res['GRAY_BEAUTY'],
      energyFruitLimit: res['PLAN_ENERGY']?.['energyAmount'] || 30,
      disableCsLocal: !!res['GRAY_DISABLE_CSLOCAL'],
      enableCWSdk: !!res['GRAY_CW_SDKINFO'], // 开启新版本avs 音视频模块
      enableRandomChoose: !!res['GRAY_RANDOM_CHOOSE'],
      enableScreenshot: !!res['GRAY_KPC_SCREENSHOT'],
      beautySetting: {
        ...beautySetting,
        ...(res['PLAN_ENERGY']?.['beautySetting'] || {}),
      },
      rtcConfig: {
        ...rtcConfig,
        ...(res['PLAN_ENERGY']?.['rtcSetting'] || {}),
      },
      stairResolution: {
        ...stairResolution,
        ...res['PLAN_UPSTAIR_RESOLUTION'],
        enable: !!subject,
      },
    };

    globalStore.setCommonData(config);
  } catch (err) {
    sendEvent({
      eventId: 'load_global_config_error',
      eventParam: {
        err,
        type: 'loadAppConfig',
      },
    });
  }
});
export default globalStore;
