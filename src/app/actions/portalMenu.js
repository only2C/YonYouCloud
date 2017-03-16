// import {welcomeType} from './actionType'
import Api from '../../common/restfulApi';
import Config from '../config'

var rootPath = Config.serverUrl;
var api = new Api(rootPath);

export function getPortalMenu(callback) {
    // return (dispatch, getState) => {
    //     api.postApi(url, state => {
    //         console.log(state);
    //     },suss =>{
    //         if (suss.success == true) {
    //             if (typeof callback === 'function') {
    //                 callback(suss.rows);
    //             }
    //         }
    //     },err => {
    //         console.log(err);
    //     });
    // };
    return () => {
        $.ajax({
            type: "post",
            url: Config.portal.getMenuAll,
            dataType: "json",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            success: data => {
                if (data.success == true) {
                    if (typeof callback === 'function') {
                        callback(data.rows);
                    }
                } else {
                    console.log(data)
                }
            },
            error: (xhr, status, err) => {
                console.log(err.toString());
            }
        });
    };
}