var net = require("net");
var netpkg = require("./netpkg");

var sock = net.connect({
	port: 6080,
	host: "127.0.0.1",
}, function() {
	console.log('connected to server!');
});

sock.on("connect",function() {
	console.log("connect success");

	// sock.write(netpkg.package_data("Hello!"));
	// sock.write(netpkg.test_pkg_two_action("start", "stop"));
	var buf_set = netpkg.test_pkg_two_slice("Bla", "ke");

	sock.write(buf_set[0]); // 
	setTimeout(function() {
		sock.write(buf_set[1]);
	}, 5000);
	
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