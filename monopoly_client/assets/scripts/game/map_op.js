

cc.Class({
    extends: cc.Component,

    properties: {
        PlayerPrefab:{
            default:[],
            type:cc.Prefab,
        },
        ResponsePrefab:cc.Prefab,
        ResponsePrefab2:cc.Prefab,
        allpath:{
            default:[],
            type:cc.Node,
            price:{
                type:cc.Integer,
                default:100,
            },
            rent:{
                type:cc.Integer,
                default:50,
            },
            owner:{
                type:cc.Integer,
                default:-1,
            },
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.map = this;
        //初始化玩家节点
        window.P = [0,1,2,3]; 
        window.turn = 3; 
        window.stop_flag = -1;
        window.game_flag = -1;
        this.player_init(turn);
        turn --;
        this.player_init(turn);
        turn --;
        this.player_init(turn);
        turn --;
        this.player_init(turn);
        //初始化地图事件响应
        this.map_init();
    },
    player_init:function(turn){
        this.players = cc.instantiate(this.PlayerPrefab[turn]);
        window.P[turn] = this.players.getComponent('player');
        this.node.addChild(P[turn].node);
        P[turn].show();
        console.log("p" + turn + " is created");
    },
    getPositionfunc:function(){
        
    },
    map_init:function(){
        for(var i in map.allpath){
            map.allpath[i].owner = -1;
            if(i == 2 || i == 3 ||i == 4 || i == 5 || i == 6){
                map.allpath[i].price = 640;
                map.allpath[i].rent = 180;
            }else if(i == 10 || i == 11 ||i == 13 || i == 14){
                map.allpath[i].price = 410;
                map.allpath[i].rent = 205;
            }else if(i == 18 || i == 19 ||i == 20 || i == 21 || i == 22 || i == 23){
                map.allpath[i].price = 280;
                map.allpath[i].rent = 140;
            }else if(i == 27 || i == 28 ||i == 29 || i == 30){
                map.allpath[i].price = 380;
                map.allpath[i].rent = 190;
            }else{
                //map.allpath[] = 
            }
        }
    },

    //玩家拥有的地图单
    mapinfo_update:function(){
        for(var i in P){
            P[i].landlist.splice(0,32);
        }       
        for(var i in map.allpath){
            for(var j in P){
                if(map.allpath[i].owner == j){
                    P[j].landlist.push(i);
                }
            }
        }
        for(var i in P){
            ProInfo.m_proinfo[i].Land_id = P[i].landlist;
            cc.log(ProInfo.m_proinfo[i].Land_id);
        }
        
    },
    MoveResponse:function(){
        cc.log(P[turn].node.x,P[turn].node.y);
        if(P[turn].steps == 0 || P[turn].steps == 1 || P[turn].steps == 7 || P[turn].steps == 8 || P[turn].steps == 9 ||
        P[turn].steps == 12 || P[turn].steps == 15 || P[turn].steps == 16 || P[turn].steps == 17 || P[turn].steps == 24 || 
        P[turn].steps == 25 || P[turn].steps == 26 || P[turn].steps == 31){
            this.note = cc.instantiate(this.ResponsePrefab);
            this.node.addChild(this.note);
            this.note = this.note.getComponent('response');
            this.note.set_Response();
        }else{
            this.note = cc.instantiate(this.ResponsePrefab2);
            this.node.addChild(this.note);
            this.note = this.note.getComponent('response');
            this.note.set_Response();
        }
        this.mapinfo_update();
    },
    // start () {    
    // },

    update (dt) {
        if(rollflag == true){
            P[turn].steps += num+1;
        while(P[turn].before < P[turn].steps){
            if(P[turn].before > 31){
                P[turn].steps = 0;
                P[turn].before = 0;
                this.MoveResponse();
                break;
            }
            P[turn].before++;
            //cc.log("map name:",map.allpath[P[turn].before].name);
            P[turn].node.x = map.allpath[P[turn].before].x;
            P[turn].node.y = map.allpath[P[turn].before].y;
            //cc.log("richer location:" + P[turn] + " ",P[turn].node.x,P[turn].node.y); 
        }
        this.MoveResponse();
        rollflag = false;
        pay.pay_init();
        if(game_flag == 1){
            pay.broken();
        }
        //return;
        }
        
     },
});
