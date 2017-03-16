import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as portalQueryActions from '../actions/portalQuery';

import { Link } from 'react-router';
import { Button, ButtonToolbar } from 'react-bootstrap';
import PortalQuery from './../components/PortalQuery';
import PortalGrid from './../components/PortalGrid';
import PortalPage from './../components/PortalPage';
import Config from '../config';
import PortalFlow from './../components/PortalFlow';
import StaticModel from './../components/StaticModel';


class Complete extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            cols: {},
            rows: [],
            pageStatus:{"total":0,"total_page":1},
            pageSize:20
        }

        var self = this;
        this.init((result) => {
            this.state.cols = result.cols;
            this.state.rows = result.rows;
        });
    }

    init = (callback) => {
        var colsData = {
            'billop':'操作',
            'billno':'单据编号',
            'tradeTypeName':'单据类型',
            'defitem1':'单据状态',
            'total':' 金额',
            'billdate': '单据日期',
            'approverName':'审批人',
            'shrq': '审批日期',
            'defitem2':'审批状态',
            'payflagname':'支付状态'};

        var rowsData = [];

        callback({ cols: colsData, rows: rowsData});

    };


    componentWillMount() {

    }

    componentDidMount() {

    }

    updateCurrentQuery() {
        this.refs.portalquery.updateQuery();
        this.refs.portalquery.initPortalBillType('true');
    }

    specifiedPageSize = pageSize => {

        let obj = {};
        obj.value = pageSize;
        obj.key = "size";
        this.setState({pageSize:pageSize});

        this.refs.portalquery.handleFilterUpdate(obj,true,pageSize,0);
    }

    goPage = page => {
        let obj = {};
        obj.value = page - 1;
        obj.key = "index";
        this.refs.portalquery.handleFilterUpdate(obj,true,this.state.pageSize);
        this.refs.page.showCurrentPageNum(page);
        this.refs.page.setCurrentPage(page);
    }

    pageInit = (total,pageSize) => {
        let fixNum = parseInt(total/pageSize);
        let notFixNum = total/pageSize;
        let total_page = fixNum;
        if(notFixNum>fixNum) {total_page = fixNum+1}

        let obj = {};
        obj.total = total;
        obj.total_page = total_page;
        this.setState({pageStatus:obj});
    }

    query = (data,isGoPageAction,pageSize,reSetPageNum) => {
        this.refs.grid1.setMeta(this.state.cols);
        let tempRows = data.rows;
        let resultRows = [];
        for(let row in tempRows) {
            let tempRow = tempRows[row];
            tempRow.billop = '打印|流程|复制|提醒审批';
            resultRows.push(tempRow);
        }
        this.refs.grid1.setData(resultRows);
        this.pageInit(data.total,pageSize);
        if(reSetPageNum!=undefined)this.refs.page.resetFirstPage();
        if(!isGoPageAction){
            this.refs.page.resetFirstPage();
            this.refs.portalquery.resetTheIndexOfState();
        }

    }

    handlerFlow = (para) =>{
        this.refs.workflow.init(true,para);
    };
    
    handlerStaticModel = (para) =>{
        this.refs.alertmodel.showAlert(para);
    };

    render() {
        return (
            <div className="portal-table-header">
                <PortalQuery ref ="portalquery" index="0"  pageSize={this.state.pageSize}  isHasComplete="true" isHasCompletePortlet="true"  onQuery={this.query} queryUrl={Config.portal.billQueryUrl}/>
                <PortalGrid ref="grid1" isCommonGrid="false" cols={this.state.cols} rows={this.state.rows} clickBillUrl={Config.portal.clickBillUrl} clickPrintBillUrl={Config.portal.clickPrintBillUrl} clickCpBillUrl={Config.portal.clickCpBillUrl}   clickWorkFlowUrl={Config.portal.clickWorkFlowUrl} clickRemindUrl={Config.portal.remindBill}  flowHandler={this.handlerFlow} alertHandeler={this.handlerStaticModel} />
                <PortalPage ref="page" pageId="completePage"  page={this.state.pageStatus} onSpecifiedPageSize={this.specifiedPageSize} onSelect={index => this.goPage(index)} />
                <PortalFlow ref="workflow" />
                <StaticModel ref ="alertmodel" />
            </div>
        );
    }
};

export default Complete;
