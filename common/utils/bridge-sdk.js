import electron, { getClientVersion } from './native-helper';
import semver from 'semver';

const BridgeSDK = {
  /**
   *同步触发
   *
   * @param {*} method 方法名
   * @param {*} params 参数
   */
  invokeSync(method, params) {
    if (!electron || !electron.ipcRenderer) return;
    return electron.ipcRenderer.sendSync(method, params);
  },
  /**
   *获取全局内容
   *
   * @param {*} name
   */
  getGlobal(name) {
    const remote = electron.remote;
    if (!remote) return null;
    return remote.getGlobal(name);
  },
  /**
   * 获取日志
   */
  getLogs(path) {
    if (!electron || !electron.ipcRenderer) return Promise.reject('not supported!');
    return new Promise((resolve, reject) => {
      const clientVersion = getClientVersion();
      if (semver.lt(clientVersion, '3.0.1')) {
        reject('not supported!');
        return;
      }
      // 超时逻辑
      const timer = setTimeout(() => reject('time out!'), 2000);
      //
      electron.ipcRenderer.on('getLogFiles-async', (e, res) => {
        clearTimeout(timer);
        resolve(res);
      });
      electron.ipcRenderer.send('getLogFiles', path);
    });
  }
};

if (process.env.NODE_ENV === 'development') {
  window.BridgeSDK = BridgeSDK;
}

export default BridgeSDK;
