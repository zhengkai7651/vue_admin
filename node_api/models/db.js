const mysql = require('mysql');
const { dbConfig } = require('../config.js');
var pool  = mysql.createPool(dbConfig);

// 创建db对象 操作数据库
var db = {}; 

db.q = function(sql,params){
	return new Promise((resolve,reject) => {
		pool.getConnection(function(err,connection){
			if(err){ reject(err);return; }

			connection.query(sql,params,function(error,results,fields) {
				console.log(`${sql}=>${params}`);
				connection.release();
				if(error) {
					console.log(error)
					reject(error);
				}
				resolve(results);
			});
		});
	});
}

module.exports = db;
