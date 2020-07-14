//所有人的财产及针对财产的共同操作
var pay = require("pay");
cc.Class({
    extends: cc.Component,

    properties: {
        ProInfoNode:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始化财产
        window.ProInfo = this;
        window.win = 0;
        this.m_proinfo = [];
        this.m_proinfo[0] = this.ProInfoNode[0].getComponent("property");
        this.m_proinfo[1] = this.ProInfoNode[1].getComponent("property");
        this.m_proinfo[2] = this.ProInfoNode[2].getComponent("property");
        this.m_proinfo[3] = this.ProInfoNode[3].getComponent("property");
        console.log("ProInfo inited.");
    },

    //不同玩家财产变化
    ProInfoChange:function(id,new_pro){
        this.m_proinfo[id].CoinsChange(new_pro);
    },

    //根据玩家编号获取财产信息
    getCoinInfo:function(id){
        return this.m_proinfo[id].Coins;
    },
    getSumProInfo:function(id){
        this.m_proinfo[id].get_sum_pro();
        return this.m_proinfo[id].sum_pro;
    },

    //检查玩家是否有足够金币
    CheckInfo:function(id,coin){
        var rest = ProInfo.getCoinInfo(id)-coin;
        if(rest > 0){
            cc.log(rest);
            return rest;
        }else{
            //金币不足时判断可抵押房产
            cc.log("余额不足,自动卖房");
            cc.log(this.m_proinfo[id].Land_id.length);
            if(this.m_proinfo[id].Land_id.length != 0){
               
            //系统自动卖出目前房产列表中最近购入的房产
               cc.log("卖房前余额:" + this.m_proinfo[id].Coins);
               this.m_proinfo[id].LandLost();
               cc.log("卖房后余额:" + this.m_proinfo[id].Coins);
               return ProInfo.getCoinInfo(id)-coin;
            }else{
                game_flag = 1;
                return;
            }       
        }
    },
    get_rank:function(){
        win = 0;
        for(i=0;i<3;i++){
            if(this.m_proinfo[i].sum_pro < this.m_proinfo[i+1].sum_pro){
                win = i+1;
            }           
        }
    },
    start () {

    },

    // update (dt) {},
});
