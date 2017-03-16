import React from 'react';
import { Link } from 'react-router';

import  PortalTimeRange  from './PortalTimeRange';
import  PortalQueryState  from './PortalQueryState';
import  PortalBillType  from './PortalBillType';
import  PortalQueryFuzzySearch  from './PortalQueryFuzzySearch';

export default class PortalQuery extends React.Component{
    constructor(props) {
        super(props);
        this.updateQuery = this.updateQuery.bind(this);
        this.state = {
            data: {
                "isHasComplete": this.props.isHasComplete,
                "isHasCompletePortlet":this.props.isHasCompletePortlet,
                "expBillQueryType": "",
                "billStateQuery": "",
                "likeQueryValue": "",
                "index": this.props.index,
                "size": this.props.pageSize,
                "EALINKID":"oneWeek"
            }

        };
    }

    handleFilterUpdate = (obj,isGoPageAction,pageSize,reSetPageNum) => {

        let currentData = this.state.data;
        currentData[obj.key] = obj.value;
        currentData["likeQueryValue"] = this.refs.billLikeQuery.getValue();
        let timeZone = currentData["EALINKID"];
        let billStateQuery = currentData["billStateQuery"];
        this.refs.portalbilltype.init(this.props.isHasComplete,timeZone,billStateQuery);
        this.query(currentData,isGoPageAction,pageSize,reSetPageNum);
    }

    initPortalBillType= (status) => {
        this.refs.portalbilltype.init(status);
    }

    resetTheIndexOfState = () => {
        this.setState({
            index: 0
        });
    }

    componentDidMount() {
        if(this.state.data.isHasComplete=='true') return;
        this.query(this.state.data,true,this.state.data.size);
        this.initPortalBillType('false');
    }

    updateQuery =() => {
        this.query(this.state.data,true,this.state.data.size);
    }

    query = (data,isGoPageAction,pageSize,reSetPageNum) => {
        //获取数据(Ajax)
        if(reSetPageNum!=undefined) {
            data.index = reSetPageNum;
        }
        $.ajax({
            type:"post",
            url: this.props.queryUrl,
            dataType: "json",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: JSON.stringify(data),
            //data: data,
            success: data => {
                //触发事件
                if(!data.success) return;
                this.props.onQuery(data,isGoPageAction,pageSize,reSetPageNum);
            },
            error: (xhr, status, err) => {
                console.log(err.toString());
            }
        });

    }

    render() {

        if(this.state.data.isHasCompletePortlet=="true"){
            return (
                <ul className="portal-table-search">
                    <PortalTimeRange currentPageSize={this.state.data.size}  updateFilter={this.handleFilterUpdate}/>
                    <PortalBillType  ref="portalbilltype"    completeStatus="true" currentPageSize={this.state.data.size}   updateFilter={this.handleFilterUpdate} />
                    <PortalQueryFuzzySearch ref="billLikeQuery" comId="001" updateFilter={this.handleFilterUpdate}  />
                </ul>

            )
        }else {
            return (
                <ul className="portal-table-search">
                    <PortalQueryState currentPageSize={this.state.data.size} updateFilter={this.handleFilterUpdate}/>
                    <PortalTimeRange currentPageSize={this.state.data.size}  updateFilter={this.handleFilterUpdate}/>
                    <PortalBillType ref="portalbilltype"   completeStatus="false" currentPageSize={this.state.data.size}  updateFilter={this.handleFilterUpdate}  />
                    <PortalQueryFuzzySearch ref="billLikeQuery" comId="002" currentPageSize={this.state.data.size} updateFilter={this.handleFilterUpdate}  />
                </ul>

            )
        }

    }
};
