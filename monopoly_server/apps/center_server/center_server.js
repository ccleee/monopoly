require("../../init.js");

var game_config = require("../game_config.js");
var proto_man = require("../../netbus/proto_man.js");
var netbus = require("../../netbus/netbus.js");
var service_manager = require("../../netbus/service_manager.js");
var Stype = require("../Stype.js");

var  auth_service= require("./auth_service.js");

var center = game_config.center_server;
netbus.start_tcp_server(center.host, center.port, false);

// var service_array = center.stypes;
// for()
service_manager.register_service(Stype.Auth,auth_service)

//连接中心数据库
var mysql_center = require("../../database/mysql_center.js");
mysql_center.connect();