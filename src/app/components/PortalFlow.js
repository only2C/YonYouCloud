import React from 'react';
import Config from '../config';
import {Modal,Tabs,Tab} from 'react-bootstrap';
import PortalGrid from './../components/PortalGrid';

export default class PortalFlow extends React.Component {
    constructor(props) {
        super(props);
        // props;
        this.state = {
            showModal:false,
            flowResult:{},
            cols: {
                'sendername':'发送人',
                'senddate':'发送时间',
                'checkname':'审核人',
                'dealdate':'处理时间',
                'ischeck':' 是否审批',
                'checknote': '批语',
                'messagenote':'消息内容'
            },
        }
    }
    close = () => {
        this.setState({ showModal: false });
    }

    init = (flag,para)=>{
        let $this = this;
        $.ajax({
            type: "post",
            url: Config.portal.getWorkFlowData,
            dataType: "json",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            data: JSON.stringify(para),
            success: data => {
                if(data.success){
                    $this.setState({
                        showModal:true,
                        flowResult:data
                    });
                    this.refs.gridFlow.setMeta(this.state.cols);
                    this.refs.gridFlow.setData(data.data);
                    $this.setModelPosition(true);
                }else{
                    $this.setState({
                        showModal:true,
                        flowResult:{}
                    },$this.setModelPosition);
                }

            },
            error: (xhr, status, err) => {
                console.log(err.toString());
            }
        });
    }
    setModelPosition = (flag)=>{
        if(flag) {
            setTimeout(function () {
                let _dialog = $(".dialog-flow.modal-lg.modal-dialog");
                let _marginTop = $(top.document).scrollTop();
                let _windowHeight = $(window).height();
                let _modelHeight = _dialog.height() + 260;
                if(_windowHeight <= _modelHeight){
                    _marginTop = 0;
                    _dialog.css({"top":_marginTop,"margin-top":0,"margin-bottom":0});
                }else if(_marginTop > 0 && ($(top.document).height() <= (_modelHeight + _marginTop))){
                    _marginTop = $(top.document).height() - _modelHeight;
                    _dialog.css({"top":_marginTop+"px","margin-bottom":0});
                }else{
                    _dialog.css({"top":_marginTop+"px"});
                }
            },100)
        }else{
            let _marginTop = $(top.document).scrollTop();
            let _dialog = $(".dialog-flow.modal-lg.modal-dialog");
            _dialog.css({"top":_marginTop+"px"});
        }
    }

    render() {
        let flowResult =this.state.flowResult;
        let tabs;
        if(this.state.showModal){
            if(flowResult['success']==undefined){
                tabs=(<div>该单据暂无流程信息</div>);
            }else{
                if(!flowResult.isHaveSubImg){
                    tabs =(
                        <Tabs defaultActiveKey={1} id="flow-tab">
                            <Tab eventKey={1} title="主流程"><img className="max-h-260" src={flowResult.imgUrl?flowResult.imgUrl:"image/public/loading.gif"} /></Tab>
                        </Tabs>
                    )
                }
                else{
                    tabs = (
                        <Tabs defaultActiveKey={1} id="flow-tab">
                            <Tab eventKey={1} title="主流程"><img className="max-h-260" src={flowResult.imgUrl} /></Tab>
                            <Tab eventKey={2} title="子流程"><img className="max-h-260" src={flowResult.subImgUrl} /> </Tab>
                        </Tabs>)
                }
            }
        }else{
            tabs=(<div></div>);
        }
        return (
            <Modal show ={this.state.showModal} onHide={this.close}  bsSize="large" dialogClassName="dialog-flow" aria-labelledby="contained-modal-title-lg" >
                {<Modal.Header closeButton>
                    <Modal.Title>联查审批情况</Modal.Title>
                </Modal.Header>
                }
                <Modal.Body>
                    {tabs}
                    <div className="flow-grid">
                        <PortalGrid ref="gridFlow" isCommonGrid="true" cols={this.state.cols} rows={this.state.rows}  />
                    </div>
                </Modal.Body>
            </Modal>
        );


    }
};
