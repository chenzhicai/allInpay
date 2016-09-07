var pview = require("../views/installmentView.js");
var CMethod = require("../componests/commonMethod.js");
var num = require("../componests/number.js");
var isPaySure, needFeeRate, stageNumber;
var exp;
var rexp = false; // 表示有效期是否大于现在
CMethod.QueryString.Initial();
$(document).ready(function() {
    initValue();
    computesEachPayNumber();
    $vform = pview.initValidform();
    initHeaderSpan();
    initCreditCard();
    initUserIdEvent();
    initCvn2Event();
    initPhoneEvent();
    initSelectMonth();
    $('#toFill').on("click", showFill);
    $('#selectBalance').on('click', pview.selectBalance);
    $('#sureButton').on('click', sureButtonClick);
    $('#captchaImg').on('click', refreshCaptcha);
    $('#verifyCode').on('keyup', verifyCode);
    $('#verifyCode').blur(function() {
        if ($(this).val().length < 4) {
        }
    });
    $("#qrzfMoal button").on("click", function() {
        $('#qrzfMoal').modal('hide');
        if ($(this).data().accede == "ok") {
            pay();
        }
    });
    $("#rateSelect").on("change", rateSelectChange)

});


/* 确认支付事件 */
function sureButtonClick() {

    var vfcheck = $vform.check();
    if(!rexp){
        $("#timeCheckTip").text("信用卡有效期错误").removeClass("Validform_right").addClass("Validform_wrong");
    }
    // var _this = $(this), result = confirm('确认支付?');
    if (vfcheck && rexp) {
        $('#qrzfMoal').modal('show');
    }
}

// 拼接请求参数
function getParms() {
    var userName = $("#userNam").val();
    var userId = $("#userId").val().replace(/ /g, "");
    var CardNum = $("#creditCard").val().replace(/ /g, "");

    var parameters = [{
        name: "phoneNo",
        value: $("#userPhone").val().replace(/ /g, "")
    }, {
        name: "creditName",
        value: userName
    }, {
        name: "idno",
        value: userId
    }, {
        name: "creditNo",
        value: CardNum
    }, {
        name: "cvn2",
        value: $("#cvn2").val()
    }, {
        name: "exp",
        value: exp
    }, {
        name: "servlet_type",
        value: "create_order"
    }, {
        name: "verifyCode",
        value: $("#verifyCode").val()
    }, {
        name: "orderId",
        value: $("#orderId").val()
    }, {
        name: "sign",
        value: $("#signs").val()
    }, {
        name: "tookenkey",
        value: $("#tookenkey").val()
    }]; //请求参数

    return parameters;
}

function pay() {
    var parms = getParms();

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

// 初始化变量
function initValue() {
    $rateSpan = $("#rateSpan");
    $rateSelect = $("#rateSelect");
    if ($rateSelect[0]) {
        needFeeRate = parseFloat($rateSelect.val());
        stageNumber = parseInt($rateSelect.find("option:selected").text());
    } else {
        needFeeRate = parseFloat($rateSpan.attr("data-rate"));
        stageNumber = parseFloat($rateSpan.text());
    }

}

// 显示信息填写页面
function showFill() {
    pview.showCardInfo();
    pview.addBadgeChecked(2);
}

// 给步骤绑定事件
function initHeaderSpan() {
    $(".cardInfo-header>span:eq(1)").on("click", showFill);
    $(".cardInfo-header>span:eq(0)").on("click", function() {
        pview.showCountBox();
        pview.addBadgeChecked(1);
    });

}

/* 验证码校验 */
function verifyCode() {
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

// 计算总金额，和每期金额
function computesEachPayNumber() {
    var lfq_amt = parseFloat($("#totalNum").text());
    var contentMonet = parseFloat(lfq_amt * (parseFloat(needFeeRate) / 100) + 0.00001 + lfq_amt).toFixed(2);
    var eachMoney = num.hold2bit(parseFloat(lfq_amt) * (1 + needFeeRate / 100) / stageNumber);
    var eachPrincipal = num.hold2bit(lfq_amt / stageNumber);
    var eachFeeNum = parseFloat(eachMoney) - parseFloat(eachPrincipal);

    $("#eachFeeNum").text(eachFeeNum.toFixed(2));
    $("#eachMoney").text(eachMoney);
    $("#countMoney").text(contentMonet);
}

//  分期数选择改变
function rateSelectChange() {
    needFeeRate = parseFloat($rateSelect.val());
    stageNumber = parseInt($rateSelect.find("option:selected").text());
    computesEachPayNumber();
}

// 银行卡事件
function initCreditCard() {
    $("#creditCard").keyup(function() {
        var numberVal = $(this).val().replace(/[^0-9\s]/g, "");
        $(this).val(numberVal);
        pview.spaceCardNum();
    });
}

// 身份证输入框事件
function initUserIdEvent() {
    $("#userId").keyup(function() {
        $userId = $(this);
        var useIdVal = $userId.val().replace(/[^0-9xX\s]/g, "");
        $userId.val(useIdVal);
        pview.spaceuserId($userId);
    })
}

// cvn2输入框事件
function initCvn2Event() {
    $("#cvn2").keyup(function() {
        if($(this).val().length > 3){
            $(this).val($(this).val().substr(0,3));
        }
    })
}

// 手机输入事件
function initPhoneEvent() {
    $("#userPhone").keyup(function() {
        $phone = $(this);
        var phoneVal = $phone.val().replace(/[^0-9\s]/g, "");
        $phone.val(phoneVal);
        pview.spacePhoneNum($phone);
    });
}

// 有效期
function initSelectMonth() {
    var $datePicker = pview.setDatetimepicker();
    $datePicker.on("changeMonth", function(ev) {
        var nowDate = new Date();
        var year2 = String(ev.date.getFullYear()).substr(2, 2);
        var months = ev.date.getMonth() + 1;
        exp = year2 + months;

        if (ev.date.getTime() < nowDate.getTime()) {
            
            $("#timeCheckTip").text("信用卡已过期").removeClass("Validform_right").addClass("Validform_wrong");
        } else {
            rexp = true;
            $("#timeCheckTip").text("通过信息验证").removeClass("Validform_wrong").addClass("Validform_right");

        }
    });
}