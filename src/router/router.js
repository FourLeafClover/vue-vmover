let configs = [{
  path: '/',
  name: 'home',
  component: () =>
    import('@/views/Home.vue'),
  meta: {
    needAuth: false,
    index: 0,
    cache: true,
    topBarBottom: 60
  }
}, {
  path: '/detail/:id',
  name: 'detail',
  component: () =>
    import('@/views/Detail.vue'),
  meta: {
    needAuth: false,
    index: 10,
    cache: false,
    topBarBottom: 10
  }
}, {
  path: '/cates',
  name: 'cates',
  component: () =>
    import('@/views/Cate.vue'),
  meta: {
    needAuth: false,
    index: 0,
    cache: true,
    topBarBottom: 60
  }
}, {
  path: '/cate/:cateid',
  name: 'catedetail',
  component: () =>
    import('@/views/CateDetail.vue'),
  meta: {
    needAuth: false,
    index: 5,
    cache: true,
    topBarBottom: 10
  }
}, {
  path: '/search',
  name: 'search',
  component: () =>
      import('@/views/Search.vue'),
  meta: {
    needAuth: false,
    index: 5,
    cache: true,
    topBarBottom: 10
  }
},
{
  path: '/my',
  name: 'about',
  component: () =>
        import('@/views/About.vue'),
  meta: {
    needAuth: false,
    index: 0,
    cache: true,
    topBarBottom: 60
  }
},
{
  path: '/history',
  name: 'viewhistory',
  component: () =>
        import('@/views/ViewHistory.vue'),
  meta: {
    needAuth: false,
    index: 5,
    cache: true,
    topBarBottom: 10
  }
}
]

export default configs
