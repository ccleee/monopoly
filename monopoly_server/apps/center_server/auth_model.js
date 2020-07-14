var Response = require("../Response.js");
var mysql_center = require("../../database/mysql_center.js");
var utils = require("../../utils/utils.js");
var log = require("../../utils/log.js");

function uname_login_success(data, ret_func) {
	var ret = {};
	// 登陆成功了
	ret.status = Response.OK;
	ret.uid = data.uid;
	ret.unick = data.unick;
	ret.usex = data.usex;
	ret.uface = data.uface;
	ret.uvip = data.uvip;
	ret_func(ret);
}

function write_err(status, ret_func) {
	var ret = {};
	ret.status = status;
	ret_func(ret);
}

function uname_login(uname, upwd, ret_func) {
	// 查询数据库有无用户, 数据库
	mysql_center.get_uinfo_by_uname_upwd(uname, upwd, function(status, data) {
		if (status != Response.OK) {
			write_err(status, ret_func);
			return;
		}
		if (data.length <= 0) { // 没有这样的uname, upwd
			write_err(Response.UNAME_OR_UPWD_ERR, ret_func);
		}
		else {
			var sql_uinfo = data[0];
			
			if (sql_uinfo.status != 0) { // 账号被封
				write_err(Response.ILLEGAL_ACCOUNT, ret_func);
				return;
			}

			uname_login_success(sql_uinfo, ret_func);
		}
		
	});
	// end 
}


module.exports = {
	uname_login: uname_login,
};