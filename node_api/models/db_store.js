const db = require("./db.js");

module.exports = {
	findByUser: async username => await db.q("select * from ty_admin where user_name=?",username),
	allStores: async pages => await db.q("select * from ty_store limit ?,?",Object.values(pages)),
	storeTotal: async () => await db.q("select count(store_id) as storeCount from ty_store",""),
	queryStores: async pages => await db.q("select * from ty_store where store_name like ? limit ?,?",Object.values(pages)),
	queryStoreTotal: async keywrods => await db.q("select count(*) as storeCount from ty_store where store_name like ?",keywrods),
	
	// allGoods: async pages => await db.q("select * from ty_goods limit ?,?",Object.values(pages)),
	goodTotal: async () => await db.q("select count(goods_id) as goodCount from ty_goods",""),
	allGoods: async pages => await db.q("select g.goods_id,g.goods_name,g.is_on_sale,g.brand_id,g.on_time,g.original_img,g.shop_price,b.id,b.name " + 
"from ty_goods g LEFT JOIN ty_brand b ON b.id = g.brand_id AND b.status = 0 GROUP BY g.goods_id ORDER BY goods_id asc limit ?,?",Object.values(pages)),
	queryGoods: async pages => await db.q("select g.goods_id,g.goods_name,g.is_on_sale,g.brand_id,g.on_time,g.original_img,g.shop_price,b.id,b.name " + 
"from ty_goods g LEFT JOIN ty_brand b ON b.id = g.brand_id AND b.status = 0 where concat(g.goods_name,b.name) like ? GROUP BY g.goods_id  ORDER BY goods_id asc limit ?,? ",Object.values(pages)),
	queryGoodsTotal: async (keywrods) => await db.q("select count(*) as goodCount " +
"from ty_goods g LEFT JOIN ty_brand b ON b.id = g.brand_id AND b.status = 0 where concat(g.goods_name,b.name) like ?",keywrods),

	allOrders: async pages => await db.q("SELECT o.order_sn, ua.consignee, ua.mobile,"+
									 	 	"o.order_total, o.status,o.pay_kind,og.goods_names,o.create_time,s.store_name FROM ty_order o "+
											" LEFT JOIN ty_order_goods og ON o.id = og.order_id AND o.type = 1 "+
											" LEFT JOIN ty_user_address ua ON o.user_id = ua.user_id "+
											" LEFT JOIN ty_store s ON s.store_id = o.store_id "+
											" ORDER BY o.create_time desc"+
											" limit ?,?",pages),
	allOrderTotal: async () => await db.q("SELECT count(*) as orderTotal FROM ty_order o "+
											" LEFT JOIN ty_order_goods og ON o.id = og.order_id AND o.type = 1 "+
											" LEFT JOIN ty_user_address ua ON o.user_id = ua.user_id "+
											" LEFT JOIN ty_store s ON s.store_id = o.store_id ",""),
	queryOrder: async (pages) => await db.q("SELECT o.order_sn, ua.consignee, ua.mobile,"+
									 	 	"o.order_total, o.status,o.pay_kind,og.goods_names,o.create_time,s.store_name FROM ty_order o "+
											" LEFT JOIN ty_order_goods og ON o.id = og.order_id AND o.type = 1 " +
											" LEFT JOIN ty_user_address ua ON o.user_id = ua.user_id " +
											" LEFT JOIN ty_store s ON s.store_id = o.store_id " +
											" WHERE o.create_time>=? AND o.create_time<=? " +
											" ORDER BY o.create_time desc"+
											" limit ?,?",pages),
	queryOrderTotal: async (pages) => await db.q("SELECT count(*) as orderTotal FROM ty_order o "+
											" LEFT JOIN ty_order_goods og ON o.id = og.order_id AND o.type = 1 "+
											" LEFT JOIN ty_user_address ua ON o.user_id = ua.user_id "+
											" LEFT JOIN ty_store s ON s.store_id = o.store_id "+
											" WHERE o.create_time>=? AND o.create_time<=?" ,pages),

}