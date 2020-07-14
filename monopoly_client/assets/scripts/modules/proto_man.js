var log = {
	info: console.log,
	warn: console.log,
	error: console.log,
};

//协议和命令统一采用小端存储，各占两个字节

var proto_man = {
    PROTO_JSON:1,
    PROTO_BUF:2,   
    encode_cmd:encode_cmd,
    decode_cmd: decode_cmd,
    reg_buf_encoder: reg_buf_encoder,
    reg_buf_decoder: reg_buf_decoder,
};

function encrypt_cmd(str_or_buf){//加密    
    return str_or_buf;
}
function decrypt_cmd(str_or_buf){    
    return str_or_buf;
}
function _json_encode(stype,ctype,body){
    var cmd = {};
    
    cmd[0] = stype;
    cmd[1] = ctype;
    cmd[2] = body;
    return JSON.stringify(cmd);
}

function json_decode(cmd_json){
    var cmd = null;
    try {
		cmd = JSON.parse(cmd_json);
	}
	catch(e) {
		
	}
    if(!cmd || 
        typeof(cmd[0]) == "undefined" || 
        typeof(cmd[1]) == "undefined" || 
        typeof(cmd[2]) == "undefined" ){
        return null;
    }
    return cmd;
}

function get_key(stype,ctype){
    return (stype*65536 + ctype);
}

function encode_cmd(proto_type,stype,ctype,body){
    var buf = null;
    if(proto_type == proto_man.PROTO_JSON){
        buf =  _json_encode(stype,ctype,body);
    }else{
        var key = get_key(stype,ctype);
        if(!encoders[key]){
            return null;
        }
        buf = encoders[key](body);
    }
    if(buf){
        return encrypt_cmd(buf);
    }
    return null;
}

function decode_cmd(proto_type,str_or_buf){
    str_or_buf = decrypt_cmd(str_or_buf);

    if(proto_type == proto_man.PROTO_JSON){
        return json_decode(str_or_buf);
    }
    if(str_or_buf.length < 4){
        return null;
    }
    var cmd = null;
    var stype = str_or_buf.readUInt16LE(0);
    var ctype = str_or_buf.readUInt16LE(2);
    var key = get_key(stype,ctype);
    if(!decoders[key]){
        return null;
    }
    cmd = decoders[key](str_or_buf);
    return cmd;
}

//二进制编码解码数据列表
var decoders = {};
var encoders = {};

function reg_buf_encoder(stype,ctype,encode_func){
    var key = get_key(stype,ctype);
    if(encoders[key]){
        log.warn("stype:" + stype + "ctype:" + ctype + "is reged!");       
    }
    encoders[key] = encode_func;
}

function reg_buf_decoder(stype,ctype,decode_func){
    var key = get_key(stype,ctype);
    if(decoders[key]){
        log.warn("stype:" + stype + "ctype:" + ctype + "is reged!");       
    }
    decoders[key] = decode_func;
}



module.exports = proto_man;