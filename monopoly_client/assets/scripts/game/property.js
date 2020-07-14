//玩家个人财产计算


cc.Class({
    extends: cc.Component,

    properties: {
        Coins:cc.Integer,
        coinShow:cc.Label,
        Land_id:[cc.Integer],
        Land_num:cc.Integer,
        Land_pro:cc.Integer,
        Sum_pro:cc.Integer,
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始化个人财产
        //window.property = this;
        this.Coins = 1000;
        this.Land_pro = 0;
        this.coinShow.string = this.Coins;
    },

    //现金财产
    CoinsChange: function(new_pro){
        this.Coins = new_pro;
        this.coinShow.string = this.Coins;
    },

    //土地财产
    // LandChange:function(land_id,land_pro){
    //     this.Land_num = ;
    //     this.Land_pro += land_pro;
    // },
    LandLost:function(){
        var land_temp = this.Land_id.pop();
        map.allpath[land_temp].owner = -1;
        this.Land_pro -=  map.allpath[land_temp].rent;
        this.Coins += map.allpath[land_temp].rent;
        cc.log("卖出" + map.allpath[land_temp].name);
    },

    //总财产
    get_sum_pro:function(){
        this.Sum_pro = this.Coins + this.Land_pro;
    },
    start () {

    },

    // update (dt) {
        
    // },
});
