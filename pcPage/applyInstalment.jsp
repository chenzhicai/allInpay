<!DOCTYPE html>
<%@page import="com.allinpay.util.GetIpUtil"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@page import="com.allinpay.payinstallment.model.*"%>
<%@page import="com.allinpay.payinstallment.model.OrderInstallInfo"%>
<%@page import="com.allinpay.payinstallment.service.OrderInstallManager"%>

<%@page import="com.allinpay.payinstallment.*"%>
<%@page import="org.springframework.web.context.WebApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="com.allinpay.util.CryptoUtils"%>
<%@page import="com.allinpay.util.PropertiesUtils"%>
<%@page import="com.allinpay.util.HttpUtils"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.allinpay.test.HttpRsa"%>
<%@page import="com.allinpay.security.util.SpringSecurityUtils"%>
<%@page import="java.sql.*" %>
<%@page import="java.util.*"%>
<%@page import=" java.lang.System"%>
<%@page import="java.util.Date"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="com.allinpay.api.response.RedirectBusinessResponse"%>
<%@page import="com.alibaba.druid.util.Base64"%>
<%@page import="com.allinpay.util.Md5Utils"%>

<%@page import="net.sf.json.JSONObject"%>
<%@page import="javacommon.rest.util.AopAssert"%>
<%@page import="javacommon.rest.util.AopUtils"%>
<%@ include file="/commons/taglibs.jsp" %>
<%

ServletContext servletContext = this .getServletContext();   
	WebApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(servletContext);   
	OrderInstallManager orderInstallManager = (OrderInstallManager)ctx.getBean("orderInstallManager" ); 
	String orderinstall =  PropertiesUtils.getGlobalProperties("orderinstall"); 
	 
	//1. 获取参数
	String orderIdress = request.getParameter("orderId");
	
	
	if(AopAssert.isEmpty(orderIdress)){
     	response.sendRedirect(request.getServletContext().getContextPath()+"/installment/jsp/error.jsp");
	    return;
	} 
	
		
	
	//2.根据订单号查询数据库
	String orderId = null;
	String sign = null;
	OrderInstallInfo	orderInstallInfo = null;
	String orderIdEncode =  PropertiesUtils.getGlobalProperties("orderIdEncode");
	try {
		 orderId = CryptoUtils.desDecryptFromBase64(orderIdress,orderIdEncode.getBytes());
		 orderInstallInfo = orderInstallManager.getByOrdreId(orderId);
		 if(orderInstallInfo==null){
			response.sendRedirect(request.getServletContext().getContextPath()+"/installment/jsp/error.jsp");
			return;
		 }
		 
		 
		 
		 // 获取订签名加密码
			String signEncode = PropertiesUtils.getGlobalProperties("signEncode");
			String merId = orderInstallInfo.getMerId();
			 sign = request.getParameter("sign");
			 HttpSession httpsesion = request.getSession();
			String ip = GetIpUtil.getIpAddr(request);
			System.out.println("#######");
			System.out.println("#######页面获取的ip值："+ip);
			String ensign = Base64.byteArrayToBase64((Md5Utils
					.signature(orderId + "_" + merId + "_" + signEncode+"_"+ip)).getBytes());
				
			if (!sign.equals(ensign)) {
			
			response.sendRedirect(request.getServletContext().getContextPath()+"/installment/jsp/error.jsp");
              return;
              
                 }
			
		
		} catch (Exception e1) {
			response.sendRedirect(request.getServletContext().getContextPath()+"/installment/jsp/error.jsp");
            return;
			
		}
	
	//获取订单时间
	    String  t = orderInstallInfo.getTradeDate()+orderInstallInfo.getTradeTime();
	    SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMddHHmmss");  
        Date date = (Date) sdf1.parse(t);  
         SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
         String time = sdf2.format(date);  
		String per = orderInstallInfo.getNper()+"" ;
	
	
%>
<html>

<head>
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <meta name="x5-orientation" content="portrait">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no" />
    <meta name="keywords" content="通联卡">
    <meta name="description" content="通联卡">
    <title></title>
    <link rel="stylesheet" type="text/css" href="${ctx}/installment/css/applyInstalmentP.css">
    <script type="text/javascript">
    	window.BASE_URL = "${ctx}";
    </script>
    <script type="text/javascript" src="${ctx}/installment/js/urlVar.js"></script>
