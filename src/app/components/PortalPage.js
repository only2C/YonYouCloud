import React from 'react';
import {Pagination} from 'react-bootstrap';

export default React.createClass({
    getInitialState() {
        return {
            specifiedPageNum:1

        };
    },

    componentWillMount() {

    },

    componentDidMount() {

    },

    handleSelect(event, selectedEvent) {
        var page = selectedEvent.eventKey;
        if (page == this.state.activePage) return;

        this.setState({
            activePage: page
        });
        this.props.onSelect(page)
    },

    handleChangePageSize ()  {
        this.setState({
            activePage: 1,

        });
        this.props.onSpecifiedPageSize(document.querySelector('#'+ this.props.pageId + 'lang').value);
    },

    showCurrentPageNum(page){
        document.querySelector('#'+ this.props.pageId + 'input').value = page;
    },

    resetFirstPage(){
        this.setState({
            activePage: 1,

        });
        document.querySelector('#'+ this.props.pageId + 'input').value=1;
    },
    setCurrentPage(page){
        this.setState({
            activePage:parseInt(page) ,
        });
    },

    validateNum(value){
        var reg = new RegExp("^[0-9]*$");
        if(reg.test(value)){
            return true;
        }else{
            return false;
        }
    },
    goToPage(){
        let specifiedPageNum = document.querySelector('#'+ this.props.pageId + 'input').value;
        if(specifiedPageNum=="") {
            this.setState({
                activePage: 1
            });
            this.props.onSelect(1);
            return;
        }
        if(!this.validateNum(specifiedPageNum)){
            alert('请输入有数值');
            return;
        }
        if(specifiedPageNum > this.props.page.total_page || specifiedPageNum<1){
            alert('请输入有效页码范围');
            return;
        }

        if (specifiedPageNum == this.state.activePage) return;

        this.setState({
            activePage: parseInt(specifiedPageNum)
        });

        this.props.onSelect(specifiedPageNum)
    },

    handleKeyDown (e) {
      var ENTER = 13;
      if( e.keyCode == ENTER ) {
        this.goToPage();
      }
    },

    render() {
        var isDisplay = {"display":""};

        if(this.props.page.total<=20){
            isDisplay = {"display":"none"};
        }

        return (
            <div style={isDisplay}>
                <div className="pagination-style" >
                    <span>共</span> <span className="color-blue">{this.props.page.total}</span> <span>条</span>  显示
                    <select id={this.props.pageId + "lang"} onChange={this.handleChangePageSize}  className="page_z">
                        <option value="20">20</option>
                        <option vaule="40">40</option>
                        <option vaule="60">60</option>
                        <option vaule="80">80</option>
                        <option value="100">100</option>
                    </select>条 转到
                    <input onKeyDown={this.handleKeyDown} placeholder="1" type="text" className="page_j" id={this.props.pageId + "input"} onChange={function() {}} />页
                    <input className="btn pagination-jump" type="button" onClick={this.goToPage} value="确定" />
                </div>
                <Pagination className="pagination-portal"
                            prev
                            next
                            first
                            last
                            ellipsis
                            items={this.props.page.total_page}
                            maxButtons={10}
                            activePage={this.state.activePage}
                            onSelect={this.handleSelect}/>
            </div>

        );

    }
});