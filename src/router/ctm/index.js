// ctm router-children
const ctmRoutes = [{
        path: 'index',
        meta: {
            title: '票务主页'
        },
        component: (resolve) => require(['../../views/ctm/index.vue'], resolve),
        name: '票务主页'
    }

];

export default ctmRoutes;