<template>
  <div class="wechat-invite-container w100 h100" style="overflow: scroll;">
    <div class="img-box keyboard" :style="{marginTop:inputHeight + 'px'}">
    <!--<div class="img-box keyboard">-->
      <a href="javascript:void(0)">
       <img src="../../../assets/images/wechat/invite/regWorker.png" alt="">
      </a>
    </div>
    <div class="wechat-dialog-wrap">
      <div class="show-phone-box" v-show="isReg">
        <p class="text fz13 w100">
          我是住建鸟平台认证工程师，邀请你一起加入<span style="color:#FCFF00;display: inline;" v-cloak>{{serviceMan}}站</span>，形象更专业，接活不再难！
        </p>
        <div class="register-worker w100">
          <form class="register-box">
            <div class="form-group w100 flex-space-between">
              <input type="tel" v-model.trim="form.mobile" placeholder="请输入手机号"  maxlength="11"  style="width: 80%;"  @blur ="phoneNum()">
              <div class="img-box close-phone" v-show="form.mobile != ''" @click="form.mobile = '' ">
                <img src="../../../assets/images/wechat/invite/icon_close.png" alt="">
              </div>
              <!--<i class="close-phone fz15 tac flex-ajc" >×</i>-->
            </div>
            <div class="form-group w100 mt15 flex-space-between">
              <input type="tel" v-model.trim="code" placeholder="请输入验证码"  maxlength="6" style="width: 55%;">
              <p class="fz15" :class="showCode ? 'cb-off' : 'cdorange'" @click="getCode()" v-cloak>{{veriftyText}}</p>
            </div>
            <a href="javascript:;" class="mt15 fz18 btn-invite w100 tac" :class="isInvite ? 'btn-invite-orange': 'btn-invite-default'" @click="getRegMoney()">领取红包</a>

          </form>
        </div>
      </div>
      <div class="reg-succ-box" v-show="!isReg">
        <div class="reg-succ-content">
          <div class="img-box">
            <img src="../../../assets/images/wechat/invite/icon_wave.png" alt="">
          </div>
          <div class="flex-ajc flex-column bgf" style="margin-top: -2px;">
            <p class="notice fz14 mt2">恭喜，您已获得购物红包</p>
            <p class="notice mt15" v-cloak style="font-size: 4rem;">{{moneyList.sum}}<span class="notice fz14"> 元</span></p>
            <p class="notice mt15 fz14">快去使用吧！</p>
            <p class="dotted-line mt3"></p>
            <p class="fz12 mt2" v-cloak>红包已放入账号：{{moneyList.mobile}}</p>
            <div class="w100" style="padding: 0 1.75rem;">
              <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.housingbirdsrshbworker" class="download-app tac w100 fz18 wechat-btn-invite">下载住建鸟工友APP使用</a>
            </div>
            <p class="fz12 mt3 mb15">正品保障，假一赔百哦！</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import page from '../../page'
  import api from '../../../services/api';
  import error from '../../../services/error'
  import {Toast} from 'mint-ui'
  var store = {};
  var method = {};

  store.isReg = true;//是显示输入手机号还是注册的红包


  store.form = {mobile:'',code:'',inviter:'',inviterId:''};
  store.code = '';
  store.isInvite = false;//领取红包的按钮

  store.veriftyText = "获取验证码";//显示文字
  store.showCode = false;//获取验证码字的颜色
  const verifyCodeGetTime = 60;//设置倒计时的时间
  store.count = verifyCodeGetTime;
  store.timer = null;//定时器清空

  store.workerID = '';
  store.inviter = '';
  store.serviceMan = '';
  store.moneyList = '';

  store.inputHeight = 0;//键盘弹起高度


  //判断手机号
  method.phoneNum = function () {
    if(store.form.mobile == ''){
      store.vm.$toast("请填写手机号","bottom");
      // console.log("aaa");
      return false;
    }else if(!store.form.mobile.match(/^1[345789]\d{9}$/)){
      // console.log("bbbb");
      store.vm.$toast("请输入正确手机号","bottom");
      return false;
    }
    else {
      return true;
    }
  };
  //获取验证码
  var  ResetGetVerifyCode = function () {
    store.count = verifyCodeGetTime;
    clearInterval(store.timer);
    store.veriftyText = "获取验证码";
    store.showCode = false;
  };
  const verifyCodeHandle = function (response) {
    // console.log("开始获取验证码了");
    store.timer = setInterval(function () {
      if (store.count > 1 && store.count <= verifyCodeGetTime) {
        store.count--;
        store.veriftyText = "已发送 (" + store.count + "s)";
        store.showCode = true;
      } else {
        ResetGetVerifyCode();
      }
    }, 1000);
    store.vm.$toast(response.msg, 'bottom');
  };
  method.getCode = function () {
    // method.phoneNum();
    var isSubmit = method.phoneNum();
    if(!isSubmit){
      return false;
    }
    // verifyCodeHandle.call(store.vm);

    var promise = api.get_phone(store.form);

    promise.then(function (response) {
      if (response.code == error.success){
        verifyCodeHandle.call(store.vm,response)
      }else if(response.code == error.error){
        Toast({
          message: response.msg,
          position: 'bottom',
          duration: 1500,
        });
      }
    });

  };
  //code的验证,让领取红包按钮改变成可点击
  method.canGet = function(){
    // console.log("aaa");
    if(store.code.length == 6){
      store.isInvite = true;
    }else {
      store.isInvite = false;
    }
  };

  //获取是哪个服务商
  method.getServiceMan = function(){
    var workerID = {workerid:store.workerID};
    api.get_service(workerID).then(function (res) {
      if(res.code == error.success){
        store.serviceMan = res.result.address;
      }
    })
  };

  //领取红包接口
  method.getRegMoney = function(){
    store.form.code = store.code;
    store.form.inviterId = store.workerID;
    api.get_regmoney(store.form).then(function (res) {
      if(res.code == error.success){
        store.moneyList = res.result;
        setTimeout(function () {
          store.isReg = false;
        },1000);

      }else {
        store.isReg = true;
        store.vm.$toast(res.msg,"bottom");
      }
    })
  };

  //微信分享的方法
  method.weChatShare = function () {
      api.share({url:window.location.href}).then(function (response) {
        const  result = response.result;
        const config = {
          debug: false,
          appId: result['appid'],
          timestamp: result['timestamp'],
          nonceStr: result['nonceStr'],
          signature: result['signature'],
          jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
        };

        try{
          wx.config(config);
          wx.ready(function () {
            var shareData = {
               title: '【住建鸟】千元购物礼包，水电、建材全都有！我已经领了，你也快来吧！',
              desc: '有活干，有钱赚，假一赔百好保障！',
              link: window.location.href,
              imgUrl: 'http://dist.zjbird.com/icon/red_packet.png',
              success:function () {
                console.log("分享成功了");
              }
            };
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
          });
          wx.error(function(res){
            console.log(res)
          });

        }catch (e) {
          console.log(e.message);
        }

      })
  };

  //网络异常的方法
  method.network = function () {
    var el = document.body;
    if (el.addEventListener) {
      // window.addEventListener("online", function () {
      //   alert("online");}, true);
      window.addEventListener("offline", function () {
        store.vm.$toast("网络异常，请重新尝试","bottom");}, true);
    }
    else if (el.attachEvent) {
      // window.attachEvent("ononline", function () {
      //   alert("online");});
      window.attachEvent("onoffline", function () {
        store.vm.$toast("网络异常，请重新尝试","bottom");});
    }
    else {
      // window.ononline = function () {
      //   alert("online");};
      window.onoffline = function () {
        store.vm.$toast("网络异常，请重新尝试","bottom");};
    }
  };

  //解决安卓键盘被遮挡的问题
  var keyboardUp = function(){
    console.log("键盘弹出");
  };

  method.androidkeyboard = function () {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid){
      store.nowHeight = document.body.clientHeight;//页面的高度
      console.log("当前页面的高度",document.body.clientHeight);
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          store.fullHeight = window.fullHeight;//当前视窗的高度
          console.log("高度",store.fullHeight);
          store.inputHeight = Number(store.fullHeight) - Number(store.nowHeight) ;//当前皮肤高度
          console.log("输入法高度",store.inputHeight);
        })()
      }

    }
  };

    export default {
        name: "regWorker",
        data(){
          return store;
        },
        watch: {
          code:method.canGet,
      },
        methods:method,
        mounted(){

          store.vm = this;
          page.title("【住建鸟】千元购物礼包，水电、建材全都有！我已经领了，你也快来吧！");


          //接受app传来的workerID和mobile
          store.workerID = store.vm.$route.query.workerID ;
          store.inviter = store.vm.$route.query.mobile ;
          store.form.inviter = store.inviter;
          method.getServiceMan();
          method.weChatShare();
          method.network();
          method.androidkeyboard();
        }
    }
</script>

<style scoped>

</style>
