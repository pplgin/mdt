/**
 * Created by johnnyjiang on 16/6/13.
 * 基础工具
 */
import $ from 'jquery';
const DtTools = {
	dtImageTrans: function(url, t, w, h, c) {
		var pathn = url.trim().replace(/^http(s)?:\/\//ig, ''),
			pathn = pathn.split('/'),
			domain = pathn[0],
			pathn = pathn[1];

		// 只有堆糖域名下 uploads misc 目录下的图片可以缩略
		if (domain.indexOf('duitang.com') == -1 || !pathn || pathn != 'uploads' &&
			pathn != 'misc') {
			return url;
		}
		if (t) {
			w = w || 0;
			h = h || 0;
			c = c ? '_' + c : ''
			return this.dtImageTrans(url).replace(/(\.[a-z_]+)$/ig, '.thumb.' + w +
				'_' + h + c + '$1')
		} else {
			return url.replace(/(?:\.thumb\.\w+|\.[a-z]+!\w+)(\.[a-z_]+)$/ig, '$1')
		}
	},
	dtParmas: function(obj) {
		var query = '',
			name, value, fullSubName, subName, subValue, innerObj, i;
		for (name in obj) {
			value = obj[name];

			if (value instanceof Array) {
				for (i = 0; i < value.length; ++i) {
					subValue = value[i];
					fullSubName = name + '[' + i + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			} else if (value instanceof Object) {
				for (subName in value) {
					subValue = value[subName];
					fullSubName = name + '[' + subName + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			} else if (value !== undefined && value !== null)
				query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
		}
		return query.length ? query.substr(0, query.length - 1) : query;
	},
	dtUriTrans: function(uri, data) {
		if (data == undefined) {
			return uri;
		} else {
			let uriParamArray = [];
			for (let key in data) {
				let a = `${key}=${data[key]}`;
				uriParamArray.push(a);
			}
			let uriParam = uriParamArray.join('&');
			let newUri = `${uri}?${uriParam}` || '';
			return newUri;
		}
	},
	dtFetch: function(_config) {
		let data = {
			credentials: 'include'
		};
		let _url;
		if (_config.type == undefined || _config.type === "GET") {
			// 绝对路径走绝对路径， 相对路径走后端配置路径
			_url = DtTools.dtUriTrans(_config.url, _config.data);
		} else if (_config.type === 'POST') {
			_url = _config.url;
			data = {
				credentials: 'include',
				method: 'post',
				headers: {
					'Accept': 'application/json,text/plain, */*',
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				body: DtTools.dtParmas(_config.data)
			}
		}
		return fetch(_url, data)
			.then(response =>
				response.json().then(json => ({
					json, response
				})))
			.then(({
				json, response
			}) => {
				if (!response.ok) {
					return Promise.reject(json)
				} else {
					return Promise.resolve(json)
				}
			})
	},
	/*
	@说明： trc打点
	*/
	gaq: function(trc) {
		// 新增堆糖内部打点 kibana
		typeof _gaq != "undefined" && _gaq && _gaq.push(['_trackPageview', trc]);
	},
	/*
	@说明： trace with pathname
	*/
	trace: function(action) {
		var path = window.location.pathname.replace(/^\/|\/$/ig, '');
		var patharr = path.split('/');
		var len = patharr.length;
		if (len > 1 && patharr[len - 2] && patharr[len - 1]) {
			var trc = '/_trc/' + patharr[len - 2] + '/' + patharr[len - 1] + '/' +
				action;
			typeof _gaq != "undefined" && _gaq && _gaq.push(['_trackPageview', trc]);
		}
	},
	/**
	 * [isDuiTang 判断是页面否在堆糖应用里打开]
	 * @return {Boolean} [true 是 false 否]
	 */
	isDuiTang: function() {
		let r = /(duitang)/ig;
		return this.testUa(r);
	},
	/**
	 * [isWeiXin 判断是页面否在微信应用里打开]
	 * @return {Boolean} [true 是 false 否]
	 */
	isWeiXin: function() {
		r = /(micromessenger)/ig;
		return this.testUa(r);
	},
	/**
	 * [isWeiBo 判断是页面否在微博应用里打开]
	 * @return {Boolean} [true 是 false 否]
	 */
	isWeiBo: function() {
		r = /(weibo)/ig;
		return this.testUa(r);
	},
	testUa: function(r) {
		var ua = navigator.userAgent.toString().toLowerCase();
		return r.test(ua) ? true : false;
	},
	getParams: function(url) {
		if (!url) url = window.location.href;
    let opts = {},name, value, i;
        url = url.split('#')[0];
    let idx = url.indexOf('?'),
        search = idx > -1 ? url.substr(idx + 1) : '',
        arrtmp = search.split('&');
    for (let i = 0; i < arrtmp.length; i++) {
      let paramCount = arrtmp[i].indexOf('=');
      if (paramCount > 0) {
        name = arrtmp[i].substring(0, paramCount);
        value = arrtmp[i].substr(paramCount + 1);
        try {
          if (value.indexOf('+') > -1) {
            value = value.replace(/\+/g, ' ');
          }
          opts[name] = decodeURIComponent(value);
        } catch (exp) {}
      }
    }
    return opts;
	},
	/**
	 * [getDownLoadUrl 获取堆糖应用下载地址]
	 * @return {[string]} [匹配系统后的下载地址]
	 */
	getDownLoadUrl: function() {
		var ua, url, wx, iphone, ipad;
		ua = navigator.userAgent.toString().toLowerCase();
		wx = /micromessenger/ig;
		iphone = /iphone/ig;
		ipad = /ipad/ig;
		url = (wx).test(ua) ?
			'http://a.app.qq.com/o/simple.jsp?pkgname=com.duitang.main&g_f=991653' : (
				ipad).test(ua) ? 'http://www.duitang.com/s/08d4835b6c9a1897' : (iphone).test(
				ua) ? 'http://www.duitang.com/s/0185422cf7e5ad4d4' :
			'http://www.duitang.com/s/197e276b5a50b08a';
		return url;
	},
	/**
	 * [scrollToAnchor 平滑滚动到指定的 anchor]
	 * @param  {[type]} anchor [description]
	 * @param  {[type]} diff   [description]
	 * @return {[type]}        [description]
	 */
	scrollToAnchor: function() {
		var diff = diff || 0,
			$W = $(window),
			$body = $('body,html'),
			$tohsh = $('a[name=' + anchor + ']');

		// 分页内容容器置空，先置空内容再做 anchor 定位
		if (anchor && $tohsh.length) {
			// 此处由于导航设置fix 跟随，需要额外减去70 的高度
			var at = $tohsh.offset().top - diff || 0;
			$body.animate({
				scrollTop: at
			}, 200);
		} else {
			// 除了ie6 其它浏览器不要设置默认回顶部，会造成切换时页面跳动
			// 这里用到了 ActiveXObject 和 XMLHttpRequest 对象来区分 ie6
			if (!!window.ActiveXObject && !window.XMLHttpRequest) {
				$body.animate({
					scrollTop: at
				}, 200);
			}
		}
	},
	timePattern: function(fml) {
		var nowTime = new Date().getTime();
		var lastTime = nowTime - fml * 1000;
		if (lastTime > 0) {
			var days = Math.floor(lastTime / 1000 / (60 * 60) / 24);
			var hours = Math.floor(lastTime / 1000 / (60 * 60) - 24 * days);
			var minutes = Math.floor((lastTime - (hours * 60 * 60 - days * 24 * 3600) *
				1000) / 1000000 / 60);
			return days + '天' + hours + '时' + minutes + '分';
		}
		return '';
	}
}

export default DtTools;
