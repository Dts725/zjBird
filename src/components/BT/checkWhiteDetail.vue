<template >
  <div class="bgf5 w100 h100" style="-webkit-overflow-scrolling: touch;" v-cloak>
    <!--提示bar-->
    <div>
      <div class="title-bar" v-if="type == 3" >请在{{detailList.payback_time | times}}前还款，否则将产生服务费和手续费</div>
      <div class="title-bar" v-if="type == 4" >当前白条 <span class="notice">即将到期</span>,请在{{detailList.payback_time | times }}前完成还款
      </div>
      <div class="title-bar" v-if="type == 5" >还款期{{detailList.payback_time | times}}，当前 <span class="notice">已逾期{{detailList.delay_day}}天</span>，请尽快还款
      </div>
      <div class="title-bar" v-if="type == 2">白条申请已提交，等待住建鸟平台审核</div>
      <div class="title-bar" v-if="type == 6">当前白条已结清，点击右上方可联系住建鸟客服</div>
      <div class="title-bar" v-if="type == 1" >该订单不可进行{{whiteDatsName}}，请使用其他付款方式</div>
    </div>
    <!--<div style="padding-bottom: 4.5rem;" class="bgf5">-->
    <div style="padding-bottom: 3rem;" class="bgf5">
      <!--钱-->
      <div class="bgf pay-status-wrap">
        <div class="flex-ajc flex-column pay-status border-b">
          <p class="middle-font mb3" style="font-weight:700" >¥&nbsp;{{detailList.bt_money}}</p>
          <p class="c9 f3" >{{bt_type_text[type]}}</p>
        </div>
        <div class="flex-space-between border-b">
          <p class="f3">订单编号</p>
          <div class="flex pv4 mr2" @click="toAppOrder(detailList.workstatus)">
            <p class="f3" >{{order_id}}</p>
            <i class="ml2 mr2 icon-arrow" style="margin-top:4px;" v-if="detail != 1"></i>
          </div>
        </div>
        <ul class="bt-order-money-wrap pv3">
          <li class="flex-space-between f3">
            <p class="c9">合计金额 （共{{detailList.goods_num}}件商品)</p>
            <!--修改，要跟白条欠款金额一样-->
            <p >¥{{detailList.amount}}</p>
          </li>
          <li class="flex-space-between f3">
            <p class="c9">预计合计补贴</p>
            <p class="notice" >¥{{detailList.total_wkprofite}}</p>
          </li>
          <!-- <li class="flex-space-between f3" v-if="detailList.installation_fee != 0">
            <p class="c9">安装费</p>
            <p class="notice" >¥{{detailList.installation_fee}}</p>
          </li>    -->
          <!-- <li class="flex-space-between f3" v-if="detailList.installation_fee != 0">
            <p class="c9">退货</p>
            <p class="notice" >-¥{{detailList.installation_fee}}</p>
          </li> -->

          <li class="flex-space-between f3 pr"  v-if="type == 5 || type == 6 && detailList.service_charge!=0.00">
            <p class="c9">手续费</p>
            <div class="flex ic">
              <p class="notice" >+ ¥{{detailList.service_charge}}</p>
              <i class="icon-mark ml2">!</i>
              <div class="fz14 service-fee pa">
                <div class="icon-dialog" >
                  {{detailList.service_rule}}
                </div>
                <i class="icon-tra"></i>
              </div>
            </div>
          </li>
          <li  class="flex-space-between f3" v-show="detailList.fee_less != 0.00">
            <p class="c9">手续费减免</p>
            <p class="notice" >- ¥{{detailList.fee_less}}</p>
          </li>
          <li class="flex-space-between f3 pr" v-if="type == 5 || type == 6 && detailList.overdue_fine!=0.00">
            <p class="c9">逾期滞纳金</p>
            <div class="flex ic">
              <p class="notice" >+ ¥{{detailList.overdue_fine}}</p>
              <i class="icon-mark ml2">!</i>
              <div class="fz14 service-fee pa">
                <div class="icon-dialog" >
                  {{detailList.overdu_rule}}
                </div>
                <i class="icon-tra"></i>
              </div>
            </div>
          </li>
          <li  class="flex-space-between f3" v-show="detailList.late_fee_less != 0.00">
            <p class="c9">滞纳金减免</p>
            <p class="notice" >- ¥{{detailList.late_fee_less}}</p>
          </li>

          <li  class="flex-space-between f3 pr" v-show="detailList.grace != 0">
            <p class="c9">宽限天数</p>
            <div class="flex ic">
              <p class="notice" >{{detailList.grace}}天</p>
              <i class="icon-mark ml2">!</i>
              <div class="fz14 service-fee pa">
                <div class="icon-dialog" >
                  {{detailList.grace_explain}}
                </div>
                <i class="icon-tra"></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--付款状态-->
      <ul class="bt-status-wrap f3 bgf mt3">
        <li class="flex-space-between">
          <p class="c9">{{whiteDatsName}}状态</p>
          <p > {{bt_type_text[type]}} </p>
        </li>
        <li class="flex-space-between">
          <p class="c9">申请时间</p>
          <p > {{detailList.creat_time}}</p>
        </li>
        <li class="flex-space-between" v-if="type != 2">
          <p class="c9">审核时间</p>
          <p >{{detailList.check_time}}</p>
        </li>
        <li class="check-shuo-ming" v-if="type != 2">
          <p class="c9">审核说明</p>
          <p style="width: 80%;text-align: right;" >{{detailList.check_comment}}</p>
        </li>
      </ul>
      <!--支付方式-->
      <ul class="bt-pay-name-wrap f3 bgf mt3" v-if="type ==6">
        <li class="flex-space-between">
          <p class="c9">支付时间</p>
          <p >{{payList.payback_time}}</p>
        </li>
        <li class="flex-space-between">
          <p class="c9">支付平台</p>
          <p >{{payText[payList.paytype]}}</p>
        </li>
        <li v-if="payList.paytype !== 3" class="flex-space-between">
          <p class="c9">支付流水号</p>
          <p >{{payList.payID}}</p>
        </li>
        <li v-if="payList.paytype === 3" class="flex-space-between">
          <p class="c9">确认时间</p>
          <p >{{payList.confirm_at}}</p>
        </li>
      </ul>
      <div>
      </div>
    </div>
    <router-link to="/argremment" class="pv-bottom bgf5 f3 tac cdorange">《{{whiteDatsName}}协议》</router-link>

    <!-- 固定的我要还款按钮 -->
    <div class="btn-bt w100 pf f3" v-if="type == 3 || type == 4 || type == 5" @click="close()">我要还款</div>

    <!--弹出框-->
    <div class="alert-box" v-if="isPay">
      <div class="alert-content bgf">
        <div class="f3 flex-space-between bgf5 alert-header">
          <div class="img-box w1" @click="close()">
            <img src="../../assets/images/icon_close.png" alt="">
          </div>
          <p>选择付款方式</p>
          <p></p>
        </div>
        <div class="alert-body flex-space-between">
          <div class="flex-ac flex-column" @click="payment('pay_by_ali')">
            <div class="img-box wicon mb2">
              <img src="../../assets/images/icon_zfb.png" alt="">
            </div>
            <p>支付宝</p>
          </div>
          <div class="flex-ac flex-column" @click="payment('pay_by_wx')">
            <div class="img-box wicon mb2">
              <img src="../../assets/images/icon_wechat.png" alt="">
            </div>
            <p>微信</p>
          </div>
          <div class="flex-ac flex-column" @click="payment('pay_by_line_remit')">
            <div class="img-box wicon mb2">
              <img src="../../assets/images/icon_offline.png" alt="">
            </div>
            <p>线下汇款</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import core from '../../core/jsbridge/core'
  import api from '../../services/api'
  import error from '../../services/error'
  import StatusCode from '../../services/StatusCode'

  var store = {};
  var method = {};
  // store.bt_type = '';//白条状态
  // store.is_delay = '';//待结清中逾期状态

  store.type = '';//订单的状态1驳回，2审核，3待结清，4即将到期，5已经到期，6结清

  store.order_id = '';
  store.trade_sn = '';
  store.detail = '';

  store.bt_type_text = StatusCode.bt_type;//白条状态文字
  store.payText = StatusCode.pay;//付款方式
  store.isPay = false;//控制弹出层

  store.detailList = [];
  store.payList = [];//拿还款的
  store.whiteDatsName ='';
  //关闭弹出层
  method.close = function () {
    store.isPay = !store.isPay;
  };
  //白条详情
  method.whiteDetail = function () {
    store.form = {order_id: store.order_id};
    api.whiteListDetail(store.form).then(function (res) {
      if (res.code == error.success) {
        store.detailList = res.result;

      store.detailList.service_charge = Number(store.detailList.service_charge).toFixed(2);
      store.detailList.material_fee = Number(store.detailList.material_fee).toFixed(2);
      store.detailList.bt_money = Number(store.detailList.bt_money).toFixed(2);
      store.detailList.total_wkprofite = Number(store.detailList.total_wkprofite).toFixed(2);
      store.detailList.fee_less = Number(store.detailList.fee_less).toFixed(2);
      store.detailList.overdue_fine = Number(store.detailList.overdue_fine).toFixed(2);
      store.detailList.late_fee_less = Number(store.detailList.late_fee_less).toFixed(2);

        store.money = store.detailList.bt_money;
        store.order_type = store.detailList.order_type;
        store.order_sn = store.detailList.order_id;
      }
    })
  };
  //拿还款详情
  method.paymentDetail = function () {
    store.form = {order_id: store.order_id};
    api.paymentDetail(store.form).then(function (res) {
      if (res.code == error.success) {
        store.payList = res.result;
      }
    })
  };

  //去app订单页面
  method.toAppOrder = function (workstatus) {
    var toApp = {
      orderId: store.order_id,
      orderStatus: workstatus
    };
    if (store.detail != 1) {
      core.$app('go_order_detail', toApp).then(function (res) {
      });
    }

  };

  //获取客服电话
  method.clickRight = function () {
    api.service_phone().then(function (res) {
      if (res.code == error.success) {
        store.phone = res.result.service_phone;
      }
      core.$app('call_phone', store.phone).then((res) => {
      })
    })
  };

  //支付宝或微信支付或者线下
  method.payment = function (name) {
    const tradeform = {
      order_type: store.order_type,//订单类型
      need_pay_price: store.money,
      order_sn: store.order_sn,//订单id
      iswhitepayment: 1
    };
    api.get_trade(tradeform).then(function (res) {
      if (res.code == error.success) {
        store.trade_sn = res.result.trade_sn;
        store.payArr = {
          "paySn": store.trade_sn,
          "totalPayMoney": store.money
        };
        // console.log(store.payArr);
        core.$app(name, store.payArr).then(function (res) {
          // console.log(res);
        });
      }
    });
    store.isPay = false;
  };
  //获取白条订单的状态
  method.getStatus = function () {
    store.form = {order_id: store.order_id};
    api.whiteStatus(store.form).then(function (res) {
      if (res.code == error.success) {
        // console.log(res);
        store.type = res.result;
      }
    })
  };
  //支付的回调
  method.payBack = function () {
    //支付回调
    console.log("run");


  };

  export default {
    name: "checkWhiteDetail",
    data() {
      return store;
    },
    methods: method,
    created() {

      store.whiteDatsName =this.$store.state.AO_WHITE_TEXT.AO_WHITE_BAR_DATA;
      // consolewhiteDatsName.log(this);
      store.vm = this;
      store.isPay = false;//控制弹出层
      // store.bt_type = store.vm.$route.query.bt_type;//白条状态
      // store.is_delay = store.vm.$route.query.is_delay;//待结清中逾期状态
      store.order_id = store.vm.$route.query.order_id;
      store.detail = store.vm.$route.query.detail;//从app传来的字段

      //设置apptitle的方法
      store.title_info = {
        "title": "查看详情",
        "actionRight": {
          "actionIcon": "http:dist.zjbird.com/icon/phone.png",
          "actionText": "客服",
          "actionTextColor": "#ff9d00"//ios不传可能闪退
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
        //右侧点击跳转
        core.$reg('title_right_click', method.clickRight).then(function (res) {
        });

        core.$reg('js_pay_callback', "").then(function (res) {
          if (res == 1){
            method.whiteDetail();
            method.paymentDetail();
            method.getStatus();
          }
        })

      }, 10);

      method.whiteDetail();
      method.paymentDetail();
      method.getStatus();


    },

    beforeDestroy() {
      // store.showBody = false;
      // store.bt_type = '';//白条状态
      // store.is_delay = '';//待结清中逾期状态
      //
      // store.type = '';//订单的状态1驳回，2审核，3待结清，4即将到期，5已经到期，6结清
      //
      // store.order_id = '';
      // store.trade_sn = '';
      // store.detail = '';

      // store.bt_type_text = StatusCode.bt_type;//白条状态文字
      // store.payText = StatusCode.pay;//付款方式
      store.isPay = false;//控制弹出层

      store.detailList = [];
      store.payList = [];//拿还款的
      // clearTimeout();
    }
  }
</script>
<style>
[v-cloak] {
  display: none !important;
}
</style>

