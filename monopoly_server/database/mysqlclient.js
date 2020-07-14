var mysql = require("mysql");

// 创建一个连接池，我们每次要发送 sql语句给mysql server都通过这个连接池来获得连接对象;
// 连接对象的有效性就有这个池来负责管理;
// 避免mysql在一段时间后，没有数据通讯的情况下会自动关闭连接通道；

var conn_pool = mysql.createPool({
	host: "127.0.0.1", // 数据库服务器的IP地址
	port: 3306, // my.cnf指定了端口，默认的mysql的端口是3306,
	database: "my_database", // 要连接的数据库
	user: "root",
	password: "123456",
});

// callback 1: err, 2, rows, 3, 每个字段的说明
// 异步,执行完后腰等回掉，不是马上就有结果。
// 异步的mysql的操作能投，提升我们的服务器的吞吐量；

function mysql_exec(sql, callback) {
	// getConnection 是从这个连接池里面获得mysql的连接通道,
	// 异步获取的，如果有结果了，就会调用一个回掉函数;
	// err, 是否有错误，如果没有错误err = null, 如果成功后面conn就是我们连接池
	// 返回給我们的和mysql server 进行通讯的句柄
	conn_pool.getConnection(function(err, conn) {
		if (err) { // 如果有错误信息
			if(callback) {
				callback(err, null, null);
			}
			return;
		}

		// 发送数据库的cmd到mysql server;
		// query向服务器发送sql语句的命令，有返回的话，就会调用我们的回掉函数;
		conn.query(sql, function(sql_err, sql_result, fields_desic) {
			if (sql_err) {
				if (callback) {
					callback(sql_err, null, null);
				}
				return;
			}

			// sql_result返回给我们的结果
			// end 

			// fields_desic 每个字段的描述
			// end 
			if (callback) {
				callback(null, sql_result, fields_desic);
			}
		});
		// end 
	});
}

// select的查询结果就是 [包住结果(1条)]
var sql_cmd = "select * from uinfo limit 1";
mysql_exec(sql_cmd, function(err, sql_result, fields_desic) {
	if (err) {
		return;
	}

	if (sql_result) {
		console.log(sql_result);	
	}
});

// end
// update一般不关心结果，但是他会给我们回一个我们update的结果的情况。

sql_cmd = "update uinfo set upwd = \"777777777\"";
mysql_exec(sql_cmd, function(err, sql_result, fields_desic) {
	if (err) {
		return;
	}

	if (sql_result) {
		console.log(sql_result);	
	}
});


// 插入一条记录
sql_cmd = "insert into uinfo (uname, upwd) values(\"blake\", \"98989898\")";
mysql_exec(sql_cmd, function(err, sql_result, fields_desic) {
	console.log("get result");

	if (err) {
		console.log(err);
		return;
	}

	if (sql_result) {
		console.log(sql_result);	
	}
});
