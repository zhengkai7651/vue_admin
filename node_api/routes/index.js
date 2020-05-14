const Router = require('koa-router');
let router = new Router();

const storeController = require("../controllers/store.js");
// 路由配置处理
router.post('/do-login', storeController.doLogin)
.get('/store/allGoods', storeController.allGoods)
.post('/store/allStores', storeController.allStores)
.get('/order/allOrder', storeController.allOrders)


module.exports = router
