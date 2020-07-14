 
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.game = this;
        map.player_init(turn);
    },
    game_init: function(){

    },
    player_turn:function(P){
        for(var i in P){
            if(P[i].turn_flag == true){
                turn = i;
            }
        } 
        
    },
    start () {

    },

    // update (dt) {},
});
