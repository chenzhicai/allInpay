/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		2:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"installmentPayment","1":"prompt"}[chunkId]||chunkId) + ".min.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	// 获取url参数
	var QueryString = {
	    data: {},
	    Initial: function() {
	        var aPairs, aTmp;
	        var queryString = new String(window.location.search);
	        queryString = queryString.substr(1, queryString.length);
	        aPairs = queryString.split("&");
	        for (var i = 0; i < aPairs.length; i++) {
	            aTmp = aPairs[i].split("=");
	            this.data[aTmp[0]] = aTmp[1];
	        }
	    },
	    GetValue: function(key) {
	        return this.data[key];
	    }
	}


	function getUrlAjax(url, param, successCallBack,errorCallBack,isAsync) {
	    var isAsync = isAsync?isAsync:false;
	    $.ajax({
	        type: 'post',
	        dataType: "json",
	        url: url,
	        data: param,
	        cache: false,
	        async: isAsync,
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        success: successCallBack,
	        error: errorCallBack
	    });
	}

	// 转换时间格式 为2016-04-05 09:26:26
	function changeTimeFormat(cxinfo_trans_time) {
	    var trans_time = String(cxinfo_trans_time);
	    trans_time_year = trans_time.substr(0, 4),
	        trans_time_month = trans_time.substr(4, 2),
	        trans_time_date = trans_time.substr(6, 2),
	        trans_time_hour = trans_time.substr(8, 2),
	        trans_time_minutes = trans_time.substr(10, 2);
	    //       trans_time_seconds = trans_time.substr(12, 2);
	    var trans_time = trans_time_year + "-" + trans_time_month + "-" + trans_time_date + " " + trans_time_hour + ":" + trans_time_minutes;
	    return trans_time;
	}



	// 不打包形式  要加载requrie.js
	/*require.register("../componests/commonMethod.js", function(module, exports, require) {
	    module.exports = {
	        QueryString: QueryString,
	        changeTimeFormat: changeTimeFormat,
	        getUrlAjax: getUrlAjax
	    }
	});
	*/

	// 打包形式
	module.exports = {
	    QueryString: QueryString,
	    changeTimeFormat: changeTimeFormat,
	    getUrlAjax: getUrlAjax
	}


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	//JS操作cookies方法! 

	//写cookies 
	function setCookie(name, value) {
	    var Days = 30;
	    var exp = new Date();
	    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}

	//读取cookies 
	function getCookie(name) {
	    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	    if (arr = document.cookie.match(reg))

	        return unescape(arr[2]);
	    else
	        return null;
	}

	//删除cookies 
	function delCookie(name) {
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval = getCookie(name);
	    if (cval != null)
	        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}

	module.exports = {
	    setCookie: setCookie,
	    getCookie: getCookie,
	    delCookie: delCookie
	}

/***/ }
/******/ ]);