//查看卡内余额
function selectBalance(e) {
    var balanceHTML = '<p>您的卡内余额：' + 200.00 + '元</p>';
    $('#aboutMoal h4').text("查看卡内余额");
    $('#aboutMoal .modal-body').html(balanceHTML);
    $('#aboutMoal modal-footer > button').text('确定');
    $('#aboutMoal').modal('show');
}

// 隐藏标签
function addClassHide(selectors) {
    for (var i = 0, l = selectors.length; i < l; i++) {
        $(selectors[i]).addClass("hide");
    }
}

/* 支付请求等待提示 */
function showZhifuTishi() {
    addClassHide(["#cardInfo", "#paySucceed", "#countBox"]);
    $('#zhifuzhongtishu').removeClass("hide");
}

// 显示卡信息
function showCardInfo() {
    addClassHide(["#zhifuzhongtishu", "#paySucceed", "#countBox"]);
    $("#cardInfo").removeClass("hide");

}

// 显示测算栏
function showCountBox() {
    addClassHide(["#zhifuzhongtishu", "#paySucceed", "#cardInfo"]);
    $("#countBox").removeClass("hide");
}

/* 支付成功 */
function showPaySucceed(payNum) {
    addClassHide(["#zhifuzhongtishu", "#cardInfo", "#countBox"]);
    $('#paySucceed').removeClass('hide');
    $('.cardInfo-header .badge').addClass('checked');
    countdownFun();
}

/* 设置成功提示 */
function setSucceedContent() {
    var scUrl = $("#urlrerurn").val();
    if (scUrl == "null" || scUrl == "") {
        $("#paySucceed p:gt(0)").hide();
    }
    $("#paySucceed .icon-fail").removeClass("icon-fail").addClass("icon-chenggong");
//    $("#paySucceedNum").text($("#countMoney").text());
    $("#payFinally").text("您已成功付款");
    $("#payFinally+span").show();
    showPaySucceed();
}
/* 设置失败提示 */
function setFailContent() {
    $("#paySucceed .icon-chenggong").removeClass("icon-chenggong").addClass("icon-fail");
    $("#payFinally").text("支付失败");
    $("#payFinally+span").hide();
    showPaySucceed();
}

// 点亮前两步骤图标
function addBadgeChecked(stepNum) {
    $badge = $('.cardInfo-header .badge');
    for (var i = 0, l = $badge.length; i < l; i++) {
        if (i < stepNum) {
            $($badge[i]).addClass("checked");
        } else {
            $($badge[i]).removeClass("checked");
        }
    }
}

// 倒计时
function countdownFun(argument) {
    var cardNum = 10;
    var setIntervalObje = setInterval(function cd10() {
        cardNum--;
        $('#countdown10').text(cardNum);
        if (cardNum == 0) {
            location.href = $("#paySucceed a").attr("href");
            clearInterval(setIntervalObje);
            var scUrl = $("#urlrerurn").val();
            if (scUrl && scUrl != "null" && scUrl != "") {
              location.href = $("#urlrerurn").val();  
            }
            
        };
    }, 1000)
}

/* 展示错误提示框 */
function showErroPrompt(msg) {
    var promptHTML = '<p>' + msg + '</p>';

    $('#aboutMoal h4').text("提示");
    $('#aboutMoal .modal-body').html(promptHTML);
    $('#aboutMoal modal-footer > button').text('确定');
    $('#aboutMoal').modal('show');

}

/* 输入框输入去掉提示颜色 */
function changeInputColor($input) {
    if ($input.val() != "") {
        $input.removeClass("tishu-color9");
    }
}

// 初始化格式
function initSpace() {
    if ($("#creditCard").val() != "") {
        spaceCardNum();
    }
    if ($("#userId").val() != "") {
        spaceuserId($("#userId"));
    }
    if ($("#userPhone").val() != "") {
        spacePhoneNum($("#userPhone"));
    }
}


/* 间隔信用卡号 */
function spaceCardNum() {
    $creditCard = $("#creditCard"),
        creditCardVal = $creditCard.val(),
        needCardVal = $creditCard.val().replace(/ /g, "");
    if (needCardVal.length > 4 && needCardVal.length < 9) {
        creditCardVal = needCardVal.substr(0, 4) + "  " + needCardVal.substr(4);
        $creditCard.val(creditCardVal);
    } else if (needCardVal.length > 8 && needCardVal.length < 13) {
        creditCardVal = needCardVal.substr(0, 4) + "  " + needCardVal.substr(4, 4) + "  " + needCardVal.substr(8);
        $creditCard.val(creditCardVal);
    } else if (needCardVal.length > 13 && needCardVal.length < 17) {
        creditCardVal = needCardVal.substr(0, 4) + "  " + needCardVal.substr(4, 4) + "  " + needCardVal.substr(8, 4) + "  " + needCardVal.substr(12);
        $creditCard.val(creditCardVal);
    }

}

