<template>
    <div class="bt-container bgf5 w100 h100">
      <!--顶部导航-->
      <!--
      <div class="check-all">
        <label class="mr3">
          <input type="checkbox" class="check-item" v-model="checked">
          <i class="icon-checked"></i>
        </label>
        <p class="f3">选择还款订单（全选 / 取消全选）</p>

      </div>-->
      <!--<h1>ss</h1>-->
      <!--具体的列表信息-->
      <div class="page-loadmore">
        <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="-webkit-overflow-scrolling: touch">
          <mt-loadmore
            :top-method="loadTop"
            @translate-change="translateChange"
            @top-status-change="handleTopChange"
            :bottom-method="loadBottom"
            @bottom-status-change="handleBottomChange"
            :bottom-all-loaded="allLoaded"
            ref="loadmore" :autoFill="false">

            <ul class="bgf payBackList-wrap"  ref="wrapper" :style="{ minHeight: ulHeight + 'px' }" >
              <li class="flex-space-between payBackList-item" v-for="(item,index) in btList" :key="item.id" >
                <label class="mr3 icon_ok" @click.stop.prevent="clickListBar(index)">
                  <input type="checkbox" class="check-item" v-model="item.isCheck">
                  <i class="icon-checked"></i>
                </label>
                <div class="flex-space-between payBackList-item-body">
                  <div class="flex-ac">
                    <div class="img-box bt-icon">
                      <img src="../../assets/images/bt_icon.png" alt="">
                    </div>
                    <div>
                      <p class="fz13">
                        <span class="mr2" v-cloak>{{whiteDatsName}}</span>
                        <span class="notice" v-if="item.is_delay==2" v-cloak>逾期{{item.delayed_time | times }}</span>
                        <span class="cdorange" v-if="item.is_delay==1" v-cloak>即将逾期{{item.delay_time | times }}</span>
                        <span class="c9" v-if="item.is_delay==0" v-cloak>还款日期{{item.need_payback_time | times }}</span>
                        <!--<span class="c9" v-text="'还款日期 '+item.payback_time" v-if="item.is_delay==0"></span>-->

                      </p>
                      <p class="c9 mt2 fz12" v-cloak>{{item.creat_time}}</p>
                    </div>
                  </div>
                  <p class="fz17 b-ns fw5" v-cloak>¥ {{Number(item.bt_money).toFixed(2)}}</p>
                </div>
              </li>
            </ul>


            <div slot="top" class="mint-loadmore-top">
              <span v-if="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
              <span v-if="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
            </div>


            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-if="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
              <span v-if="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
            </div>
          </mt-loadmore>
        </div>
      </div>

      <!--固定的我要还款按钮-->
      <div class="pf w100 f3" @click="choosePay()" :class="checked ? 'btn-on' : 'btn-off'" v-cloak>{{btnText}}</div>

      <!--弹出框-->
      <div class="alert-box" @click.self.stop.prevent="close()"  v-if="isPay">
        <div class="alert-content bgf">
          <div class="f3 flex-space-between bgf5 alert-header">
            <div class="img-box w1" @click="choosePay()">
              <img src="../../assets/images/icon_close.png" alt="">
            </div>
            <p>选择付款方式</p>
            <p></p>
          </div>
          <div class="alert-main">
            <p class="big-font tac pt4" v-cloak>¥ {{Number(moneyList.bt_money).toFixed(2)}}</p>
             <ul class="alert-pay-wrap f3">
               <li class="pay-item flex-space-between">
           <li class="flex-space-between  pay-item ">
            <p>合计金额 （共{{moneyList.goods_num}}件商品)</p>
            <p v-cloak>¥{{Number(moneyList.amount).toFixed(2)}}</p>
          </li>
               <li class="pay-item flex-space-between">
                 <p >预计合计补贴</p>
                 <p class="notice" v-cloak>¥ {{Number(moneyList.total_wkprofite).toFixed(2)}}</p>
               </li>
               <li class="pay-item flex-space-between">
                 <p>手续费</p>
                 <p class="notice" v-cloak>+¥ {{Number(moneyList.service_charge).toFixed(2)}}</p>
               </li>
               <li class="pay-item flex-space-between">
                 <p>逾期滞纳金</p>
                 <p class="notice" v-cloak>+¥ {{Number(moneyList.overdue_fine).toFixed(2)}}</p>
               </li>
             </ul>
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
  //引入jsbridgg
  import core from '../../core/jsbridge/core'
  import api from '../../services/api'
  import error from '../../services/error'
  import StatusCode from '../../services/StatusCode'

  var method = {};
  var store = {};
  store.checked = false;

  store.offset = 1;//默认1
  store.btList = [];//白条列表
  store.moneyList = [];
  store.btListLenth = 0; //当前后台返回数据长度
  store.topFlag= 0;//标志上啦加载
  store.lists = [];
  store.num = 10;//一页10条数据
  store.allLoaded = false;//若为真，则 bottomMethod 不会被再次触发
  store.bottomStatus = '';
  store.wrapperHeight = 0;
  store.topStatus = '';
  store.translate = 0;
  store.moveTranslate = 0;
  store.firstFlag = 1;
  store.whiteDatsName ='';

  store.btnText = "请选择还款订单";
  store.ulHeight = "";

  store.isPay = false;//控制弹出层
  //关闭弹出层
  method.close = function () {
    console.log('222222222');
    store.isPay = !store.isPay;
  };
  //加载的动画
  method.handleTopChange = function (status) {
    store.moveTranslate = 1;
    store.topStatus = status;
  };

  method.handleBottomChange = function (status) {
    store.bottomStatus = status;
  };
  method.translateChange = function(translate){
    const translateNum = +translate;
    store.translate = translateNum.toFixed(2);
    store.moveTranslate = (1 + translateNum / 70).toFixed(2);
  };
  //上拉下拉
  method.loadTop = function(){
    store.offset = 1;
    store.topFlag = 1;//上啦刷新未true
    method.whiteList();
    setTimeout(() => {
      store.vm.$refs.loadmore.onTopLoaded();
    }, 1500);
    store.allLoaded = false;//停止加载

  };

  method.loadBottom  = function () {
    store.topFlag = false;//下拉加载
    store.offset ++;
    method.whiteList();
    setTimeout(() => {
      store.vm.$refs.loadmore.onBottomLoaded();
    }, 1500);
  };

