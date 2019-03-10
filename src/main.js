import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '../lib/http'
Vue.use(http)
Vue.use(ElementUI)
Vue.config.productionTip = false
import router from '../lib/router'
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
