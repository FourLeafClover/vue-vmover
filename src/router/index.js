import Vue from 'vue'
import Router from 'vue-router'
import config from './router'
import { getCookie } from '@/utils/$cookie'
Vue.use(Router)
// import store from '@/store'
let routers = new Router({
  routes: config
})

routers.push = function (options) {
  let url = ''
  if (typeof (options) === 'string') {
    url = options
  } else {
    url = options.path
  }
  let baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:7878/#/' : 'http://www.intelligenttech.top/h5.movie/#/'
  if (url[0] === '/') {
    window.location.href = `${baseUrl.substr(0, baseUrl.length - 1)}${url}`
  } else {
    window.location.href = `${baseUrl}${url}`
  }
}

routers.beforeEach((to, from, next) => {
  if (to.meta.needAuth) {
    if (getCookie('vue.auth')) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
    }
  } else {
    next()
  }
})

export default routers
