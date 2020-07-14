var websocket = require("websocket");
var auth = require("auth");
var Stype = require("Stype");
var Cmd = require("Cmd");
//var Response = require("Response");
var ugame = require("ugame");
var wx_login = require("wx_login");

cc.Class({
    extends: cc.Component,

    properties: {
        w_BackGround:cc.Node,
        w_LoadingPrefab:cc.Prefab,
        w_LoginBt:cc.Node,
        w_AccountLoginPrefab:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_Loading = cc.instantiate(this.w_LoadingPrefab);
        this.w_BackGround.addChild(this.m_Loading);
        this.m_Loading.y = -526;
        this.m_Loading.x = -230;
        this.m_Loading = this.m_Loading.getComponent('loading');
        this.m_Loading.setProgress(1);
        this.m_Loading.finishCallBack = function(){
             this.m_Loading.node.active = false;
             this.w_LoginBt.active = true;
        }.bind(this);
    },

    uname_login_return: function(body) {
        if (body.status!= Response.OK) {
            console.log(body);
            return;
        }
        
        ugame.uname_login_success();
        cc.director.loadScene("home_page");
    },

    on_auth_server_return: function(stype, ctype, body) {
        switch(ctype) {
            case Cmd.Auth.UNAME_LOGIN:
            this.uname_login_return(body);
            break;
        }      
    },

    onClickLoginType: function(target,data){
        if(data == 'zh'){
            if(this.m_AccountLogin == null){
                this.m_AccountLogin = cc.instantiate(this.w_AccountLoginPrefab);
                this.node.addChild(this.m_AccountLogin);
                this.m_AccountLogin = this.m_AccountLogin.getComponent('zh_login');
            }
            //this.m_AccountLogin.x = 0;
            //this.m_AccountLogin.y = 0;
            this.m_AccountLogin.show(); 
            this.w_LoginBt.active = false;

           
            
        }else if(data == 'wx'){
//             let exportJson = {};
// let sysInfo = window.wx.getSystemInfoSync();
// //获取微信界面大小
// let width = sysInfo.screenWidth;
// let height = sysInfo.screenHeight;
// window.wx.getSetting({
//     success (res) {
//         console.log(res.authSetting);
//         if (res.authSetting["scope.userInfo"]) {
//             console.log("用户已授权");
//             window.wx.getUserInfo({
//                 success(res){
//                     console.log(res);
//                     exportJson.userInfo = res.userInfo;
//                     //此时可进行登录操作
//                     cc.director.loadScene("home_page");
//                 }
//             });
//         }else {
//             console.log("用户未授权");
//             let button = window.wx.createUserInfoButton({
//                 type: 'text',
//                 text: '',
//                 style: {
//                     left: 0,
//                     top: 0,
//                     width: width,
//                     height: height,
//                     backgroundColor: '#00000000',//最后两位为透明度
//                     color: '#ffffff',
//                     fontSize: 20,
//                     textAlign: "center",
//                     lineHeight: height,
//                 }
//             });
//             button.onTap((res) => {
//                 if (res.userInfo) {
//                     console.log("用户授权:", res);
//                     exportJson.userInfo = res.userInfo;
//                     //此时可进行登录操作
//                     cc.director.loadScene("home_page");
//                     button.destroy();
//                 }else {
//                     console.log("用户拒绝授权:", res);
//                 }
//             });
//         }
//     }
//  })
        }
    },
    start () {
    
    },

    // update (dt) {},
});
