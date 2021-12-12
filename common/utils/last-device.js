export function getLastDevice() {
  return JSON.parse(window.localStorage.getItem('lastDeviceInfo') || '{}');
}

export function removeLastDevice(type) {
  const lastDeviceInfo = getLastDevice();
  lastDeviceInfo[`cur${type}`] = null;
  window.localStorage.setItem('lastDeviceInfo', JSON.stringify(lastDeviceInfo));
}

/**
 *
 * @param {String} type : 'video''voice''speaker'
 * @param {Array} devices
 */
export function getLastOrCurDevice(type, devices) {
  const lastDeviceInfo = getLastDevice();
  const lastDevice = lastDeviceInfo[`cur${type}`] || {};
  const lastInCurDevice = devices.find((d) => d.id === lastDevice.id);
  if (lastInCurDevice) {
    return lastInCurDevice;
  }
  removeLastDevice(type);
  return devices[0] || {};
}

/**
 *
 * @param {String} type : 'video''voice''speaker'
 * @param {String} deviceid
 */
export function saveLastDevice(type, deviceid) {
  const lastDeviceInfo = getLastDevice();
  lastDeviceInfo[`cur${type}`] = Object.assign(lastDeviceInfo[`cur${type}`] || {}, { id: deviceid });
  window.localStorage.setItem('lastDeviceInfo', JSON.stringify(lastDeviceInfo));
}
