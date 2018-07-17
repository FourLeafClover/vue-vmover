import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import 'vant/lib/vant-css/index.css'
import i18n from './language'
import './components'
import './filters'
Vue.use(vant)
Vue.config.productionTip = false
let $vm = new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
window.$vm = $vm
