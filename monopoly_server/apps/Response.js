var Response = {
	OK: 1, // 表示成功
	INVALID_PARAMS: -100, // 表示用户传递的参数错误
	SYSTEM_ERR: -101, // 系统错误
	ILLEGAL_ACCOUNT: -102, // 非法的账号

	INVALIDI_OPT: -103, // 非法的操作
	// PHONE_IS_REG: -104, // 手机已经被绑定
	// PHONE_CODE_ERR: -105, // 手机验证码错误
	UNAME_OR_UPWD_ERR: -106, // 用户名后密码错误
};

module.exports = Response;