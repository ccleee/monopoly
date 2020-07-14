var netpkg = {
	// 根据封包协议我们读取包体的长度;
	read_pkg_size: function(pkg_data, offset) {
		if (offset > pkg_data.length - 2) { // 没有办法获取长度信息的;
			return -1; 
		}

		var len = pkg_data.readUInt16LE(offset);
		return len;
	},

	// 把一个要发送的数据,封包 2个字节的长度 + 数据
	// data string 二进制的buffer
	package_data: function(data) {
		var buf = Buffer.allocUnsafe(2 + data.length);
		buf.writeInt16LE(2 + data.length, 0);
		buf.fill(data, 2);

		return buf;
	},

	// 模拟底层TCP 粘包的问题
	test_pkg_two_action: function(action1, action2) {
		var buf = Buffer.allocUnsafe(2 + 2 + action1.length + action2.length);
		buf.writeInt16LE(2 + action1.length, 0);
		buf.fill(action1, 2);

		var offset = 2 + action1.length;
		buf.writeInt16LE(2 + action2.length, offset);
		buf.fill(action2, offset + 2);

		return buf
	},

	// 模拟的一个大的数据包，分两次发送到客户端;
	// one cmd half_cmd + half_cmd2
	test_pkg_two_slice: function(half_cmd1, half_cmd2) {
		// 
		var buf1 = Buffer.allocUnsafe(2 + half_cmd1.length);
		buf1.writeInt16LE(2 + half_cmd1.length +　half_cmd2.length, 0);
		buf1.fill(half_cmd1, 2);

		var buf2 = Buffer.allocUnsafe(half_cmd2.length);
		buf2.fill(half_cmd2, 0);

		return [buf1, buf2];
	}
};

module.exports = netpkg;