//加载待结清的订单
  method.whiteList = function(){

    store.form = {
      worker_id:store.worker_id,	//工友id
      bt_type:3,		//白条类型：3、待结清 2、审核中 6、已结清 1、未通过
      delay_type:3,// 1即将逾期  ,2 逾期   全部3
      offset:store.offset		//分页
    };
    api.whiteList(store.form).then(function (res) {

      if (res.code == error.success){
        store.btListLenth = res.result.length;

        res.result.forEach(function (item) {
          item.isCheck = false;
        });
        if(store.topFlag) {
          store.btList = [];
          store.btList = res.result;
          return false
        }
        if(store.btListLenth !=0){
            store.btList = store.btList.concat(res.result);
          }  else {
            store.vm.$toast("没有更多数据了~","bottom");
            store.allLoaded = true;//停止加载
          }
      }
    })
  };

  //点击单选按钮
  method.clickListBar  = function (index) {
    store.btList.forEach(function (item,key) {
      if(key!=index){
        item.isCheck = false;
      }
    });

    store.btList[index].isCheck = !store.btList[index].isCheck;
    if(store.btList[index].isCheck){
      store.checked = true;//我要还款可以点\
      store.btnText = "我要还款";
    }else {
      store.checked = false;//我要还款可以点
      store.btnText = "请选择还款订单";
    }
    store.order_id = store.btList[index].order_id;
    store.order_type = store.btList[index].order_type;

  };
  //选择还款的订单(点我要还款）
  method.choosePay = function () {
    api.whiteListDetail({order_id:store.order_id}).then(function (res) {
      if (res.code == error.success){
        store.isPay = !store.isPay;
        store.moneyList = res.result;
        store.money = store.moneyList.bt_money;
      }
    })
  };


  //支付宝或微信支付或者线下
  method.payment = function (name) {
    store.isPay = !store.isPay;
    const tradeform = {
      order_type: store.order_type,//订单类型
      need_pay_price: store.money,
      order_sn: store.order_id,//订单id
      iswhitepayment:1
    };
    api.get_trade(tradeform).then(function (res) {
      if (res.code == error.success){
        store.trade_sn = res.result.trade_sn;
        store.payArr = {
          "paySn":store.trade_sn,
          "totalPayMoney":store.money
        };
        core.$app(name,store.payArr).then(function (res) {
        });
      }
    });

  };
  export default {
        name: "payBackList",
        data(){
          return store;
        },
        methods:method,
        mounted(){
            store.whiteDatsName =this.$store.state.AO_WHITE_TEXT.AO_WHITE_BAR_DATA;
          if(store.firstFlag) {
            store.btList = [];
            store.firstFlag = 0;
          }
          //设置apptitle的方法
          store.title_info = {
            "title":"选择还款订单",
            "actionRight":{
              "actionIcon":"",
              "actionText":"",
              "actionTextColor":"#ff9d00"//ios不传可能闪退
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
            try {
              core.$app('get_user_info','useInfo').then(function (res) {
                store.worker_info = JSON.parse(res);
                store.worker_id = store.worker_info.user_id;
                      //右侧点击跳转
            core.$reg('title_right_click',function(){}).then(function (res) {
            })
                //  列表信息
                method.whiteList();
              });
            }catch (e) {
              // console.log(e)
            }
            core.$app('title_info_control',store.title_info).then(function (res) {
            });
            core.$reg('js_pay_callback', "").then(function (res) {
              if (res == 1){
                store.topFlag = 1;
                method.whiteList();
              }
            })

          },10);

          store.vm = this;
          store.wrapperHeight = document.documentElement.clientHeight - store.vm.$refs.wrapper.getBoundingClientRect().top - 45;
          store.ulHeight =  document.documentElement.clientHeight - store.vm.$refs.wrapper.getBoundingClientRect().top - 55 ;
        },

        beforeDestroy () {
          console.log('页面消亡了')
          store.btList = [];
          store.checked = false;
          store.offset = 1;
        }

    }
</script>

<style scoped>

</style>
