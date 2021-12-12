const BUILD_TYPE = process.env.BUILD_TYPE;
const FETCH_URI = {
  test: 'https://test-chat.zhangmenkid.com',
  uat: 'https://chat-kids.uat.zmops.cc',
  prod: 'https://chat.zhangmenkid.com',
};

/**
 *获取当前原生平台
 */
export function getPlatform() {
  return window.process ? window.process.platform : 'web';
}

/**
 *是否是Mac OS
 *
 */
export function isMac() {
  return getPlatform() === 'darwin';
}

const electron = (() => {
  try {
    const _electron = window.require('electron');
    // 静止页面缩放
    if (isMac()) {
      _electron.webFrame && _electron.webFrame.setVisualZoomLevelLimits(1, 1);
    }
    return _electron;
  } catch (e) {
    return null;
  }
})();

export default electron;

/**
 *获取electron
 */
export function getRemote() {
  if (electron && electron.remote) {
    return electron.remote;
  }
  return null;
}

/**
 *获取electron的管理器
 *
 * @returns
 */
export function getWinManager() {
  const remote = getRemote();
  if (remote) {
    return remote.require('./core/window-manager');
  }
  return null;
}

/**
 * 获取当前窗口
 */
export function getCurrentWin() {
  const remote = getRemote();
  if (remote) {
    return remote.getCurrentWindow();
  }
  return null;
}

/**
 *是否是windows环境
 *
 */
export function isWin() {
  return getPlatform() === 'win32';
}

/**
 *是否是web
 */
export function isWeb() {
  return getPlatform() === 'web';
}

/**
 *
 * @param {string} href
 * @returns {promise}
 *
 * 用系统浏览器打开网页
 */
export function openInBrowser(href) {
  return electron.shell.openExternal(href);
}

/**
 *关闭当前窗口
 */
export function closeNativeWin(winName = '') {
  window.onbeforeunload = null;
  getWinManager().close(winName);
}

/**
 * 获取设备版本号
 * @export
 * @returns
 */
export function getClientVersion() {
  try {
    const remote = getRemote();
    if (!remote) return '0.0.0';
    return remote.app.getVersion();
  } catch (error) {
    return '0.0.0';
  }
}

/**
 * 获取设备信息
 */
export function getSystemInfo() {
  const DeviceTypeEnmu = {
    darwin: 'MacOS',
    win32: 'Windows',
  };

  /**
   * 获取显卡信息
   */
  function getDiscard() {
    const canvas = document.createElement('canvas'),
      gl = canvas.getContext('experimental-webgl'),
      debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  }
  try {
    const discard = getDiscard();
    const os = window.require('os');
    const cpus = os.cpus();
    const memory = os.totalmem() / 1024 / 1024 / 1024;
    return {
      cpu: cpus.length >= 1 ? cpus[0].model : '未知cpu型号',
      memory: `${memory} G`,
      os: {
        name: `${DeviceTypeEnmu[os.platform()]}`,
        version: os.release(),
      },
      discard,
    };
  } catch (error) {
    return window.navigator.userAgent.toString();
  }
}

export function md5(str) {
  if (isWeb()) return;
  const crypto = window.require('crypto');
  const md5 = crypto.createHash('md5');
  return md5.update(str).digest('hex');
}

/**
 * 获取文件
 */
export function getFile(filePath) {
  if (isWeb() || !filePath) return Promise.reject('not supported!');
  const fs = window.require('fs');
  const isExists = fs.existsSync(filePath);

  if (!isExists) return Promise.reject('not existed!');

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

/**
 * 删除文件
 */
export function deleteFile(filePath) {
  if (isWeb() || !filePath) return;
  const fs = window.require('fs');
  const isExists = fs.existsSync(filePath);
  if (!isExists) return;

  if (fs.lstatSync(filePath).isDirectory()) {
    fs.readdirSync(filePath).forEach((file) => {
      const curPath = `${filePath}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        return deleteFile(curPath);
      }
      fs.unlinkSync(curPath);
    });
    fs.rmdirSync(filePath);
    return;
  }
  fs.unlinkSync(filePath);
}

/**
 * 异步地、递归地删除文件夹及其内容
 */
export function rmdir(dir) {
  if (isWeb() || !dir) return;
  const fs = window.require('fs');
  const path = window.require('path');

  return new Promise(function (resolve, reject) {
    fs.stat(dir, function (err, stat) {
      if (err) return reject(err);
      if (stat.isDirectory()) {
        fs.readdir(dir, function (err, files) {
          if (err) return resolve();
          files = files.map((file) => path.join(dir, file));
          files = files.map((file) => rmdir(file));
          Promise.all(files).then(function () {
            fs.rmdir(dir, resolve);
          });
        });
      } else {
        fs.unlink(dir, resolve);
      }
    });
  });
}

let userDataDir = '';

/** 获取 userData 目录路径 */
export function getUserDataPath(...fileOrDir) {
  const path = window.require('path');
  if (!userDataDir) {
    userDataDir = getRemote().app.getPath('userData');
  }
  return path.resolve(userDataDir, ...fileOrDir);
}

/**
 * 获取音视频日志地址
 * @param {*} logpath
 */
export function getLogsPath(logpath) {
  try {
    if (!logpath) return;
    const fs = window.require('fs');
    if (!fs.existsSync(logpath)) {
      fs.mkdirSync(logpath);
    }
    return logpath;
  } catch (error) {
    return null;
  }
}

// 新窗口通用
export function createNewWin(name, options) {
  const windowManager = getWinManager();
  let newClassRoomWin = windowManager.get(name);
  if (!newClassRoomWin) {
    newClassRoomWin = windowManager.createNew(name, '', options.url, false, {
      width: options.width,
      height: options.height,
      minimizable: options.ismin,
      maximizable: options.ismax,
      resizable: options.isresize,
      backgroundColor: '#2e2c29',
      webPreferences: {
        webSecurity: false,
        ...(options.webPreferences || {}),
      },
    });
    newClassRoomWin.open();
    newClassRoomWin.focus();
  }
  newClassRoomWin.open();
  newClassRoomWin.focus();
  return newClassRoomWin;
}

/** 获取贴纸所在目录 */
export function getStickerDir(options) {
  options = options || {};
  // TODO
  const dir = options.dir || `app/plugins/fu-${isMac() ? 'mac/Resources' : 'win/assets'}`;
  if (options.isAbsolute) {
    const path = window.require('path');
    return path.resolve(window.process.resourcesPath, dir);
  }
  return dir;
}

/**
 * 获取设备ID
 */
export function getDeviceId() {
  try {
    const remote = getRemote();
    if (!remote) return '';
    const config = remote.require('./config') || {};
    return config.deviceId;
  } catch (e) {
    return '';
  }
}

/**
 * 获取文件
 * @param {*} filePath
 */
export function getResourcePath(filePath) {
  const path = window.require('path');
  const fs = window.require('fs');
  const file = path.resolve(window.process.resourcesPath, filePath);

  if (fs.existsSync(file)) {
    return file;
  }
  return null;
}

/**
 * electron 崩溃日志
 */
export function crashReporter() {
  const { crashReporter } = window.require('electron');

  crashReporter.start({
    companyName: 'zhangmenkid',
    submitURL: `${FETCH_URI[BUILD_TYPE]}/napi/crash/post`,
    uploadToServer: true,
    extra: {
      deviceId: getDeviceId(),
    },
  });
}
