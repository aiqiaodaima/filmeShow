// ctm router-children
const csmRoutes = [{
        path: 'index',
        meta: {
            title: '销售主页'
        },
        component: (resolve) => require(['../../views/csm/index.vue'], resolve),
        name: '销售主页'
    }

];

export default csmRoutes;