/* 间隔身份证号 */
function spaceuserId($userId) {
    var userIdVal = $userId.val(),
        needUserIdVal = $userId.val().replace(/ /g, "");
    if (needUserIdVal.length > 7 && needUserIdVal.length < 15) {
        userIdVal = needUserIdVal.substr(0, 6) + "  " + needUserIdVal.substr(6);
        $userId.val(userIdVal);
    } else if (needUserIdVal.length > 14) {
        userIdVal = needUserIdVal.substr(0, 6) + "  " + needUserIdVal.substr(6, 8) + "  " + needUserIdVal.substr(14);
        $userId.val(userIdVal);
    }

}

/* 间隔手机号 */
function spacePhoneNum($userPhone) {
    var userPhoneVal = $userPhone.val(),
        needPhoneVal = $userPhone.val().replace(/ /g, "");
    if (needPhoneVal.length > 3 && needPhoneVal.length < 9) {
        userPhoneVal = needPhoneVal.substr(0, 3) + "  " + needPhoneVal.substr(3);

    } else if (needPhoneVal.length > 8) {
        userPhoneVal = needPhoneVal.substr(0, 3) + "  " + needPhoneVal.substr(3, 4) + "  " + needPhoneVal.substr(7);
    }
    $userPhone.val(userPhoneVal);
}

// 初始化提示插件
function initValidform() {
    return $(".demoform").Validform({
        tiptype: 2,
        datatype: {
            "zh2-15": /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,8}$/,
            "xk16": /[0-9]{4}\s\s[0-9]{4}\s\s[0-9]{4}\s\s[0-9]{4}$/,
            "sfz": /[0-9]{6}\s\s[0-9]{8}\s\s[0-9]{3}[0-9Xx]$|[0-9]{6}\s\s[0-9]{8}\s\s[0-9]{1}$/,
            "sjh": /[0-9]{3}\s\s[0-9]{4}\s\s[0-9]{4}$/
        }
    });
}

// 实例化日历控件
function setDatetimepicker() {
    $.fn.datetimepicker.dates['zh'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        meridiem: ["上午", "下午"],
        //suffix:      ["st", "nd", "rd", "th"],  
        today: "今天"
    };


    var $datePicker = $('.form_month').datetimepicker({
        //        language: 'fr',
        language: 'zh',
        weekStart: 1,
        autoclose: 1,
        startView: 3,
        minView: 3,
        forceParse: 0
    });
    return $datePicker;
}



/* 设置订单信息 
function setOrderIfo(orderIfo) {
    if (orderIfo.payments) { // 订单金额
        $("#totalNum").text(orderIfo.payments + '元');
    }
    if (orderIfo.orderNum) { // 订单号
        $("#orderNum").text(orderIfo.orderNum);
    }
    if (orderIfo.orderTime) { // 订单时间
        $("#payDate").text(orderIfo.orderTime);
    }
    if (orderIfo.commodityName) { // 订单时间
        $("#commodityName").text(orderIfo.commodityName);       
    }
}
*/
// 不打包形式  要加载requrie.js
/*require.register("../views/paymentView.js", function(module, exports, require) {
    module.exports = {
        selectBalance: selectBalance,
        showZhifuTishi: showZhifuTishi,
        showCardInfo: showCardInfo,
        showPaySucceed: showPaySucceed,
        showErroPrompt: showErroPrompt,
        changeInputColor: changeInputColor,
        setSucceedContent: setSucceedContent,
        setFailContent: setFailContent
            // setOrderIfo: setOrderIfo
    };
});
*/

// 打包形式
module.exports = {
    selectBalance: selectBalance,
    showCountBox: showCountBox,
    showZhifuTishi: showZhifuTishi,
    showCardInfo: showCardInfo,
    showPaySucceed: showPaySucceed,
    showErroPrompt: showErroPrompt,
    changeInputColor: changeInputColor,
    setSucceedContent: setSucceedContent,
    setFailContent: setFailContent,
    addBadgeChecked: addBadgeChecked,
    spaceCardNum: spaceCardNum,
    spaceuserId: spaceuserId,
    spacePhoneNum: spacePhoneNum,
    initValidform: initValidform,
    setDatetimepicker: setDatetimepicker,
    initSpace: initSpace
}