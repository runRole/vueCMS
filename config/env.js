/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

//let homeIndex = "http://testdesert.youtiantouzi.com";
//let baseUrl = "http://desert.blockcomet.com";
 //let baseUrl = "http://10.0.75.1:8007";
let baseUrl = "http://10.0.0.121:8009";
//let baseUrl = "http://10.0.0.139:8009";
//let baseUrl = ''
if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'http://desert.blockcomet.com'
	//baseUrl = 'http://desertback.youtiantouzi.com'
	//baseUrl = 'https://www.91biduo.com'
	//baseUrl = "http://localhost:8000";
	//baseUrl = "http://139.199.96.84:8084";
	//let baseUrl = "http://10.0.0.121:8000";
}

export {
	baseUrl,
}
