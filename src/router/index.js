
let routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    meta: {
      title: '慧影云排期展示首页'
    },
    component: (resolve) => require(['views/filmShow/login.vue'], resolve),
    name: '慧影云排期展示首页'
  },{
    path: '/swiperList',
    meta: {
      title: '慧影云排期展示首页'
    },
    component: (resolve) => require(['views/filmShow/swiperList.vue'], resolve),
    name: '慧影云排期展示首页'
  },{
    path: '/detailT1',
    meta: {
      title: '慧影云排期展示页'
    },
    component: (resolve) => require(['views/filmShow/detailT1.vue'], resolve),
    name: '慧影云排期展示页'
  },{
    path: '/detailT2',
    meta: {
      title: '慧影云排期展示页'
    },
    component: (resolve) => require(['views/filmShow/detailT2.vue'], resolve),
    name: '慧影云排期展示页'
  },{
    path: '/detailT3',
    meta: {
      title: '慧影云排期展示页'
    },
    component: (resolve) => require(['views/filmShow/detailT3.vue'], resolve),
    name: '慧影云排期展示页'
  },{
    path: '/detailT4',
    meta: {
      title: '慧影云排期展示页'
    },
    component: (resolve) => require(['views/filmShow/detailT4.vue'], resolve),
    name: '慧影云排期展示页'
  },{
    path: '/detailT5',
    meta: {
      title: '慧影云排期展示页'
    },
    component: (resolve) => require(['views/filmShow/detailT5.vue'], resolve),
    name: '慧影云排期展示页'
  },{
    path: '/detailT6',
    meta: {
      title: '慧影云排期展示页'
    },
    component: (resolve) => require(['views/filmShow/detailT6.vue'], resolve),
    name: '慧影云排期展示页'
  },{
    path: '/test',
    meta: {
      title: '慧影云排期展示页'
    },
    component: (resolve) => require(['views/filmShow/test.vue'], resolve),
    name: '慧影云排期展示页'
  }
];


export default routes;