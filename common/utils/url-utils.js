const ARGS_REG = /(\?.*(?:$))/;

/**
 * 处理url相关
 */
export const jsonToUrlParams = data =>
  Object.keys(data)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&');

/* 获取url参数 */
export function getQueryString(name, url) {
  const argsStr = (url || window.location.href).match(ARGS_REG);
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const res = argsStr ? argsStr[1].substr(1).match(reg) : null;

  if (res != null) {
    return window.decodeURIComponent(res[2]);
  }

  return null;
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}
