var Cmd = {
	// 全局的命令号，当我们的用户丢失链接的时候，
	// 所有的服务都会收到网关转发过来的这个时间这个消息
	USER_DISCONNECT: 10000, 

	Auth: {
		// GUEST_LOGIN: 1, // 游客登陆
		// RELOGIN: 2, // 账号在另外的地方登陆
		// EDIT_PROFILE: 3, // 修改用户资料
		// GUEST_UPGRADE_INDENTIFY: 4, // 游客升级验证码拉取
		// BIND_PHONE_NUM: 5, // 游客绑定手机账号
		UNAME_LOGIN: 1, // 账号密码登录
		UNAME_REG: 2,
	},
	
};

module.exports = Cmd;