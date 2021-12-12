/**
 * merge两个对象
 *
 * @export
 * @param {*} target
 * @param {*} source
 * @returns
 */
export function objectMerge(target, source) {
	if (typeof target !== 'object') {
		target = {};
	}
	if (Array.isArray(source)) {
		return source.slice();
	}
	Object.keys(source).forEach(property => {
		const sourceProperty = source[property];
		if (typeof sourceProperty === 'object') {
			target[property] = objectMerge(target[property], sourceProperty);
		} else {
			target[property] = sourceProperty;
		}
	});
	return target;
}
