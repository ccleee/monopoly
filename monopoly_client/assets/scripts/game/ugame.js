var ugame = {
    uname: null,
    upwd: null, 

    _save_uname_and_upwd: function() {
        // 保存一下我们本地的用户名 + 密码的密文;
        var body = {uname: this.uname, upwd: this.upwd};
        var body_json = JSON.stringify(body);
        // str 加密
        // end 
        cc.sys.localStorage.setItem("uname_upwd", body_json);
        // end 
    }, 

    uname_login_success: function() {
        this._save_uname_and_upwd();
    },

    save_temp_uname_and_upwd: function(uname, upwd) {
        this.uname = uname;
        this.upwd = upwd;
    },
};
 
var uname_and_upwd_json = cc.sys.localStorage.getItem("uname_upwd");
if (uname_and_upwd_json) {
    var body = JSON.parse(uname_and_upwd_json);
    ugame.uname = body.uname;
    ugame.upwd = body.upwd;
}

module.exports = ugame;
