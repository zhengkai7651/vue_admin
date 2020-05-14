import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import elementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import Moment from 'moment'

Vue.use(elementUI)


// 定义全局时间戳过滤器
Vue.filter('formatDate', function(value) {
    return Moment(value).format('YYYY-MM-DD HH:mm')
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')