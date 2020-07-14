require("../../init.js");

var game_config = require("../game_config.js");
var proto_man = require("../../netbus/proto_man.js");
var netbus = require("../../netbus/netbus.js");
var service_manager = require("../../netbus/service_manager.js");
var gw_service = require("./gw_service.js");

var host = game_config.gateway_config.host;
var posts = game_config.gateway_config.ports;


netbus.start_tcp_server(host, posts[0], true);
netbus.start_ws_server(host, posts[1], true);


// 链接我们的服务器
// var game_server = game_config.game_server;
// for(var key in game_server) {
// 	netbus.connect_tcp_server(game_server[key].stype, game_server[key].host, game_server[key].port, false);
// 	service_manager.register_service(game_server[key].stype, gw_service);
// }
// end 