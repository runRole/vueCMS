import { getStore } from '../../config/mUtils'
import { baseUrl } from '../../config/env'
import axios from 'axios'
import md5 from 'js-md5' //md5对用户密码进行加密传送
axios.defaults.baseURL = baseUrl;
//axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';


/**
 * 账号密码登录
 */
export const accountLogin = (phone, password) => axios.get('/user/login', {
	params: {
		phone ,
		password:md5.hex(phone+password)
	}
}).then(function(res){
	return res;
})
.catch(function(err){
	console.log(err);
	});

	/**
 * 后台管理员注册
 */
export const mgrRegister = (phone, password, roleId = 1) => axios.get('/user/register', {
	params: {
		phone ,
		password: md5.hex(phone + password),
		roleId,
	}
}).then(function(res){
	return res.data;
})
.catch(function(err){
	console.log(err);
	});



//项目详情
export const queryProject = (pageIndex = 1 , pageSize = 1) => axios.get('/api/project/list', {
		params: {
			pageIndex,
			pageSize
		}
	}).then(function (res) { 
		return res.data;
	}).catch(function (err) { 
		console.log(err)
	})

//用户列表

export const queryUser = (pageIndex, pageSize,phone) => axios.get('/user/quaryUserList', {
	params: {
		pageIndex,
		pageSize,
		phone
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

/**原项目api分割线------------------------------------------------------------------------- */

//项目详情
export const queryProjectById = (projectId) => axios.get('/home/projectDetail', {
	params: {
		projectId,
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//推荐活动

export const awardProject = (pageIndex = 1, pageSize = 10) => axios.get('/award/myRecommendationList', {
	params: {
		pageIndex,
		pageSize
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//推荐奖励列表
export const awardList = (pageIndex = 1, pageSize = 10,projectId) => axios.get('/award/awardList', {
	params: {
		pageIndex,
		pageSize,
		projectId
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})	


//生成海报
export const sharePoster = (projectId, content) => axios.get('/common/poster', {
	params: {
		projectId,
		content
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
	})

// 查询报名状态
export const checkSignStatus = (projectId) => axios.get('/order/checkSignUp', {
	params: {
		projectId,
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

// 查询报名之后是否填写个人信息
export const checkUserMemo = (projectId) => axios.get('/account/checkUserMemo', {
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//首页统计数据
export const queryProjectStatistics = (projectId) => axios.get('/home/statistics', {
	params: {
		projectId
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//获取队伍列表
export const queryTeamList = (projectId,pageIndex,pageSize) => axios.get('/team/list', {
	params: {
		projectId,
		pageIndex,
		pageSize,
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//微信登录
export const wxuserLogin = (code) => axios.get('/account/getwxuser', {
	params: {
		code,
	}
}).then(function (res) { 
	return res;
}).catch(function (err) { 
	console.log(err)
})

//查询登录信息
export const queryUserInfo = (token) => axios.get('/account/quaryUserInfo', {
	params: {
		token,
	}
}).then(function (res) {
	return res;
}).catch(function (err) { 
	console.log(err)
})

//更新登入信息--绑定
export const updateUserInfo = (realname, phoneNumber, code) => axios.post('/account/updateUserInfo', {
	realname,
	phoneNumber,
	code,
}).then(function (res) { 
	return res;
}).catch(function (err) { 
	console.log(err)
	})

//修改保险信息
export const updateInsurance = (memo) => axios.post('/account/updateInsurance', {
	memo,
}).then(function (res) { 
	return res;
}).catch(function (err) { 
	console.log(err)
	})	

// 加入队伍
export const addToTeam = (teamId, teamCode,projectId) => axios.get('/team/chooseTeam', {
	params:{
		teamId,
		teamCode,
		projectId
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
	})

//新建队伍 /team/createTeam
export const createTeam = (name, projectId, teamCode, payType) => axios.post('/team/createTeam', {
	name,
	projectId,
	teamCode,
	payType,//1、队友自付 2、队友免付
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//生成队伍密码 /team/generateTeamCode
export const createTeamCode = () => axios.get('/team/generateTeamCode', {
	
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//修改队伍 /team/createTeam
export const updateTeam = (teamId, teamName) => axios.get('/team/updateTeam', {
	params: {
		teamId,
		teamName
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//getTeamDetailById
export const getTeamDetailById = (teamId, valid = 1) => axios.get('/team/teamDetail', {
	params: {
		teamId,
		valid
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//我要报名 - 创建订单
export const createOrder = (projectId , payType, teamId, payAmount,inviterToken) => axios.get('/order/createOrder', {
	params: {
		projectId,
		payType,
		teamId,
		payAmount,
		inviterToken
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//取消订单

export const cancelOrder = (orderId) => axios.get('/order/cancelOrder', {
	params: {
		orderId,
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})


//创建众筹支付订单
export const createCrowdFundingOrder = (crowdFundingId, payAmount, inviterToken) => axios.get('/order/createCrowdFundingOrder', {
	params: {
		crowdFundingId,
		payAmount,
		inviterToken
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})


// 获取支付信息
export const invokePay = (orderId,  valid= 1) => axios.get('/order/toPay', {
	params: {
		orderId,
		valid,
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
	})


//新增众筹列表 post 创建众筹信息(点击发起众筹时调用)
export const addFundingRecord = (teamId,projectId,fundingAmount, inviterToken) => axios.post('/crowdfunding/insert', {
	projectId,
	teamId,
	fundingAmount,
	inviterToken
}).then(function (res) {
	return res.data;
})
.catch(function(err){
	console.log(err);
});

//发起众筹,生成订单
export const beginFunding = (crowdFundingId, payAmount) => axios.get('/order/createCrowdFundingOrder', {
	params:{
		crowdFundingId,
		payAmount
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

// 个人中心模块 -- 查询众筹
export const queryFunding = (pageIndex=1, pageSize=10, status,  userId = 1, ) => axios.get('/crowdfunding/query', {
	params:{
		pageIndex,
		pageSize,
		status,
		userId
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

// 单个众筹详情

export const queryFundingDetailById = (id) => axios.get('/crowdfundingDetail/queryCrowdfundingListDetail', {
	params:{
		id
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//查看众筹的金额
export const queryFundingAmount = (id) => axios.get('/crowdfundingDetail/queryCrowdfundingAmount', {
	params:{
		id
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//查看众筹的支持人列表
export const queryFundingPeople = (id) => axios.get('/crowdfundingDetail/paymentList', {
	params:{
		id
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//我参与的活动
export const myProjectJoined = (pageIndex = 1, pageSize = 10,projectId) => axios.get('/team/selectPersonalCenterMyTeam', {
	params: {
		pageIndex,
		pageSize,
		projectId
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
	})

//我的队伍teamCreatByMe

export const teamCreatByMe = (projectId = null) => axios.get('/team/selectPersonalTeamLeader', {
	params: {
		
		projectId,
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
	})
 
//查看我的队友
export const queryMyTeamMember = (id) => axios.get('/team/selectPersonalCenterMyPlayerList', {
	params:{
		id,
	}
}).then(function (res) { 
	return res.data;
}).catch(function (err) { 
	console.log(err)
})

//我支持的众筹

export const mySupportFunding = (pageIndex = 1, pageSize = 10) => axios.get('/order/selectSupportAmount', {
	params:{
		pageIndex,
		pageSize
	}
	}).then(function (res) { 
		return res.data;
	}).catch(function (err) { 
		console.log(err)
	})


/**
 * 我的--订单列表
 */

export const myOrderList = (pageIndex = 1 , pageSize = 10, orderStatus = 1,valid = 1) => axios.get('/order/selectPersonalCenterOrderList', {
	params: {
		pageIndex,
		pageSize,
		orderStatus,
		valid,
	}
}).then(function (res) {
	return res.data;
})
.catch(function(err){
	console.log(err);
});

	/**
	 * 我的---数字货币充值
	 */
	export const myRechargeMoney = () => axios.get('/ma/myRechargeMoney.action', {
	}).then(function (res) {
		return res;
	})
	.catch(function(err){
		console.log(err);
	});


	/**
 * 单个币种投资记录
 */

export const singleCoinRecord = (planId) => axios.get('/invest/investList.action', {
	params: {
		planId,
	}
}).then(function (res) {
	return res;
})
.catch(function(err){
	console.log(err);
});


	/**
 * 单个币种投资详情
 */

export const singleInvestRecord = (creditId,creditType) => axios.get('/ma/godCreditDetail.action', {
	params: {
		creditId,
		creditType
	}
}).then(function (res) {
	return res;
})
.catch(function(err){
	console.log(err);
});

/**
 * 我的数字货币
 */

export const myAccountDetail = (pageIndex = 1, pageSize = 10) => axios.get('/ma/myAccountDetail.action', {
	params: {
		pageIndex,
		pageSize,
	}
}).then(function (res) {
	return res;
})
.catch(function(err){
	console.log(err);
	});

/**
 * 提现---可提币数量
 */

export const withdrawalAmount = (coinType) => axios.get('/ma/preWithdraw.action', {
	params: {
		coinType
	}
	
}).then(function (res) {
	return res;
})
.catch(function(err){
	console.log(err);
});

/**
 * 我的资金流水
 */

export const myMoneyRecord = (pageIndex = 1, pageSize = 10) => axios.get('/ma/myMoneyRecord.action', {
	params: {
		pageIndex,
		pageSize,
	}
}).then(function (res) {
	return res;
})
.catch(function(err){
	console.log(err);
});

	/**
 * 我的充值记录
 */

export const myRechargeRecord = (pageIndex = 1, pageSize = 10) => axios.get('/ma/myChargeRecord.action', {
	params: {
		pageIndex,
		pageSize,
	}
}).then(function (res) {
	return res;
})
.catch(function(err){
	console.log(err);
});

/**
 * 我的提现记录
 */

export const myWithdrawRecord = (pageIndex = 1, pageSize = 10,coinType) => axios.get('/ma/myWithdrawRecord.action', {
	params: {
		pageIndex,
		pageSize,
		coinType
	}
	
}).then(function (res) {
	return res;
})
.catch(function(err){
	console.log(err);
});

/**
 * 我的--提现--提币地址
 */

export const myWithdrawalAdd = () => axios.get('/uc/myBankCard.action', {
}).then(function (res) {
	return res;
})
.catch(function(err){
	console.log(err);
});


/**
 * 我的--提现--新增提币地址
 */

export const addWithdrawalAdd = (bankName, cardNumber, province, memo) => axios.post('/uc/addAddress.action', {
	bankName,
	cardNumber,
	province,
	memo,
}).then(function (res) {
	return res;
})
.catch(function(err){
	console.log(err);
});

/**
 * 我的--提现--新增提币地址
 */

export const removeWithdrawalAdd = (bankCardId) => axios.get('/uc/removeAddress.action', {
	params: {
		bankCardId
	}
}).then(function (res) {
	return res;
})
.catch(function(err){
	console.log(err);
});

/**
 * 查询登录信息是否失效
 */

export const checkSession = () => axios.get('/checkSession.action', {
});

/**
 * 查询是否实名认证
 */

export const checkRealName = () => axios.get('/checkRealName.action', {
	params: {
		phone: getStore('phone')
	}
});

/**
 * 实名认证
 */

export const validateRealName = (fullName, idNumber) => axios.post('/uc/nameIdentify.action', {
	phone: getStore('phone'),
	fullName,
	idNumber
});


/**
 * 获取用户信息
 */

export const getUser = () => axios.get('/news/quaryusers', {
	params: {
		userId: getStore('user_id')
	}
});


//账号密码注册
export const accountRegister = (userName, userPwd, phoneCode) => axios.get('/news/registerUser', {
	params: {
		userName,
		userPwd:md5.hex(userName+userPwd),
		phoneCode:phoneCode
	}
}).then(function(res){
	return res;
})
.catch(function(err){
	console.log(err);
});


//标的计划详情

export const queryPlayDetail = (planId, coinType) => axios.get('/invest/planDetail.action',{
	params:{
		planId,
		coinType
	}
})

//我的-提现-用户提现

export const userWithdrawMoney = (amount, address, memo, outcomeVerifycode, coinType) => axios.post('/ma/myWithdrawMoney.action',{
	amount,
	address,
	memo,
	outcomeVerifycode,
	coinType
})

//注册-验证手机号是否存在
export const checkWhetherPhoneExit = (phone) => axios.get('/checkPhone.action',{
	params:{
		'phone': phone,
	}
})

//注册-推荐手机号是否存在
export const checkWhetherRecPhoneExit = (recommend ) => axios.get('/checkRecommend.action',{
	params:{
		recommend,
	}
})
//发送验证码
export const sendBandCode = (phone) => axios.get('/account/getPhoneCode', {
	params: {
		phone,
	}
})
//注册

export const sendRegisterInfo = (phone, loginKey, code, recommend) => axios.get('/register.action', {
	params: {
		'god.phone': phone,
		'god.loginKey': md5.hex(loginKey),
		'god.code': code,
		'god.recommend': recommend
	}
})

// export const sendRegisterInfo = (phone,loginKey,code,recommend ) => axios.post('/register.action',{
// 	'god.phone': phone,
// 	'god.loginKey': md5.hex(loginKey),
// 	'god.code': code,
// 	'god.rec.recommend': recommend
// })



/**
 * 获取banner
 */

export const homeBanner = ( adType=3 ) => axios.get('/cms/ad.action', {
	params: {
		adType
	}
})





/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');
