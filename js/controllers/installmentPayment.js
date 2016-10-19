var pview = require("../views/installmentView.js");
var CMethod = require("../componests/commonMethod.js");
var num = require("../componests/number.js");
var ucookies = require("../componests/usecookies.js");
var isPaySure, needFeeRate, stageNumber;
var exp;
var rexp = false; // 表示有效期是否大于现在
var tooken;
var getVerifyCodeDJS = 60;
var $icheckbox;
CMethod.QueryString.Initial();
$(document).ready(function() {
    getBrowserInfo();
    initValue();
    computesEachPayNumber();
    $vform = pview.initValidform();
    initHeaderSpan();
    initCreditCard();
    initUserIdEvent();
    initCvn2Event();
    initPhoneEvent();
    initSelectMonth();
    initState();
    $('#toFill').on("click", sentOrderInfos);
    $('#selectBalance').on('click', pview.selectBalance);
    $('#sureButton').on('click', sureButtonClick);
    $('#vCodeButton').on('click', getVerifyCode);
    $('#verifyCode').on('keyup', verifyCode);
    $('#verifyCode').blur(function() {

    });
    $("#rateSelect").on("change", rateSelectChange)
    $("#checkButton").on("click", function() {
        if ($icheckbox.hasClass("checked")) {
            $icheckbox.removeClass("checked");
        } else {
            $icheckbox.addClass("checked");
        }
    });
    pview.initSpace();
    setReadOnly();
    setBackUrl();
    countDownTime();
});


/* 确认支付事件 */
function sureButtonClick() {
    var vfcheck = $vform.check();
    if (!rexp) {
        $("#timeCheckTip").text("信用卡有效期错误").removeClass("Validform_right").addClass("Validform_wrong");
    }
    if(!($icheckbox.hasClass("checked"))){
       pview.showErroPrompt("请勾选'我已阅读并同意支付合同'");
       return; 
    }
    
    // var _this = $(this), result = confirm('确认支付?');
    if (vfcheck && rexp && $icheckbox.hasClass("checked")) {
        $('#loding').modal({
            backdrop: "static",
            keyboard: false
        });
        setTimeout(function() {
            pay();
        }, 500);

    }
}

// 拼接请求参数
function getParms() {
    var userName = $("#userName").val();
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
        value: tooken
    }]; //请求参数

    return parameters;
}

function pay() {
    var parms = getParms();

    CMethod.getUrlAjax(LFQ_ORDER_CREATE_URL, parms, successCallBack, "", true);
}
// 请求支付返回数据回调函数
function successCallBack(zfdata) {
    $('#loding').modal('hide');

    // alert(zfdata.ppcs_paywithpassword_add_response.pay_result.resp_desc);
    var code = zfdata.error_business_response.code;

    // 支付成功返回码位000，其他均为支付失败
    if (zfdata.error_business_response && zfdata.error_business_response.code == "0000") { // 
        pview.setSucceedContent();
        setHistory("该笔订单已支付");
    } else if (zfdata.error_business_response && "50,51,52,53".search(zfdata.error_business_response.code) != -1) {
        pview.showErroPrompt(zfdata.error_business_response.msg);
        pview.showCardInfo();

    } else {
        var pmsg;
        if (zfdata.code != "0330" && zfdata.code != "0361" && zfdata.code != "0364" && zfdata.code != "0365" && zfdata.code != "0366") {
            ucookies.setCookie("pmsg", "该笔订单支付失败");
            pmsg = "该笔订单支付失败";
        } else {
            ucookies.setCookie("pmsg", zfdata.error_business_response.msg);
            pmsg = zfdata.error_business_response.msg;
        }

        location.href = "../../installment/pcinctallment/prompt.html?msg=" + pmsg;
    }
}

