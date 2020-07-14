// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        RulePrefab:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onClickStart:function(){
        cc.director.loadScene("xidian_map");
    },
    onClickRule:function(){
        this.m_Rule = cc.instantiate(this.RulePrefab);
        this.node.addChild(this.m_Rule);
        this.m_Rule = this.m_Rule.getComponent('response');
        this.m_Rule.show();
    },
    onClickHistory:function(){
        

    },

    start () {

    },

    // update (dt) {},
});
