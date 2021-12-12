import { getRemote } from './native-helper';
/**
 * 获取设备编号，使用第三方模块，缓存获取的数
 */
export const getNativeAddress = (function() {
	let nativeAddress;
	return () => {
		if (!nativeAddress) {
			try {
				// eslint-disable-next-line global-require
				nativeAddress = getRemote()
					.require('node-machine-id')
					.machineIdSync();
			} catch (e) {
				nativeAddress = 'web';
			}
		}
		return nativeAddress;
	};
})();

/**
 * 获取系统cpu使用情况
 */
export const getCpuInfo = () => {
	const remote = getRemote();
	if (!remote) return;
	const cpus = remote.require('os').cpus();
	let total = 0;
	let idle = 0;
	for (let i = 0; i < cpus.length; i++) {
		const { times } = cpus[i];
		for (const key in times) {
			if ({}.hasOwnProperty.call(times, key)) {
				if (key === 'idle') {
					idle += times[key];
				}
				total += times[key];
			}
		}
	}
	return {
		total,
		idle
	};
};
