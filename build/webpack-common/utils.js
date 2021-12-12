/**
 * 格式化时间
 * @param {日期} datetime
 * @param {规则} format
 */
function formatDate(datetime, format) {
	if (!format) format = 'YYYYMMDDHHmm';
	if (typeof datetime == 'string') {
		datetime = datetime.replace(/\-/g, '/');
		datetime = new Date(datetime);
	} else if (typeof datetime == 'number') {
		datetime = new Date(datetime);
	} else if (!(datetime instanceof Date)) {
		datetime = new Date();
	}
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
		}
	});
}

/**
 * 生成Prefix
 * @param {*} appId
 * @param {*} env
 */
const generateKey = (appId, env) => {
	return `${appId}/${env}/${formatDate(new Date())}/`;
};

// guid
const uuid = key =>
	`${key}.${Math.random()
		.toString(36)
		.substr(2, 9)}`;

module.exports = {
	generateKey,
	uuid
};
