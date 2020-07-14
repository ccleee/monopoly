cc.Class({
    extends: cc.Component,

    properties: {
        noteLable:cc.Label,
        payNote:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {

    // },
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

    //确认购买土地
    onClickYes: function(target,data){
        this.hide();

        if(data == 'note'){
            return;
        }else{
            var temp = ProInfo.CheckInfo(turn,map.allpath[P[turn].steps].price); 
            if(temp){
                //余额充足
                ProInfo.ProInfoChange(turn,temp);
                map.allpath[P[turn].steps].owner = turn; 
                pay.pay_ok = true;
                cc.log("购买成功");
            }else{
                pay.pay_fail = true;
                cc.log("余额不足");
            } 
        }        
        //正常循环下一个
        if(turn < 3){
            turn ++;
        }else if(turn == 3){
            turn = 0;
        }
        //停止一次
        if(P[turn].turn_flag == false){
            if(turn < 3){
                turn ++;
            }else{
                turn = 0; 
            }
        }
        return;
    },
    onClickNo:function(){
        this.hide();
    },

    pay_note_init:function(){
        this.pay_note = cc.instantiate(this.payNote);
        this.node.addChild(this.pay_note);
        this.pay_note = this.pay_note.getComponent('pay');
        this.pay_note.hide();
    },
    pay_rent:function(){       
        this.node.getChildByName("login").active = false;
        this.node.getChildByName("note").active = false;
        this.node.getChildByName("back").active = false;

        this.pay_note.pay_info();
        //this.pay_note.show();
        var temp = ProInfo.CheckInfo(turn,map.allpath[P[turn].steps].rent);//支付租金后剩余金额
        var owner = map.allpath[P[turn].steps].owner;
        

        //map.allpath[P[turn].steps].owner = turn; 
        
        if(game_flag != 1){
            while(temp < 0){
                temp = ProInfo.CheckInfo(turn,map.allpath[P[turn].steps].rent);
                if(game_flag == 1){
                    this.pay_note.broken();
                    return;
                }
            }   
            cc.log("支付租金成功");
            ProInfo.ProInfoChange(turn,temp);
        }else{
            this.pay_note.broken();
            return;
        }
        //ProInfo.ProInfoChange(turn,(ProInfo.getCoinInfo(turn)-map.allpath[P[turn].steps].rent));

        ProInfo.ProInfoChange(owner,(ProInfo.getCoinInfo(owner)+map.allpath[P[owner].steps].rent));                   
        
    },
    setRegisterNote:function(err_no){
        if(err_no == 0){
            this.hide();
            this.noteLable.string = "注册成功";
        }
        else if(err_no == -1){
            this.noteLable.string = "系统错误，请重新尝试";
        }else if(err_no == 1){
            this.noteLable.string = "信息不得为空，请重新尝试";
        }else if(err_no == 2){
            this.noteLable.string = "两次密码输入不一致，请重新尝试";
        }
    },
    set_Response:function(){  
        this.pay_note_init();
        //购买信息
        if(pay.pay_ok){
            this.pay_note.pay_info();   
        }
        if(pay.pay_fail){
            this.pay_note.pay_info(); 
        }
        
        //地图信息
        if(P[turn].steps == 0){
                this.noteLable.string = "一学期过去了，财务处向您发放149个仙电币";
                ProInfo.ProInfoChange(turn,(ProInfo.getCoinInfo(turn)+149));
                cc.log("arive 跳楼塔");
            }
            else if(P[turn].steps == 1){
                this.noteLable.string = "在情人坑遇到心爱之人，系统送您99个仙电币以示祝福";
                cc.log(P[turn].name," arive 情人坑");
                ProInfo.ProInfoChange(turn,(ProInfo.getCoinInfo(turn)+99));
            }
            else if(P[turn].steps == 2 || P[turn].steps == 3 || P[turn].steps == 4 || P[turn].steps == 5 || P[turn].steps == 6){
                cc.log("arive 家属区");
                
                if(map.allpath[P[turn].steps].owner == -1){
                    //土地尚未被购买
                    this.noteLable.string = "到达家属区，是否花费" + map.allpath[P[turn].steps].price + "仙电币购买土地？"; 
                }else if(map.allpath[P[turn].steps].owner!= turn){
                    //土地已被他人购买
                    this.pay_rent();         
                }            
            }
            else if(P[turn].steps == 7){
                cc.log("arive 大金碗");
                this.noteLable.string = "在大金碗担任“互联网+”场务志愿者，获得200仙电币";
                ProInfo.ProInfoChange(turn,(ProInfo.getCoinInfo(turn)+200));
            }
            else if(P[turn].steps == 8){
                cc.log("arive 东门");
                this.noteLable.string = "到达东门，顺路去阳光天地吃老重庆火锅，花费120仙电币";
                ProInfo.ProInfoChange(turn,(ProInfo.getCoinInfo(turn)-120));
            }
            else if(P[turn].steps == 9){
                cc.log("arive 校医院");
                this.noteLable.string = "由于感染诺如病毒，在校医院花费50仙电币购买药物";
                ProInfo.ProInfoChange(turn,(ProInfo.getCoinInfo(turn)+50));
            }
            else if(P[turn].steps == 10 || P[turn].steps == 11 || P[turn].steps == 13 || P[turn].steps == 14){
                cc.log("arive 竹园");
                if(map.allpath[P[turn].steps].owner == -1){
                    //土地尚未被购买
                    this.noteLable.string = "到达竹园，是否花费" + map.allpath[P[turn].steps].price + "仙电币购买土地？"; 
                }else if(map.allpath[P[turn].steps].owner!= turn){
                    //土地已被他人购买
                    this.pay_rent();                  
                }            
            }
            else if(P[turn].steps == 12){
                cc.log("arive 工训中心");
                this.noteLable.string = "到达工训中心,进行为期一周的金工实习,暂停一轮";
                P[turn].flag = false;
            }
            else if(P[turn].steps == 15){
                cc.log("arive 老综");
                this.noteLable.string = "到达老综，获得杨铭宇黄焖鸡米饭0元优惠劵";
            }
            else if(P[turn].steps == 16){
                cc.log("arive 菜鸟驿站");
                this.noteLable.string = "到达菜鸟驿站，取快递时发现一卡通落在大金碗，回到大金碗";
                P[turn].steps = 7;
                P[turn].before = 7;
            }
            else if(P[turn].steps == 17){
                cc.log("arive 新综");
                this.noteLable.string = "到达新综，办理健身月卡，花费200仙电币";
                ProInfo.ProInfoChange(turn,(ProInfo.getCoinInfo(turn)-200));
            }
            else if(P[turn].steps == 18 || P[turn].steps == 19 || P[turn].steps == 20 || P[turn].steps == 21 || P[turn].steps == 22 || P[turn].steps == 23){
                cc.log("arive 海棠");
                if(map.allpath[P[turn].steps].owner == -1){
                    //土地尚未被购买
                    this.noteLable.string = "到达海棠，是否花费" + map.allpath[P[turn].steps].price + "仙电币购买土地？"; 
                }else if(map.allpath[P[turn].steps].owner!= turn){
                    //土地已被他人购买
                    this.pay_rent();
                }            
            }
            else if(P[turn].steps == 24){
                cc.log("arive 北操");
                this.noteLable.string = "在北操拾得ipad一个，寻得失主后获得感谢300仙电币";
                ProInfo.ProInfoChange(turn,(ProInfo.getCoinInfo(turn)+300));
            }
            else if(P[turn].steps == 25){
                cc.log("arive 大活");
                this.noteLable.string = "在大活观看迎新晚会，抽奖获得100仙电币";
                ProInfo.ProInfoChange(turn,(ProInfo.getCoinInfo(turn)+100));
            }
            else if(P[turn].steps == 26){
                cc.log("arive 南操");
                this.noteLable.string = "在南操跑完步后饥肠辘辘，花费18金币让舍友帮忙买了一份三酱良卤";
                ProInfo.ProInfoChange(turn,(ProInfo.getCoinInfo(turn)-18));            
            }
            else if(P[turn].steps == 27 || P[turn].steps == 28 || P[turn].steps == 29 || P[turn].steps == 30){
                cc.log("arive 丁香");
                if(map.allpath[P[turn].steps].owner == -1){
                    //土地尚未被购买
                    this.noteLable.string = "到达丁香，是否花费" + map.allpath[P[turn].steps].price + "秦岭币购买土地？"; 
                }else if(map.allpath[P[turn].steps].owner!= turn){
                    //土地已被他人购买
                    this.pay_rent(); 
                }            
            }
            else if(P[turn].steps == 31){
                cc.log("arive 图书馆");
                this.noteLable.string = "在图书馆好好学习，获得校一等奖学金1500仙电币";
                ProInfo.ProInfoChange(turn,(ProInfo.getCoinInfo(turn)+1500));
            }else{
                cc.log("lost");
                this.noteLable.string = "似乎走到了奇怪的地方，既然如此就返回起点吧~";
                P[turn].steps = 0;
            }
            this.show();
            return;
    },
    start () {

    },

    // update (dt) {},
});
