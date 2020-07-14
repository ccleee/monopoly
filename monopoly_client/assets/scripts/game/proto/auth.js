//var utils = require("utils");
var websocket = require("websocket");
var Stype = require("Stype");
var Cmd = require("Cmd");
var ugame = require("ugame");

function uname_login(){
    var body = {
        0: ugame.uname,
        1: ugame.upwd,
    };
    websocket.send_cmd(Stype.Auth,Cmd.Auth.UNAME_LOGIN,body);
}

function uname_register(name_input,pwd){
    var body = {
        0: name_input,
        1: pwd,
    }
    websocket.send_cmd(Stype.Auth,Cmd.Auth.UNAME_REG,body);
}

module.exports = {
    uname_login: uname_login,
    uname_register: uname_register,
}