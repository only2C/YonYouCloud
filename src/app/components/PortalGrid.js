import React from 'react';
import { Link } from 'react-router';
import Config from '../config';

if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

class PortalGrid extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cols: {},
            rows: []
        }
    }


    setMeta = (data) => {
        this.setState({
            cols: data
        });
    }

    setData = (data) => {
        this.setState({
            rows: data
        });
    }

    //打开单据
    clickBill = (billid, tradetype, tradeTypeName, djzt, status) => {
        let data = {};
        data.billid = billid;
        data.tradetype = tradetype;
        data.tradeName = tradeTypeName;
        data.djzt = djzt;
        data.spzt = status;
        this.openURL(data,this.props.clickBillUrl);
    }

    //打印
    prinBill = (billid, tradetype, billno, billmaker, djdl, pk_group) => {
        let data = {};
        data.billid = billid;
        data.tradetype = tradetype;
        data.billno = billno;
        data.billmaker = billmaker;
        data.djdl = djdl;
        data.pk_group = pk_group;
        this.openURL(data, this.props.clickPrintBillUrl, true);
    }

    //复制
    copyBill = (billid, tradetype, tradeName, djzt, spzt) => {
        let data = {};
        data.billid = billid;
        data.tradetype = tradetype;
        data.tradeName = tradeName;
        data.djzt = djzt;
        data.spzt = spzt;
        this.openURL(data,this.props.clickCpBillUrl);
    }

    //流程
    workFlowBill = (billid, tradetype, pk_org) => {
        let data = {};
        data.billid = billid;
        data.tradetype = tradetype;
        data.pk_org = pk_org;
        this.handler(data);
    }

    //提醒审批
    remindApprovalBill = (billid, tradetype, tradeName, billno) => {
        let data = {};
        data.billid = billid;
        data.tradetype = tradetype;
        data.tradeName = tradeName;
        data.billno = billno;
        $.ajax({
            type: "post",
            url: Config.portal.remindBill,
            dataType: "json",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            data: JSON.stringify(data),
            success: data => {
                if(data.success){
                    let alertMessage = {
                        title:"提示",
                        message:"提醒审批成功"
                    };
                    this.props.alertHandeler(alertMessage);
                }else{
                    let alertMessage = {
                        title:"提示",
                        message:data.message
                    };
                    this.props.alertHandeler(alertMessage);
                }
            },
            error: (xhr, status, err) => {
                let alertMessage = {
                    title:"提示",
                    message:"提醒审批失败"
                };
                this.props.alertHandeler(alertMessage);
                console.log(err.toString());
            }
        });
    }

    openURL = (data,apiUrl,isPrint) => {
        //获取数据(Ajax)
        $.ajax({
            type: "post",
            url: apiUrl,
            dataType: "json",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            data: JSON.stringify(data),
            success: data => {
                if (data.success == false) {
                    let alertMessage = {
                        title:"提示",
                        message:data.message||'暂不支持!'
                    };
                    this.props.alertHandeler(alertMessage);
                    return false;
                }
                if(isPrint){
                    window.open(Config.localUrl + data.url,"_blank","resizable=yes,titlebar=no,location=no,toolbar=no,menubar=no;top=100");
                }else{
                    window.open(Config.localUrl + data.url);
                }
            },
            error: (xhr, status, err) => {
                console.log(err.toString());
            }
        });

    }

    handler =(para) => {
        this.props.flowHandler(para)
    }


    render () {
        let _this = this;
        let cols = this.state.cols;
        let rows = this.state.rows;
        let isCommonGrid =pasreString2Boolean(this.props.isCommonGrid);
        //var onRow = this.props.onRow;

        function pasreString2Boolean(value){
            return /^true$/i.test( value);
        }

        function toArray(data) {
            var result = [];
            for (let col in cols) {
                result.push(data[col]);
            }
            return result;
        }


        function toDeepArray(data) {
            //alert(JSON.stringify(data));return;
            var result = [];
            for (let col in cols) {
                if (!col.includes('.')) {
                    result.push(data[col]);
                } else {
                    var strs = col.split('.');
                    var temp = data[strs[0]];
                    for (var i = 1; i < strs.length; i++) {
                        temp = temp[strs[i]];
                    }
                    result.push(temp);
                }
            }
            return result;
        }

        return (
            <table className="grid-table">
                <thead>
                    <tr>
                        {
                            toArray(this.props.cols).map(function (col,i) {
                                return (
                                    <th key={"grid-c"+i} style={{whiteSpace:"nowrap"}}><span className="grid-table-title">{col}</span></th>
                                )
                            })
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        rows.map((row, idx) => {
                            return (
                                <tr key={idx} >{

                                    toDeepArray(row).map(function (item,i) {
                                        if(i==0&&!isCommonGrid) {
                                            let itemArray = item.split('|');
                                            let djdl = row.djdl;
                                            let workFlowStyle = {"margin-left":"10px"};
                                            let opColStyle = {"text-align":"left"};
                                            let cpShowStatus = {"display":"none","margin-left":"10px"};
                                            let cpPlaceHolderStatus = {"display":"inline","width":"30px","margin-left":"38px"};
                                            if(djdl!='36D1'&&djdl!='F3'&& djdl!='F2'&& djdl!='F1'&& djdl!='F0'&&djdl!='FIV'&&djdl!='doc'&& row.tradetype!="2647"){
                                                cpShowStatus.display = "inline";
                                                cpPlaceHolderStatus.display = "none";
                                            }
                                            let remindApprovalShowStatus = {"display":"none","margin-left":"10px"};
                                            let raPlaceHolderStatus =  {"display":"inline","width":"30px","margin-left":"10px"};
                                            if(djdl!='36D1'&&djdl!='F3'&& djdl!='F2'&& djdl!='F1'&& djdl!='F0'&&djdl!='FIV'&&djdl!='doc'&& row.tradetype!="2647"){
                                                if(row.approvestatus!=1&&row.approvestatus!=-1&&row.approvestatus!=0){
                                                    remindApprovalShowStatus.display = "inline";
                                                    raPlaceHolderStatus.display = "none";
                                                }
                                            }
                                            return (
                                                <td key={"grid-idx"+i} style={opColStyle}>
                                                    <a onClick={ _this.prinBill.bind(this, row.billid, row.tradetype, row.billno, row.billmaker, row.djdl, row.pk_group)}>{itemArray[0]}</a>
                                                    <a style={workFlowStyle} onClick={_this.workFlowBill.bind(this,row.billid,row.tradetype,row.pk_org)}>{itemArray[1]}</a>
                                                    <a style={cpShowStatus} onClick={_this.copyBill.bind(this,row.billid,row.tradetype,row.tradeName,row.djzt,row.approvestatus)}>{itemArray[2]}</a>
                                                    <a style={cpPlaceHolderStatus}></a>
                                                    <a style={remindApprovalShowStatus} onClick={_this.remindApprovalBill.bind(this,row.billid,row.tradetype,row.tradeName,row.billno)}>{itemArray[3]}</a>
                                                    <a style={raPlaceHolderStatus}></a>
                                                </td>

                                            )

                                        }else if (i == 1&&!isCommonGrid) {
                                            return (
                                            <td key={"grid-idx"+i}><a href="javascript:void(0)"
                                                                      onClick={_this.clickBill.bind(this,row.billid,row.tradetype,row.tradeTypeName,row.djzt,row.status)}>{item}</a>
                                            </td>
                                        )
                                    }else if (i == 4&&!isCommonGrid) {
                                        return (
                                            <td key={"grid-idx"+i} className="total">{item}</td>
                                        )
                                    }else if(i == 5&&!isCommonGrid) {
                                        return (
                                            <td key={"grid-idx"+i} className="datestyle">{item}</td>
                                        )
                                    }else if(i == 7&&!isCommonGrid) {
                                        return (
                                            <td key={"grid-idx"+i} className="datestyle">{item}</td>
                                        )
                                    }else{
                                        return (
                                            <td key={"grid-idx"+i}>{item}</td>
                                        )
                                    }
                                })
                            }</tr>
                        )
                    })
                }

                </tbody>
            </table>

        );
    }
};

export default PortalGrid;
