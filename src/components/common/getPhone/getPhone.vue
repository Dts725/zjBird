<template>
    <div class="get-phone-box flex-ajc w100" v-show="isShow" ref="show">
      <form class="phone-wrap w-90 bgf fz15 br3">
        <div class="form-group pr">
          <input type="tel" placeholder="请输入手机号" maxlength="11" class="w100" v-model.trim="form.mobile"  @blur ="phoneNum()">
          <div class="img-box close" v-show="form.mobile != ''" @click="form.mobile = '' ">
            <img src="../../../assets/images/wechat/invite/icon_close.png" alt="">
          </div>
        </div>
        <div class="form-group flex-space-between">
          <input type="tel" placeholder="请输入验证码" maxlength="6" style="width: 54%;" v-model.trim="code">
          <a href="javascript:void(0)" class="w-40 btn tc" :class="showCode ? 'btn-code-default' : 'btn-code-orange'" @click="getCode()">{{veriftyText}}</a>
        </div>
          <a href="javascript:void(0)" class="btn tc" :class="canLogin ? 'btn-code-default' : 'btn-code-orange'" @click="login()">确定</a>
      </form>
    </div>
</template>

<script>
  import api from '../../../services/api';
  import error from '../../../services/error'
  import { Toast } from 'vant';
  var store = {};
  var method = {};
  store.isShow = true;


  store.canLogin = true;
  store.form = {mobile:'',code:''};
  store.code = '';
  store.veriftyText = "获取验证码";//显示文字
  store.showCode = false;//获取验证码字的颜色
  const verifyCodeGetTime = 60;//设置倒计时的时间
  store.count = verifyCodeGetTime;
  store.timer = null;//定时器清空

  //判断手机号
  method.phoneNum = function () {
    if(store.form.mobile == ''){
      store.vm.$toast("请填写手机号","bottom");
      console.log("aaa");
      return false;
    }else if(!store.form.mobile.match(/^1[345789]\d{9}$/)){
      console.log("bbbb");
      store.vm.$toast("请输入正确手机号","bottom");
      return false;
    }
    else {
      return true;
    }
  };

  var  ResetGetVerifyCode = function () {
    store.count = verifyCodeGetTime;
    clearInterval(store.timer);
    store.veriftyText = "获取验证码";
    store.showCode = false;
  };
  const verifyCodeHandle = function (response) {
    console.log("开始获取验证码了");
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

    var promise = api.get_phones(store.form);

    promise.then(function (response) {
      if (response.code == error.success){
        verifyCodeHandle.call(store.vm,response)
      }else{
        store.vm.$toast(response.msg, 'bottom');
      }
    });

  };


  method.login = function () {
    store.form.code = store.code;
    console.log("login");
    api.login(store.form).then(function (res) {
      if(res.code == error.success){
        console.log(res);
        store.cusInfo = res.result;
        if(!store.cusInfo.mobile){
          store.cusInfo.mobile = store.form.mobile;
        }
        store.vm.$emit("userInfo",store.cusInfo);//子组件向父组件传参数
        store.isShow = false;
      }else {
        store.vm.$toast(res.msg, 'bottom');
      }

    })
  };
  //登录按钮是否可点击
  method.canGet = function(){
    // console.log("aaa");
    if(store.code.length == 6){
      store.canLogin  = false;
    }else {
      store.canLogin  = true;
    }
  };
  export default {
    // props:{
    //   isShow:{
    //     type: Boolean,
    //     default: false
    //   }
    // },
    data(){
      return store;
    },
    methods:method,
    watch: {
      code:method.canGet
    },
    mounted(){
      store.vm = this;
    }
  }
</script>

<style scoped lang="scss">
 .get-phone-box{
   position: fixed;
   bottom: 0;
   top: 0;
   left: 0;
   right: 0;
   background-color: rgba(51,51,51,0.6);
   z-index: 1000;
 }

 .phone-wrap{
   padding: 2.5rem 2rem;
   z-index: 9999;
   input{
     border: none;
     padding:1.3rem 1.5rem;
     background-color: #f7f7f7;
     border-radius: 0.3rem;
     line-height: normal;
   }
   .form-group{
     margin-bottom: 2.5rem;
     .close{
       width: 1.5rem;
       height: 1.5rem;
       position: absolute;
       top: 50%;
       right: 1.5rem;
       transform: translateY(-50%);
     }
   }

 }
  .btn{
    padding:1.3rem 0.8rem;
    border-radius: 0.3rem;
  }
 .btn-code-default{
   background-color: #cecece;
   pointer-events: none;
 }
 .btn-code-orange{
   background-color: #ffd102;
 }

</style>
