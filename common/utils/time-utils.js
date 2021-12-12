/*eslint-disable */

/**
 * 计时器
 * @param {Funciton} fn 执行函数
 * @param {Number} delay  延迟时间ms
 */
export const animationTimer = (fn, delay) => {
	let timer = requestAnimationFrame(fnLoop);
	let sTime = null;
	async function fnLoop(timeStamp) {
		let ret = true; // 是否继续
		if (!sTime || timeStamp - sTime > delay) {
			sTime = timeStamp;
			ret = await fn();
		}
		// 取消之前的timer对象 避免内存泄露
		cancelAnimationFrame(timer);
		if (ret) {
			timer = requestAnimationFrame(fnLoop);
		}
	}
	return () => timer;
};

/**
 *时间格式化
 * @export
 * @param {*} datetime
 * @param {*} format
 * @returns
 */
export function formatDate(datetime, format) {
	if (!format) format = 'YYYY-MM-DD HH:mm';
	if (typeof datetime == 'string') {
		datetime = datetime.replace(/\-/g, '/');
		datetime = new Date(datetime);
	} else if (typeof datetime == 'number') {
		datetime = new Date(datetime);
	} else if (!(datetime instanceof Date)) {
		datetime = new Date();
	}

	var week = ['日', '一', '二', '三', '四', '五', '六'];
	return format.replace(/YYYY|YY|MM|DD|HH|hh|mm|SS|ss|week/g, function(key) {
		switch (key) {
			case 'YYYY':
				return datetime.getFullYear();
			case 'YY':
				return (datetime.getFullYear() + '').slice(2);
			case 'MM':
				return datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
			case 'DD':
				return datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
			case 'HH':
			case 'hh':
				return datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
			case 'mm':
				return datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
			case 'SS':
			case 'ss':
				return datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
			case 'week':
				return week[datetime.getDay()];
		}
	});
}

/**
 *计算剩余时间
 */
export function countTime(remainingTime) {
	const _type = remainingTime > 0 ? '' : '-';
	if (remainingTime < 0) {
		remainingTime = -remainingTime;
	}
	const time = remainingTime / 1000;
	const days = Math.floor(time / (24 * 3600));
	const hours = Math.floor((time - 24 * 3600 * days) / 3600);
	const minutes = Math.floor((time - 24 * 3600 * days - hours * 3600) / 60);
	const seconds = Math.floor(time - 24 * 3600 * days - hours * 3600 - minutes * 60);
	function leftPad(i) {
		if (i >= 10) {
			return i.toString();
		}
		return `0${i === 0 ? 0 : i}`;
	}
	return {
		_type,
		hours: leftPad(hours),
		minutes: leftPad(minutes),
		seconds: leftPad(seconds)
	};
}
