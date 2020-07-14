var mysql = require("mysql");
var util = require('util')
var Response = require("../apps/Response.js");
var log = require("../utils/log.js");
var utils = require("../utils/utils.js");

var conn_pool = null;
function connect_to_center(host,port,db_name,uname,upwd){
    var conn_pool = mysql.createPool({
        host: host, 
        port: port, 
        database: db_name,
        user: uname,
        password: upwd,
    });
}

function mysql_exec(sql, callback) {
	conn_pool.getConnection(function(err, conn) {
		if (err) { // 如果有错误信息
			if(callback) {
				callback(err, null, null);
			}
			return;
		}

		conn.query(sql, function(sql_err, sql_result, fields_desic) {
			conn.release(); // 忘记加了

			if (sql_err) {
				if (callback) {
					callback(sql_err, null, null);
				}
				return;
			}

			if (callback) {
				callback(null, sql_result, fields_desic);
			}
		});
		// end 
	});
}

function get_uinfo_by_uname_upwd(uname, upwd, callback) {
	var sql = "select uid, status from uinfo where uname = \"%s\" and upwd = \"%s\" limit 1";
	var sql_cmd = util.format(sql, uname, upwd);
	log.info(sql_cmd);

	mysql_exec(sql_cmd, function(err, sql_ret, fields_desic) {
		if (err) {
			callback(Response.SYSTEM_ERR, null);
			return;
		}
		callback(Response.OK, sql_ret);
	});
}

module.exports = {
    connect:connect_to_center,
    get_uinfo_by_uname_upwd: get_uinfo_by_uname_upwd,
}                                                                                                                                                                                                                                              