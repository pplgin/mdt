/**
 * 生成VideoUid
 *
 * @export
 * @param {*} mobile
 * @returns
 */
export function genVideoUid(mobile) {
	if (!mobile) return '';
	let uid = mobile % 1000000000;
	if (uid < 100000000) uid += 100000000;
	return uid;
}
