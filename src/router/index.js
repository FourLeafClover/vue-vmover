import Vue from 'vue'
import Router from 'vue-router'
import Routers from './router'
Vue.use(Router)

let router = new Router({
    routes: Routers
});

export default router