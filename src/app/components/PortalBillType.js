import React from 'react';
import { Link } from 'react-router';

import Config from '../config';

export default class PortalBillType extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            unCompletebillTypeInfo:[],
            completeBillTypeInfo:[],
            currentIndex: '',
            completeStaus: this.props.completeStatus
        };

        //this.init(this.state.completeStaus);
    }

    init =(completeStatus,timeZone,billState) => {
        let data = {};
        data.isHasCompletePortlet = "false";
        data.isHasComplete = "false";
        data.EALINKID = timeZone || "oneWeek";
        if(completeStatus=="true"){
            data.isHasCompletePortlet = "true";
            //data.isHasComplete = "false";
        }

        if(completeStatus=="false"){
            data.billStateQuery = billState;
        }

        data.isOtherQuery = false;
        data.likeQueryValue = "";
        data.size = 30;

        $.ajax({
            type:"post",
            url:  Config.portal.countbill,
            dataType: "json",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: JSON.stringify(data),
            success: data => {
                //触发事件
                if(!data.success){
                    return;
                }else{
                    let all = {"name":"全部","tradetype":"","num":""};
                    data.countData.unshift(all);
                   // callback(data.countData);
                    if(completeStatus=="true"){
                        this.setState({completeBillTypeInfo:data.countData})
                    }
                    if(completeStatus=="false"){
                        this.setState({unCompletebillTypeInfo:data.countData})
                    }

                }

            },
            error: (xhr, status, err) => {
                console.log(err.toString());
            }
        });
    }

    componentDidMount() {

    }


    tabChoiced=(id)=>{
        //tab切换方法
        this.setState({
            currentIndex:id
        });

        let obj = {};
        obj.value = id;
        obj.key = "expBillQueryType";
        this.props.updateFilter(obj,true,this.props.currentPageSize,0);
    }
    getCurrentIndexId(){
        return this.state.currentIndex;
    }

    render() {
       // alert('portalbillrender'+ JSON.stringify(this.props.billTypeCountInfo));
        var _this = this;
        var billTypeInfo = [];
        var leftBracket = "(";
        var rightBracket = ")";
        if(this.state.completeStaus=='true'){
            if(this.state.completeBillTypeInfo){
                billTypeInfo = this.state.completeBillTypeInfo.map(function(res,index) {
                    if(index==0){
                        leftBracket = "";
                        rightBracket = "";
                    }else{
                        leftBracket = " (";
                        rightBracket = ")";
                    }
                    var classStyle =res.tradetype==this.state.currentIndex ? 'portal-table-search-statu active' : 'portal-table-search-statu';
                    return <span  key={'tab-' + index} onClick={this.tabChoiced.bind(_this,res.tradetype)}  className={classStyle} >{res.name+leftBracket+res.num+rightBracket}</span>
                }.bind(_this));
            }

        }else if(this.state.completeStaus=='false'){
            if(this.state.unCompletebillTypeInfo){
                billTypeInfo = this.state.unCompletebillTypeInfo.map(function(res,index) {
                    if(index==0){
                        leftBracket = "";
                        rightBracket = "";
                    }else{
                        leftBracket = " (";
                        rightBracket = ")";
                    }
                    var classStyle =res.tradetype==this.state.currentIndex ? 'portal-table-search-statu active' : 'portal-table-search-statu';
                    return <span  key={'tab-' + index} onClick={this.tabChoiced.bind(_this,res.tradetype)}  className={classStyle} >{res.name+leftBracket+res.num+rightBracket}</span>
                }.bind(_this));
            }

        }

        return (

                <div>
                    <div><span className="portal-table-search-span">单据类型</span></div>
                    <div id="billtype-tab">{billTypeInfo}</div>
                </div>
        )

    }
};
