import React from 'react';
import { Link } from 'react-router';

export default class PortalQueryState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tabs:[
                {tabName: '全部', id: ''},
                {tabName: '未提交', id: '-1'},
                {tabName: '审批中', id: '2'}
            ],
            currentIndex: '',
        };
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
        obj.key = "billStateQuery";
        this.props.updateFilter(obj,true,this.props.currentPageSize,0);
    }
    getCurrentIndexId=() => {
        return this.state.currentIndex;
    }

    render() {
        var _this = this;
        var tabList = this.state.tabs.map(function(res,index) {
            var classStyle =res.id==this.state.currentIndex ? 'portal-table-search-statu active' : 'portal-table-search-statu';
            return <span  key={'tab-' + index} onClick={this.tabChoiced.bind(_this,res.id)}  className={classStyle} >{res.tabName}</span>
        }.bind(_this));
        return (
            <li  style={{display: 'block'}}>
                <span className="portal-table-search-span">审批状态</span>
                {tabList}
            </li>
        )
    }
};
