var http = {
    // calback(err, data)
    get: function(url, path, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        var requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }
         
        xhr.open("GET",requestURL, true);
        if (cc.sys.isNative){
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
        }

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                try {
                    var ret = xhr.responseText;
                    if(callback !== null){
                        callback(null, ret);
                    }
                    return;
                } catch (e) {
                    callback(e, null);
                }
            }
            else {
                callback(xhr.readyState + ":" + xhr.status, null);
            }
        };
        
        xhr.send();
        return xhr;
    },

    post: function(url, path, params, body, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        var requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }
        xhr.open("POST",requestURL, true);
        if (cc.sys.isNative){
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
        }

        if (body) {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Content-Length", body.length);
        }
        

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                try {
                    var ret = xhr.responseText;
                    if(callback !== null){
                        callback(null, ret);
                    }
                    return;
                } catch (e) {
                    callback(e, null);
                }
            }
            else {
                callback(xhr.readyState + ":" + xhr.status, null);
            }
        };
        if (body) {
            xhr.send(body);
        }
        return xhr;
    }, 

    download: function(url, path, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        var requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }

        xhr.responseType = "arraybuffer";  
        xhr.open("GET",requestURL, true);
        if (cc.sys.isNative){
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
        }

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                var buffer = xhr.response;
                var dataview = new DataView(buffer);
                var ints = new Uint8Array(buffer.byteLength);
                for (var i = 0; i < ints.length; i++) {
                    ints[i] = dataview.getUint8(i);
                }
                callback(null, ints);
            }
            else {
                callback(xhr.readyState + ":" + xhr.status, null);
            }
        };
        xhr.send();
        return xhr;
    },

};

module.exports = http;


