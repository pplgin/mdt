import { State } from 'jumpstate';

export interface IUserAction {
  setUserInfo: (payload: any) => IUserAction;
}

/**
 * 用户信息相关
 */
const userStore = State<IUserAction, Partial<IUserProps>>('user', {
  initial: {},
  /**
   * 更新课件
   * @param  {[type]} state [description]
   */
  setUserInfo(state, payload) {
    return {
      ...state,
      ...payload,
    };
  },
});

export default userStore;
