var CMethod = require("../componests/commonMethod.js");
var ucookies = require("../componests/usecookies.js");

CMethod.QueryString.Initial();
$(document).ready(function() {
    var pmsg = ucookies.getCookie("pmsg");
    var msg = CMethod.QueryString.GetValue("msg");
    if (msg == "failure") {
        pmsg = "该笔订单已失效";
    }else if(msg == "empty"){
        pmsg = "该笔订单不存在";
    } else if (msg) {
        pmsg = decodeURI(msg);
    } else if (!pmsg) {
        pmsg = "对不起，该笔订单已失效";
    }
    
    var $mspan = $("#tishicuowu .maincuowu>span");
    if($mspan.text() ==""){
        $("#tishicuowu .maincuowu>span").text(pmsg);
    }
    if(location.search.search("orderId") != -1){
        location.href="../../installment/pcinctallment/prompt.jsp?msg="+$mspan.text();
    }else{
       ucookies.setCookie("pmsg", $mspan.text()); 
    }
     history.pushState({
            title: "支付结果"
        }, "", "../../installment/pcinctallment/prompt.jsp");
    
});
