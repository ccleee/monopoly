
var auth = require("auth");
var ugame = require("ugame");

cc.Class({
    extends: cc.Component,

    properties: {
        w_RegisterPrefab:cc.Prefab,
        en_name:{
            type:cc.EditBox,
            default:null,
        },
        en_pwd:{
            type:cc.EditBox,
            default:null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    show: function(){
        this.node.active = true;
    },
    hide: function(){
        this.node.active = false;
    },
    onClickClose: function(){
        this.hide();
        //this.LoginClose = true;
    },
    onClickRegister: function(){
        if(this.m_AccountRegister == null){
            this.m_AccountRegister = cc.instantiate(this.w_RegisterPrefab);
            this.node.parent.addChild(this.m_AccountRegister);
            this.m_AccountRegister = this.m_AccountRegister.getComponent('register');
        }
        this.m_AccountRegister.show();
        this.hide();
    },
    onClickYes:function(){
        ugame.uname = this.en_name;
        ugame.upwd = this.en_pwd;
        auth.uname_login();
        this.hide();
        
    },
    


    start () {

    },

    // update (dt) {},
});
