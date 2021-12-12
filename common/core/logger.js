// LEVEL 颜色MAP
const COLORS = {
	log: '#696969',
	debug: '#00f',
	info: '#2b8ec3',
	warn: '#ff932d',
	error: '#f00'
};

function pad(number, zeros) {
	zeros = zeros || 2;
	return (new Array(zeros + 1).join('0') + number).substr(-zeros, zeros);
}

/**
 * 记录日志
 */
class Logger {
	constructor(namespace = 'global') {
		this.namespace = `kid:${namespace}`;
	}

	/**
	 * 关闭LOG
	 *
	 * @static
	 */
	static switchOff() {
		Logger.enable = false;
	}

	/**
	 * 打开LOG
	 *
	 * @static
	 */
	static switchOn() {
		Logger.enable = true;
	}

	/**
	 * 实例Logger对象
	 */
	static factory(namespace) {
		return new Logger(namespace);
	}

	/**
	 *记录日志
	 *
	 * @param {string} [level='log']
	 * @param {*} args
	 */
	_stdout(level = 'log', ...args) {
		const style = `background:${COLORS[level]};font-weight:400;color:#fff;`;
		window.console[level](`%c[${level.toUpperCase()}][${this.namespace.toUpperCase()}]`, style, ...args);
	}

	format() {
		const date = new Date();
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
			date.getSeconds()
		)}`;
	}

	log(...args) {
		this._stdout('log', ...args);
	}

	debug(...args) {
		this._stdout('debug', ...args);
	}

	info(...args) {
		this._stdout('info', ...args);
	}

	error(...args) {
		this._stdout('error', ...args);
	}

	warn(...args) {
		this._stdout('warn', ...args);
	}
}

if (process.env.NODE_ENV === 'development') {
	window.Logger = Logger;
}

export default Logger;
