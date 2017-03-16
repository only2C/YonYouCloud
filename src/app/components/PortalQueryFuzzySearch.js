import React from 'react';
import { Link } from 'react-router';

export default class PortalQueryFuzzySearch extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getValue = () => {
        return $.trim(document.querySelector('#likeSearchInput'+this.props.comId).value);
    }


    updateQuery = () => {
        let currentValue = $.trim(document.querySelector('#likeSearchInput'+this.props.comId).value);
        let obj = {};
        obj.value = currentValue;
        obj.key = "likeQueryValue";
        this.props.updateFilter(obj,true,this.props.currentPageSize,0);
    }


    handleKeyDown =(e) => {
        var ENTER = 13;
        if( e.keyCode == ENTER ) {
            this.updateQuery();
        }
    }

    render() {
        return (
            <li>
                <span className="portal-table-search-span">模糊搜索</span>
                <input id={"likeSearchInput" + this.props.comId} onKeyDown={this.handleKeyDown}  type="text" placeholder="单据编号"  onChange={function() {}}  />
                <span   onClick={this.updateQuery} className="portal-table-search-btn"><i></i>查询</span>
            </li>
        )
    }
};
