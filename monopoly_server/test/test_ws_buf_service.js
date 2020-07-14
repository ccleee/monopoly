var ws = require("ws");
var proto_man = require("../netbus/proto_man");
require("./talk_room_proto.js");

var data = {
	uname: "Blake_WS",
	upwd: "123456_WS",
};

// url ws://127.0.0.1:6080
// 创建了一个客户端的socket,然后让这个客户端去连接服务器的socket
var sock = new ws("ws://127.0.0.1:6083");
sock.on("open", function () {
	console.log("connect success !!!!");
	// 1, 2, body = "Hello Talk room!!!"
	var cmd_buf = proto_man.encode_cmd(proto_man.PROTO_BUF, 1, 1, data);
	sock.send(cmd_buf);
});

sock.on("error", function(err) {
	console.log("error: ", err);
});

sock.on("close", function() {
	console.log("close");
});

sock.on("message", function(data) {
	console.log(data);
});
