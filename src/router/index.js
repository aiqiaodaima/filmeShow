
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
    path: 'add',
    meta: {
      title: '慧影云排期展示首页'
    },
    component: (resolve) => require(['views/filmShow/add.vue'], resolve),
    name: '慧影云排期展示首页'
  }
];


export default routes;