import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import { getStore, removeAllStore } from '../config/mUtils'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import "babel-polyfill";
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
//console.log(Vue.http)
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('phone');
    if(!role && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})

import { Loading } from 'element-ui'; //loading全局配置
var loadingInstance = null;
// axios 拦截器token校验
axios.interceptors.request.use(
	config => {
		let options = {
			lock: true,
			text: 'Loading',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.3)'
		}
		loadingInstance = Loading.service(options);
		var xtoken = getStore('token');
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		//var xtoken = 'ce68ffefa0944d0db6cb034b50d5cb57'; //本地模拟token
		// axios 设置token 不能使用['token']的形式 必须使用.token的方式
		if(xtoken != null){
			config.headers['token']  = xtoken;
		}
		if(config.method=='post'){
			config.data = {
				...config.data,
				_t: Date.parse(new Date())/1000,
			}
		}else if(config.method=='get'){
			config.params = {
				_t: Date.parse(new Date())/1000,
				...config.params
			}
		}
		return config
	},function(error){
		return Promise.reject(error)
	}
)
axios.interceptors.response.use(function (response) {
	var tokenId = getStore('token');
	console.log('interceptors.response', response)
// token 已过期，重定向到登录页面
	if (response.data.code == '-1024') {
		removeAllStore();
		var _self = this;
	}
	setTimeout(() => { 
		loadingInstance.close();
	},1000)	
//loadingInstance.close();
return response
}, function (error) {
// Do something with response error
	loadingInstance.close();	
	return Promise.reject(error)
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');