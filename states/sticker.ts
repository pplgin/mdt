import { State } from 'jumpstate';

export interface IStickerState {
  stickerList: { name: string; bundleUrl: string; preview: string; icon: string }[];
  stickerMap: Record<string, { status: 'loading' | 'failed' }>;
  activeName: string;
  stickerListStudent: any[];
}

export interface IStickerAction {
  setStickerState: (payload: any) => IStickerState;
  setItem: (payload: any) => IStickerState;
  setActiveName: (payload: any) => IStickerState;
}

/**
 * 贴纸相关
 */
const stickerState = State<IStickerAction, IStickerState>('sticker', {
  initial: {
    stickerList: [], // 形如 { name: 贴纸名, bundle_url: string, preview: gif_url, icon: png_url }
    stickerMap: {}, // 形如 { <stickerName>: { status: 'loading' | 'failed' } }
    activeName: '', // 当前被选中的贴纸
    stickerListStudent: [],
  },
  setStickerState(state, payload) {
    if (typeof payload === 'function') {
      return payload(state);
    }
    return {
      ...state,
      ...payload,
    };
  },
  /** 设置贴纸下载、失败状态 */
  setItem(state, item) {
    const { name, data = {} } = item || {};
    if (!name || !(name in state.stickerMap)) {
      return state;
    }

    return {
      ...state,
      stickerMap: {
        ...state.stickerMap,
        [name]: {
          ...state.stickerMap[name],
          ...data,
        },
      },
    };
  },
  setActiveName(state, activeName) {
    return {
      ...state,
      activeName,
    };
  },
});

export default stickerState;
