import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
          path: '/login',
          component: () => import('../components/page/Login'),
        },
        {
            path: '/home',
            component: () => import('../components/Home'),
            children: [
                {
                    path: '/dashboard',
                    component: () => import( '../components/page/Dashboard'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/Merchants',
                    component: () => import( '../components/page/Merchants'),
                    meta: { title: '商家管理' }
                },
                {
                    path: '/Goods',
                    component: () => import('../components/page/Goods'),
                    meta: { title: '商品管理' },
                },
                {
                  path: '/GoodUpload',
                  component: () => import('../components/page/GoodUpload'),
                  meta: { title: '上传商品' },
                },
                {
                  path: '/Order',
                    component: () => import( '../components/page/OrderList'),
                    meta: { title: '订单管理' }
                }
            ]
        },
    ]
});


// 路由导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next()
    } else {
      let token = localStorage.getItem('ms_username')
      if (token == null || token === '') {
        next('/login')
      } else {
        next()
      }
    }
  })

export default router;