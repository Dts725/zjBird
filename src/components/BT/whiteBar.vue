<template>
  <div class="bt-container bgf5 w100 h100" id="header" style="overflow : hidden;" >
    <!--名片展示-->
    <div class="h100 ">
      <router-link to="/lookBt" class="bt-list-header bgf">
        <div class="img-bt-box">
          <div class="img-box pr">
            <img src="../../assets/images/worker_bg.png" alt="">
            <div class="worker-bt-info">
            <div class="worker-info">
              <div class="img-box">
                <img src="../../assets/images/noheader.png" alt="" v-show="!worker_info.avator">
                <img :src="worker_info.avator" alt="">
              </div>
              <div class="worker-name">
                <p class="f3 mb1 mt2" v-cloak>{{worker_info.name}}</p>
                <div class="img-box">
                  <img src="../../assets/images/attestation.png" alt="">
                </div>
              </div>
            </div>
            <div class="mt4">
              <p class="white fz13">剩余额度（元）</p>
              <p class="big-font white" v-cloak>{{limitMoney.toFixed(2)}}</p>
            </div>
          </div>
          </div>
        </div>
      </router-link>
        <!--列表导航切换-->

      <!--白条列表-->
      <div id="btList" class="bt-list-wrap bgf w100 h100 pb45 mt3">
        <ul class="flex-ajc bt-list-main-header">
          <li class="bt-list-main-item"
              :class="item.isOn ? ' border-bottom-orange' : ' border-bottom-default'"
              v-for="(item,index) in listBar"
              :key="item.id"
              @click="clickListBar(index)">
            <p class="b-r" v-cloak>{{item.name}}</p>
          </li>
        </ul>
        <!--待结清下的三种状态-->
        <ul class="stay-close-wrap flex-ac" v-show="bt_type == 3">
          <li class="stay-close-item"
              :class="item.isOn ? 'stay-close-item-on' : 'stay-close-item-default'"
              v-for="(item,index) in stayListBar"
              :key="item.id"
              @click="clickStayListBar(index)"
              v-text="item.name">
          </li>
        </ul>
        <!--具体的列表信息-->
        <div class="page-loadmore" style="overflow: hidden;padding:0 1rem;">
           <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="overflow: auto;" :class="{'container-padding-bottom' : isNavClick}">
            <mt-loadmore
              :top-method="loadTop"
              @translate-change="translateChange"
              @top-status-change="handleTopChange"
              :bottom-method="loadBottom"
              @bottom-status-change="handleBottomChange"
              :bottom-all-loaded="allLoaded"
              ref="loadmore" :autoFill="false">

              <ul class="bt-list-info-wrap" ref="wrapper" :style="{ minHeight: ulHeight + 'px' }">
                <router-link tag="li"
                             :to="{path:'/checkWhiteDetail',query:{order_id:item.order_id}}"
                             class="flex-space-between bt-list-info-item"
                             v-for="item in btList" :key="item.bt_id">
                  <div class="flex-ac">
                    <div class="img-box">
                      <img src="../../assets/images/bt_icon.png" alt="">
                    </div>
                    <div class="bt-info-content ml3">
                      <p>
                        <span class="mr2 fz14" v-cloak>{{ddstb}}</span>
                        <span class="notice fz12"
                              v-if="item.is_delay==2 && bt_type ==3" v-cloak>逾期 {{item.delayed_time | times}}</span>
                        <span class="cdorange fz12"
                              v-if="item.is_delay==1  && bt_type ==3" v-cloak>即将逾期 {{item.delayed_time | times}}</span>
                        <span class="c9 fz12" v-cloak v-if="bt_type !=3">{{bt_type_text[bt_type]}}</span>
                      </p>
                      <p class="mt2 c9 fz12" v-cloak>{{item.creat_time}}</p>
                    </div>
                  </div>
                  <p class="bt-money fz17" v-cloak>¥ {{Number(item.bt_money).toFixed(2)}}</p>
                </router-link>
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
             <!--固定的我要还款按钮-->
             <!-- <router-link to="/payBackList" class="btn-bt pf w100 f3" v-if="bt_type == 3">我要还款</router-link> -->
          </div>
        </div>


      </div>
    </div>
             <!--固定的我要还款按钮-->
             <router-link to="/payBackList" class="btn-bt pf w100 f3" v-if="bt_type == 3" style="z-index:9;">我要还款</router-link>

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
  store.bt_type_text = StatusCode.bt_type;//白条状态文字
  store.bt_type = 3;//默认3 :待结清
  store.stay_type = 3;//默认全部
  store.worker_info = '';//工友的信息
  store.limitMoney = 0.00;//剩余金额
  store.offset = 1;//默认1
  store.btList = [];//白条列表
  store.btListLenth = 0; //当前后台返回数据长度
  store.topFlag = 0;//标志上啦加载
  store.lists = [];
  store.num = 10;//一页10条数据
  store.allLoaded = false;//若为真，则 bottomMethod 不会被再次触发
  store.bottomStatus = '';
  store.wrapperHeight = 0;
  store.height = '';
  store.topStatus = '';
  store.translate = 0;
  store.moveTranslate = 0;
  store.isTop = true;//是否到最顶端
  store.isNavClick = true;
  store.ddstb ="";
  store.ulHeight = "";

  //顶部导航数据
  store.listBar = [
    {
      name: '待结清',
      bt_type: '3',
      isOn: true
    },
    {
      name: '审核中',
      bt_type: '2',
      isOn: false
    },
    {
      name: '已结清',
      bt_type: '6',
      isOn: false
    },
    {
      name: '未通过',
      bt_type: '1',
      isOn: false
    },

  ];
  //待结清的导航
  store.stayListBar = [
    {
      name: '全部',
      stay_type: '3',
      isOn: true
    },
    {
      name: '即将到期',
      stay_type: '1',
      isOn: false
    },
    {
      name: '逾期',
      stay_type: '2',
      isOn: false
    },

  ];
  //顶部导航方法
  method.clickListBar = function (index) {
     store.btList = [];//重置一下

  if(index !==0) {
    store.isNavClick = false;
    } else {
       store.isNavClick = true;
    }

    store.listBar.forEach(function (item) {
      item.isOn = false;
    });
    store.listBar[index].isOn = true;
    store.bt_type = store.listBar[index].bt_type;
    store.topFlag = 0;//标志上啦加载
    store.offset = 1;//重置为第一页
    store.lists = [];
    store.allLoaded = false;//重置可以滚动
    // store.stay_type = 3;//默认全部
    store.isTop = true;//顶部导航栏上去
    store.firstFlag =
      method.whiteList();
  };
  //待结清顶部导航方法
  method.clickStayListBar = function (index) {
    store.stayListBar.forEach(function (item) {
      item.isOn = false;
    });
    store.stayListBar[index].isOn = true;
    store.stay_type = store.stayListBar[index].stay_type;
    method.whiteList();
    store.topFlag = 0;//标志上啦加载
    store.offset = 1;//重置为第一页
    store.btList = [];//重置一下
    store.lists = [];
    store.allLoaded = false;//重置可以滚动
  };
  //查询剩余金额的方法
  method.whiteLimitMoney = function () {
    api.whiteLimitMoney({worker_id: store.worker_id}).then(function (res) {
      if (res.code == error.success) {
        store.limitMoney = res.result;
      }
    })
  };
  //列表信息
  method.whiteList = function () {
    // store.wrapperHeight = document.documentElement.clientHeight - store.vm.$refs.wrapper.getBoundingClientRect().top;
    store.form = {
      worker_id: store.worker_id,	//工友id
      bt_type: store.bt_type,		//白条类型：3、待结清 2、审核中 6、已结清 1、未通过
      delay_type: store.stay_type,// 1即将逾期  ,2 逾期   全部3
      offset: store.offset		//分页
    };
    api.whiteList(store.form).then(function (res) {
      if (res.code == error.success) {
        //上来刷新
        store.btListLenth = res.result.length;
        if (store.topFlag) {
          store.btList = [];
          let data = res.result;
          for (var i = 0; i < data.length; i++) {
            store.btList.push(data[i]);
          }
          return false
        }

        //下啦加载
        if (store.btListLenth != 0) {
          let data = res.result;
          for (var i = 0; i < data.length; i++) {
            store.btList.push(data[i]);
          }

        }
        else {
          // store.vm.$toast("没有更多数据了~", "bottom");
          store.allLoaded = true;//停止加载
        };
        store.wrapperHeight = document.documentElement.clientHeight - store.vm.$refs.wrapper.getBoundingClientRect().top;
        store.ulHeight =  document.documentElement.clientHeight - store.vm.$refs.wrapper.getBoundingClientRect().top - 55 ;
      }
    });
  };
  //加载的动画
  method.handleTopChange = function (status) {
    store.moveTranslate = 1;
    store.topStatus = status;
  };
  method.handleBottomChange = function (status) {
    store.bottomStatus = status;
  };
  method.translateChange = function (translate) {
    const translateNum = +translate;
    store.translate = translateNum.toFixed(2);
    store.moveTranslate = (1 + translateNum / 70).toFixed(2);
  };
  //上拉下拉
  method.loadTop = function () {
    store.allLoaded = false;//允许加载
    store.topFlag = 1;//上啦刷新未true
    store.offset = 1;
    method.whiteList();
    setTimeout(() => {
      store.vm.$refs.loadmore.onTopLoaded();
    }, 1500);
    method.whiteLimitMoney();//重新获取下金额
  };
  method.loadBottom = function () {
    store.topFlag = false;//下拉加载
    store.offset++;
    method.whiteList();
    setTimeout(() => {
      store.vm.$refs.loadmore.onBottomLoaded();
    }, 1500);
  };

  //右边标题点击的方法
  method.clickRight = function () {
    store.vm.$router.push({path: '/checkPayBackList'});
  };

  //做白条列表到顶部的方法
  // method.handleScroll = function () {
  //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//滚动的数字
  //   var offsetTop = document.querySelector("#btList").offsetTop;
  //   if (scrollTop > offsetTop - 50) {
  //     // if (scrollTop > 10){
  //     store.isTop = true;
  //   } else if (scrollTop < -50) {
  //     store.isTop = false;
  //   }
  // };
    //做白条列表到顶部的方法

  export default {
    name: "whiteBar",
    data() {
      return store;
    },
    updated () {
        core.$reg('title_right_click', method.clickRight).then(function (res) {
        })
    },
    mounted () {
        //右侧点击跳转
      store.vm = this;
      store.ddstb = store.vm.$store.state.AO_WHITE_TEXT.AO_WHITE_BAR_DATA;
      //设置apptitle的方法
      store.title_info = {
        "title": "我的" + store.vm.$store.state.AO_WHITE_TEXT.AO_WHITE_BAR_DATA,
        "actionRight": {
          "actionIcon": "http://dist.zjbird.com/icon/check_bill.png",
          "actionText": "",
          "actionTextColor": "#333333"//ios不传可能闪退
        },
        "bgColor": "#ffffff"
      };
      let hander = setInterval(function () {
        if (!window.WebViewJavascriptBridge) {
          // console.log(window.WebViewJavascriptBridge)
          //   console.log(window.location.href)
          return
        }
        else {
          console.log('11111111111111111')

          clearInterval(hander)

        try {
          core.$app('get_user_info','userinfo').then(function (res) {
            console.log('00000000000000000000000000')
            store.worker_info = JSON.parse(res);
            store.worker_id = store.worker_info.user_id;

        core.$app('title_info_control', store.title_info).then(function (res) {
        });
            //查询剩余金额
            method.whiteLimitMoney();
            //  列表信息
            method.whiteList();
          });
        } catch (e) {
          console.log(e);
        }
         }
      }, 10);

      store.wrapperHeight = document.documentElement.clientHeight - store.vm.$refs.wrapper.getBoundingClientRect().top;
      store.ulHeight =  document.documentElement.clientHeight - store.vm.$refs.wrapper.getBoundingClientRect().top - 55 ;
      // console.log(store.ulHeight);
      // store.worker_id = 13930;
      // //  列表信息
      // method.whiteList();

      //  监听滚动时间
      // window.addEventListener('scroll', method.handleScroll);

    },
       methods: method,
    beforeDestroy() {
      store.btList = [];
      // store = {};
      store.limitMoney = 0.00;
      store.isTop = false;
      // window.removeEventListener('scroll', method.handleScroll);
    }
  }
</script>

<style>


  .loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
  }

  .mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
  }

  .mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

  .page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
  }

  .page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
  }

  .loadmore {
    margin-bottom: 4.5rem;
    overflow: auto;
  }

  .page-loadmore-desc:last-of-type,
  .page-loadmore-listitem {
    border-bottom: 1px solid #eee
  }

  .page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    text-align: center
  }

  .page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
  }

  .page-loadmore-wrapper {
    overflow: scroll
  }

  .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }
.top-banneer {
  background-color: #fff;
  height: 20rem;
  padding: 2rem 1rem;



}
.container-padding-bottom{
  padding-bottom: 4.5rem;
}

</style>
