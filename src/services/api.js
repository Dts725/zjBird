import http from '../core/http'
import userinfo from '../services/userinfo'
var api = {};
var setToken = function (params) {
  var _params = Object.assign({}, params);
  if (userinfo.store) {
    _params.uid = userinfo.store.uid;
    _params.token = userinfo.store.token;
  }
  return _params;
};
/* *** php的apiv2接口 start *** */

//获取交易流水
api.get_trade = function (params) {
  return http('post', '/api/pay/create/trade', params,'apiv2');
};

//获取客服电话
api.service_phone = function (params) {
  return http('get', '/api/app_config', params,'apiv2');
};

//获取验证码,判断工友
api.get_phone = function (params) {
  return http('post', '/api/get_verify_code_api', params,'apiv2');
};
//获取验证码
api.get_phones = function (params) {
  return http('post', '/api/get_verify_code', params,'apiv2');
};
//获取是哪个服务商
api.get_service = function(params){
  return http('get', '/api/worker/site', params,'apiv2');
};
//业主端登录
api.login = function (params) {
  return http('post', '/api/howner/login', params,'apiv2');
};
//获取领红包
api.get_regmoney = function(params){
  return http('post', '/api/worker/rInvitation', params,'apiv2');
};
//预约工友
api.get_order = function (params) {
  return http('post', '/api/howner/order/create', params,'apiv2');
};

// api.get_aliOss = function(params){
//   return http('post', 'http://apiv2.e1.fat.zjbird.com/api/worker/rInvitation', params,true);
// };

//服务类型接口
api.get_requtype = function (params) {
  return http('get', '/api/order/reqtype', params,'apiv2');
};
//获取工友信息
api.workerDetail = function (params) {
  return http('post', '/api/worker/info', params,'apiv2');
};
//邀请记录title
api.inviteRecordTitle = function (params) {
  return http('get','/api/worker/invite_sum',params,'apiv2');
};
//邀请记录
api.inviteRecordCount = function (params) {
  return http('get','/api/worker/invite_list',params,'apiv2');
};
//是否创错过金额
api.missMoney = function (params) {
  return http('get','/api/worker/miss_money',params,'apiv2');
};
/* ** end ** */

/* *** php的白条接口 start *** */
//查询剩余金额
api.whiteLimitMoney = function (params) {
  return http('post','/api/white/whitelimitmoney',params,'whitebar');
};
//白条列表
api.whiteList = function (params) {
  return http('get','/api/white/whitelist',params,'whitebar');
};
//白条状态
api.whiteStatus = function (params) {
  return http('get','/api/white/getwhitestatus',params,'whitebar');
};
//白条详情
api.whiteListDetail = function (params) {
  return http('get','/api/white/whitedetail',params,'whitebar');
};
//选择还款
api.choosePayment = function (params) {
  return http('post','/api/white/chooserepayment',params,'whitebar')
};
//还款详情
api.paymentDetail = function (params) {
  return http('get','/api/white/getrepaymentdetail',params,'whitebar')
};
//查看还款记录
api.repayList = function (params) {
  return http('get','/api/white/repaymentlist',params,'whitebar')
};
//白条协议
api.argremment = function (params) {
  return http('get','/api/white/getwhiteagreement',params,'whitebar')
};
/* ** end ** */


/* *** java的白条接口 start *** */
//开通工友白条
api.regBt = function (params) {
  return http('post','/serviceapi/white/apply',params,'api4j')
};
//查看白条
api.lookBt = function (params) {
  return http('post','/serviceapi/white/applyinfo',params,'api4j')
};

//更改白条协议四个字
api.textConfig = function (params) {
  return http('get','/serviceapi/white/getConfig',params,'api4j')
};
//微信分享接口
api.share = function (params) {
  return http('post', '/serviceapi/wechat/share_support', params,'api4j');
};

//中奖记录
api.luckList = function (params) {
  return http('get', '/serviceapi/get_lucky_draw_list', params,'api4j');
};
//抽奖次数
api.geetLuckyDrowCount = function (params) {
  return http('post','/serviceapi/get_lucky_draw_count',params,'api4j');
};
//抽奖
api.doLuckyDraw = function (params) {
  return http('post','/serviceapi/do_lucky_draw',params,'api4j');
};


//验证支付密码
api.verifyPaypassword = function (params) {
  return http('post', '/serviceapi/worker/verification_paypassword', params, 'api4j');
};

//设置支付密码
api.set_paypassword = function(params){
  return http('post', '/serviceapi/worker/set_paypassword', params, 'api4j');
};

//修改密码
api.alter_paypassword = function(params){
  return http('post', '/serviceapi/worker/alter_paypassword', params, 'api4j');
};

//获取是否是会员
api.getGrade = function (params) {
  return http('post', '/serviceapi/worker/get_member_grade', params, 'api4j');
};

//获取鸟蛋详细信息
api.getBirdegg = function (params) {
  return http('post', '/serviceapi/birdegg/get_birdegg_message', params, 'api4j');
};

//获取指定月份鸟蛋支出信息
api.getBirdeggList = function (params) {
  return http('post', '/serviceapi/birdegg/get_birdegg_payments_list', params, 'api4j');
};

//获取鸟蛋指出详情
api.getBirdeggDetails = function (params) {
  return http('post', '/serviceapi/birdegg/get_birdegg_payment_details', params, 'api4j');
};

//获取施工案例图片接口
api.get_work_img = function (params) {
  return http('post', '/serviceapi/get_worker_case', params,'api4j');
};
//获取工友地区
api.get_work_area = function (params) {
  return http('post', '/serviceapi/get_area_data', params,'api4j');
};







//日志接口
api.pushLog = function (params) {
  return http('post', '/serviceapi/log/write2', params, 'api4j');
};
/* ** end ** */

export default api;
