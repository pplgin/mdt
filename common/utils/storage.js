/**
 * obj 转成字符串 写入local
 * @param {*} name
 * @param {*} obj
 */
export const setLocalStorageByName = (name, value) => {
  if (!name || !value) {
    console.warn(`name=${name}, value=${value};参数有错误`);
    return;
  }
  localStorage.setItem(name, JSON.stringify(value));
  return value;
};

/**
 * 根据 name 获取缓存字符串并转换成对象
 * @param {*} name
 */
export const getLocalStorageByName = (name) => {
  const shareData = localStorage.getItem(name);
  try {
    return JSON.parse(shareData);
  } catch (e) {
    return shareData;
  }
};
