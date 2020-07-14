var log = require("../../utils/log.js");
var Cmd = require("../Cmd.js");
var auth_model = require("./auth_model.js");
var Response = require("../Response.js");
var Stype = require("../Stype.js");
var Cmd = require("../Cmd.js");
var utils = require("../../utils/utils.js");

function uname_login(session, utag, proto_type, body) {
	// 验证数据合法性
	if(!body || !body[0] || !body[1]) {
		session.send_cmd(Stype.Auth, Cmd.Auth.GUEST_LOGIN, Response.INVALID_PARAMS, utag, proto_type);
		return;
	}
	// end 

	var uname = body[0];
	var upwd = body[1];
	auth_model.uname_login(uname, upwd, function(ret) {
		session.send_cmd(Stype.Auth, Cmd.Auth.UNAME_LOGIN, ret, utag, proto_type);
	});
}

var service = {
	name: "auth", // 服务名称
	is_transfer: false, // 是否为转发模块,

	// 收到客户端给我们发来的数据
	on_recv_player_cmd: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
		log.info(stype, ctype, body);
		switch(ctype) {
			case Cmd.Auth.UNAME_LOGIN:
				uname_login(session, utag, proto_type, body);
			break;
			case Cmd.Auth.UNAME_REG:
				uname_register(session,utag, proto_type, body);
			break;
		}
	},

	// 收到我们连接的服务给我们发过来的数据;
	on_recv_server_return: function (session, stype, ctype, body, utag, proto_type, raw_cmd) {
	}, 

	// 收到客户端断开连接;
	on_player_disconnect: function(stype, session) {
	},
};

module.exports = service;
