
cc.Class({
    extends: cc.Component,

    properties: {
        dice:{
            default:[],
            type:cc.Prefab,
        },
        PlayerPrefab:cc.Prefab,
        
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad(){
       window.rollflag = false;
    },
    onClickRoll: function(){
        window.num = Math.ceil(Math.random()*100000000%6)-1;
        if(this.m_dice == null){
            this.m_dice = cc.instantiate(this.dice[num]);
            this.node.addChild(this.m_dice);
            this.m_dice = this.m_dice.getComponent('num');
        } 
        this.m_dice.show();
        this.m_dice = null;
        window.rollflag = true;
        cc.log("rolled");
        return;
    },

    start () {
        
    },

    // update (dt) {
    // },
});
