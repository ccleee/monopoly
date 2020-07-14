// cmd_buf dataview
function read_int8(cmd_buf, offset) {
	// return cmd_buf.readInt8(offset);
	return cmd_buf.getInt8(offset);
}

function write_int8(cmd_buf, offset, value) {
	// cmd_buf.writeInt8(value, offset);
	cmd_buf.setInt8(offset, value);
}

function read_int16(cmd_buf, offset) {
	return cmd_buf.getInt16(offset, true);
}

function write_int16(cmd_buf, offset, value) {
	// cmd_buf.writeInt16LE(value, offset);
	cmd_buf.setInt16(offset, value, true);
}

function read_int32(cmd_buf, offset) {
	// return cmd_buf.readInt32LE(offset);
	return cmd_buf.getInt32(offset, true);
}

function write_int32(cmd_buf, offset, value) {
	// cmd_buf.writeInt32LE(value, offset);
	cmd_buf.setInt32(offset, value, true);
}

function read_uint32(cmd_buf, offset) {
	return cmd_buf.getUint32(offset, true);
}

function write_uint32(cmd_buf, offset, value) {
	cmd_buf.setUint32(offset, value, true);
}

function read_str(cmd_buf, offset, byte_len) {
	// return cmd_buf.toString("utf8", offset, offset + byte_len);
	return cmd_buf.read_utf8(offset, byte_len);
}

function write_str(cmd_buf, offset, str) {
	// cmd_buf.write(str, offset);
	cmd_buf.write_utf8(offset, str);
}

function read_float(cmd_buf, offset) {
	// return cmd_buf.readFloatLE(offset);
	return cmd_buf.getFloat32(offset, true);
}

function write_float(cmd_buf, offset, value) {
	// cmd_buf.writeFloatLE(value, offset);
	cmd_buf.setFloat32(offset, value, true);
}

function alloc_buffer(total_len) {
	// return Buffer.allocUnsafe(total_len);
	var buf = new ArrayBuffer(total_len);
	var dataview = new DataView(buf);

	return dataview;
}

function write_cmd_header_inbuf(cmd_buf, stype, ctype) {
	write_int16(cmd_buf, 0, stype);
	write_int16(cmd_buf, 2, ctype);
	write_uint32(cmd_buf, 4, 0);
	return proto_tools.header_size;
}

function write_prototype_inbuf(cmd_buf, proto_type) {
	write_int16(cmd_buf, 8, proto_type);
}

function write_str_inbuf(cmd_buf, offset, str, byte_len) {
	// 写入2个字节字符串长度信息;
	write_int16(cmd_buf, offset, byte_len);
	offset += 2;

	write_str(cmd_buf, offset, str);
	offset += byte_len;

	return offset;
}

// 返回 str, offset
function read_str_inbuf(cmd_buf, offset) {
	var byte_len = read_int16(cmd_buf, offset);
	offset += 2;
	var str = read_str(cmd_buf, offset, byte_len);
	offset += byte_len;

	return [str, offset];
}

function decode_empty_cmd(cmd_buf) {
	var cmd = {};
	cmd[0] = read_int16(cmd_buf, 0);
	cmd[1] = read_int16(cmd_buf, 2);
	cmd[2] = null;
	return cmd;
}

function encode_empty_cmd(stype, ctype, body) {
	var cmd_buf = alloc_buffer(proto_tools.header_size);
	write_cmd_header_inbuf(cmd_buf, stype, ctype);
	return cmd_buf;
}

function encode_status_cmd(stype, ctype, status) {
	var cmd_buf = alloc_buffer(proto_tools.header_size + 2);
	write_cmd_header_inbuf(cmd_buf, stype, ctype);
	write_int16(cmd_buf, proto_tools.header_size, status);
	return cmd_buf;
}

function decode_status_cmd(cmd_buf) {
	var cmd = {};
	cmd[0] = read_int16(cmd_buf, 0);
	cmd[1] = read_int16(cmd_buf, 2);
	cmd[2] = read_int16(cmd_buf, proto_tools.header_size);

	return cmd;
}

function encode_str_cmd(stype, ctype, str) {
	var byte_len = str.utf8_byte_len();
	var total_len = proto_tools.header_size + 2 + byte_len;
	var cmd_buf = alloc_buffer(total_len);

	var offset = write_cmd_header_inbuf(cmd_buf, stype, ctype);
	offset = write_str_inbuf(cmd_buf, offset, str, byte_len);

	return cmd_buf;
}

function decode_str_cmd(cmd_buf) {
	var cmd = {};
	cmd[0] = read_int16(cmd_buf, 0);
	cmd[1] = read_int16(cmd_buf, 2);

	var ret = read_str_inbuf(cmd_buf, proto_tools.header_size);
	cmd[2] = ret[0];

	return cmd;
}

var proto_tools = {
	header_size: 10,
	// 原操作
	read_int8: read_int8,
	write_int8: write_int8,

	read_int16: read_int16,
	write_int16, write_int16,

	read_int32: read_int32,
	write_int32, write_int32,

	read_uint32: read_uint32,
	write_uint32: write_uint32,

	read_float: read_float,
	write_float: write_float,

	alloc_buffer: alloc_buffer,

	// 通用操作
	write_cmd_header_inbuf: write_cmd_header_inbuf,
	write_prototype_inbuf: write_prototype_inbuf,
	write_str_inbuf: write_str_inbuf,
	read_str_inbuf: read_str_inbuf,
	// end

	// 模板编码解码器
	encode_str_cmd: encode_str_cmd,
	encode_status_cmd: encode_status_cmd,
	encode_empty_cmd: encode_empty_cmd,

	decode_str_cmd: decode_str_cmd,
	decode_status_cmd: decode_status_cmd,
	decode_empty_cmd: decode_empty_cmd,
	// 
};

module.exports = proto_tools;