// 判断页面当前状态 1 支付成功 2：支付失败 3：订单失效 4：订单提交失败
function initState() {
    var stateVal = $("#state").val();
    if (stateVal == "3") {
        ucookies.setCookie("pmsg", "该笔订单已失效");
        location.href = "../../installment/pcinctallment/prompt.html?msg=该笔订单已失效";
    } else if (stateVal == "1") {
        ucookies.setCookie("pmsg", "该笔订单已支付");
        location.href = "../../installment/pcinctallment/prompt.html?msg=该笔订单已支付";
    } else if (stateVal == "2") { // 支付失败
        ucookies.setCookie("pmsg", "该笔订单已失效，请重新下单");
        location.href = "../../installment/pcinctallment/prompt.html?msg=该笔订单已失效，请重新下单";
    }
}

// 修改浏览记录
function setHistory(msg) {
    ucookies.setCookie("pmsg", msg);
    history.pushState({
        title: "支付结果"
    }, "", "../../installment/pcinctallment/prompt.html?msg=" + msg);
}

// 初始化期数和费率
function initRate() {
    var $rateInput = $("#rate");
    var $raInput = $("#ra");
    var rateInputData = $rateInput.data();
    var raInputData = $raInput.data();
    var defaultStageNumber = $rateInput.val(); //默认期数
    var defaultStageNumber2 = $raInput.val(); //默认期数
    var neprstate = $raInput.attr("date-neprstate");
    var optionVal = '';
    if (raInputData.array && neprstate == "1") {

        var rateArray = raInputData.array.split(",");
        var rateArrayObject = JSON.parse(raInputData.array.replace(/'/g, '"'));
        var lowObject = JSON.parse(raInputData.lowarray.replace(/'/g, '"'));
        var upObject = JSON.parse(raInputData.uparray.replace(/'/g, '"'));
        var noRate = true; // 没对应的期数
        for (var eachStageNumber in rateArrayObject) {
            if (/["low"]|["up"]/.test(eachStageNumber)) {
                continue;
            }

            var isLow = thanLow(lowObject, rateArrayObject[eachStageNumber], eachStageNumber);
            var isUp = thanUp(upObject, rateArrayObject[eachStageNumber], eachStageNumber);
            if (isLow && isUp) {
                noRate = false;
                optionVal += '<option value="' + rateArrayObject[eachStageNumber];
                if (eachStageNumber == defaultStageNumber2) {
                    optionVal += '" selected = "true';
                }
                optionVal += '">' + eachStageNumber + '期</option>';
            }
        }

        if (noRate) {
            ucookies.setCookie("pmsg", "商品金额已超出分期限制,请重新下单!");
            location.href = "../../installment/pcinctallment/prompt.html?msg=商品金额已超出分期限制,请重新下单!";
        }
    } else if (rateInputData.rate || rateInputData.rate == 0) {
        optionVal += '<option  selected = "true" value="' + rateInputData.rate + '">' + defaultStageNumber + '期</option>';
    }

    $("#rateSelect").html(optionVal);
}

// 比较最低限额
function thanLow(lowObject, ta_FeeRate, eachStageNumber) {
    var ta_contentMonet = totalAmount(ta_FeeRate);
    var lowNum = parseFloat(lowObject[eachStageNumber]);
    return ta_contentMonet >= lowNum;
}

// 比较最高限额
function thanUp(upObject, ta_FeeRate, eachStageNumber) {
    var ta_contentMonet = totalAmount(ta_FeeRate);
    var upNum = parseFloat(upObject[eachStageNumber]);
    return ta_contentMonet <= upNum;
}

// 根据费率计算总金额
function totalAmount(ta_FeeRate) {
    var lfq_amt = parseFloat($("#totalNum").text());
    var ta_contentMonet = parseFloat(lfq_amt * (parseFloat(ta_FeeRate) / 100) + 0.00001 + lfq_amt).toFixed(2);
    return ta_contentMonet;
}

// 初始化变量
function initValue() {
    initRate();
    $rateSpan = $("#rateSpan");
    $rateSelect = $("#rateSelect");
    $icheckbox = $("#checkButton .icheckbox-blue");
    if ($rateSelect[0]) {
        needFeeRate = parseFloat($rateSelect.val());
        stageNumber = parseInt($rateSelect.find("option:selected").text());
    } else {
        needFeeRate = parseFloat($rateSpan.attr("data-rate"));
        stageNumber = parseFloat($rateSpan.text());
    }

}

// 发送订单金额费率跟后台核实
function sentOrderInfos() {
    // nper:期数 eachMoney:每期还款 totalamount:分期总额  orderIddes:订单号 sign:

    var orderInfos = [{
        "name": "nper",
        "value": stageNumber
    }, {
        "name": "eachMoney",
        "value": $("#eachMoney").text()
    }, {
        "name": "totalamount",
        "value": $("#countMoney").text()
    }, {
        "name": "orderIddes",
        "value": $("#orderId").val()
    }, {
        "name": "sign",
        "value": $("#signs").val()
    }];

    CMethod.getUrlAjax(LFQ_pcinstallorder_URL, orderInfos, checkOrderInfos);
}

// 验证订单信息返回结果
function checkOrderInfos(cdate) {

    if (cdate.code == "01") {
        tooken = cdate.tooken;
        showFill();
    } else {
        ucookies.setCookie("pmsg", cdate.errormsg);
        location.href = "../../installment/pcinctallment/prompt.html";
    }

}

// 显示信息填写页面
function showFill() {
    pview.showCardInfo();
    pview.addBadgeChecked(2);
}

// 判断到第几步了
function getStep() {
    var step = 1;
    if ($(".cardInfo-header>span:eq(2) .checked")[0]) {
        step = 3;
    } else if ($(".cardInfo-header>span:eq(1) .checked")[0]) {
        step = 2;
    }

    return step;
}

// 给步骤绑定事件
function initHeaderSpan() {
    $(".cardInfo-header>span:eq(1)").on("click", function() {
        var step = 1;
        step = getStep();
        if (step != 3) {
            sentOrderInfos();
        }

    });
    $(".cardInfo-header>span:eq(0)").on("click", function() {
        var step = 1;
        step = getStep();
        if (step != 3) {
            pview.showCountBox();
            pview.addBadgeChecked(1);
        }
    });

}

/* 验证码校验 */
function verifyCode() {
    var $this = $(this);
    var thisVal = $this.val();
    var newVal = thisVal.replace(/\D/g, "");
    $this.val(newVal);
    if ($(this).val().length > 4) {
        $(this).val($(this).val().substr(0, 4));
    }
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


//请求 验证码
function getVerifyCode() {
    $vCodeButton = $("#vCodeButton");
    var id_no = $("#userId").val().replace(/ /g, "");
    var isIdNo = isSFZNo(id_no);

    if ($vCodeButton.hasClass("disabled")) { //60秒之内
        return;
    } else { //发送短信 禁用60秒
        if (!isIdNo) {
            $("#aboutMoal .modal-body").html("<p>身份证号码错误</p>");
            $('#aboutMoal').modal({
                backdrop: "static",
                keyboard: false
            }); // 显示提示框
            return;
        }
        //发送短信
        // 禁用60秒
        $vCodeButton.addClass("disabled");
        $vCodeButton.text("重新获取(" + getVerifyCodeDJS + "S)");

        var setIntervarHandle = setInterval(function() {
            getVerifyCodeDJS--;
            $vCodeButton.text("重新获取(" + getVerifyCodeDJS + "s)")
            if (getVerifyCodeDJS == 0) {
                $vCodeButton.text("重新获取");
                clearInterval(setIntervarHandle);
                $vCodeButton.removeClass("disabled");
                getVerifyCodeDJS = 60;
            };
        }, 1000);

        getAjaxCode(setIntervarHandle);
    }
}


// 发送验证码请求
function getAjaxCode(setIntervarHandle) {
    var url = LFQ_SMS_SEND_URL;
    var hp_no = $("#userPhone").val().replace(/ /g, "");
    var id_no = $("#userId").val().replace(/ /g, "");
    var param = {
        hp_no: hp_no,
        orderid: $("#orderId").val(),
        idno: id_no
    };
    CMethod.getUrlAjax(url, param, function(retn) {

        if (retn.code == "0" && retn.msg) {
            pview.showErroPrompt(retn.msg);
        }
    });
}


// 计算总金额，和每期金额
function computesEachPayNumber() {
    var lfq_amt = parseFloat($("#totalNum").text());
    var contentMonet = parseFloat(lfq_amt * (parseFloat(needFeeRate) / 100) + 0.00001 + lfq_amt).toFixed(2);
    var eachMoney = num.hold2bit(parseFloat(lfq_amt) * (1 + needFeeRate / 100) / stageNumber);
    var eachPrincipal = num.hold2bit(lfq_amt / stageNumber);
    var eachFeeNum = parseFloat(eachMoney) - parseFloat(eachPrincipal);
    var eachFee = needFeeRate / stageNumber;
    var allFeeValue = num.hold2bit(contentMonet - lfq_amt);

    $("#allFeeNum").text(allFeeValue);
    $("#eachRate").text(eachFee.toFixed(2) + '%');
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
        if ($(this).val().length > 3) {
            $(this).val($(this).val().substr(0, 3));
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
    $('.form_month').datetimepicker('setStartDate', new Date());
    $datePicker.on("changeMonth", function(ev) {
        var nowDate = new Date();
        var year2 = String(ev.date.getFullYear()).substr(2, 2);
        var months = ev.date.getMonth() > 8 ? ev.date.getMonth() + 1 : '0' + (ev.date.getMonth() + 1);
        exp = months + year2;

        if (ev.date.getFullYear() < nowDate.getFullYear() || (ev.date.getFullYear() == nowDate.getFullYear() && ev.date.getMonth() < nowDate.getMonth())) {

            $("#timeCheckTip").text("信用卡已过期").removeClass("Validform_right").addClass("Validform_wrong");
        } else {
            rexp = true;
            $("#timeCheckTip").text("通过信息验证").removeClass("Validform_wrong").addClass("Validform_right");

        }
    });
}

// 取得判断浏览器版本
function getBrowserInfo() {
    var iebh = "no";
    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;

    var agent = navigator.userAgent.toLowerCase();
    //IE
    if (agent.indexOf("msie") > 0) {
        iebh = agent.match(regStr_ie);
    }

    if (iebh != "no" && parseInt(iebh[0].replace("msie ", "")) < 9) {
        alert("ie浏览器版本太低,请升级到9或以上版本");
        location.href = "../../installment/pcinctallment/prompt.html?msg=ie浏览器版本太低,请升级到9或以上版本。"
    }
}



// 设置只读
function setReadOnly() {
    var readVal = $("#onlyData").val();
    var readIvalA = [{
        name: "creditName",
        value: "userName"
    }, {
        name: "cetitype",
        value: ""
    }, {
        name: "creditNo",
        value: "creditCard",
        fun: pview.spaceCardNum
    }, {
        name: "idno",
        value: "userId",
        fun: pview.spaceuserId
    }, {
        name: "phoneNo",
        value: "userPhone",
        fun: pview.spacePhoneNum
    }];
    for (var i = 0, l = readIvalA.length; i < l; i++) {
        if (readVal.search(readIvalA[i].name) != -1) {
            $("#" + readIvalA[i].value).attr("readonly", "readonly");
            if (readIvalA[i].fun) {
                readIvalA[i].fun();
            }
        }
    }
}


// 验证身份证格式
function isSFZNo(card) {
    var iscarNum = true;
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) { //身份证输入不合法
        iscarNum = false;
    }

    return iscarNum;
}

// 设置返回商城地址
function setBackUrl() {
    var scUrl = $("#urlrerurn").val();
    if (scUrl && scUrl != "null" && scUrl != "") {
        $("#paySucceed a").attr("href", scUrl);
    }
}

// 到计时 30 分钟后跳转到订单失效页面
function countDownTime() {
    var oldTime = (new Date()).getTime();
    var countDownhadle = setInterval(function() {
        var newTime = (new Date()).getTime();
        if (newTime - oldTime > 1790000) {
            clearInterval(countDownhadle);
            location.href = "../../installment/pcinctallment/prompt.html?msg=该笔订单已失效，请重新下单";
        }
    }, 1000);
}
