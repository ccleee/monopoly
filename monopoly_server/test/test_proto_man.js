var log = require("../utils/log.js");
var netbus = require("../netbus/netbus.js");
var proto_man = require("../netbus/proto_man.js");

var data = {
	uname: "blake",
	upwd: "123456",
};

// json 编码和解码
var buf = proto_man.encode_cmd(proto_man.PROTO_JSON, 1, 1, data);
log.info(buf); // 编码好的
log.error("json length: ", buf.length);
var cmd = proto_man.decode_cmd(proto_man.PROTO_JSON, buf);
log.info(cmd); // {0: 1, 1, 1, 2: data}
// end 


// 二进制
function encode_cmd_1_1(body) {
	var stype = 1;
	var ctype = 1;

	var total_len = 2 + 2 + body.uname.length + body.upwd.length + 2 + 2;
	var buf = Buffer.allocUnsafe(total_len);
	buf.writeUInt16LE(stype, 0); // 0, 1
	buf.writeUInt16LE(ctype, 2); // 2, 3

	// uname的字符串
	buf.writeUInt16LE(body.uname.length, 4); // 4, 5
	buf.write(body.uname, 6); // 6写入uname的字符串	
	// end

	var offset = 6 + body.uname.length; 
	buf.writeUInt16LE(body.upwd.length, offset); // offset + 0, offset + 1
	buf.write(body.uname, offset + 2); // offset + 2写入upwd的字符串	

	return buf;
} 

function decode_cmd_1_1(cmd_buf) {
	var stype = 1;
	var ctype = 1;

	// uname
	var uname_len = cmd_buf.readUInt16LE(4);
	if((uname_len + 2 + 2 + 2) > cmd_buf.length) {
		return null;
	}
	
	var uname = cmd_buf.toString("utf8", 6, 6 + uname_len);
	if (!uname) {
		return null;
	}
	// end 

	var offset = 6 + uname_len;
	var upwd_len = cmd_buf.readUInt16LE(offset);
	if ((offset + upwd_len + 2) > cmd_buf.length) {
		return null;
	}

	var upwd = cmd_buf.toString("utf8", offset + 2, offset + 2 + upwd_len);
	
	var cmd = {
		0: 1,
		1: 1,
		2: {
			"uname": uname,
			"upwd":  upwd,
		}
	};
	return cmd;	
}

proto_man.reg_encoder(1, 1, encode_cmd_1_1);
proto_man.reg_decoder(1, 1, decode_cmd_1_1);
// end 

var proto_cmd_buf = proto_man.encode_cmd(proto_man.PROTO_BUF, 1, 1, data);
log.info(proto_cmd_buf);
log.error(proto_cmd_buf.length);

cmd = proto_man.decode_cmd(proto_man.PROTO_BUF, proto_cmd_buf);
log.info(cmd);