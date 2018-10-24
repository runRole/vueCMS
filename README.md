# vueCMS #


## 前言 ##
用过react, vue 做各种项目,虽然我不知道我的做法对不对,但是经常有一个问题困扰我,就是前后端对接的api部分。有很多时候我们不需要用proxy的代理形式去对接后端api
这个框架就是如此,可以直接配置config/env.js下的baseUrl就可以开始前后端的对接了。

## 来源 ##
改框架是此来源基础上进行了修改
[来源](https://github.com/lin-xin/vue-manage-system)
## 功能 ##
- [x] Element UI
- [x] 登录/注销
- [x] 其他就不一一列举

## 安装步骤 ##

	git clone https://github.com/runRole/vueCMS.git     // 把模板下载到本地
	cd vueCMS    // 进入模板目录
	npm install         // 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:8080
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build

### element-ui ###
一套基于vue.js2.0的桌面组件库。访问地址：[element](http://element.eleme.io/#/zh-CN/component/layout)
