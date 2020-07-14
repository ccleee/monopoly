require("../../init.js");

var proto_man = require("../../netbus/proto_man.js");
var netbus = require("../../netbus/netbus.js");
var service_manager = require("../../netbus/service_manager.js");
var talk_room = require("./talkroom.js");

netbus.start_tcp_server("127.0.0.1", 6084, false);
netbus.start_ws_server("127.0.0.1", 6085, false);



service_manager.register_service(1, talk_room);

