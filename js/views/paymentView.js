//查看卡内余额
function selectBalance(e) {
    var balanceHTML = '<p>您的卡内余额：' + 200.00 + '元</p>';
    $('#aboutMoal h4').text("查看卡内余额");
    $('#aboutMoal .modal-body').html(balanceHTML);
    $('#aboutMoal modal-footer > button').text('确定');
    $('#aboutMoal').modal('show');
}

/* 支付请求等待提示 */
function showZhifuTishi() {
    $("#cardInfo").addClass("hide");
    $('#zhifuzhongtishu').removeClass("hide");
    $('#paySucceed').addClass('hide');
}

// 显示卡信息
function showCardInfo() {
    $("#cardInfo").removeClass("hide");
    $('#zhifuzhongtishu').addClass("hide");
    $('#paySucceed').addClass('hide');
}

/* 支付成功 */
function showPaySucceed(payNum) {
    $("#cardInfo").addClass("hide");
    $('#zhifuzhongtishu').addClass('hide');
    $('#paySucceed').removeClass('hide');
    $('.cardInfo-header .badge').addClass('checked');
    countdownFun();
}

/* 设置成功提示 */
function setSucceedContent() {
    var scUrl = $("#urlrerurn").val();
    if(scUrl == "null" || scUrl == ""){
        $("#paySucceed p:gt(0)").hide();
    }
    $("#paySucceed .icon-fail").removeClass("icon-fail").addClass("icon-chenggong");
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

// 倒计时
function countdownFun(argument) {
    var cardNum = 10;
    var setIntervalObje = setInterval(function cd10() {
        cardNum--;
        $('#countdown10').text(cardNum);
        if (cardNum == 0) {
            location.href = $("#paySucceed a").attr("href");
            clearInterval(setIntervalObje);
        };
    }, 1000)
}

/* 展示错误提示框 */
function showErroPrompt(promptCode) {
    var promptHTML = '';
    cardNum
    if (promptCode == "cardNum") {
        promptHTML = '<p>请输入正确卡号。</p>';
    } else if (promptCode == "cardPassword") {
        promptHTML = '<p>请输入6位密码。</p>';
    } else if (promptCode == "verifyCodeErro") {
        promptHTML = '<p>请输入4位验证码。</p>';
    } else if (promptCode == "1118") {
        promptHTML = '<p>卡号不存在，请重新输入。</p>';
    } else if (promptCode == "1041") {
        promptHTML = '<p>密码错误，请重新输入。</p>';

        //   $("#cardPassword").val("");
    } else if (promptCode == "60") {

    } else if (promptCode == "60") {
        promptHTML = '<p>验证码错误,请输入正确验证码</p>';
    } else if (promptCode == "1039") {
        promptHTML = '<p>密码超过日限制</p>';
    } else if (promptCode == "50") {
        promptHTML = '<p>单号不存在</p>';
    } else if (promptCode == "1073") {
        promptHTML = '<p>卡内余额不足，請充值</p>';
    }
    $('#aboutMoal h4').text("提示");
    $('#aboutMoal .modal-body').html(promptHTML);
    $('#aboutMoal modal-footer > button').text('确定');
    $('#aboutMoal').modal('show');
    $('#verifyCode').val("").focus();
    refreshCaptcha();
}

/* 输入框输入去掉提示颜色 */
function changeInputColor($input) {
    if ($input.val() != "") {
        $input.removeClass("tishu-color9");
    }
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
    showZhifuTishi: showZhifuTishi,
    showCardInfo: showCardInfo,
    showPaySucceed: showPaySucceed,
    showErroPrompt: showErroPrompt,
    changeInputColor: changeInputColor,
    setSucceedContent: setSucceedContent,
    setFailContent: setFailContent
}