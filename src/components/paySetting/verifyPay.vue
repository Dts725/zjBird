<template>
    <div>
      <div class="mt5 tc">
        <p class="fz20">验证支付密码</p>
        <p class="fz12 mt2 mb5">请输入支付密码，已验证身份</p>
        <van-password-input
          :value="value"
          @focus="showKeyboard = true"
        />
      </div>

      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
      />
    </div>
</template>




<script>
  import core from '../../core/jsbridge/core'
  import md5 from 'md5'
  import api from '../../services/api'
  import error from '../../services/error'


  var store = {};
  var method = {};

  store.value = '';
  store.showKeyboard = true;
  //输入密码
  method.onInput = function (key) {
    store.value = (store.value + key).slice(0, 6);
    console.log("当前输入的密码",store.value);
  };
  //删除密码
  method.onDelete = function () {
    store.value = store.value.slice(0, store.value.length - 1);
    // console.log("删除的密码",store.value);
  };
  //当密码长度为6的时候
  method.sixNum = function () {
    if(store.value.length == 6){
      store.password = md5(store.value);
      console.log(store.password);
      console.log("密码6位了");
      method.verifyPaypassword();

    }
  };
  //跳原生app的获取短信验证码的页面
  method.toPhoneCode = function () {
    store.value = '';
    console.log("跳到app的获取验证码的那页");
    core.$app('goSmsIdentify','').then(function () {});
  };
  //验证支付密码
  method.verifyPaypassword = function () {
    var params = {
      userId:store.userId,
      // userId:14538,
      password:store.password
    };
    api.verifyPaypassword(params).then(function (res) {
      if(res.code == error.success){
        store.vm.$router.push({path:'/payPassword',query:{passwordType:1,oldPassword:store.password}});
      }else if(res.code == error.error){
        store.vm.$dialog.confirm({
          title:'密码错误',
          message:'你输入的支付密码不正确',
          confirmButtonText:'重新输入',
          cancelButtonText:'忘记密码'

        }).then(()=>{//点击重新输入
          console.log("重新输入1");
          store.value = '';
        }).catch(()=>{//点击忘记密码
          console.log("忘记密码1");

        //  跳转到app的方法
          method.toPhoneCode();
        })
      }
    })
  };

  export default {
    name: "verifyPay",
    data(){
      return store;
    },
    watch:{
      value:method.sixNum
    },
    methods:method,
    mounted(){
      store.vm = this;
      store.title_info = {
        "title": "验证支付密码",
        "actionRight": {
          "actionIcon": "",
          "actionText": "",
          "actionTextColor": "#333333"//ios不传可能闪退
        },
        "bgColor": "#ffffff"
      };
      let hander = setInterval(function () {
        if (!window.WebViewJavascriptBridge) {
          return
        }
        else {
          clearInterval(hander);
          try {
            //原生导航栏
            core.$app('title_info_control', store.title_info).then(function (res) {
            });
            core.$app('get_user_info','userinfo').then(function (res) {
              // console.log("xinxi",res);
              store.worker_info = JSON.parse(res);
              store.userId = store.worker_info.user_id;
              // console.log("用户id",store.userId);
            });

          } catch (e) {
            console.log(e);
          }
        }
      }, 10);

    },
    beforeDestroy(){
      store.value = '';
    }
  }
</script>
<style lang="scss">
  .van-dialog__content {
    .van-dialog__message{
      text-align: center!important;
      color: #666;
    }
  }
  .van-dialog__confirm{
    .van-button__text{
      color:#02AF67;
    }
  }

</style>

