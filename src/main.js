import Vue from 'vue'
import App from './App.vue'

//引入路由
import VueRouter from 'vue-router'
//引入路由器
import router from './router/index'

//引入axios
import axios from 'axios'

//引入复制到剪切板内容
import VueClipboard from 'vue-clipboard2'

//引入sha256加密技术
import { sha256 } from 'js-sha256'
Vue.prototype.$sha256 = sha256

Vue.use(VueClipboard)

//use路由
Vue.use(VueRouter)

//给Vue原型对象上挂载axios实例
Vue.prototype.$http = axios
//设置axios请求的url根路径
axios.defaults.baseURL = 'http://10.8.236.179:8000'

Vue.config.productionTip = false// 关闭Vue的生产提示

new Vue({
  render: h => h(App),
  router,
  // $mount和Vue的el配置项一样的作用
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
