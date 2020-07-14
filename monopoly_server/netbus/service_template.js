var service = {
	name: "service tempalte", // 服务名称
	is_transfer: false, // 是否为转发模块,

	// 收到客户端给我们发来的数据
	on_recv_player_cmd: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
	},

	// 收到我们连接的服务给我们发过来的数据;
	on_recv_server_return: function (session, stype, ctype, body, utag, proto_type, raw_cmd) {
	}, 

	// 收到客户端断开连接;
	on_player_disconnect: function(stype, session) {
	},
};

module.exports = service;
