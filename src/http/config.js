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
let domain = document.domain;
// console.log(domain)
switch (domain) {
    case "127.0.0.1":
        config.baseURL = "http://apidev.oristarcloud.com";
        // config.baseURL = 'http://apidevzynf.oristarcloud.com/'
        // config.baseURL = 'http://172.17.10.43:9090';
        // config.baseURL = 'http://172.99.100.8:9090';
        break;
    case "dev.oristarcloud.com":
        config.baseURL = "http://apidev.oristarcloud.com";
        break;
    case "www.oristarcloud.com":
        config.baseURL = "https://api.oristarcloud.com";
        break;
    case "test.oristarcloud.com":
        config.baseURL = "http://apitest.oristarcloud.com";
        break;
    case 'devzynf.oristarcloud.com':
        config.baseURL = 'http://apidevzynf.oristarcloud.com/';
        break;
    case 'testzynf.oristarcloud.com':
        config.baseURL = 'http://apitestzynf.oristarcloud.com/';
        break;
    default:
        config.baseURL = "http://apidev.oristarcloud.com";
        break;
}
export default config;