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
    
};

module.exports = utils
