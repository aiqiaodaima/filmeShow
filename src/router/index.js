import cimRoutes from './cim'
import ctmRoutes from './ctm'
import csmRoutes from './csm'

const routerView = {template: '<router-view></router-view>'};

let routes = [
  {
    path: '/',
    redirect: 'csm/index'

  },
  {
    path: '/cim',
    meta: {
      title: '卖品'
    },
    component: routerView,
    name: '卖品',
    redirect: 'cim/index',
    children: cimRoutes

  },
  {
    path: '/ctm',
    meta: {
      title: '票务'
    },
    component: routerView,
    name: '票务',
    redirect: 'ctm/index',
    children: ctmRoutes

  },
  {
    path: '/csm',
    meta: {
      title: '销售'
    },
    component: routerView,
    name: '销售',
    redirect: 'csm/index',
    children: csmRoutes

  }
];


export default routes;