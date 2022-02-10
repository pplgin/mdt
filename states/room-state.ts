import { State } from 'jumpstate';

export interface IRoomState {
  /** 屏幕锁定 */
  lockScreenStatus: boolean;
  /** 上台学生 */
  samllUpStairId: string;
  /** 自己, 学生 */
  onlineRoles: [Record<string, any>, Record<string, any>];
  /** 隐藏上传课件按钮 */
  hideUploadBtn: boolean;
  /** 画笔状态 */
  drawStudents: Record<string, any>;
  /** 学生音频状态 */
  mutedStudents: Record<string, any>;
  /** 全屏上台id */
  fullScreenId: string;
  /** 是否全屏上台 */
  isFullScreen: boolean;
  /** 通道情况 */
  channel: null | string;
  /** 学生屏幕上台 */
  screenShareInfo: Record<string, any>;
  /** 能量果数量 */
  starCount: Record<string, any>;
  /** 学生能力集合 */
  abilityMap: Record<string, any>;
  /** 学生上台场景 */
  upStairState: Record<string, any>;
  /**  */
  hasFullStatir: boolean | string;
  /** 是否显示上台区域 */
  showUpStairArea: boolean;
  /** 显示所有网络状态 */
  showAllNetStats: boolean;
  /** 聊天室显隐 消息弹幕开关 */
  messageState: {
    showChat: boolean;
    showPop: boolean;
  };
  /** 在线工单状态 */
  helpStatus: {
    abnormalUsers: any[];
    state: number;
  };
  /** 老师私有状态 */
  cacheTchOpt: Record<string, any>;
  /** 老师随机选人状态 */
  classToolStatus: 'randomSelect' | 'answerTool' | '';
  classToolUuid: string;
}

export interface IRoomStateAction {
  setLockScreenStatus: (payload: boolean) => IRoomState;
  setRoomState: (payload: any) => IRoomState;
  setStarCounts: (payload: IRoomState['starCount']) => IRoomState;
  setAbilityMap: (payload: IRoomState['abilityMap']) => IRoomState;
  setOnlineRoles: (payload: any) => IRoomState;
  setUploadBtnStat: (payload: boolean) => IRoomState;
  setChannel: (payload: IRoomState['channel']) => IRoomState;
  setScreenShare: (payload: any) => IRoomState;
  updateStudentInfo: (payload: any) => IRoomState;
  setDrawStats: (payload: { userId: string | number; drawabled: boolean }) => IRoomState;
  setMuteStats: (payload: { userId: string | number; muted: boolean }) => IRoomState;
  setPrivateVoice: (payload: any) => IRoomState;
  setUpStairState: (payload: any) => IRoomState;
  setUpStairList: (payload: any) => IRoomState;
  setUpStairAreaVisible: (payload: boolean) => IRoomState;
  setAllNetStats: (payload: IRoomState['showAllNetStats']) => IRoomState;
  setMessageState: (payload: Partial<IRoomState['messageState']>) => IRoomState;
  setHelpStatus: (payload: any) => IRoomState;
  setCacheTchOpt: (payload: any) => IRoomState;
  setClassToolStatus: (payload: any) => IRoomState;
  setClassToolUuid: (payload: any) => IRoomState;
}

/**
 * 课堂内相关状态
 */
