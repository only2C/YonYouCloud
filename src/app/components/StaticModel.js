import React from 'react';
import {Modal,Button } from 'react-bootstrap';

class StaticModel extends React.Component{
    constructor(props) {
        super(props);
        props;
        this.state = {
            showModal:false,
            title:"",
            message:"",
            hasClose:true,
            hasCancel:false,
            cancelSureFn : '',   // if hasCancel == true 生效 （ 确定 callback ）
            cancelExitFn :''     // 同上  （取消  callback）
        }
    }

    close = () => {
        var cancelExitFn = this.state.cancelExitFn ;
        if(typeof cancelExitFn == 'function'){
            cancelExitFn()  ;
        }

        this.setState({ showModal: false });
    }

    sure = () =>{
        var cancelSureFn = this.state.cancelSureFn ;
        if(typeof cancelSureFn == 'function'){
            cancelSureFn()  ;
        }
        this.setState({ showModal: false });

    }

    showAlert = (para) =>{
        let _this = this;
        _this.setState({
            showModal: true,
            title:para.title?para.title:_this.state.title,
            message:para.message,
            hasClose:para.hasClose!=undefined?para.hasClose:_this.state.hasClose,
            hasCancel:para.hasCancel!=undefined?para.hasCancel:_this.state.hasCancel,
            cancelSureFn:para.cancelSureFn!=undefined?para.cancelSureFn:_this.state.cancelSureFn,
            cancelExitFn:para.cancelExitFn!=undefined?para.cancelExitFn:_this.state.cancelExitFn
    },function () {
            // let _windowHeight = $(window).height();
            let _dialog = $(".static-modal .modal-dialog");
            // let _modelHeight = _dialog.height();
            let _scrollTop = $(top.document).scrollTop();
            let _marginTop = _scrollTop === 0 ? 30 : _scrollTop;//+ _windowHeight>_modelHeight?(_windowHeight - _modelHeight)/2:0;
            _dialog.css({"margin-top":_marginTop+"px"});
        });
}

    render () {
        let _this=this;
        let modelHead=(
            <Modal.Header>
                <Modal.Title>{this.state.title}</Modal.Title>
            </Modal.Header>
        );
        if(this.state.hasClose){
            modelHead = (
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>)
        }
        let modelFoot = (
            <Modal.Footer>
                <Button bsStyle="primary" onClick={_this.close}>确定</Button>
            </Modal.Footer>
        );
        if(this.state.hasCancel){
            modelFoot = (
                <Modal.Footer>
                    <Button onClick={_this.close}>取消</Button>
                    <Button bsStyle="primary" onClick={_this.sure}>确定</Button>
                </Modal.Footer>
            );
        }

        return (
                <Modal show ={this.state.showModal} onHide={this.close} bsSize="small"  className ="static-modal">
                    {modelHead}
                    <Modal.Body>
                        {this.state.message}
                    </Modal.Body>
                    {modelFoot}
                </Modal>
        );
    }
};

export default StaticModel;
