<template>
    <div class="setpassword-wrap">
      <div class="mt5 tc" v-show="!isShow">
        <p class="fz20">请输入支付密码</p>
        <p class="fz12 mt2 mb5">设置用于支付验证</p>
        <van-password-input
          :value="value"
        />
      </div>
      <div class="mt5 tc" v-show="isShow">
        <p class="fz20">请再次输入支付密码</p>
        <p class="fz12 mt2 mb5">设置用于支付验证</p>
        <van-password-input
          :value="value2"
        />

        <div style="margin:2.5rem 15px 0;">
          <a href="javascript:void(0);" class="w100 fz15 g-btn" :class="isOk ? 'g-btn-on':' g-btn-default'" @click="ok()">完成</a>
        </div>

      </div>

      <van-number-keyboard
        :show="true"
        @input="onInput"
        @delete="onDelete"
      />
    </div>
</template>

<script>
  import core from '../../core/jsbridge/core'
  import md5 from 'md5'
  import { Dialog } from 'vant';
  import api from '../../services/api'
  import error from '../../services/error'

  var store = {};
  var method = {};

  store.value = '';
  store.value2 = '';
  store.isShow = false;
  store.isOk = false;
  store.form = {
    userId:'',
    mobile:'',
    smsCode:'',
    oldPassword:'',
    newPassword1: '',
    newPassword2: ''
  };


  //输入密码
  method.onInput = function (key) {
    if(store.isShow){
      store.value2 = (store.value2 + key).slice(0, 6);
      // console.log("当前输入的密码2",store.value2);
    }else {
      store.value = (store.value + key).slice(0, 6);
      // console.log("当前输入的密码",store.value);
    }


  };
  //删除密码
  method.onDelete = function () {
    if(store.isShow){
      store.value2 = store.value2.slice(0, store.value2.length - 1);
      // console.log("删除的密码2",store.value2);
    }else {
      store.value = store.value.slice(0, store.value.length - 1);
      // console.log("删除的密码1",store.value1);
    }
  };
  //当密码长度为6的时候
  method.sixNum = function () {
    if(store.isShow){
      if(store.value2.length == 6){
        store.password2 = md5(store.value2);
        console.log(store.password2);
        console.log("密码二已经6位了");
        store.isOk = true;

      }
    }else {
      if(store.value.length == 6){
        store.password1 = md5(store.value);
        console.log(store.password1);
        console.log("密码一已经6位了");
        store.isShow = true;
        //通知app返回按钮可以弹窗
        core.$app('notifyOperate', '').then(function (res) {});
      }
    }
  };

  //密码和老密码相同的时候
  method.samePassword = function(){
    Dialog.alert({
      title:'重新输入',
      message:'你设置的新密码与老密码相同<br>请重新输入'
    }).then(()=>{
      console.log("关闭");
      store.value = '';
      store.value2 = '';
      store.isShow = false;
      store.isOk = false;
    });
  };

  //修改密码
  method.alter = function(){
    store.form.oldPassword = store.oldPassword;
    store.form.newPassword1 = store.password1;
    store.form.newPassword2 = store.password2;
    console.log("修改密码",store.form);
    api.alter_paypassword(store.form).then(function (res) {
      if(res.code == error.success){
        console.log("修改密码",res);
        store.vm.$router.push({path:'/paySetting'});
      }else if(res.code == 11019){
        method.samePassword();
      }
      else {
        store.vm.$toast(res.msg,"bottom");
      }
    })
  };
  //忘记密码
  method.forget = function(){
    store.form.smsCode = store.code;
    store.form.newPassword1 = store.password1;
    store.form.newPassword2 = store.password2;
    console.log("设置或忘记密码",store.form);
    api.set_paypassword(store.form).then(function (res) {
      if(res.code == error.success){
        console.log("设置或忘记密码",res);
        if(store.fromType == 1){
          console.log("关闭webview");
          core.$app('finishWebView', '').then(function (res) {
          });
        }
        else {
          console.log("走正常流程");
          store.vm.$router.push({path:'/paySetting'});
        }
      }else if(res.code == 11019){
        method.samePassword();
      }
      else if(res.code == error.error) {
        store.vm.$toast(res.msg,"bottom");
      }
    })
  };

  //点击完成按钮
  method.ok = function () {
    if(store.password1 != store.password2){
      Dialog.alert({
        title:'重新输入',
        message:'你设置的两次密码不一致<br>请重新输入'
      }).then(()=>{
        console.log("关闭");
        store.value = '';
        store.value2 = '';
        store.isShow = false;
        store.isOk = false;
      });
      return false;
    }
    else if(store.oldPassword == store.password2){
      Dialog.alert({
        title:'重新输入',
        message:'你设置的新密码与老密码相同<br>请重新输入'
      }).then(()=>{
        console.log("关闭");
        store.value = '';
        store.value2 = '';
        store.isShow = false;
        store.isOk = false;
      });
      return false;
    }
  //  调用接口，点击完成的时候
    if(store.passwordType == 1){//修改密码
      console.log("修改密码");
      method.alter();

    }else if(store.passwordType == 2){//设置密码，或忘了密码
      console.log("忘记密码");
      method.forget();
    }
  };
    export default {
        name: "payPassword",
        data(){
          return store;
        },
        watch:{
          value:method.sixNum,
          value2:method.sixNum
        },
        methods:method,
        mounted(){
          store.vm = this;
          store.passwordType = store.vm.$route.query.passwordType;//1为修改密码，2为设置或者忘记密码
          console.log("密码的类型",store.passwordType);
          store.oldPassword = store.vm.$route.query.oldPassword;//老的支付密码
          console.log("老的支付密码",store.oldPassword);

          store.code =  store.vm.$route.query.code ;//忘记密码的验证码
          console.log("验证码",store.code);

          store.fromType = store.vm.$route.query.fromType;//从app其他页来的

          store.title_info = {
            "title": "设置支付密码",
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
                  store.form.mobile = JSON.parse(res).mobile;
                  store.form.userId = JSON.parse(res).user_id;
                });


              } catch (e) {
                console.log(e);
              }
            }
          }, 10);
        },
        beforeDestroy(){
          store.value = '';
          store.value2 = '';
          store.isShow = false;
          store.isOk = false;
        }
    }
</script>

<style lang="scss">
  .van-dialog__content {
    .van-dialog__message{
      text-align: center;
      color: #666;
    }
  }
    .van-dialog__confirm{
      .van-button__text{
        color:#02AF67;
      }
    }

</style>
