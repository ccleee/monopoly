

cc.Class({
    extends: cc.Component,
    properties:{
        //PlayerPrefab:cc.Prefab,
        before:{
            type:cc.Integer,
            default:0,
        },
        steps:{
            type:cc.Integer,
            default:0,
        },  
        turn_flag:{
            type:cc.Boolen,
            default:true,
        },
        landlist:[cc.Integer],
    },

    // LIFE-CYCLE CALLBACKS:
    show:function(){
        this.node.active = true;
    },
     onLoad () {
         this.steps = 0;
         this.before = 0;
         this.turn_flag = true;
         this.landlist = [];
     },
 
    move:function(num) {
            this.steps += num+1;
            while(this.before < this.steps){
                this.before++;
                var m_move = cc.moveTo(0.2,map.allpath[this.before].x,map.allpath[this.before].y);
                //cc.log(map.allpath[this.before].name);
                P[0].node.runAction(m_move);
                //cc.log(P[0].node.x,P[0].node.y); 
            }    
                rollflag = false;               
            // let dicetime = setTimeout(() => {
            //     while(this.before < this.steps){
            //         let walktime = setInterval(() => {
            //             this.before++;
            //             var m_move = cc.moveTo(0.2,map.allpath[this.before].x,map.allpath[this.before].y);
            //             cc.log(map.allpath[this.steps].name);
            //             cc.log(P[0].node.x,P[0].node.y);     
            //             if(this.before >= this.steps){
            //                 clearInterval(walktime);
            //             }                
            //         }, 500);
            //     }
            //     clearTimeout(dicetime);
            // }, 1500);
       
   },
 
    // start () {

        
    // },

    // update (dt) {
    //     while(this.before < this.steps){
    //             this.before++;
    //             var m_move = cc.moveTo(0.2,map.allpath[this.before].x,map.allpath[this.before].y);
    //             cc.log(map.allpath[this.before].name);
    //             P[0].node.runAction(m_move);
    //             cc.log(P[0].node.x,P[0].node.y); 
    //         }    
    //             rollflag = false; 
    // },
});
