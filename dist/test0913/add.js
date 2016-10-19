window.rateInfos = [];

function addSetting(qsArray) {
    addHtml(qsArray);
    $(".eachSettingBox .addDel:eq(0)").on("click", function() {
        addHtml(qsArray);
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
        return false;
    });

}

//  取得信息
function getRateInfos() {
    return rateInfos;
}

// 设置 rateInfos
function setRateInfos() {
    rateInfos = [];
    var $eachBoxs = $(".eachSettingBox");
    for (var i = 0, l = $eachBoxs.length; i < l; i++) {
        var $theRateBox = $($eachBoxs[i]);
        var eachRateObject = {};
        var $theBoxSelect = $theRateBox.find("select");
        var $theBoxInput = $theRateBox.find("input");
        eachRateObject.mtype = $($theBoxSelect[1]).val();
        eachRateObject.epx = $($theBoxSelect[0]).val();
        eachRateObject.sfkl = $($theBoxInput[0]).val();
        eachRateObject.yhkl = $($theBoxInput[1]).val();
        rateInfos.push(eachRateObject);
    }
}

// 添加html
function addHtml(qsArray) {
    $settingBox = $("#settingBox");

    var htmlStr = getHtml(qsArray);
    $settingBox.append(htmlStr);

    $(".eachSettingBox .addDel:eq(0)").text("添加");
    initEvent();

}

// 绑定更新事件
function initEvent() {
    $(".eachSettingBox .addDel:gt(0)").text("删除");
    $(".eachSettingBox .addDel:gt(0)").unbind("click");
    $(".eachSettingBox .addDel:gt(0)").bind("click", function() {
        console.log("dsfsf");
        $(this).parent().parent().remove();
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
        return false;
    });
    $(".eachSettingBox select.mode_select").unbind("change");
    $(".eachSettingBox select.mode_select").bind("change", function() {
        $theBox = $(this).parent().parent();
        var modeVal = $(this).val();
        modeSelectChange($theBox, modeVal);
    });
    $(".eachSettingBox input").unbind("blur");
    $(".eachSettingBox input").bind("blur", function() {
        inputblur();
    });

}

// 模式选择改变事件
function modeSelectChange($theBox, modeVal) {
    console.log("模式选择改变事件");
    $theBox.find("input").val("");
    $theBox.find("input").removeAttr("readonly");
    if (modeVal == "1") {
        console.log("选择模式1事件..");
        $theBox.find("input:eq(1)").attr("readonly", "readonly");
    } else if (modeVal == "2") {
        console.log("选择模式2事件..");
        $theBox.find("input:eq(0)").attr("readonly", "readonly");
    } else if (modeVal == "3") {
        console.log("选择模式3事件..");
        $theBox.find("input:eq(1)").val(0.00);
        $theBox.find("input:eq(1)").attr("readonly", "readonly");
    } else if (modeVal == "4") {
        console.log("选择模式4事件..");
    }
}

// 输入失去焦点
function inputblur() {
    console.log("输入失去焦点...");
    setRateInfos();

}

// html 模板
function getHtml(qsArray, bname) {
    var optionStr = setqishuOption(qsArray);
    var htmlStr = '<div class="eachSettingBox" style="padding: 15px 0px;border: 1px solid #c7c7c7;width: 460px;margin-top: 20px;">'
    htmlStr += '<div class="row" style="text-align: center;padding: 3px;"><label style="width: 90px;display: inline-block;">分期期数</label><select style="width: 175px;">' + optionStr + '</select style="width: 175px;"><button style="width: 50px;position: absolute;margin-left: 20px;" class="addDel"></button></div>';
    htmlStr += '<div class="row" style="text-align: center;padding: 3px;"><label style="width: 90px;display: inline-block;">分期模式</label><select style="width: 175px;" id="" class="mode_select" name="select1"><option value="3" selected="selected">商户全额承担</option><option style="background-color: #e2e2e2;display: block;" value="1">持卡人全额承担</option><option value="2">商户0费率B</option><option value="4">自主费率</option></select></div>';
    htmlStr += '<div class="row" style="text-align: center;padding: 3px;"><label style="width: 90px;display: inline-block;">商户扣率%</label><input style="width: 175px;" type="number"></div>';
    htmlStr += '<div class="row" style="text-align: center;padding: 3px;"><label style="width: 90px;display: inline-block;">持卡人手续%</label><input style="width: 175px;" type="number"></div>';
    htmlStr += '</div>'

    return htmlStr;
}

function setqishuOption(qsArray) {
    var optionStr = '';
    for (var i = 0, l = qsArray.length; i < l; i++) {
        optionStr += '<option value ="' + qsArray[i] + '">' + qsArray[i] + '期</option>';
    }

    return optionStr;
}