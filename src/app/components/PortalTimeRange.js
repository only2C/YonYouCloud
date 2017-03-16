import React from 'react';
import { Link } from 'react-router';

export default class PortalTimeRange extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tabs:[
                {tabName: '一周内', id: 'oneWeek'},
                {tabName: '一月内', id: 'oneMonth'},
                {tabName: '两月内', id: 'twoMonth'},
                {tabName: '三月内', id: 'threeMonth'},
                {tabName: '不限', id: 'none'}
            ],
            currentIndex: 'oneWeek',
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
        obj.key = "EALINKID";
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
                <span className="portal-table-search-span">时间范围</span>
                {tabList}
            </li>
        )
    }
};
