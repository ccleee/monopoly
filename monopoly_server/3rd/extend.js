// 字符串 你好, 长度是2，不代表字节数,buf协议，写入我们的字符串的字节数，String扩充一个接口 
String.prototype.utf8_byte_len = function() {
    var totalLength = 0;
	var i;
	var charCode;
	for (i = 0; i < this.length; i++) {
		charCode = this.charCodeAt(i);
		if (charCode < 0x007f) {
			totalLength = totalLength + 1;
		} 
		else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
			totalLength += 2;
		} 
		else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
			totalLength += 3;
		}
	}
	return totalLength; 
}

