import React from 'react';
import Api from '../../common/restfulApi';
import Config from '../config';

export default class
PortalMenu extends React.Component {
    constructor(props) {
        super(props);
        props;
    }


    // static defaultProps = {
    //     menu: {}
    // };

    _openMenu = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        var openStatu =$(e.currentTarget).siblings(".menu-lists-box") ;
        if(openStatu.hasClass("menu-icon-open")){
            openStatu.hide();
            openStatu.removeClass("menu-icon-open").addClass("menu-icon-hide");
        }else{
            openStatu.show();
            openStatu.removeClass("menu-icon-hide").addClass("menu-icon-open");
        }
    };

    openURL =(tradeTypeCode,tradeTypeName) =>{
        $.ajax({
            type: 'POST',
            url: Config.portal.getMenuData,
            data: 'tradetype='+ tradeTypeCode +'&tradeName=' + tradeTypeName,
            success: function(data){
                if(data.success == false){
                    alert("非IWEB应用...暂不支持");
                    return false ;
                }
                window.open(Config.localUrl + data.url);
            }
        });
    }
   
    render() {
        let _this = this ;
        let menu = this.props.menu;
        let repoList =(<span>Loading...</span>);
        if (!menu.loading) {
            var repos = menu.data;
            repoList = repos.map(function (result,i) { 
                return(
                    <li key={'menu_'+i}>
                        <p className="menu-lists-title" onClick={_this._openMenu.bind(this)}>{result.menuitemname}</p>
                        <div className="menu-lists-box">
                            <ul key={'child_ul_'+i} className="menu-lists-child">
                                {
                                    result.submenu.map(function(child,index){
                                    return (<li key={'li_'+i+'_'+index} title={child.menuitemname}><a target="_blank" onClick={_this.openURL.bind(this,child.tradetype,child.menuitemname)}>{child.menuitemname}</a></li>)
                                })}

                            </ul>
                        </div>
                    </li>
                )
            });
        }
        
        return (
            <div>
                <ul id="menu_nav" className="menu-lists">
                    {repoList}
                </ul>
            </div>

        );
    }
};