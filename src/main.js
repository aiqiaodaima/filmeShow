import Vue from 'vue';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import api from './http/index';
import VueRouter from 'vue-router';
import store from './vuex/index';
import routes from './router/index';
import NProgress from 'nprogress';
import axios from 'axios';
import md5 from 'js-md5'
import 'nprogress/nprogress.css';

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
// import 'lib-flexible'
import {
    MessageBox,
    Message
} from 'element-ui';
import './assets/element-common.scss'
import './assets/iconfont/iconfont.css'
Vue.use(VueRouter);
Vue.use(api);
Vue.prototype.axios = axios;
let wsUrlHost = "pos";
if(location.host.indexOf('dev')>-1) wsUrlHost = 'devpos';
if(location.host.indexOf('test')>-1) wsUrlHost = 'testpos';
if(location.host.indexOf('pre')>-1) wsUrlHost = 'prepos';
let urlArr = location.host.split('.')

Vue.prototype.$wsUrl = process.env.NODE_ENV == 'production' ? `wss://api${wsUrlHost}.${urlArr[1]}.${urlArr[2]}/websocket/server/` : 'wss://apitestpos.oristarcloud.com/websocket/server/'
// Vue.use(ElementUI)
const router = new VueRouter({
    mode: 'history',
    routes
});

/**
 * Config
 */

Vue.config.debug = process.env.NODE_ENV === 'development'
Vue.config.silent = process.env.NODE_ENV === 'production'
Vue.config.devtools = true
Vue.config.productionTip = false

const setGlobalTopNavs = function (to, next) {
    let matchedLength = to.matched.length;
    let item = to;
    if (matchedLength > 2) {
        item = to.matched[1];
    }
    if (!item.meta.hidden) {
        let newItem = {
            name: item.meta.title,
            path: item.path,
            query: item.query,
            params: item.params
        }
        store.commit('updateNavTabData', newItem);
    }
    next();
}

Vue.use(require('vue-wechat-title'));
router.beforeEach((to, from, next) => {
    NProgress.done();
    if (localStorage.ctmRemberTerminal) {
        next()
        if (to.query.license) {
            let httpObj = {
                licenseKey: to.query.license,
                type: 1 // 账号类型,1排期展示 2语言播报
            }
            Vue.prototype.$ctmList.filmLogin(httpObj).then(res => {
                if (res.code === 200 && res.data) {
                    localStorage.setItem("ctmRemberTerminal", JSON.stringify(res.data))
                    next();
                } else {
                    Vue.prototype.error(res.data);
                    next();
                }
            })
        }
        // next({
        //     path: '/detailT3'
        // })
    } else {
        if (to.query.license) {  // 如果url 带license 执行的方法
            console.log(to.query.license)
            let httpObj = {
                licenseKey: to.query.license,
                type: 1 // 账号类型,1排期展示 2语言播报
            }
            console.log(Vue.prototype.$ctmList)
            Vue.prototype.$ctmList.filmLogin(httpObj).then(res => {
                if (res.code === 200 && res.data) {
                    res.data.passwordMd5 = md5(res.data.password)
                    localStorage.setItem("ctmRemberTerminal", JSON.stringify(res.data))
                    next();
                } else {
                    localStorage.removeItem("ctmRemberTerminal")
                    Vue.prototype.error(res.data);
                    next({path:'/login'});
                }
            })
        } else if (to.path.indexOf("/cms-mvs/page/") != -1) {
            console.log('进来了--/cms-mvs/page')
            next({
                path: '/login'
            })
        } else {
            next();
        }
    }
});
router.afterEach((transition) => {
});

//整理全局弹出框
Vue.prototype.alert = function (obj) {
    let str = obj.str ? obj.str : '',
        title = obj.title ? obj.title : '提示',
        btnText = obj.btnText ? obj.btnText : '确定';
    MessageBox.alert(str, title, {
        confirmButtonText: btnText,
        callback: (action) => {
            if (obj.callBack) {
                obj.callBack(action);
            }
        }
    });
};
//整理全局访问框
Vue.prototype.confirm = function (obj) {
    let str = obj.str ? obj.str : '',
        title = obj.title ? obj.title : '提示',
        btnText = obj.btnText ? obj.btnText : '确定',
        cancelText = obj.cancelText ? obj.cancelText : '取消',
        type = obj.type ? obj.type : 'warning';
    MessageBox.confirm(str, title, {
            confirmButtonText: btnText,
            cancelButtonText: cancelText,
            type: type
        })
        .then(() => {
            if (obj.callBack) {
                obj.callBack();
            }
        })
        .catch(() => {
            if (obj.cancelCallBack) {
                obj.cancelCallBack();
            }
        });
};
//整理全局错误信息
Vue.prototype.error = function (str) {
    Message({
        message: str,
        type: 'warning'
    });
};

//整理全局成功信息
Vue.prototype.success = function (str) {
    Message({
        message: str,
        type: 'success'
    });
};

// 升降序
Vue.prototype.sort = function (str, type) {
    return function (a, b) {
        if (type == 'up') {
            return a[str] - b[str];
        } else if (type == 'down') {
            return b[str] - a[str];
        }
    }
}

//  全局组件之间通信
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()

// 设置浏览器窗口大小
window.onresize = function (e) {
    store.commit('changeWindowSize', {
        innerWidth: e.target.innerWidth,
        innerHeight: e.target.innerHeight
    });
}



new Vue({
    router,
    store,
    el: '#app',
    data: {
        eventHub: new Vue()
    },
    render: (h) => h(App)
});