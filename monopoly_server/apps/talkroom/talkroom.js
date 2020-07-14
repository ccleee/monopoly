var log = require("../../utils/log.js");
var proto_man = require("../../netbus/proto_man.js");
var Cmd = require("../Cmd.js");
require("./talkroom_proto.js");

var STYPE_TALKROOM = 1;
var TalkCmd = {
	Enter: 1, // 用户进来
	Exit: 2, // 用户离开ia
	UserArrived: 3, // 别人进来;
	UserExit: 4, // 别人离开

	SendMsg: 5, // 自己发送消息,
	UserMsg: 6, // 收到别人的消息
};

var Response = {
	OK: 1,
	IS_IN_TALKROOM: -100, // 玩家已经在聊天室
	NOT_IN_TALKROOM: -101, // 玩家不在聊天室
	INVALD_OPT: -102, // 玩家非法操作
	INVALID_PARAMS: -103, // 命令格式不对
};

function broadcast_cmd(ctype, body, noto_user) {
	var json_encoded = null;
	var buf_encoded = null;
	for(var key in room) {
		if (room[key].utag == noto_user) {
			continue;
		}
		var session = room[key].session;
		var utag = room[key].utag;
		var proto_type = room[key].proto_type;
		// 本来可以这么写
		// session.send_cmd(STYPE_TALKROOM, ctype, body);
		if (proto_type == proto_man.PROTO_JSON) {
			if (json_encoded == null) {
				json_encoded = proto_man.encode_cmd(utag, proto_type, STYPE_TALKROOM, ctype, body);
			}
			session.send_encoded_cmd(json_encoded);
		}
		else if(proto_type == proto_man.PROTO_BUF) {
			if (buf_encoded == null) {
				buf_encoded = proto_man.encode_cmd(utag, proto_type, STYPE_TALKROOM, ctype, body);
			}
			session.send_encoded_cmd(buf_encoded);
		}
	}
}
// 保存我们聊天室里面所有用户的
var room = {};
function on_user_enter_talkroom(session, body, utag, proto_type) {
	if (typeof(body.uname) == "undefined" || 
		typeof(body.usex) == "undefined") {
		session.send_cmd(STYPE_TALKROOM, TalkCmd.Enter, Response.INVALID_PARAMS, utag, proto_type);
		return;
	}
	if (room[utag]) { // 已经在聊天室
		session.send_cmd(STYPE_TALKROOM, TalkCmd.Enter, Response.IS_IN_TALKROOM, utag, proto_type);
		return;
	}
	// 告诉我们的客户端，你进来成功了
	session.send_cmd(STYPE_TALKROOM, TalkCmd.Enter, Response.OK, utag, proto_type);
	// end 

	// 把我们进来的消息广播给其他的人
	broadcast_cmd(TalkCmd.UserArrived, body, utag);
	// end 

	// 把所有在聊天室的人发送给我们的刚进来的用户
	for(var key in room) {
		session.send_cmd(STYPE_TALKROOM, TalkCmd.UserArrived, room[key].uinfo, utag, proto_type);
	}
	// end 

	// 保存玩家信息到聊天室
	var talkman = {
		session: session,
		utag: utag,
		proto_type: proto_type,

		uinfo: body,
	};
	room[utag] = talkman;
}

function on_user_exit_talkroom(session, is_lost_connect, utag, proto_type) {
	if (!room[utag]) { // 不再我的聊天室，你也没有离开这么一说
		if (!is_lost_connect) {
			session.send_cmd(STYPE_TALKROOM, TalkCmd.Exit, Response.NOT_IN_TALKROOM, utag, proto_type);
		}
		return;
	}

	// 把我们进来的消息广播给其他的人
	broadcast_cmd(TalkCmd.UserExit, room[utag].uinfo, utag);
	// end 

	// 把你的数据从聊天室删除
	room[utag] = null;
	delete room[utag];
	// end 

	// 发送命令, 你已经成功离开了。
	if (!is_lost_connect) {
		session.send_cmd(STYPE_TALKROOM, TalkCmd.Exit, Response.OK, utag, proto_type);	
	}
}

function on_user_send_msg(session, msg, utag, proto_type) {
	if (!room[utag]) { // 不再我的聊天室，你也没有离开这么一说
		session.send_cmd(STYPE_TALKROOM, TalkCmd.SendMsg, {
			0: Response.INVALD_OPT,
		}, utag, proto_type);
		return;
	}

	// 发送成功，发给客户端
	session.send_cmd(STYPE_TALKROOM, TalkCmd.SendMsg, {
		0: Response.OK,
		1: room[utag].uinfo.uname,
		2: room[utag].uinfo.usex,
		3: msg,
	}, utag, proto_type);
	// end 

	// 告诉给其他的人，这个人发送了一个消息
	broadcast_cmd(TalkCmd.UserMsg, {
		0: room[utag].uinfo.uname,
		1: room[utag].uinfo.usex,
		2: msg,
	}, utag);
	// end 
}

var service = {
	name: "talk room", // 服务名称
	is_transfer: false, // 是否为转发模块
	

	// 每个服务收到数据的时候调用
	on_recv_player_cmd: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
		log.info(this.name + " on_recv_player_cmd: ", ctype, body);	
		switch(ctype) {
			case TalkCmd.Enter:
				on_user_enter_talkroom(session, body, utag, proto_type);
			break;

			case TalkCmd.Exit: // 主动请求
				on_user_exit_talkroom(session, false, utag, proto_type);
			break;

			case TalkCmd.SendMsg:
				on_user_send_msg(session, body, utag, proto_type);
			break;

			case proto_man.GW_Disconnect: // 网关转发过来，用户被迫掉线
				on_user_exit_talkroom(session, true, utag, proto_type);
			break;
		}
	},

	// 每个服务连接丢失后调用,被动丢失连接
	on_player_disconnect: function(stype, session) {
		log.warn("lost connet with gateway:", stype);
		// log.info(this.name + " on_player_disconnect: ", session.session_key);	
		// on_user_exit_talkroom(session, true);
	},
};

module.exports = service;
