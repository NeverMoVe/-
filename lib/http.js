// 导包
import axios from 'axios'
import Vue from 'vue'
// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 发送请求时候调用 设置拦截器
axios.interceptors.request.use((config) => {
    // config 这次请求的各项设置 保存了请求的信息
    // 比如url地址和header地址

    // 判断路径是不是登录页面
   
    if (config.url.indexOf('/login') != -1) {
         // 除了登录页面其他设置请求头的token
        config.headers.Authorization = window.sessionStorage.getItem('token')
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 设置拦截器 响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    Vue.prototype.$message(response.data.meta.msg)
    return response;
}, function (error) {

    return Promise.reject(error);
});
export default {
    install(Vue) {
        Vue.prototype.$http = axios
    }
}



