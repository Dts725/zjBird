<template>
    <div class="w100 h100">
      <div class="title-bar">为了您的账号安全，请先完成身份验证</div>
      <div class="mt4 ph3">
        <div class="img-box">
          <img :src="avator" alt="" class="header-img-default">
          <img src="../../../src/assets/images/noheader.png" class="header-img-default" v-if="!avator">
        </div>
      </div>
      <a href="javascript:void(0);" class="g-btn pf g-btn-on w100 fz17">下一步</a>
    </div>
</template>

<script>
  import core from '../../core/jsbridge/core'
  import api from '../../services/api'
  import error from '../../services/error'
  import page from '../page'

  var store = {};
  var method = {};

  // store.workerInfo = {};//app拿的工友信息
  store.avator = '';

    export default {
        name: "verifyPhone",
        data(){
          return store;
        },
        methods:method,
        mounted(){
          page.title("手机验证");
          store.title_info = {
            "title": "手机验证",
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
                //获取登录
                core.$app('get_user_info',"info").then(res => {
                  console.log(res);
                  store.workerInfo = JSON.parse(res);
                  store.avator =  store.workerInfo.avator;
                });
                core.$app('title_info_control', store.title_info).then(function (res) {});
              } catch (e) {
                console.log(e);
              }
            }
          }, 10);
        }
    }
</script>

<style scoped>

</style>
