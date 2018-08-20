<template>
<div class="fz14 p23 red-text-wrap bgf w100 h100">
  <p>1、优惠券仅限在住建鸟使用，按用户所获得优惠券自身规则进行抵。</p>
  <p>2、优惠券获取方式：通过赠送、购买或活动参与等形式获取。</p>
  <p>3、红包、优惠券一旦下单即算使用完成，无论订单最终是否支付或取消，均不允许再次使用。</p>
  <p>4、优惠券不能进行兑现、出售、转让或其他用途。</p>
  <p>5、本规则由住建鸟依据国家相关法律法规及规章制度予以解释。</p>
</div>
</template>

<script>
  import core from '../../core/jsbridge/core'
  import page from  '../page'
  var store = {};


    export default {
        name: "redInstructions",
        data(){
          return store;
        },
        mounted(){
          page.title("优惠券使用说明");
          store.title_info = {
            "title": "优惠券使用说明",
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
              clearInterval(hander)
            }
            core.$app('title_info_control', store.title_info).then(function (res) {
            });
          }, 10);
        }
    }
</script>

<style scoped lang="scss">
.red-text-wrap p{
  margin-top: 0.5rem;
  line-height: 1.8rem;
  text-align: justify;

}
</style>
