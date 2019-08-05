// cim router-children
const cimRoutes = [{
        path: 'index',
        meta: {
            title: '卖品主页'
        },
        component: (resolve) => require(['../../views/cim/index.vue'], resolve),
        name: '卖品主页'
    }

];

export default cimRoutes;