const roomStateStore = State<IRoomStateAction, IRoomState>('roomState', {
  // Initial State
  initial: {
    lockScreenStatus: false, // 屏幕锁定
    samllUpStairId: '', // 上台学生
    onlineRoles: [{}, {}], //自己, 学生
    hideUploadBtn: false, // 隐藏上传课件按钮
    drawStudents: {}, // 画笔状态
    mutedStudents: {}, // 学生音频状态
    fullScreenId: '',
    isFullScreen: false, // 是否全屏上台
    channel: null, // 通道情况
    screenShareInfo: {}, //学生屏幕上台
    starCount: {}, // 能量果数量
    abilityMap: {
      // 学生能力集合
      batchGiveGood: [],
      shareScreen: [],
      privateChat: [],
    },
    // 学生上台场景
    upStairState: {},
    hasFullStatir: '',
    showUpStairArea: false, //是否显示上台区域
    showAllNetStats: false, // 显示所有网络状态
    // 聊天室显隐 消息弹幕开关
    messageState: {
      showChat: false,
      showPop: true,
    },
    // 在线工单状态
    helpStatus: {
      abnormalUsers: [],
      state: 0,
    },
    // 老师私有状态
    cacheTchOpt: {},
    // 老师课堂工具状态
    classToolStatus: '',
    // 抢答器socket uuid
    classToolUuid: '',
  },
  /**
   * 设置屏幕锁定
   */
  setLockScreenStatus(state, payload) {
    return {
      ...state,
      lockScreenStatus: !!payload,
    };
  },
  /**
   *
   * socket get state 信息同步
   * @returns
   */
  setRoomState(state, payload) {
    const { teacher, drawStudentsUserId = {}, mutedStudentsUserId = {} } = payload || {};
    return {
      ...state,
      drawStudents: {
        ...state.drawStudents,
        ...drawStudentsUserId,
      },
      mutedStudents: {
        ...state.mutedStudents,
        ...mutedStudentsUserId,
      },
      cacheTchOpt: teacher,
    };
  },
  /**
   * 设置点赞
   * @param state
   */
  setStarCounts(state, payload) {
    return {
      ...state,
      starCount: {
        ...state.starCount,
        ...payload,
      },
    };
  },
  /**
   * 学生能力集
   */
  setAbilityMap(state, payload) {
    return {
      ...state,
      abilityMap: {
        ...state.abilityMap,
        ...payload,
      },
    };
  },
  /**
   *设置在线用户信息
   *
   * @returns
   */
  setOnlineRoles(state, payload) {
    const { teacher = {}, students = {} } = payload;
    const [_teacher, _students] = state.onlineRoles;
    return {
      ...state,
      onlineRoles: [
        {
          ..._teacher,
          ...teacher,
        },
        {
          ..._students,
          ...students,
        },
      ],
    };
  },
  setUploadBtnStat(state, payload) {
    return {
      ...state,
      hideUploadBtn: payload,
    };
  },
  /**
   * 课程通道设置
   */
  setChannel(state, payload) {
    return {
      ...state,
      channel: payload,
    };
  },
  /**
   * 学生屏幕上台
   */
  setScreenShare(state, payload) {
    const { userId } = payload;
    if (!userId) {
      return {
        ...state,
      };
    }
    const [, _students] = state.onlineRoles;
    const stu = _students[userId];
    return {
      ...state,
      screenShareInfo: {
        ...payload,
        userId,
        userName: stu.name,
      },
    };
  },
  /**
   * 更新学生相关信息
   */
  updateStudentInfo(state, payload) {
    const { userId, ...rest } = payload;
    const [teacher, students] = state.onlineRoles;
    return {
      ...state,
      onlineRoles: [
        teacher,
        {
          ...students,
          [userId]: {
            ...students[userId],
            ...rest,
          },
        },
      ],
    };
  },
  /**
   * 学生画笔权限
   */
  setDrawStats(state, payload) {
    const { userId, drawabled } = payload;
    return {
      ...state,
      drawStudents: {
        ...state.drawStudents,
        [userId]: !!drawabled,
      },
    };
  },
  /**
   * 学生麦克风权限
   */
  setMuteStats(state, payload) {
    const { userId, muted } = payload;
    return {
      ...state,
      mutedStudents: {
        ...state.mutedStudents,
        [userId]: muted,
      },
    };
  },
  /**
   * 私聊学生
   * @param {number} userId
   * @param {string} chatState // ['start', 'end']
   */
  setPrivateVoice(state, payload) {
    const { userId, chatState } = payload;
    return {
      ...state,
      privateVoiceId: chatState === 'start' ? userId : '',
      mutedStudents: {
        ...state.mutedStudents,
        [userId]: chatState === 'start' ? false : state.mutedStudents[userId],
      },
    };
  },
  /**
   * 设置屏幕上台
   */
  setUpStairState(state, payload) {
    const { userId, isdelete = false, ...rest } = payload;
    const nowStairs = rest.type === 'full' ? {} : state.upStairState;
    if (isdelete) {
      delete state.upStairState[userId];
      return {
        ...state,
        hasFullStatir: false,
        upStairState: {
          ...state.upStairState,
        },
      };
    }
    return {
      ...state,
      hasFullStatir: rest.type === 'full',
      upStairState: {
        ...nowStairs,
        [userId]: {
          userId,
          ...state.upStairState[userId],
          ...rest,
        },
      },
    };
  },
  /**
   * 设置屏幕上台初始化
   */
  setUpStairList(state, payload) {
    const { isdelete = false, ...rest } = payload;
    if (isdelete) {
      return {
        ...state,
        upStairState: {},
      };
    }
    return {
      ...state,
      upStairState: {
        ...state.upStairState,
        ...rest,
      },
    };
  },
  /**
   * 显示上台区域
   */
  setUpStairAreaVisible(state, payload) {
    return {
      ...state,
      showUpStairArea: payload,
    };
  },
  /**
   * 显示网络返回
   */
  setAllNetStats(state, payload) {
    return {
      ...state,
      showAllNetStats: payload,
    };
  },
  /**
   * 是否未读 气泡开关
   */
  setMessageState(state, payload) {
    return {
      ...state,
      messageState: { ...state.messageState, ...payload },
    };
  },
  /**
   * 在线帮助
   * @param state
   * @param payload
   */
  setHelpStatus(state, payload) {
    const { abnormalUsers, state: helpStatus, userMobile } = payload;
    return {
      ...state,
      helpStatus: {
        ...state.helpStatus,
        abnormalUsers,
        state: helpStatus,
        userMobile,
      },
    };
  },
  /**
   * set state 老师操作缓存
   * @param state
   * @param payload
   */
  setCacheTchOpt(state, payload) {
    return {
      ...state,
      cacheTchOpt: {
        ...state.cacheTchOpt,
        ...payload,
      },
    };
  },
  /**
   * 设置随机选人打开
   * @param state
   * @param payload
   */
  setClassToolStatus(state, payload) {
    return {
      ...state,
      classToolStatus: payload,
    };
  },
  /**
   * 设置随机选人打开
   * @param state
   * @param payload
   */
  setClassToolUuid(state, payload) {
    return {
      ...state,
      classToolUuid: payload,
    };
  },
});

export default roomStateStore;
