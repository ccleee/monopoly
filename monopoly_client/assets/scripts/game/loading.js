

cc.Class({
    extends: cc.Component,

    properties: {
        w_ProMaxLen:{
            default:354,
            type:cc.Integer,
        },
        w_Speed:{
            default:10,
            type:cc.Integer,
        },
        w_Progress:{
            type:cc.Integer,
            default:0,
            slide:true,
            min:0,
            max:354,
            step:1,
        },
    w_ProImage:cc.Node,
    },
    w_init: function(){
        this.w_ProgressImg = false;
    },

    _progressChange: function(){
        this.w_ProImage.width = this.w_Progress;
    },
    setProgress: function(pro){
        if(pro > 1 ||pro < 0){
            return;
        }
        var width = this.w_ProMaxLen * pro;
        if(width < this.w_SetWidth){
            return;
        }
        this.w_SetWidth = this.w_ProMaxLen * pro;
        this.w_ProgressImg = true;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.w_ProImage.width = 0;
        this.w_ProImage.active = true;
    },
    
    start () {

    },

    update (dt) {
        if(this.w_ProgressImg){
            if(this.w_ProImage.width < this.w_SetWidth){
                this.w_ProImage.width += dt*this.w_Speed;
            }
            if(this.w_ProImage.width >= this.w_ProMaxLen){
                this.w_ProgressImg = false;
                if(this.finishCallBack != null){
                    this.finishCallBack();
                }
            }
        }
    },
});
