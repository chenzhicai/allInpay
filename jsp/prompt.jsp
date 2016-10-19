<!DOCTYPE html>
<%@page import="java.net.URLDecoder"%>
<%@page import="java.net.URLEncoder"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@page import="com.allinpay.onlinepay.model.*"%>
<%@ include file="/commons/taglibs.jsp" %>
<html lang="en">
<%
String returnurl = request.getParameter("returnurl"); 
String msg = request.getParameter("msg"); 
try{
if(!msg.equals("")){
  msg=URLDecoder.decode(msg, "UTF-8");
  returnurl=URLDecoder.decode(returnurl, "UTF-8");
  
  }} catch (Exception e) {
	msg="";
	returnurl="";
		}
%>
<head>
    <meta charset="UTF-8">
    <title>支付网关</title>
    <!-- <link href="../css/page/peronalPay.css" rel="stylesheet"> -->
    <link href="${ctx}/installment/css/peronalPay.css" rel="stylesheet">
    <script type="text/javascript">
        window.BASE_URL = "/assetbm";
    </script>
    <script type="text/javascript" src="${ctx}/installment/js/libs/jquery-1.12.0.min.js"></script>
    <script type="text/javascript" src="${ctx}/installment/js/installment/common.js"></script>
    <script type="text/javascript" src="${ctx}/installment/js/installment/prompt.min.js"></script>
    <script type="text/javascript" src="${ctx}/js/libs/jquery-1.12.0.min.js"></script>
    <script type="text/javascript" src="${ctx}/js/installment/common.js"></script>
    <script type="text/javascript" src="${ctx}/js/installment/prompt.min.js"></script>
    <script type="text/javascript">
   
    </script>
    
</head>

<body class="icon-backgrpund">
    <div id="root" class="container">
        <div class="header">
            <div class="float-l"><span class="icon-cardLogo"></span>
            </div>
            <div class="float-r">
             
                <div class="font-s22 float-l">个人网上支付系统</div>
                <div class="float-r"><a href="http://www.ulinkpay.com/">通联商务官方网站</a><span class="margin-l-r10">|</span><a class="guanzuwei"><span class="icon-wxtb"></span>关注公众号，在线提问<span class="QR-img hide"><span class="icon-wechat"></span></span></a></div>
            </div>
        </div>
        <div class="content">
            <div id="tishicuowu">
                <div>
                    <p class="maincuowu"><img src="${ctx}/installment/images/fail.png"><span>${ errorMsg}<%=msg %></span></p>
                    <input id="returnurl" hidden="hidden"    value="<%=returnurl%>">
                    <p>如有问题，请您拨打客服电话：4009-216-118</p>
                </div>
            </div>
        </div>
        <div class="content-tishu">
            <p><span><span class="icon-tishu"></span></span><span>支付小贴士</span></p>
            <ol>
                <li>无需注册网银即可使用卡密支付，方便快捷。</li>
                <li>您正在进行网络支付交易，为保证您的资金安全，请认真核对交易信息，谨防诈骗。</li>
                <li>请不要在网吧等公共场所使用本功能，妥善保管好您的卡号和密码，避免被他人冒用。</li>
                <li>通联商务提供安全可靠的网上支付服务，一切由于商品质量、送货服务等引起的争议均有客户及商户自行协调解决。</li>
                <li>客服服务热线：4009-216-118 ( 工作日 9:00 - 17:00 )</li>
            </ol>
        </div>
    </div>
    <div id="yujizaitu"></div>
    <div id="root_footer"></div>
    <div id="footer">
        <div><span>公司地址：上海市浦东新区杨高南路799号陆家嘴世纪金融广场3号楼8层</span></div>
        <p><span>版权所有：通联商务服务有限公司</span><span>沪ICP备13043030号-1</span></p>
    </div>
</body>

</html>
