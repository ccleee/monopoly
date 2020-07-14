
cc.Class({
    "extends": cc.Component,
    properties: {
      payLabel: cc.Label,
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
      window.pay = this;
      this.pay_init();
    },
    pay_init:function(){
      this.pay_ok = false;
      this.pay_fail = false;
    },
    show: function show() { 
      this.node.active = true;
    },
    hide: function hide() {
      this.node.active = false;
    },
    onClickClose: function onClickClose() {
      this.hide();
    },
  
    onClickYes: function onClickNo() {
        if(turn < 3){
            turn ++;
        }else if(turn == 3){
            turn = 0;
        }
        if(P[turn].turn_flag == false){
            if(turn < 4){
                turn ++;
            }else{
                turn = 0; 
            }
        }
        return;
        this.hide();
    },
    buy_ok:function(){
      this.payLabel.string = "购买成功"; 
      this.show();
    },
    buy_fail:function(){
      this.payLabel.string = "余额不足，购买失败"; 
      this.show();
    },
    pay_info: function(){
      this.payLabel.string = "路过其它玩家的土地,支付租金" + map.allpath[P[turn].steps].rent + "仙电币"; 
      this.show();
    },
    no_coin: function(){
        this.payLabel.string = "余额不足,系统自动卖出最近抵押的一处房产"; 
        this.show();
    },
    broken: function(){
        this.payLabel.string = "余额不足且无房产可抵押,您已破产,游戏结束,"+ P[win].node.name.string + "获胜";
        cc.log(P[turn].node.name.string + "破产，游戏结束");
        ProInfo.get_rank();
        this.show();
    },
  
    start: function start() {} 
    // update (dt) {},
  
  });
  
  