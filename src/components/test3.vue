<template>
    <div class="bt-container bgf5 w100 h100">
      <!--固定的导航-->
      <ul class="flex-ajc bt-list-main-header bgf w100 pft">
        <li class="payback-list-item" :class="item.isOn ? ' border-bottom-orange' : ' border-bottom-default'" v-for="(item,index) in listBar" :key="item.index" @click="clickListBar(index)">
          <p class="b-r" v-cloak>{{item.name}}</p>
        </li>
      </ul>
      <!--内容-->
      <div class="oh-y-a">
        <div class="page-loadmore mt5" style="overflow-x: hidden;">
          <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="overflow-y: auto;">
            <mt-loadmore
              :top-method="loadTop"
        
              :bottom-method="loadBottom"
              :bottom-all-loaded="allLoaded"
              ref="loadmore" :autoFill="false">
              <!--全部-->
              <ul class="f3 check-payback-list" v-for="item in payList" :key="item.id" v-if="check_type === ''" >
                <li class="pa3">
                  <p v-cloak>{{item.back_month}}</p>
                  <p class="c9 mt2 fz14" v-cloak>还款 ¥{{item.total_money}}</p>
                </li>
                <!--内容-->
                <router-link tag="li"
                             class="bgf check-payback-item"
                             v-for="lis in item.back_lish"
                             :key="lis.id"
                             :to="{path:'/payBackDetail',query:{order_id:lis.order_id,pay_status:lis.pay_status}}">
                  <div class="flex-space-between">
                    <p v-cloak>还款-{{text[lis.pay_platform]}}</p>
                    <p class="fz13" v-text="lis.pay_status== 0 ? '待确认' : '已入账'" :class="{'cdorange' : lis.pay_status ==0}"></p>
                  </div>
                  <div class="flex-space-between mt2">
                    <p class="c9 fz13" v-cloak>{{lis.payback_time}}</p>
                    <p class="fz20 fw5" v-cloak>¥ {{lis.back_money}}</p>
                  </div>
                </router-link>
              </ul>
              <!--待确认已入账-->
              <div  v-if="check_type !== ''">
                <ul class="f3 check-payback-list" v-for="item in payList" :key="item.id"  >
                  <router-link tag="li"
                               class="bgf check-payback-item"
                               :to="{path:'/payBackDetail',query:{order_id:item.order_id,pay_status:item.pay_status}}">
                    <div class="flex-space-between">
                      <p>还款-{{text[item.pay_platform]}}</p>
                      <p class="fz13" v-text="item.pay_status==0 ? '待确认' : '已入账'" :class="{'cdorange' : item.pay_status ==0}"></p>
                    </div>
                    <div class="flex-space-between mt2">
                      <p class="c9 fz13" v-cloak>{{item.payback_time}}</p>
                      <p class="fz20" v-cloak>¥ {{item.back_money}}</p>
                    </div>
                  </router-link>
                </ul>
              </div>

            </mt-loadmore>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import core from '../core/jsbridge/core'
  import api from '../services/api'
  import error from '../services/error'
  import StatusCode from '../services/StatusCode'
  var store = {};
  var method = {};
  store.text = StatusCode.pay;

  store.offset = 1;//默认1
  store.payList = [];
  store.btListLenth = 0; //当前后台返回数据长度
  store.topFlag= 1;//标志上啦加载
  store.lists = [];
  store.num = 10;//一页10条数据
  store.allLoaded = false;//若为真，则 bottomMethod 不会被再次触发
  store.bottomStatus = '';
  store.wrapperHeight = 0;
  store.topStatus = '';
  store.translate = 0;
  store.moveTranslate = 0;
  store.ulHeight =  '' ;

  store.check_type = '';//默认为全部

  //顶部导航数据
  store.listBar = [
    {
      name:'全部',
      check_type:'',
      isOn:true
    },
    {
      name:'待确认',
      check_type:'0',
      isOn:false
    },
    {
      name:'已入账',
      check_type:'1',
      isOn:false
    }

  ];

  //顶部导航方法
  method.clickListBar  = function (index) {
    store.listBar.forEach(function (item) {
      item.isOn = false;
    });
    store.listBar[index].isOn = true;
    store.check_type = store.listBar[index].check_type;
  store.payList = [];
  store.offset = 1;
  store.allLoaded = false;
    method.repayList();//请求接口
  };

  //还款记录
  method.repayList = function () {
    store.form = {
      worker_id:store.worker_id,
      check_type:store.check_type,
      offset:store.offset		//分页
    };
    api.repayList(store.form).then(function (res) {
      if(res.code == error.success){
       store.btListLenth = res.result.length;
       if(store.topFlag){
        store.payList = [];
        store.payList = res.result;
        console.log(store.payList);
        return false;
       }

       if(store.btListLenth !=0){
         store.payList = store.payList.concat(res.result);
       } else {
         store.vm.$toast("没有更多数据了~","bottom");
         store.allLoaded = true;//停止加载
       }

      }
    })
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
  store.topFlag= 1;//标志上啦加载
    store.offset = 1;
    method.repayList();
    setTimeout(() => {
      store.vm.$refs.loadmore.onTopLoaded();
    }, 1500);
  store.allLoaded = false;//停止加载
  };

  method.loadBottom  = function () {
    store.topFlag= 0;//标志上啦加载
    store.offset ++;
    method.repayList();
    setTimeout(() => {
      store.vm.$refs.loadmore.onBottomLoaded();
    }, 1500);
  };

    export default {
        name: "checkPayBackList",
        data(){
          return store;
        },
        methods:method,
        updated() {
        // store.payList = [];

        },
        mounted(){

          // 设置apptitle的方法
          store.title_info = {
            "title":"查看还款记录",
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
            try {
              core.$app('get_user_info','useInfo').then(function (res) {
                store.worker_info = JSON.parse(res);
                store.worker_id = store.worker_info.user_id;
                //  列表信息
                method.repayList();
              });
            }catch (e) {
              console.log(e)
            }

            core.$app('title_info_control',store.title_info).then(function (res) {
            });
            //右侧点击跳转
            core.$reg('title_right_click',method.clickRight).then(function (res) {
            })
          },10);

          store.vm = this;
          store.wrapperHeight = document.documentElement.clientHeight - store.vm.$refs.wrapper.getBoundingClientRect().top;
        //   store.ulHeight =  document.documentElement.clientHeight - store.vm.$refs.wrapper.getBoundingClientRect().top ;
        }
    }
</script>

<style scoped>
.icon {
  background-color: red;
  color: #fff;
}
</style>
