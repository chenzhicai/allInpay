$(document).ready(function($) {
    $(".suolutu").on("mouseover", function() {
        console.log("dkfjdkfj");
        $(this).children("img").attr("src", "../img/lfqhelp/fangdajiashen_icon.png");
    });
    $(".suolutu").on("mouseout", function() {
        $(this).children("img").attr("src", "../img/lfqhelp/fangda_icon.png");
    });
    $(".suolutu").on("click", function() {
        showPhotos($(this).data().start);
    });
    setBotPosition();
    window.onresize = setBotPosition;

});

function setBotPosition() {
    if ($('html')[0].clientHeight < 580) {
        $(".bot").css("position", "static")
    }else{
        $(".bot").css("position", "absolute")
    }

}

function showPhotos(start) {
    if (start == "0") {
        var offsetValue = "10px";
    } else {
        var offsetValue = ["100px", '20%'];
    }
    var photosJson = {
        "title": "示意图", //相册标题
        "id": 123, //相册id
        "start": start, //初始显示的图片序号，默认0
        "data": [ //相册包含的图片，数组格式
            {
                "alt": "交易的订单号",
                "pid": "step1", //图片id
                "src": "../img/lfqhelp/step-1.png", //原图地址
                "thumb": "../img/lfqhelp/suoluetu-1.png" //缩略图地址
            }, {
                "alt": "交易的订单号",
                "pid": "step2", //图片id
                "src": "../img/lfqhelp/step-2.png", //原图地址
                "thumb": "../img/lfqhelp/suoluetu-2.png" //缩略图地址
            }, {
                "alt": "交易的订单号",
                "pid": "step3", //图片id
                "src": "../img/lfqhelp/step-3.png", //原图地址
                "thumb": "../img/lfqhelp/suoluetu-3.png" //缩略图地址
            }
        ]
    }

    var layer1 = layer.photos({
        photos: photosJson,
        closeBtn: 1,
        offset: offsetValue,

    });
    setTimeout(function() {
        $(".layui-layer-content").css("height", "100%");
        $(".layui-layer-shade").css("opacity", "0.4");
    }, 300);

}