cc.Class({
    extends: cc.Component,

    properties: {
        name_input:{
            type:cc.EditBox,
            default:null,
        },
        pwd:{
            type:cc.EditBox,
            default:null,
        },
        re_pwd:{
            type:cc.EditBox,
            default:null,
        },
        warn:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },
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
    onClickReg:function(err_no){
        if(this.pwd.string && this.re_pwd.string &&this.pwd.string == this.re_pwd.string){
            err_no = 0;
        }else if(!this.pwd.string || !this.re_pwd.string || !this.name_input.string){
            err_no = 1;
        }else if(this.pwd.string != this.re_pwd.string){
            err_no = 2;
        }else{
            err_no = -1;
        }
        this.m_note = cc.instantiate(this.warn);
        this.node.parent.addChild(this.m_note);
        this.m_note = this.m_note.getComponent('response');
        this.m_note.setRegisterNote(err_no);
        this.show();                      
        return;
    },
    start () {

    },

    // update (dt) {},
});
