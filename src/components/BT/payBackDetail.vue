<template>
    <div class="bt-container bgf5 w100 h100">
      <div class="bgf ph3 tac">
        <div class="border-b pv4">
          <p class="big-font mb3" v-cloak>¥ {{Number(lists.mny).toFixed(2)}}</p>
          <p class="c9 f3" v-text="pay_status == 0 ? '待确认到账' : '已入账'" ></p>
        </div>
      </div>
      <div class=" ph3 bgf">
        <div class="f3 flex-space-between payback-detail-item border-b">
          <p>支付时间</p>
          <p class="c9" v-cloak>{{lists.payback_time}}</p>
        </div>
      </div>

      <div class=" ph3 bgf">
        <div class="f3 flex-space-between payback-detail-item" :class="{'border-b' : pay_status ==1}">
          <p>支付平台</p>
          <p class="c9" v-cloak>{{text[lists.paytype]}}</p>
        </div>
      </div>

      <div class=" ph3 bgf" v-show="pay_status ==1 && lists.paytype != 3">
        <div class="f3 flex-space-between payback-detail-item ">
          <p>支付流水号</p>
          <p class="c9" v-cloak>{{lists.payID}}</p>
        </div>
      </div>
      <div class=" ph3 bgf" v-show="pay_status ==1 && lists.paytype == 3">
        <div class="f3 flex-space-between payback-detail-item ">
          <p>确认时间</p>
          <p class="c9" v-cloak>{{lists.confirm_at}}</p>
        </div>
      </div>


      <ul class="bgf f3 mt3 ph3">
        <li class="flex-space-between payback-detail-item" @click="toAppOrder(lists.workstatus)">
          <p> 订单编号</p>
          <p class="mr3">
            <span v-cloak>{{order_id}}</span>
            <i class="icon-arrow mr2"></i>
          </p>
        </li>
      </ul>
    </div>
</template>
<script>
  import core from '../../core/jsbridge/core'
  import api from '../../services/api'
  import error from '../../services/error'
  import StatusCode from '../../services/StatusCode'

  var store = {};
  var method = {};

  store.pay_status = '';
  store.order_id = '';
  store.lists = [];
  store.text = StatusCode.pay;

  //拿还款详情
  method.paymentDetail = function () {
    store.form = {order_id:store.order_id};
    api.paymentDetail(store.form).then(function (res) {
      if (res.code == error.success){
        store.lists = res.result;
      }
    })
  };

  //去app订单页面
  method.toAppOrder = function (workstatus) {
    var toApp = {
      orderId:store.order_id,
      orderStatus:workstatus
    };
    console.log(toApp);
    core.$app('go_order_detail',toApp).then(function (res) {
    });
  };
    export default {
        name: "payBackDetail",
        data(){
          return store;
        },
        methods:method,
        mounted(){
          //设置apptitle的方法
          store.title_info = {
            "title":"还款详情",
            "actionRight":{
              "actionIcon":"",
              "actionText":"",
              "actionTextColor":"#333333"//ios不传可能闪退
            },
            "bgColor":"#ffffff"
          };
          let hander = setInterval(function() {
            if(!window.WebViewJavascriptBridge) {
              return
            }
            else {
              clearInterval(hander)
            }
            core.$app('title_info_control',store.title_info).then(function (res) {
            });

          },10);
          store.vm = this;
          store.order_id = store.vm.$route.query.order_id;
          store.pay_status = store.vm.$route.query.pay_status;

          console.log(store.pay_status);
          console.log(store.order_id);
          method.paymentDetail();
        }
    }
</script>

<style scoped>

</style>
