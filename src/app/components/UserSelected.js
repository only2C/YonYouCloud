import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button,Modal} from 'react-bootstrap';
import * as  portalMenus from '../actions/portalMenu';
import Config from '../config';

class UserSelected extends React.Component  {
    constructor(props){
        super(props);
        props;
        this.state = { showModal:false , menus:[],checkedList:[],localData:[] , dialogTips :false };
    }


    //初始化 / 读取 本地缓存
    componentWillMount = () => {
       this.readDatabase();
    }


    // 读取用户常用数据
    readDatabase = () =>{
        var _this = this ;
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: Config.portal.getMenuProfile + '/menu',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            success: function (data) {
                if(data.success == true ){
                    _this.setState({checkedList:data.value,showModal: false});
                }else{
                    // error
                }
            },
            error:function(){
            }
        })

    }



    /*getData = () =>{
        let $this = this;
        localforage.getItem('localSelected').then(function(value) {
            $this.setState({checkedList:value});
                //    发请求取数据
                $this.props.getPortalMenu(menu =>{
                    // 菜单json数组,取前三个
                    value=[];
                    for(let i = 0;i<menu.length;i++){
                        let subMenu = menu[i].submenu;
                        if(subMenu && subMenu.length>0){
                            for(let j = 0;j<subMenu.length;j++){
                                if(value && value.length>=3)
                                    break;
                                let valueItem={};
                                valueItem.id = "first-"+i+"-m-"+j;
                                valueItem.menuitemname=subMenu[j].menuitemname;
                                valueItem.tradetype = subMenu[j].tradetype;
                                value.push(valueItem);
                            }

                        }
                    }
                    $this.setState({checkedList:value});
                });
        });
    }*/

    open = (e) =>{
        let $this = this ;
        this.props.getPortalMenu(menu =>{
            // 菜单json数组，可配置多个参数。
            $this.setState({
                menus:menu,
                showModal: true
            },
               function (){
                  setTimeout(
                      function(){
                        $this.selectInp()
                      },
                      100
                  )
               }
            );
        });

    }


    // 设置勾选状态
    selectInp = () =>{
        var _this = this ;
        let _input ;
        let _checked = _this.state.checkedList;
        if(top.location != location){
            _input = $("#dialog-menu-list .dialog-check .dialog-check-icon");
        }else{
            _input = top.$("#dialog-menu-list .dialog-check .dialog-check-icon");
        }
        if(!_input || !_checked || _checked.length <= 0){
            return false;
        }
        $.each(_checked , function(i,v){
            $.each(_input,function(m,n){
                if( _checked[i].id ==  _input.eq(m).siblings("span").data("select") ){
                    _input.eq(m).addClass("dialog-two-sure").siblings("span").addClass("dialog-sure-hover");
                    $(".dialog-two-sure").attr("title","取消快捷设置");
                }else{
                    _input.eq(m).attr("title","添加快捷设置");
                }
            })
        })
    }

    close = () => {
        var oldCheckedList = this.state.checkedList ;
        
        // compare data
        let _isCheck ;
        if(top.location != location){
            _isCheck = $("#dialog-menu-list .dialog-check .dialog-check-icon");
        }else{
            _isCheck = top.$("#dialog-menu-list .dialog-check .dialog-check-icon");
        }

        var _checked = [];
        $.each(_isCheck,function(i,inp){
            let _inp = $(inp);
            if(_inp.hasClass("dialog-two-sure") ){
                _checked.push({"id":_inp.siblings("span").attr("data-select"),
                    "tradetype":_inp.siblings("span").attr("data-tradetype"),
                    "menuitemname":_inp.siblings("span").attr("data-menuitemname")
                });
            }
        });

       // 耗费性能
        var oldLength =  oldCheckedList.length ;
        var newLength =  _checked.length  ;
        var _this = this ;
        let alertMessage = {
            title:"",
            message:"您的快捷菜单已经修改，是否要保存？",
            hasClose:false,
            hasCancel:true ,
            cancelSureFn:function(){_this.saveSubmit()} ,
            cancelExitFn:function(){_this.closeTips()}

        };
        if(oldLength != newLength){
            // 是否保存 。。
            _this.props.alertHandeler(alertMessage);
            return false ;
        }

        for(var i = 0  ; i < oldCheckedList.length ; i++ ){
            if(oldCheckedList[i].id != _checked[i].id){
                _this.props.alertHandeler(alertMessage);
                return false ;
            }
        }

         this.setState({ showModal: false });
    }

    //提示框窗口事件
    closeTips =() => {
        this.setState({ showModal: false ,dialogTips :false  });
    }

    saveSubmit =() =>{
        this.submit() ;
        this.setState({ dialogTips :false  });
    }


    submit =() => {
        var _this = this;
        let _isCheck ;
        if(top.location != location){
            _isCheck = $("#dialog-menu-list .dialog-check .dialog-check-icon");
        }else{
            _isCheck = top.$("#dialog-menu-list .dialog-check .dialog-check-icon");
        }

        var _checked = [];
        $.each(_isCheck,function(i,inp){
             let _inp = $(inp);
            if(_inp.hasClass("dialog-two-sure") ){
                _checked.push({"id":_inp.siblings("span").attr("data-select"),
                            "tradetype":_inp.siblings("span").attr("data-tradetype"),
                            "menuitemname":_inp.siblings("span").attr("data-menuitemname")
                });
            }
        });
        if( _checked.length > 16){
            let alertMessage = {
                title:"提示",
                message:"最多只能选16个"
            };
            this.props.alertHandeler(alertMessage);
            return false ;
        }else{
            var jsonData ={
                "key":"menu",
                "value":JSON.stringify(_checked)
            }
            $.ajax({
                type:'POST',
                url:Config.portal.getMenuProfile + "/menu",
                dataType: 'json',
                data: JSON.stringify(jsonData),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                success:function (data) {
                    if(data.success){
                        if(_checked.length>0)
                            _this.setState({checkedList:_checked,showModal: false});
                        else{
                            _this.setState({showModal: false});
                            _this.readDatabase();
                        }
                    }
                },
                error:function(){}
            })
        }


    };

    // save 用户所选数据
    checkOption = (e) => {
        let el = $(e.currentTarget) || $(e.current);
        let check_yes = 'dialog-two-sure' ;
        if(el.hasClass(check_yes))
        {
            el.removeClass(check_yes).siblings("span").removeClass("dialog-sure-hover");
            $(".dialog-check-icon").attr("title","添加快捷设置");
        }
        else{
            el.addClass(check_yes).siblings("span").addClass("dialog-sure-hover")
                $("."+check_yes).attr("title","取消快捷设置");
        }
    }

    openURL =(tradeTypeCode,tradeTypeName) =>{
        var _this = this;
        var jsonData = {
            "tradetype": tradeTypeCode,
            "tradeName": tradeTypeName
        };
        $.ajax({
            type: 'POST',
            url: Config.portal.getMenuData,
            headers: {
              "Content-Type": "application/json; charset=utf-8"
              //   "Accept": "application/json; charset=utf-8"
            },
            data: JSON.stringify(jsonData),
            //data:jsonData,
            success: function(data){
                if(typeof data ==="string")
                data = JSON.parse(data);
                if(data.success == false){
                    let alertMessage = {
                        title:"提示",
                        message:"非IWEB应用...暂不支持"
                    };
                    _this.props.alertHandeler(alertMessage);
                    return false ;
                }else{
                    window.open("http://"+ window.location.host + data.url);
                    _this.close();
                }
            },
            error:function(){
                console.log("Inter error 404");
            }
        });
    }
    userOptionScoll =(statu,e) => {
        var _dom = $(".user-box-all .user-box-list");
        var _span = $(".user-slider-num span");
        var _prev = $(".user-slider-prev");
        var _next = $(".user-slider-next");
        // 0 left   1 right   2 圆点
        if (statu == 0) {
            _dom.eq(0).animate({left:'0'},200);
            _dom.eq(1).animate({left:'100%'},200);
            _span.removeClass("active").eq(statu).addClass("active");
            _prev.addClass("hidden");
            _next.removeClass("hidden");
        } else if (statu == 1) {
            _dom.eq(0).animate({left:'-100%'},200);
            _dom.eq(1).animate({left:'0'},200);
            _span.removeClass("active").eq(statu).addClass("active");
            _prev.removeClass("hidden");
            _next.addClass("hidden");
        } else if (statu == 2) {
            e.stopPropagation();
            var _current = $(e.currentTarget);
            var _index = _current.index() ;
            _dom.eq(_index).animate({left:'0'},200);
            if(_index==0){
                _dom.eq(1).animate({left:'100%'},200);
                _prev.addClass("hidden");
                _next.removeClass("hidden");
            }else if(_index==1){
                _dom.eq(0).animate({left:'-100%'},200);
                _prev.removeClass("hidden");
                _next.addClass("hidden");
            }
            _span.removeClass("active").eq(_index).addClass("active");
        }

    }



    render() {
        let data =this.state.menus;
        let checkedList = this.state.checkedList ;
        var _length = 0 ;
        if(checkedList && checkedList.length  > 0){
            _length = checkedList.length;
        }
        let _this = this ;
        let userPageAddDom = (
            <div className={"user-addBtn"} onClick={this.open.bind(this)}><img src="image/public/addBtn.png"/></div>
        );

        let userPageOption ;
        if(!checkedList || checkedList.length <= 0){
            userPageOption = (<div>您没有权限...</div>)  ;
        }else{
            if(checkedList.length > 8){
                let list1 = checkedList.slice(0,8);
                let list2 = checkedList.slice(8);
                let all = [];
                all.push(list1,list2);

                userPageOption = (
                    <div className="user-box-all">
                        {all.map(function(v,i){
                            return (
                                <div className={"user-box-list  user-box-page"+i} key={"userBox"+i}>
                                    {v.map(function(v1,i2){
                                        return (
                                            <div className="user-opt" key={'use-opt-'+i2} onClick={_this.openURL.bind(this,v1.tradetype,v1.menuitemname)}>
                                                <div className="user-opt-demo-img"></div>
                                                <span className="user-opt-txt" title={v1.menuitemname} >{v1.menuitemname}</span>
                                            </div>

                                        )
                                    })
                                    }
                                </div>
                            )
                        })}

                        {userPageAddDom}
                        {/*<!-- banner的圆点 -->*/}
                        <div className="user-slider-num">
                            <span onClick={_this.userOptionScoll.bind(this,2)} className ="user-arrow active"></span>
                            <span onClick={_this.userOptionScoll.bind(this,2)} className ="user-arrow"></span>
                        </div>

                        {/*<!-- banner的左右箭头 -->*/}
                        {/**
                        <div className="user-slider-page">
                            <a href="javascript:;" className="user-slider-prev hidden" onClick={_this.userOptionScoll.bind(this,0)}>&lt;</a>
                            <a href="javascript:;" className="user-slider-next" onClick={_this.userOptionScoll.bind(this,1)}>&gt;</a>
                        </div>
                         */}
                    </div>
                )
            }else{
                userPageOption  = (
                    <div>
                        {checkedList.map(function(v,i){
                            if(v){
                                return (<div className="user-opt" key={'use-opt-'+i} onClick={_this.openURL.bind(this,v.tradetype,v.menuitemname)}>
                                    <div className="user-opt-demo-img"></div>
                                    <span className="user-opt-txt" title={v.menuitemname} >{v.menuitemname}</span>
                                </div>)
                            }
                       })}

                        {userPageAddDom}
                    </div>
                );

            }
        }
        let dialogOptionList;
        if(!data || data.length<= 0 ){
            dialogOptionList =(<p>Loading...</p>);
        }else {
            dialogOptionList = (
                data.map(function (v, i) {
                    return ( <div key={'menu-one-'+ i} className="dialog-menu-one">
                        <p className="dialog-menu-tit"> {v.menuitemname}</p>
                        <ul className="dialog-menu-two">
                            {v.submenu.map(function (t, i2) {
                                return (<li key={'menu-two-'+i2}>
                                    <lable className="dialog-check">
                                        <span className="dialog-check-icon" title="添加快捷设置"
                                              onClick={_this.checkOption.bind(this)}></span>
                                        <span data-select={'select-'+i+'-m-'+i2} data-tradetype={t.tradetype}
                                              data-menuitemname={t.menuitemname}
                                              onClick={_this.openURL.bind(this,t.tradetype,t.menuitemname)}>{t.menuitemname}</span>
                                    </lable>
                                </li>)
                            })
                            }
                        </ul>
                    </div> );
                })
            );

        }


        let dialogWindow= (
            <Modal show={this.state.showModal} onHide={this.close}  bsSize="large" aria-labelledby="contained-modal-title-lg" >
                <Modal.Body>
                    <span className="dialog-close" onClick={this.close} >X</span>
                    <p className="dialog-title">菜单</p>
                    <div className="dialog-menu-list" id="dialog-menu-list">
                        {dialogOptionList}
                    </div>

                </Modal.Body>
                <div className="dialog-footer">
                    <span className="dialog-footer-tips">温馨提示：选中单据类型并保存，即可添加到桌面快捷方式</span>
                    <a className="pub-button-exit" onClick={this.close} href="javascript:;">取消</a>
                    <a className="pub-button-save" onClick={this.submit} href="javascript:;">保存</a>
                </div>

            </Modal>
        );

        let dialogTip = (

            <Modal show = {this.state.dialogTips } bsSize="small" aria-labelledby="contained-modal-title-lg">
                <p>您的快捷菜单已做更改，是否保存？ </p>
                 <div className = "dialog-tips">
                     <Button bsSize="small" onClick={this.closeTips}>放弃</Button>
                     <Button bsSize="small" onClick={this.saveSubmit}>保存</Button>

                 </div>
            </Modal>
        );

        return (
            <div>
                <div className="user-label">
                    {userPageOption}
                </div>
                {dialogWindow}

            </div>
        )
    }

}

//影射Store的State到App的Props, 这里用做数据
function mapStateToProps(state) {
    return state.welcome;
}

//影射Store的dispath到App的Props,这里用做操作(事件)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(portalMenus, dispatch);
}

//练接是中间组件react-redux功能,用于把React的Props, State, Event和Redux的关联
 export default connect(mapStateToProps, mapDispatchToProps)(UserSelected);
