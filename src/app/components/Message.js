import React from 'react';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        props
    }


    render() {
        let message = this.props.message;
        let repoList = message.typedata.map(function (result, i ){
            return (
                <div key={"message-tit"+i}>
                <p className="message-con-tit"><span>{result.msgtpye}</span>
                    <a href="javascript:;" className="pub-btn-setting"></a></p>
                <ul className="message-box-list">
                    {result.msg.map(function(value,index){
                        return (<li key={"message-title-"+index}><a href="javascript:;">{value.title}</a></li>)                    }
                     )
                    }
                </ul>
                </div>
            )
        })
        return (
            <div className="message-container">
                {repoList}
            </div>
        );
    }
};
