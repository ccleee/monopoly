//44
var netbus = require("../../netbus/netbus.js");
var proto_tools = require("../../netbus/proto_tools.js");
var proto_man = require("../../netbus/proto_man.js");
var log = require("../../utils/log.js");
var Response = require("../Response.js");

var Cmd = require("../Cmd.js");
var Stype = require("../Stype.js");

function is_login_cmd(stype, ctype) {
	if (stype != Stype.Auth) {
		return false;
	}
	if(ctype == Cmd.Auth.UNAME_LOGIN) {
		return true;
	}
	return false;
}

function is_reg_cmd(stype, ctype) {
	if (stype != Stype.Auth) {
		return false;
	}

	if(ctype == Cmd.Auth.UNAME_REG) {
		return true;
	}
	return false;
}

var uid_session_map = {};

function get_session_by_uid(uid) {
	return uid_session_map[uid];
}

function save_session_with_uid(uid, session, proto_type) {
	uid_session_map[uid] = session;
	session.proto_type = proto_type;
}

function clear_session_with_uid(uid) {
	uid_session_map[uid] = null;
	delete uid_session_map[uid];	
}

var service = {
	name: "gw_service", // 服务名称
	is_transfer: true, // 是否为转发模块,

	// 收到客户端给我们发来的数据
	on_recv_player_cmd: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
		log.info(raw_cmd);
		var server_session = netbus.get_server_session(stype);
		if (!server_session) {
			return;
		}

		// 打入能够标识client的utag, uid, session.session_key,
		if(is_reg_cmd(stype, ctype)) {
			utag = session.session_key;	
		}
		else {
			if(session.uid === 0) { // 没有登陆，发送了非法的命令
				return;
			}
			utag = session.uid;
		}
		proto_tools.write_utag_inbuf(raw_cmd, utag);
		// end 

		server_session.send_encoded_cmd(raw_cmd);
	},

	// 收到我们连接的服务给我们发过来的数据;
	on_recv_server_return: function (session, stype, ctype, body, utag, proto_type, raw_cmd) {
		log.info(raw_cmd);
		
		var client_session;

		// if(is_reg_cmd(stype, ctype)) { // utag == session_key
		// 	client_session = netbus.get_client_session(utag);
		// 	if (!client_session) {
		// 		return;
		// 	}

		if(is_login_cmd(stype, ctype)) { // utag == session_key
			client_session = netbus.get_client_session(utag);
			if (!client_session) {
				return;
		    }
		
		
			var cmd_ret = proto_man.decode_cmd(proto_type, stype, ctype, raw_cmd);
			body = cmd_ret[2];
			if (body.status == Response.OK) {
				// 以前你登陆过,发送一个命令给这个客户端，告诉它说以前有人登陆
				var prev_session = get_session_by_uid(body.uid);
				if (prev_session) {
					prev_session.send_cmd(stype, Cmd.Auth.RELOGIN, null, 0, prev_session.proto_type);
					prev_session.uid = 0; // 可能回有隐患，是否通知其它的服务
					netbus.session_close(prev_session);
				}
				// end 

				client_session.uid = body.uid;
				save_session_with_uid(body.uid, client_session, proto_type);
				body.uid = 0;
				raw_cmd = proto_man.encode_cmd(utag, proto_type, stype, ctype, body);
			} 
		
		}
		else { // utag is uid
			client_session = get_session_by_uid(utag);
			if (!client_session) {
				return;
			}
		}

		proto_tools.clear_utag_inbuf(raw_cmd);
		client_session.send_encoded_cmd(raw_cmd);
	}, 

	// 收到客户端断开连接;
	on_player_disconnect: function(stype, uid) {
		if (stype == Stype.Auth) { // 由Auth服务保存的，那么我们就由Auth清空
			clear_session_with_uid(uid);
		}

		var server_session = netbus.get_server_session(stype);
		if (!server_session) {
			return;
		}
		
		// 客户端被迫掉线
		// var utag = session.session_key;
		var utag = uid;
		server_session.send_cmd(stype, Cmd.USER_DISCONNECT, null, utag, proto_man.PROTO_JSON);
	},
};

module.exports = service;
