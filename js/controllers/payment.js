var pview = require("../views/paymentView.js");
var CMethod = require("../componests/commonMethod.js");
var isPaySure;
changeVInputSize();
CMethod.QueryString.Initial();
$(window).ready(function init() {

    $('#selectBalance').on('click', pview.selectBalance);
    $('#sureButton').on('click', sureButtonClick);
    $('#cardNum').on('change', cardNumChange);
    $('#cardPassword').on('change', cardPasswordChange);
    $('#captchaImg').on('click', refreshCaptcha);
    $('#verifyCode').on('keyup', verifyCode);
    $('#verifyCode').blur(function() {
        if ($(this).val().length < 4) {
            noVerfyCode();
        }
    });
    $('#cardNum').on('keyup', function() {
        $input = $(this);
        this.value = this.value.replace(/\D/g, '');
        pview.changeInputColor($input);
        showSelectBalance();
    });

    $(".demoform").Validform({
        tiptype: 2
    });
    $("#qrzfMoal button").on("click", function() {
        $('#qrzfMoal').modal('hide');
        if ($(this).data().accede == "ok") {
            pay();
        }
    });

});

/* 确认支付事件 */
function sureButtonClick() {

    var returnCode = checkInputLength();
    // var _this = $(this), result = confirm('确认支付?');
    if (returnCode == "ok") {
        $('#qrzfMoal').modal('show');
    } else {
        pview.showErroPrompt(returnCode);
    }
}

function pay() {
    var parms = [{
        name: 'card_id',
        value: $("#cardNum").val()
    }, {
        name: 'password',
        value: $("#cardPassword").val()
    }, {
        name: 'order_id',
        value: id
    }, {
        name: 'verifyCode',
        value: $("#verifyCode").val()
    }];

    pview.showZhifuTishi();
    CMethod.getUrlAjax("/assetbm/rest/card/orderpay/pay", parms, successCallBack);
}
// 请求支付返回数据回调函数
function successCallBack(msg) {
    console.dir(msg);
    // alert(msg.ppcs_paywithpassword_add_response.pay_result.resp_desc);
    var code;
    if (msg.error_business_response) {
        // 错误码
        code = msg.error_business_response.code;
    } else {
        //ppcs_paywithpassword_add_response为支付成功
        code = msg.ppcs_paywithpassword_add_response.pay_result.resp_code;
    }
    alert(code);
    // 支付成功返回码位000，其他均为支付失败
    if (code == "0000") { // 
        pview.setSucceedContent();
    } else {
        pview.showErroPrompt(code);
        pview.showCardInfo();

    }
}


function cardNumChange(argument) {
    $cardNum = $(this);
    pview.changeInputColor($cardNum);
}

function cardPasswordChange(argument) {
    $cardNum = $(this);
    pview.changeInputColor($cardNum);
}

function showSelectBalance() {
    var inputLentOk = checkInputLength();
    if (inputLentOk == "ok") {
        $("#selectBalance").css({
            display: "inline-block"
        });
    } else {
        $("#selectBalance").css({
            display: "none"
        });
    }
}

/* 判断卡号密码验证码位数是否正确 */
function checkInputLength() {
    var lengthOk = "cardNum"; // 到时候跟后台错误码一样
    var cardNumLength = $('#cardNum').val().length;
    if (cardNumLength == 19) {
        lengthOk = "cardPassword";
        var cardPasswordLength = $('#cardPassword').val().length;
        if (cardPasswordLength == 6) {
            lengthOk = "verifyCodeErro";
            var verifyCodeLength = $('#verifyCode').val().length;
            if (verifyCodeLength == 4) {
                lengthOk = "ok";
            }
        }
    }

    return lengthOk;
}

function changeVInputSize() {
    var $verifyCode = $("#verifyCode");
    if ($verifyCode.val() == "") {
        $verifyCode.css("font-size", "14px");
    } else {
        $verifyCode.css("font-size", "16px");
    }
}

/* 验证码校验 */
function verifyCode() {
    changeVInputSize();
    if ($(this).val().length == 4) {
        var parameters = {
            code: $(this).val()
        }

        //验证发送请求后台
        $.get("/assetbm/rest/card/orderpay/pay", parameters, function(data) {
            if (data.code == "ok") {
                // 验证正确时
                verifyCodeOk();
            } else {
                // 验证码错误时
                noVerfyCode();
            }
        });
    }

}

/* 验证码通过提示 */
function verifyCodeOk() {
    $("#yzmti").text("验证码验证通过").removeClass("Validform_wrong").addClass("Validform_right");
}

/* 验证码错误提示 */
function noVerfyCode() {
    $("#yzmti").text("验证码错，请重新输入").removeClass("Validform_right").addClass("Validform_wrong");
    $("#verifyCode").val("");
    rvi();
}

/* 取验证码图*/
function refreshCaptcha() {
    var src = "/assetbm/commons/verfiy-code.jpg?" + Math.floor(Math.random() * 100) + "&orderId=${payOrder.orderId}";
    $('#captchaImg').hide().attr('src', src).fadeIn();
}