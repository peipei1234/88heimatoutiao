import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
import axios from 'axios'
// 引入进度条样式  第三方包 直接包名和具体文件
import 'nprogress/nprogress.css'
// 引入第三方处理后端返回的数据包
import JSONbig from 'json-bigint'
axios.defaults.transformResponse = [function (data, headers) {
  // Do whatever you want to transform the data

  // axios 默认使用 JSON.parse(data)
  // 我们这里手动配置使用 JSONbig.parse(data)
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    // 一旦 try 里面的代码执行引发异常，那么就进入 catch 执行
    return data
  }
}]
// const data=``
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
Vue.use(elementUi)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
