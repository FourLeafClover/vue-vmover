import Vue from 'vue'
import Router from 'vue-router'
import Routers from './router'
Vue.use(Router)

let router = new Router({
    routes: Routers,
    mode: process.env.VUE_MODE,
    base: process.env.VUE_BASE
});

export default router