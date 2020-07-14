"use strict";
cc._RF.push(module, 'edf607JXUpPAIJNKFTsp0MC', 'extend');
// scripts\3rd\extend.js

"use strict";

// 扩展DataView 读/写字符串 -->utf8的
DataView.prototype.write_utf8 = function (offset, str) {
    var now = offset;
    var dataview = this;

    for (var i = 0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) {
            dataview.setUint8(now, charcode);
            now++;
        } else if (charcode < 0x800) {
            dataview.setUint8(now, 0xc0 | charcode >> 6);
            now++;

            dataview.setUint8(now, 0x80 | charcode & 0x3f);
            now++;
        } else if (charcode < 0xd800 || charcode >= 0xe000) {

            dataview.setUint8(now, 0xe0 | charcode >> 12);
            now++;

            dataview.setUint8(now, 0x80 | charcode >> 6 & 0x3f);
            now++;

            dataview.setUint8(now, 0x80 | charcode & 0x3f);
            now++;
        }
        // surrogate pair
        else {
                i++;

                charcode = 0x10000 + ((charcode & 0x3ff) << 10 | str.charCodeAt(i) & 0x3ff);

                dataview.setUint8(now, 0xf0 | charcode >> 18);
                now++;

                dataview.setUint8(now, 0x80 | charcode >> 12 & 0x3f);
                now++;

                dataview.setUint8(now, 0x80 | charcode >> 6 & 0x3f);
                now++;

                dataview.setUint8(now, 0x80 | charcode & 0x3f);
                now++;
            }
    }
};

DataView.prototype.read_utf8 = function (offset, byte_length) {
    var out, i, len, c;
    var char2, char3;
    var dataview = this;

    out = "";
    len = offset + byte_length;
    i = offset;
    while (i < len) {
        c = dataview.getUint8(i);
        i++;
        switch (c >> 4) {
            case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12:case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = dataview.getUint8(i);
                i++;
                char3 = dataview.getUint8(i);
                i++;
                out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
                break;
        }
    }

    return out;
};

// 字符串 你好, 长度是2，不代表字节数,buf协议，写入我们的字符串的字节数，String扩充一个接口 
String.prototype.utf8_byte_len = function () {
    var totalLength = 0;
    var i;
    var charCode;
    for (i = 0; i < this.length; i++) {
        charCode = this.charCodeAt(i);
        if (charCode < 0x007f) {
            totalLength = totalLength + 1;
        } else if (0x0080 <= charCode && charCode <= 0x07ff) {
            totalLength += 2;
        } else if (0x0800 <= charCode && charCode <= 0xffff) {
            totalLength += 3;
        }
    }
    return totalLength;
};

/*
var str = "你好";
var buf = new ArrayBuffer(str.utf8_byte_len());
var dataview = new DataView(buf);

dataview.write_utf8(0, str);
var str2 = dataview.read_utf8(0, str.utf8_byte_len());
console.log(str2);
*/

cc._RF.pop();