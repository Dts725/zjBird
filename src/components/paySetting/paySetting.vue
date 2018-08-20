<template>
    <div  class="w100">
      <ul class="ph3 bgf main-pay">
        <router-link  tag="li" class="flex-space-between border-b" :to="{path:'/verifyPay'}">
          <p class="fz15">修改支付密码</p>
          <i class="icon-arrow mr2"></i>
        </router-link>
        <li class="flex-space-between" @click="toPhoneCode()">
          <p class="fz15">忘记支付密码</p>
          <i class="icon-arrow mr2"></i>
        </li>
      </ul>
    </div>
</template>

<script>

  import core from '../../core/jsbridge/core'
  import api from '../../services/api'
  import error from '../../services/error'

  var store = {};
  var method = {};

  //跳原生app的获取短信验证码的页面
  method.toPhoneCode = function () {
    // console.log("跳到app的获取验证码的那页");
    core.$app('goSmsIdentify','').then(function () {});
  };


    export default {
        name: "paySetting",
        data(){
            return store;
          },
        methods:method,
        mounted(){
          store.vm = this;
          store.title_info = {
            "title": "支付管理",
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
                //调用原生的方法，控制title
                core.$app('title_info_control', store.title_info).then(function (res) {});
                //叠加在此页面上的原生页面，关闭后调用h5注册的方法
                core.$reg('callBackRouter', '').then(function (res) {
                  var res = JSON.parse(res);
                  if(res.code == error.error){
                    console.log("停留在当前");
                  }
                  else if(res.code == error.success){
                    // console.log(res.result);
                    store.vm.$router.push({path:'/payPassword',query:{passwordType:2,code:res.result}})
                  }
                });


              } catch (e) {
                console.log(e);
              }
            }
          }, 10);
        }
    }
</script>

<style scoped lang="scss">
  .main-pay{
  li{
    padding: 1.75rem 0;
  }
  }
</style>
