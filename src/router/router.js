import index from '@/pages/index'
import cate from "@/pages/cate"
import videodetail from "@/pages/videodetail"
import catelist from "@/pages/catelist"
import keyword from "@/pages/keyword"
import search from "@/pages/search"

const routers = [{
    path: '/',
    name: 'index',
    component: index
}, {
    path: '/cate',
    name: 'cate',
    component: cate
}, {
    path: '/keyword',
    name: 'keyword',
    component: keyword
}, {
    path: '/search',
    name: 'search',
    component: search
}, {
    path: '/cate/videos',
    name: 'catevideolist',
    component: catelist
}, {
    path: '/video/detail',
    name: 'video',
    component: videodetail
}]

export default routers