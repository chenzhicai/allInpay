<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@page import="com.allinpay.payinstallment.model.*"%>
<%@ include file="/commons/taglibs.jsp" %>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>通联支付系统</title>
    <link type="text/css" href="${ctx}/installment/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="${ctx}/installment/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link type="text/css" href="${ctx}/installment/css/installmentPay.css" rel="stylesheet">
    
    <style type="text/css">
    #yujizaitu {
        width: 0px;
        background-image: url("${ctx}/installment/images/pcimg/icon-s4e571f86be.png");
        /*        background-image:url("img/backgrpund.png"); */
    }
    </style>
    <script type="text/javascript">
        window.BASE_URL = "/assetbm";
    </script>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body class="icon-backgrpund" style="background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKEAYAAADdohP+AAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAKAAAACgBOpnblAAACE0lEQVQoz0XSvyv8ARzH8efrfR8ll4Uuw20s5yLEaJVSBqPFP8BgYLbZpRgo9VmunLoMFpcy2PwIXRbDKSldSdwly31e3+mbv+Hx0Ff6lX6ltvLKKw+hUAh87WtfQzaWjWVjEIdxGIfALrvsQpZkSZZArMZqrIJLLrkEalfb1XbV1prWtAZuuukm+MlPfoKoRS1q4H73ux+444474J133oEZZpgBlVRSCULHOtYxkCNHDmjQoAEUKVKEbDPbzDbBeeedB/e4xz2gFa1oBZhgggnwtre9DeosdhY7izYFChSg2+q2ui2IcpSjDAwwwABwww03gBACPetZz+CGG24ACyywAPo+/T79PrX1q1/9Avvssw8e8YhHQKMa1SioqKKK4GUvexn44IMPYJxxxoFeeumFUJ/61Aee9KQnQTva0Q7kznJnuTPQnva0B06cOIH/eLrVrW6BN954A6aZZhrUfmm/tF9sD3nIQxAncRInwBRTTEG32W12m6BEiRLQgx70AFxyySWwxBJLwDzzzEPoSEc6AqpUqULWylpZC7KNbCPbgBiMwRgEVVRRBdhii60/RH3qU5/gggsuQDh16hR0pStdgc51rnPQq171CkqVKoW4iIu4ANZZZx1UV131v38xF3MxB+rMdmY7s7brrrsOPvCBD0A/+tEPUKZMGRhmmGGgQoUK+NGPfgTXXHMN4j7u4x7+AQcx+/rWMoNRAAAAAElFTkSuQmCC)">
    <div id="root" class="container">
        <div class="header">
            <div class="float-l">
                <span class="icon-cardLogo"></span>
            </div>
            <div class="float-r">
                <div class="font-s22 float-l">个人网上支付系统</div>
                <div class="float-r"><a href="http://www.ulinkpay.com/">通联商务官方网站</a><span class="margin-l-r10">|</span><a class="guanzuwei"><span class="icon-wxtb"></span>关注公众号，在线提问<span class="QR-img"><span class="icon-wechat"></span></span></a></div>
            </div>
        </div>
        <div class="content">
            <div>
                <div class="float-l">
                    <div class="panel">
                        <div class="panel-heading">
                            <h3 class="panel-title"><span class="dingdan_icon"><span class="icon-dingdan"></span></span>订单信息</h3>
                        </div>
                        <div class="panel-body">
                            <div>
                                <span>订单金额 :</span><span id="totalNum"><fmt:formatNumber value="${orderInstallInfo.amount}" pattern="0.00"/>元</span>
                            </div>
                            <div>
                                <span>支付货币 :</span><span>人民币</span>
                            </div>
                            <div id="commodityNameBox">
                                <span>商户名称 :</span><span id="commodityName">${orderInstallInfo.merName}</span>
                            </div>
                            <div>
                                <span class="letter-s">订单号:</span><span id="orderNum">${orderInstallInfo.orderId}</span>
                            </div>
                            <div>
                                <span>订单日期 :</span><span id="payDate">${ordertime } </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="icon-banner"></span>
                    </div>
                </div>
                <div class="float-r">
                    
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="home">
                            <div class="cardInfo-header">
                                <span> <span class="badge checked">1</span> 还款测算</span> > <span> <span class="badge">2</span> 填写信息</span> > <span> <span class="badge">3</span> 完成</span>
                            </div>
                            <div id="countBox">
                                <div class="row firstRow">
                                    <span class="title">分期期数:</span>
                                   <div id="stageNumberBox"  hidden="hidden"   class="weui_cell_ft">
					                        
					                    <input readonly="readonly" id="rate" name="rate"  data-rate="${orderInstallInfo.rate }"   value="${orderInstallInfo.nper }">
					                        	
					                    <input readonly="readonly" date-neprstate="${nperstate}" id="ra"  data-lowarray="${LowLimit}" data-uparray="${UpLimit }"    data-array="${rateList }" name="rate"    value="${orderInstallInfo.nper }">
					                         
					   
					                 </div>
                                     <select id="rateSelect">
                                       <!--  <option value="3.25">6期</option>
                                        <option value="4.25">12期</option> -->
                                    </select> 
                                </div>
                                <div class="row">
                                    <span class="title">每期手续费率:</span>
                                    <span class="info" id="eachRate">0.00</span>
                                    <span></span>
                                </div>
                                <div class="row">
                                    <span class="title">每期手续费:</span>
                                    <span class="info" id="eachFeeNum">0.00</span>
                                    <span>元</span>
                                </div>
                                <div class="row">
                                    <span class="title">每期还款金额:</span>
                                    <span class="info" id="eachMoney">0.00</span>
                                    <span>元</span>
                                </div>
                                <div class="row">
                                    <span class="title">总手续费:</span>
                                    <span class="info" id="allFeeNum">0.00</span>
                                    <span>元</span>
                                </div>
                                <div class="row">
                                    <span class="title">分期总额:</span>
                                    <span class="info" id="countMoney">0.00</span>
                                    <span>元</span>
                                </div>
                                <div class="nextBox">
                                    <button id="toFill">下一步</button>
                                </div>
                            </div>
                            <div id="cardInfo" class="hide cardInfo demoform">
                                <table width="500" style="table-layout:fixed;">
                                    <tbody>
                                        <tr>
                                            <td width="150" class="tar"><span class="need">*</span>姓名：</td>
                                            <td width="200">
                                                <input id="userName" class="inputNum" type="text" value="${orderInstallInfo.custName==null?'':orderInstallInfo.custName }" placeholder="中文姓名" datatype="zh2-15" errormsg="请输入2到8个中文字符">
                                            </td>
                                            <td width="150">
                                                <div class="Validform_checktip">请输入中文姓名</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tar"><span class="need">*</span>身份证：</td>
                                            <td>
                                                <input id="userId" maxlength="22" class="inputNum" type="text" value="${orderInstallInfo.idno==null?'':orderInstallInfo.idno }"    placeholder="身份证号" datatype="sfz" errormsg="请输入身份证号">
                                            </td>
                                            <td>
                                                <div class="Validform_checktip">请输入身份证号。</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tar"><span class="need">*</span>信用卡号：</td>
                                            <td>
                                                <input maxlength="22" id="creditCard" class="inputNum" type="text"   value="${orderInstallInfo.creditCardno==null?'':orderInstallInfo.creditCardno }" placeholder="信用卡号" datatype="xk16" errormsg="信用卡号错误">
                                            </td>
                                            <td>
                                                <div class="Validform_checktip">请输入信用卡号。</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tar"><span class="need">*</span>CVN2：</td>
                                            <td>
                                                <input maxlength="3" id="cvn2" class="inputNum" type="number" placeholder="CVN2" datatype="n3-3" errormsg="请输入CVN2">
                                            </td>
                                            <td>
                                                <div class="Validform_checktip">请输入CVN2。</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tar"><span class="need">*</span>有效期：</td>
                                            <td>
                                                <div class="form-group">
                                                    <div class="input-group date form_month" data-date="102/16" data-date-format="mm/yy" data-date-viewmode="years" data-date-minviewmode="moths">
                                                        <input id="dateInput" class="form-control" size="16" type="text" value=""  readonly>
                                                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                                    </div>
                                                    <input type="hidden" id="dtp_input2" value="" />
                                                </div>
                                                <!-- 
                                                <input id="timeNum" type="text" datatype="n6-6" errormsg="请输入有效期" class="inputNum" placeholder="有效期">
                                             -->
                                            </td>
                                            <td>
                                                <div id="timeCheckTip" class="Validform_checktip">请输入有效期</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tar"><span class="need">*</span>银行预留手机号：</td>
                                            <td>
                                                <input maxlength="15" id="userPhone"    value="${orderInstallInfo.hpno==null?'': orderInstallInfo.hpno}"  class="inputNum" type="text" placeholder="手机号" datatype="sjh" errormsg="请输入手机号">
                                            </td>
                                            <td>
                                                <div class="Validform_checktip">请输入手机号。</div>
                                            </td>
                                        </tr>
                                        <tr class="mh">
                                            <!--</tr>
                                            <tr> -->
                                            <td class="tar"><span class="need">*</span>验证码：</td>
                                            <td>
                                                <input id="verifyCode" class="inputNum" type="text" placeholder="验证码" datatype="n4-4" errormsg="请输入验证码">
                                                <button id="vCodeButton">获取短信验证码</button>
                                            </td>
                                            <td>
                                                <div class="Validform_checktip">请输入验证码。</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <input type="hidden" name="orderId" id="orderId" value="${orderIddes }">
                                <input type="hidden" name="signs" id="signs" value="${signs }">
                                <input type="hidden" name="urlrerurn" id="urlrerurn" value="${orderInstallInfo.returnUrl }">
                                <input type="hidden" name="state" id="state" value="${orderInstallInfo.state }">
                                <input type="hidden" name="onlyData" id="onlyData" value="${orderInstallInfo.unalter }">
                                <div id="agreement-box">
                                    <div id="checkButton">
                                        <div class="icheckbox-blue checked">
                                        </div>
                                        <span>我已阅读并同意</span>
                                    </div>
                                    <a href="javascript:;" class="" data-toggle="modal" data-target="#myModal">《个人消费分期支付合同》</a>
                                </div>
                                <div class="paydiv">
                                    <button id="sureButton">确认支付</button>
                                </div>
                            </div>
                            
                            <div id="paySucceed" class="hide">
                                <p class="font-s20">
                                    <span class="icon-chenggong"></span> <span id="payFinally">您已支付成功</span>
                                    <!--<span id="paySucceedNum">285.00<span>元</span></span>  -->
                                </p>
                                <p class="tishu-color9">该页面将在<span id="countdown10">10</span>秒后自动跳转到商城首页</p>
                                <p><a href="#">返回商城</a></p>
                            </div>
                        </div>
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
    </div>
    <div id="footer">
        <div><span>公司地址：上海市浦东新区杨高南路799号陆家嘴世纪金融广场3号楼8层</span></div>
        <p><span>版权所有：通联商务服务有限公司</span><span>沪ICP备13043030号-1</span></p>
    </div>
    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                ...
            </div>
        </div>
    </div>
    <div id="aboutMoal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Modal title</h4>
                </div>
                <div class="modal-body">
                    <p>One fine body&hellip;</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">确定</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <div id="loding" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                
                <div class="modal-body">
                    <img src="${ctx}/installment/images/pcimg/loding.gif">
                    <p>订单支付中,请勿刷新</p>
                </div>
                
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
    <!-- Modal -->
    <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel">合同协议</h4>
                </div>
                <div class="modal-body">
                    <iframe src="../../installment/jsp/contract.html"></iframe>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">知道了</button>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="${ctx}/installment/js/urlVar.js"></script>
    <script type="text/javascript" src="${ctx}/installment/js/libs/jquery-1.12.0.min.js"></script>
    <script type="text/javascript" src="${ctx}/installment/js/libs/bootstrap4.0.0.min.js"></script>
    <script type="text/javascript" src="${ctx}/installment/js/installment/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="${ctx}/installment/js/libs/Validform_v5.3.2_min.js"></script>
    <script type="text/javascript" src="${ctx}/installment/js/installment/common.js"></script>
    <script type="text/javascript" src="${ctx}/installment/js/installment/installmentPayment.min.js"></script>
</body>

</html>
