import React from 'react';
import Config from '../config'
// import Message from './../components/Message';

export default class PortalMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Msg:{
                items: []
            }
        };
    }

    componentWillMount() {
        var _this=this;
        $.ajax({
            type:"post",
            url: Config.portal.getMessageData,
            data:{'userId':'1001781000000000007D','category':'notice'},
            dataType: "json",
            success: data => {
                if(data.success==true){
                    _this.callBack(data.rows);
                }else{
                    console.log(data)
                }

            },
            error: (xhr, status, err) => {
                console.log(err.toString());
            }
        });
    };

    callBack = (data) =>{
        /*msgsourcetype : "worklist"代表流程信息,"pfbizmsg"代表通知消息* */
        let json ;
        let worklist = [] , pfbizmsg =[] , other=[];
        const num = 5 ;
        $.each(data,function( index , value ){
            if(value.msgsourcetype == "worklist" && worklist.length < num){
                worklist.push(value);
            }else if(value.msgsourcetype == "pfbizmsg" && pfbizmsg.length < num){
                pfbizmsg.push(value);
            }else{
                // other
            }
        });

        json= [
            {
               title:'流程信息',
               content:worklist
            },
            {
                title:'通知消息',
                content:pfbizmsg
            },
            {
                title:'其他信息',
                content:other
            },
        ]


        this.setState({
            Msg: {
                items: json
            }
        });

    }


    messageCallback =(data) =>{
        let title ;
        if(data.length <= 0 ){
            title = <li><span>暂无数据... </span></li>
        }else{
            title = data.map(function(m1,i1){
                return (<li  key={"message-title-"+i1}><a href="javascript:;" title={m1.subject}>{m1.subject}</a></li>)
            });
        }
        return title ;
    }


    render() {
        var msgs = this.state.Msg.items;

        var _this = this;
        var msgLists = msgs.map(function(m0,i0){
                return (
                    <div className="message-container" key={"message-container"+i0}>
                        <p className="message-con-tit"><span>{m0.title}</span>
                            <a href="javascript:;" className="pub-btn-more"></a>
                        </p>
                        <ul className="message-box-list">
                            {_this.messageCallback(m0.content)}
                        </ul>
                    </div>

                )


            return msgLists;

        })

        return (
            <div className="message-box-container"> {msgLists}</div>
        );


        /*
        *
        * if(!msg || msg.length <= 0 ){
         return (<ul className="message-box-list"><li>暂无数据...</li></ul>)
         }else{

         msg.map(function(msg2,i2){
         return(
         <ul className="message-box-list"><li key={"message-title-"+i}><a href="javascript:;">{msg2.subject}</a></li></ul>
         )

         })


         }
        *
        * */
    }
};
