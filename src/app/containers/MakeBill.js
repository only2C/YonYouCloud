import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as portalMenus from '../actions/portalMenu';

import { Link } from 'react-router';
import PortalMenu from './../components/PortalMenu';
import UserSelected from './../components/UserSelected';
import Uncomplete  from './../containers/Uncomplete';
import Complete  from './../containers/Complete';
// import PortalMessage from './../components/PortalMessage';
import  StaticModel from './../components/StaticModel'
var iframeTimer = null;
class MakeBill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menu:{
                loading: true,
                data: []
            },
            menuState:0,
            hg:0
        }
    }

    componentDidUpdate =() =>{
        this.throttle(this.updateIframe(), 50, 50);
        return true;
    }

    componentWillMount() {
        // this.handleResize();//没有左侧菜单
        this.updateIframe();
    };

    componentDidMount = () => {
        // window.addEventListener('resize', this.handleResize);
        this.updateIframe();
        this.initIframe()
    }

    componentWillUnmount = () =>{
        // window.removeEventListener('resize', this.handleResize);
    }

    // by @media (max-width: 1366px)
    handleResize = (e) => {
        let _this = this ;
        let currentScreen = $(window).width() ;
        _this.setState({windowWidth: currentScreen});
        if(currentScreen < 1366){
            $(".menu-left").css("display","none");
            _this.scrollEvent(".cont-menu-screen-open");
        }else{
            $(".menu-left").removeClass("menu-media-state").css("display","block");
        }

    }
    initIframe = ()=>{
        let _topWindow = $(top.document.body);
        _topWindow.css({"height":"auto"});
        let main = $(window.parent.document).find("[src^='/portal/sync/sscportal/index.html']");
        let mainParent =  main.parents(".defaultPortlet").parent();
        mainParent.css({"padding":0});
        let mainTd = mainParent.parent().parent("td");
        if(mainTd.length > 0)
            mainTd.next("td").css({"display":"none"});

    };

    throttle = (fn, delay, mustRunDelay)=> {
        var timer = null;
        var t_start;
        return function(){
            var context = this, args = arguments, t_curr = +new Date();
            clearTimeout(timer);
            if(!t_start){
                t_start = t_curr;
            }
            if(t_curr - t_start >= mustRunDelay){
                fn.apply(context, args);
                t_start = t_curr;
            }
            else {
                timer = setTimeout(function(){
                    fn.apply(context, args);
                }, delay);
            }
        };
    };

    updateIframe = ()=>{
        if(iframeTimer!=null) clearTimeout(iframeTimer);
        // var _topWindow = $(top.document.body);
        var main = $(window.parent.document).find("[src^='/portal/sync/sscportal/index.html']");//find('#'+ iframeId);
       //  main.parents(".defaultPortlet").parent().css({"padding":0});
       // _topWindow.css({"height":"auto"});
        var _this = this ;
        iframeTimer = setTimeout(function(){
            let _height = _this.state.hg || 0;
            if(main.length>0){
                let _height0 = main[0]
                    .contentWindow.document.getElementById("UncompleteTab").offsetHeight;
                _this.setState({hg:_height0})
                let _less = _height - _height0  ;
                if(_less > 0 &&　_height >0){
                    main.height ( main.contents().height()-_less );
                }else{
                    main.height ( main.contents().height() );
                }
            }
        }, 0);
    };
    updateMenu = (menu) => {
        this.setState({
            menu: {
                loading: false,
                data: menu
            }
        });
    };


    openMediaMenu = (e) =>{
        let el = $(e.currentTarget);
        let menu= $(".menu-left");
        menu.css("display","block");
        el.hide();
        menu.addClass("menu-media-state");
        menu.stop().animate({top:$(".cont-menu-screen-open").offset().top+50});
    }


    scrollEvent = (dom) => {
        $(dom).css("display","block");
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            $(dom).stop().animate({top:scrollTop+220});
        });
    }

    mouseOutMenu = () =>{
        let currentScreen = $(window).width() ;
        if(currentScreen < 1366){
            $(".menu-left").css("display","none");
            $(".cont-menu-screen-open").css("display","block");
        }else{
            $(".menu-left").css("display","block");
            return ;
        }

    }
    mouseOverMenu =() => {
        $(".menu-left").css("display","block");
        $(".cont-menu-screen-open").css("display","none");
    }

    showUncomplete =(e) => {
        $("#btnUncomplete").addClass('active');
        $("#btnComplete").removeClass('active');
        $("#UncompleteTab").css("display","block");
        $("#CompleteTab").css("display","none");
        this.refs.uncompletestatus.updateCurrentQuery();
    }

    showComplete =(e) => {
        $("#btnComplete").addClass('active');
        $("#btnUncomplete").removeClass('active');
        $("#CompleteTab").css("display","block");
        $("#UncompleteTab").css("display","none");
        this.refs.completestatus.updateCurrentQuery();
    }
    handlerStaticModel = (para) =>{
        this.refs.alertmodel.showAlert(para);
    };


    render() {
        let completeStatus =(
            <div className="portal-table-header">

                <span id="btnUncomplete" className="prop-table-span active" onClick={this.showUncomplete.bind(this)}>未完成</span>
                <span id="btnComplete" className="prop-table-span" onClick={this.showComplete.bind(this)}>已完成</span>
                {/**<Link to="javascript:;" className="pub-btn-search" ></Link>**/}
                <div  id="UncompleteTab" style={{display:"block"}}>
                    <Uncomplete ref="uncompletestatus"/>
                </div>
                <div  id="CompleteTab" style={{display:"none"}}>
                    <Complete ref="completestatus" />
                </div>
            </div>
        );

        return (
            <div className="welcomeContainer">
                <div className="fix">

                    <div className="cont menu-right">
                        <UserSelected alertHandeler={this.handlerStaticModel}/>
                        <StaticModel ref ="alertmodel" />
                        {completeStatus}
                    </div>
                </div>
            </div>
        );
    }
};

//影射Store的State到App的Props, 这里用做数据
function mapStateToProps(state) {
    return state.welcome;
}

//影射Store的dispath到App的Props,这里用做操作(事件)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(portalMenus, dispatch);
}

//练接是中间组件react-redux功能,用于把React的Props, State, Event和Redux的关联
export default connect(mapStateToProps, mapDispatchToProps)(MakeBill);
