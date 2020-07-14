var proto_man = require("proto_man");

var websocket = {
    sock: null, 
    serivces_handler: null,
    proto_type: 0,
    is_connected: false,

    _on_opened: function(event) {
        console.log("ws connect server success");
        this.is_connected = true;
    }, 
    
    _on_recv_data: function(event) {
        var str_or_buf = event.data;
        if (!this.serivces_handler) {
            return;
        }
        
        var cmd = proto_man.decode_cmd(this.proto_type, str_or_buf);
        if (!cmd) {
            return;
        }
        
        var stype = cmd[0];
        if (this.serivces_handler[stype]) {
            this.serivces_handler[stype](cmd[0], cmd[1], cmd[2]);
        }
    }, 
    
    _on_socket_close: function(event) {
        if (this.sock) {
            this.close();
        }
    }, 
    
    _on_socket_err: function(event) {
        this.close();
    }, 
    
    connect: function(url, proto_type) {
        this.sock = new WebSocket(url);
        this.sock.binaryType = "arraybuffer";

        this.sock.onopen = this._on_opened.bind(this);
        this.sock.onmessage = this._on_recv_data.bind(this);
        this.sock.onclose = this._on_socket_close.bind(this);
        this.sock.onerror = this._on_socket_err.bind(this);
        
        this.proto_type = proto_type;
    },
       
    send_cmd: function(stype, ctype, body) {
        if (!this.sock || !this.is_connected) {
            return;
        }
        var buf = proto_man.encode_cmd(this.proto_type, stype, ctype, body);
        this.sock.send(buf);
    },

    
    close: function() {
        this.is_connected = false;
        if (this.sock !== null) {
            this.sock.close();
            this.sock = null;
        }
    }, 
    
    register_serivces_handler: function(serivces_handler) {
        this.serivces_handler = serivces_handler;
    },
}

websocket.connect("ws://127.0.0.1:6081/ws", proto_man.PROTO_JSON);
// websocket.connect("ws://127.0.0.1:6081/ws", proto_man.PROTO_BUF);

module.exports = websocket;

