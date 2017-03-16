//var serverUrl = 'http://20.1.78.13:3000';  // 服务器地址
//var localUrl = "http://127.0.0.1:8080";      // Tomcat

//调用java api的url
var serverUrl = "http://" + location.host+"/iwebap";

//portal的url
var localUrl = "http://" + location.host;


var Config = {

    serverUrl:serverUrl,
    localUrl: localUrl ,

    portal:{
        getMenuAll:serverUrl+'/menu',    //菜单action
        getMenuData:serverUrl+'/menu/url',    //菜单真实url
        getMenuProfile:serverUrl + '/portlet/userprofile',    //菜单个性化设置
        getMessageData:serverUrl+'/message/query',  // 消息查询
        getWorkFlowData:serverUrl+'/portlet/workflow',    //流程
        remindBill:serverUrl+'/portlet/remindbill',    //提醒审批,
        countbill:serverUrl+'/portlet/countbill',    //单据类型信息查询,
        billQueryUrl:serverUrl+'/portlet/query',    //单据查询,
        clickBillUrl:serverUrl+'/portlet/clickbill',    //打开单据页面,
        clickPrintBillUrl:serverUrl+'/portlet/printbill',    //单据类型信息查询,
        clickCpBillUrl:serverUrl+'/portlet/copybill',    //单据类型信息查询,
        clickWorkFlowUrl:serverUrl+'/portlet/workflow',    //单据类型信息查询,
    }

};

export default Config;