</head>

<body>
    <div id="all-box">
        <div id="root">
            <header>
                <span>申请分期</span>
            </header>
            <div class="weui_cells weui_cells_split">
                <div class="weui_cell check_label">
                    <div class="weui_cell_hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAoCAMAAACsAtiWAAAAgVBMVEUAAAAnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuQnkuRwuE/ZAAAAKnRSTlMAnkLesvKO9Qw2/BsDgGHkqyrYZTovyb1WMiPnl4lR66NsRR0WAerEtRkWy9XDAAABKklEQVQ4y8WUyZaCMBBFMQ4MpjVhFgVRQO33/x/YEDtHUgzdG493RapuKnkLYpm4eby85wdrmhJPTqNdhzGWAIiTGMCjXTlUidDhZ+1n5qOjMvqcNyEAz96qpfQ8AJJzrvef/ON+fwPSuv4tbesUaItHf9ON3UHTD3KAprAkgEQIkQCsp7Bn9Q7AEvBCNRtwe4oLqETXVlljpSdfG65p2lam6jEsGye97bx/cQakqotuykIfTohUffVSsgXlmyhjfErhRbAzCQqiBBiyMxV2synHkNyFOxT+ntAydE1CSZQUQ4q/lZQcFDGKfE8ip9qaVA5RwjU8E5xdU7lgSGAq/PJFCf5/XfUfzSE6RcwqMdpBdjRjMEC9TmW+GScvAZC4E9Hdh7+cwl8drB82wT+VqQI+uAAAAABJRU5ErkJggg==" alt="" style="width:20px;margin-right:5px;display:block"></div>
                    <div class="weui_cell_bd">
                        <p>订单信息</p>
                    </div>
                </div>
                <div class="weui_cell infos">
                    <div class="weui_cell_hd">
                        商户简称
                    </div>
                    <div class="weui_cell_bd weui_cell_primary">
                        <p id="merName"><%=orderInstallInfo.getMerName() %></p>
                    </div>
                </div>
                <div class="weui_cell infos">
                    <div class="weui_cell_hd">
                        订单编号
                    </div>
                    <div class="weui_cell_bd weui_cell_primary">
                        <p id="orderId"><%=orderId %></p>
                    </div>
                </div>
                <div class="weui_cell infos">
                    <div class="weui_cell_hd">
                        订单时间
                    </div>
                    <div class="weui_cell_bd weui_cell_primary">
                        <p id="orderTime"> <%=time %>  </p>
                    </div>
                </div>
                <div class="weui_cell infos">
                    <div class="weui_cell_hd">
                        订单金额
                    </div>
                    <div class="weui_cell_bd weui_cell_primary">
                        <p id="lfq_amt"><fmt:formatNumber value="<%=orderInstallInfo.getAmount()%>" pattern="0.00"/>元</p>
                       <input type="hidden" id="orderIddes" name="orderIddes"    value="<%=orderIdress%>">
                   
                      <input type="hidden" id="sign" name="sign"    value="<%=sign%>">
                   
                    </div>
                </div>
                <div class="weui_cell tishi">
                    <div class="weui_cell_bd weui_cell_primary">
                        <p class="tar">该商户仅支持600—<span id="maxApplyNum">20000</span>元商品分期</p>
                    </div>
                </div>
                <div class="weui_cell">
                    <div class="weui_cell_hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAMAAAAz6Z0tAAAAdVBMVEUAAABazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsJazsIJQAldAAAAJnRSTlMADef2S1lS9GHNx35F7d+naSIWPzgy8dnUuLOSix0GrZ42v4hxJy9WwhkAAAD6SURBVCjPjZLZjoMwDAAd7gQoR6En0HaP+f9P3FB42FYJ6khx/DCxbCvyCXsT+NGRNXq2KUQMOot9ZIaTSEoifjpKkYBC/IwEs3ItIh9Fzk5kxzZWCQi3WJRa+Yk5zEosfpqlSra5+8avRMP9Wo828SnJkSdXr1IDurqEYDxKAeZh7/Ybbm6lRNuo7Mlg71ISaGQ6pY3Nz5xdyjAXaaGbB6N0KRXVU9HnvfyCS7lzEVEAg/SELuWH0sZHXWdKck6uXzdCvqZTalONSV7o52bWd60BJR3v9DIdoYq7Ij9ANI/1lYbpP46NiLqwcFi7UC+s67uVYajzVj7iD/z2I0+ULhHVAAAAAElFTkSuQmCC" alt="" style="width:20px;margin-right:5px;display:block"></div>
                    <div class="weui_cell_bd weui_cell_primary">
                        <p>分期期数</p>
                    </div>
                    <div id="stageNumberBox"   class="weui_cell_ft">
					                        
					                       <%
					                       String attriburte = orderInstallInfo.getUnalter();
					                       if(attriburte!=null&&attriburte.contains("nper")){ 
					                       		
					                        	%>
					                            <input readonly="readonly" id="rate" name="rate"  data-rate="<%=orderInstallInfo.getRate()%>"   value="<%=orderInstallInfo.getNper()%>">
					                        	
					                        <%}else{
					                        	String ratelist = orderInstallInfo.getRatelist();
					                        	ratelist = ratelist.replaceAll("\"","\\\'"); 
					                        %>
					                    
					                            <input readonly="readonly" id="ra" data-array="<%= ratelist %>" name="rate"    value="<%=orderInstallInfo.getNper()%>">
					                         
					                        <%}%>
					 </div>
                </div>
                <div class="weui_cell">
                    <div class="weui_cell_prompt">
                        <p class="tar">分期手续费:仅需<span id="eachFee"></span>每期,共<span>0.00</span>元</p>
                    </div>
                </div>
                <div class="weui_cells_title bgb">还款测算(元)</div>
                <div class="weui_cell bgb bt0">
                    <div class="weui_cell_f4 lh20_m12">
                        <p id="eachPrincipal"></p>
                        <p class="fs14">商品本金</p>
                    </div>
                    <div class="weui_cell_f2 lh20_m12">
                        <p class="tc"> + </p>
                    </div>
                    <div class="weui_cell_f3 lh20_m12 tc">
                        <p class="eachFeeNum"></p>
                        <p class="fs14">手续费</p>
                    </div>
                    <div class="weui_cell_f2 lh20_m12">
                        <p class="tc"> = </p>
                    </div>
                    <div class="weui_cell_f6 lh20_m12">
                        <p id="eachMoney"></p>
                        <p class="plem fs14">每期</p>
                    </div>
                </div>
                <div class="weui_cell bgb pt">
                    <div class="weui_cell_bd lh20_m12">
                        <p class="ts12">分期总额(元):</p>
                    </div>
                    <div class="weui_cell_fl lh20_m12">
                        <p id="countMoney"></p>
                    </div>
                </div>
            </div>
            <!--        <div id="root_footer"></div>  -->
        </div>
        <div id="footer">
            <div id="agreement-box">
                <div id="checkButton">
                    <div class="icheckbox-blue checked">
                        <input type="checkbox" id="agreement-check" class="light" name="agreement" value="agreement" checked />
                    </div>
                    <label>我已阅读并同意</label>
                </div>
                <a id="contract" href="contract.html">《个人消费分期支付合同》</a>
            </div>
            <div>
                <a id="next-step" class="btn btn_disabled btn_default" href="javascript:;">下一步</a>
            </div>
        </div>
        <!-- 提示弹框 -->
        <div class="modal" id="tishuModal">
            <div id="back"></div>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">提示</h4>
                    </div>
                    <div id="msg_lable" class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <a type="button" id="modalButton">确认</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="${ctx}/installment/js/zepto.min.js"></script>
    <script type="text/javascript" src="${ctx}/installment/js/jquery-weui.min.js"></script>
    <script type="text/javascript" src="${ctx}/installment/js/common.js"></script>
    <script type="text/javascript" src="${ctx}/installment/js/applyPay.min.js"></script>
    <!--
    <script type="text/javascript" src="${ctx}/installment/jsDevelop/base/require.js"></script>
    <script type="text/javascript" src="${ctx}/installment/jsDevelop/components/winLocation.js"></script>
    <script type="text/javascript" src="${ctx}/installment/jsDevelop/lfqPay/cmodal.js"></script>
    <script type="text/javascript" src="${ctx}/installment/jsDevelop/lfqPay/apply1.js"></script>
    -->
</body>

</html>
