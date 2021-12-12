/**
 * 函数节流
 * @param {function} fn 待处理函数
 * @param {number} wait  延迟时间
 * @param {object} {leading：false}  表示禁用第一次执行
 *  @param {object} {trailing: false}  表示禁用停止触发的回调
 */
export const throttle = (func, wait, options) => {
  let timeout, context, args;
  let previous = 0;
  if (!options) options = {};

  const later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  const throttled = function(...args) {
    const now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };
  return throttled;
};

/**
 * 函数去抖
 * @param {function} fn 待处理函数
 * @param {number} wait  延迟时间
 */
export const debounce = (func, wait) => {
  let timeout;

  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timeout);
    }, wait);
  };
};
