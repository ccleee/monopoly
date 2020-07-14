var Cmd = {
    // 全局的命令号，当我们的用户丢失链接的时候，
	// 所有的服务都会收到网关转发过来的这个时间这个消息
	USER_Disconnect: 10000,
    
    Auth:{
        UNAME_LOGIN: 1,//账号登录
    },
};

module.exports = Cmd;