const db = require("../models/db.js");
const storeModel = require("../models/db_store.js");
const path = require("path");

module.exports = {
	// 登录
	doLogin: async (ctx,next) => {
		// 获取用户名
		let { username,password } = ctx.request.body;  // POST 在body中

		if(!username || !password){
			ctx.body = { code: 102,msg: '请输入正确的用户名或密码' }
			return;
		}
		// 根据用户名查询数据库
		let dbUser = await storeModel.findByUser(username);
		if(dbUser[0].user_name.length == 0) {
			ctx.body = { code: 102,msg: '用户名或者密码错误！' }
			return;
		}
		//匹配密码
		console.log("登录用户:" + dbUser[0].password) 
		
		if(password === dbUser[0].password){
			ctx.body = { code: 200, msg: '登录成功！' }
			return
		}
		ctx.body = { code: 102, msg: '密码错误！' }
	},
	// 商品列表
	allGoods: async (ctx,next) => {
		let {p,size,keywrods} = ctx.request.query;//GET 参数在query 中
		p = Number(p);
		size = Number(size)
		if(p <= 0 || size <= 0 || isNaN(p) || isNaN(size)){
			ctx.body = { code: 102, msg: '页码错误,请输入正确页码.' }
			return;
		}
		if(p < 1 || size < 1){
			ctx.body = { code: 102, msg: '页码错误,请输入正确页码.' }
			return;
		}
		p = (p-1) * size;

		// 获取全部商品数据
		let goodTotal,goodData; // 总条数，商品data
		if(keywrods != '' && keywrods != null){
			keywrods = '%' +keywrods+ '%';
			goodTotal = await storeModel.queryGoodsTotal(keywrods);
			goodData = await storeModel.queryGoods([keywrods,p,size]);
		}else {
			goodTotal = await storeModel.goodTotal();
			goodData = await storeModel.allGoods([p,size]);
		}
		if(goodTotal <= 0) {
			ctx.body = { code: 200, msg: '暂无商家入驻.',goodList: [],goodTotal:goodTotal[0].goodCount }
			return;
		}
		ctx.body = {
			code: 200,
			msg: '获取成功',
			goodList: goodData,
			goodTotal: goodTotal[0].goodCount
		};
	},
	// 商户列表
	allStores: async (ctx,next) => {
		let {p,size,keywrods} = ctx.request.body;
		p = Number(p);
		size = Number(size)
		console.log(p,size)

		if(p <= 0 || size <= 0 || isNaN(p) || isNaN(size)){
			ctx.body = { code: 102, msg: '页码错误,请输入正确页码.' }
			return;
		}
		p = (p-1) * size;
		let storeTotal,storeData;
		if(keywrods != '' && keywrods != null){
			keywrods = '%' +keywrods+ '%';
			storeTotal = await storeModel.queryStoreTotal(keywrods);
			storeData = await storeModel.queryStores([keywrods,p,size]);
		}else {
			storeTotal = await storeModel.storeTotal();
			storeData = await storeModel.allStores([p,size]);
		}
		// 获取全部商家数据
		console.log(storeTotal[0].storeCount);
		if(storeTotal <= 0 || storeData.length <= 0) {
			ctx.body = { code: 200, msg: '暂无商家入驻.',stores: [],storeTotal:0 }
			return;
		}
		// console.log(storeData);
		ctx.body = {
			code: 200,
			msg: '获取成功',
			stores: storeData,
			storeTotal: storeTotal[0].storeCount
		};
	},
	allOrders: async (ctx,next) => {
		let { p,size,start_date,end_date } = ctx.request.query;
		p = Number(p);
		size = Number(size)
		// console.log(p,size)
		console.log(start_date,end_date)
		if(p <= 0 || size <= 0 || isNaN(p) || isNaN(size)){
			ctx.body = { code: 102, msg: '页码错误,请输入正确页码.' }
			return;
		}
		p = (p-1) * size;
		let orderTotal,orderData;
		if(start_date != '' && end_date != ''){
			orderTotal = await storeModel.queryOrderTotal([start_date,end_date]);
			orderData = await storeModel.queryOrder([start_date,end_date,p,size]);
		}else {
			orderTotal = await storeModel.allOrderTotal();
			orderData = await storeModel.allOrders([p,size]);
		}
		// 获取全部商家数据
		console.log(orderTotal[0].orderTotal);
		if(orderTotal[0].orderTotal <= 0 || orderData.length <= 0) {
			ctx.body = { code: 200, msg: '无订单数据.',orderList: [],orderTotal:0 }
			return;
		}
		
		ctx.body = {
			code: 200,
			msg: '获取成功',
			orderList: orderData,
			orderTotal: orderTotal[0].orderTotal
		};
	},

}
