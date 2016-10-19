//调用服务器链接
//window.BASE_URL = window.location.protocol + "//wxtest.ulinkpay.com/";

window.LFQ_QRCODEPAY_RESULT_URL = BASE_URL + "FuLiBao/LFQSearchOrderServlet";
window.LFQ_ORDER_CREATE_URL = BASE_URL + "/rest/card/installpay/pay";
window.LFQ_SMS_SEND_URL = BASE_URL + "/sms/send";
window.LFQ_installorder_URL = BASE_URL + "/payinstallment/OrderInstallPay/installorder.do";

//pc端提交金额校验
window.LFQ_pcinstallorder_URL = BASE_URL + "/payinstallment/PcOrderInstallPay/installorder.do";
