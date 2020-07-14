var net = require("net");
var tcppkg = require("../netbus/tcppkg");
var proto_man = require("../netbus/proto_man");

var sock = net.connect({
	port: 6081,
	host: "127.0.0.1",
}, function() {
	console.log('connected to server!');
});

sock.on("connect",function() {
	console.log("connect success");

	// 1, 2, body = "Hello Talk room!!!"
	var cmd_buf = proto_man.encode_cmd(proto_man.PROTO_JSON, 1, 2, "Hello Talk room!!!");
	var cmd_buf = tcppkg.package_data(cmd_buf);
	sock.write(cmd_buf);
});



sock.on("error", function(e) {
	console.log("error", e);
});


sock.on("close", function() {
	console.log("close");
});


sock.on("end", function() {
	console.log("end event");
});

sock.on("data", function(data) {
	console.log(data);
});