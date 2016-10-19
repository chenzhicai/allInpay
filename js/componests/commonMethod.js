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
