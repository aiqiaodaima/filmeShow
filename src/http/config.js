let config = {
    methods: 'post',
    baseURL: '', //http://localhost:9006/api',//'http://m.tthappy.cn/api', //基础URL前缀
    headers: {
        //请求头信息
        'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {}, //参数
    timeout: 10000, //设置超时时间
    withCredentials: true, //携带凭证
    responseType: 'JSON'
};
let domain = document.domain,
protocol = window.location.protocol;
console.log(domain)
switch (domain) {
    case "127.0.0.1":
    config.baseURL = protocol + '//apidev.oristarcloud.com'
    // config.baseURL = protocol + '//apitest.oristarcloud.com'
        break;
    case "devfilmshow.oristarcloud.com":
    config.baseURL = protocol + '//apidev.oristarcloud.com'
        break;
    case "filmshow.oristarcloud.com":
    config.baseURL = protocol + '//api.oristarcloud.com'
        break;
    case "testfilmshow.oristarcloud.com":
    config.baseURL = protocol + '//apitest.oristarcloud.com'
        break;
    case 'prefilmshow.oristarcloud.com':
        config.baseURL = protocol + '//apipre.oristarcloud.com'
        break
    default:
    config.baseURL = protocol + '//apidev.oristarcloud.com'
        break;
}
export default config;