var tcppkg = {
	// 根据封包协议我们读取包体的长度;
	read_pkg_size: function(pkg_data, offset) {
		if (offset > pkg_data.length - 2) { // 没有办法获取长度信息的;
			return -1; 
		}

		var len = pkg_data.readUInt16LE(offset);
		return len;
	},

	package_data: function(data) {
		var buf = Buffer.allocUnsafe(2 + data.length);
		buf.writeInt16LE(2 + data.length, 0);
		buf.fill(data, 2);

		return buf;
	},
};

module.exports = tcppkg;