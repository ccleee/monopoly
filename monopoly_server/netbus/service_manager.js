var log = require("../utils/log.js");
var proto_man = require("./proto_man");

var service_modules = {};

function register_service(stype, service) {
	if (service_modules[stype]) {
		log.warn(service_modules[stype].name + " service is registed !!!!");
	}

	service_modules[stype] = service;
}

function  on_recv_server_return (session, cmd_buf) {
	// 根据我们的收到的数据解码我们命令
	if (session.is_encrypt) {
		cmd_buf = proto_man.decrypt_cmd(cmd_buf);	
	}
	var stype, ctype, body, utag, proto_type;

	var cmd = proto_man.decode_cmd_header(cmd_buf);
	if (!cmd) {
		return false;
	}
	stype = cmd[0]; 
	ctype = cmd[1]; 
	utag = cmd[2];
	proto_type = cmd[3];

	if (service_modules[stype].is_transfer) {
		service_modules[stype].on_recv_server_return(session, stype, ctype, null, utag, proto_type, cmd_buf);
		return true;
	}

	var cmd = proto_man.decode_cmd(proto_type, stype, ctype, cmd_buf);
	if (!cmd) {
		return false;
	}
	// end 

	
	body = cmd[2];
	service_modules[stype].on_recv_server_return(session, stype, ctype, body, utag, proto_type, cmd_buf);
	return true;
}

function on_recv_client_cmd(session, cmd_buf) {
	// 根据我们的收到的数据解码我们命令
	if (session.is_encrypt) {
		cmd_buf = proto_man.decrypt_cmd(cmd_buf);	
	}
	var stype, ctype, body, utag, proto_type;

	var cmd = proto_man.decode_cmd_header(cmd_buf);
	if (!cmd) {
		return false;
	}
	stype = cmd[0]; 
	ctype = cmd[1]; 
	utag = cmd[2];
	proto_type = cmd[3];
	
	if (!service_modules[stype]) {
		return false;
	}
	if (service_modules[stype].is_transfer) {
		service_modules[stype].on_recv_player_cmd(session, stype, ctype, null, utag, proto_type, cmd_buf);
		return true;
	}

	var cmd = proto_man.decode_cmd(proto_type, stype, ctype, cmd_buf);
	if (!cmd) {
		return false;
	}
	// end 

	
	body = cmd[2];
	service_modules[stype].on_recv_player_cmd(session, stype, ctype, body, utag, proto_type, cmd_buf);
	return true;
}

// 玩家掉线就走这里
function on_client_lost_connect(session) {
	// 遍历所有的服务模块通知在这个服务上的这个玩家掉线了
	for(var key in service_modules) {
		service_modules[key].on_player_disconnect(key, session);
	}
}

var service_manager = {
	on_client_lost_connect: on_client_lost_connect,
	on_recv_client_cmd: on_recv_client_cmd,
	register_service: register_service,
	on_recv_server_return: on_recv_server_return,
};

module.exports = service_manager;