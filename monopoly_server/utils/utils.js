var crypto = require("crypto");


// 返回当前的时间戳，单位是秒
function timestamp() {
    var date = new Date();
    var time = Date.parse(date); // 1970到现在过去的毫秒数
    time = time / 1000;
    return time;
}

// 时间戳是秒，Date是毫秒
function timestamp2date(time) {
    var date = new Date();
    date.setTime(time * 1000); // 

    return [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
}

// "2017-06-28 18:00:00"
function date2timestamp(strtime)  {
    var date = new Date(strtime.replace(/-/g, '/'));
    var time = Date.parse(date);
    return (time / 1000);
}

// 今天00:00:00的时间戳
function timestamp_today() {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    var time = Date.parse(date); // 1970到现在过去的毫秒数
    time = time / 1000;
    return time;
}

function timestamp_yesterday() {
    var time = timestamp_today();
    return (time - 24 * 60 * 60)
}

function base64_encode(content) {
    var buf = new Buffer(content);
    var base64 = buf.toString("base64");

    return base64;
}

function base64_decode(base64_str) {
    var buf = new Buffer(base64_str, "base64");
    return buf;
}

function md5(data) {
    var md5 = crypto.createHash("md5");
    md5.update(data);
    return md5.digest('hex'); 
}

function sha1(data) {
    var sha1 = crypto.createHash("sha1");
    sha1.update(data);
    return sha1.digest('hex'); 
}

/*
function check_params_len(body, len) {
    if(!body) {
        return false;
    }
    console.log(body.length, len);
    if (body.length == len) {
        return true;
    }
    return false;
}*/

var utils = {
    
    random_string: function(len){
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 
        
        var maxPos = $chars.length;
    　　var str = '';
    　　for (var i = 0; i < len; i++) {
    　　　　str += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return str;
    },
    
    random_int_str: function(len) {
        var $chars = '0123456789'; 
        
        var maxPos = $chars.length;
    　　var str = '';
    　　for (var i = 0; i < len; i++) {
    　　　　str += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return str;
    },
    
    // 随机的生成[begin, end] 范围内的数据
    random_int: function(begin, end) {
        var num = begin + Math.random() * (end - begin + 1);
        num = Math.floor(num);
        if (num > end) {
            num = end;
        }
        return num;
    },


    timestamp: timestamp,
    date2timestamp: date2timestamp,
    timestamp2date: timestamp2date,
    timestamp_yesterday: timestamp_yesterday,
    timestamp_today: timestamp_today,
    
    base64_decode: base64_decode,
    base64_encode: base64_encode,
    md5: md5,
    sha1: sha1,

    // check_params_len: check_params_len,
};

module.exports = utils
