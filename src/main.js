import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
import axios from 'axios'
// 引入进度条样式  第三方包 直接包名和具体文件
import 'nprogress/nprogress.css'
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
Vue.use(elementUi)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
