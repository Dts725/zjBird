<template>
  <div class="wechat-lottery-container w100"   style="overflow: scroll;">
    <div class="img-box pr">
      <a href="javascript:void (0);">
        <img src="../../../assets/images/wechat/invite/lottery.png" alt="">
      </a>
      <p class="pa b get-money"  v-cloak>{{money}}元</p>
    </div>

    <div style="padding: 0 1.5rem;">
      <router-link :to="{path:'/regWorker',query:{workerID:workerID,mobile:inviter}}" class="wechat-btn-invite tac fz21 also-join">我也要加入住建鸟</router-link>
    </div>
    <div class="mh3 lottery-wrap">
      <div class="lottery-box">
        <div class="flex-space-between">
          <i class="line"></i>
          <p class="fz20 white">中奖名单</p>
          <i class="line"></i>
        </div>
        <div class="scroll-lottery-box mt2 oh pr">
          <ul class="scroll-lottery" :class="{'scroll-list' : len > 3}">
            <li class="flex-space-between fz17 w100" v-for="item in luckLists" :key="item.id">
              <p class="white w-30 tl one" v-cloak>{{item.workerName}}</p>
              <p class="white w-30 tc">抽到</p>
              <p class="cyellow w-40 tr">{{item.goods}}<span class="fz12 cyellow">元现金红包</span></p>
            </li>
            <li class="flex-space-between fz17 w100" v-for="(item,index) in luckLists" :key="item.id" v-if="index < 3 && luckLists.length>3">
              <p class="white w-30 tl one" v-cloak>{{item.workerName}}</p>
              <p class="white w-30 tc">抽到</p>
              <p class="cyellow w-40 tr">{{item.goods}}<span class="fz12 cyellow">元现金红包</span></p>
            </li>
          </ul>
        </div>

      </div>
      <div class="lottery-box mt3">
        <div class="flex-space-between">
          <i class="line"></i>
          <p class="fz20 white">活动简介</p>
          <i class="line"></i>
        </div>
        <p class="fz15 white intr-text">
          新工友注册即可获得千元购物红包！假一赔百好保障！邀请朋友还有百元现金奖励哦！快来加入吧！
        </p>
      </div>
    </div>
  </div>
</template>

<script>

  import api from '../../../services/api';
  import error from '../../../services/error';
  import page from '../../page';

  var store = {};
  var method = {};

  store.luckLists = [];
  store.len = '';
  store.workerID = '';
  store.inviter = '';
  store.money = '' ;
  store.number = '';

  //中奖列表
  method.luckyMans = function () {
    api.luckList().then(function (res) {
      if (res.code == error.success)
        store.luckLists = res.result;
      store.len = store.luckLists.length;
      method.keyFrame();
    })
  };
  //动态计算keyframe
  method.keyFrame = function () {
    var style = document.styleSheets[0];
    style.insertRule("@keyframes dd { 0%{transform: translateY(0rem);} 100%{transform: translateY(-"+(store.len *3)+"rem);} }");
    style.insertRule(".scroll-list{animation: dd "+store.len *1+"s linear infinite normal;animation-fill-mode: forwards;}");
  };

  //微信分享的方法
  method.weChatShare = function () {
    try {
      api.share({url:window.location.href}).then(function (response) {
        const  result = response.result;
        const config = {
          debug: false,
          appId: result['appid'],
          timestamp: result['timestamp'],
          nonceStr: result['nonceStr'],
          signature: result['signature'],
          jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
        };



        wx.config(config);
        wx.ready(function () {
          store.money = store.vm.$route.query.money ;
          store.number = store.vm.$route.query.number ;
          var shareData = {
            title: '【住建鸟】又拿了'+store.money+'元现金红包，我已经有'+store.number+'个兄弟加入了你也快来吧！',
            desc: '有活干，有钱赚，假一赔百好保障！',
            link: window.location.href,
            imgUrl: 'http://dist.zjbird.com/icon/red_packet.png',
            success:function () {
              console.log("分享成功了");
            }
          };
          console.log("shareData",shareData);
          wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareTimeline(shareData);
        });
        wx.error(function(res){
          console.log(res)
        });
      })
    }catch (e) {
      console.log(e.message);
    }
  };

  //网络异常的方法
  method.network = function () {

    var el = document.body;
    if (el.addEventListener) {
      // window.addEventListener("online", function () {
      //   alert("online");}, true);
      window.addEventListener("offline", function () {
        store.vm.$toast("网络异常，请重新尝试","bottom");}, true);
    }
    else if (el.attachEvent) {
      // window.attachEvent("ononline", function () {
      //   alert("online");});
      window.attachEvent("onoffline", function () {
        store.vm.$toast("网络异常，请重新尝试","bottom");});
    }
    else {
      // window.ononline = function () {
      //   alert("online");};
      window.onoffline = function () {
        store.vm.$toast("网络异常，请重新尝试","bottom");};
    }
  };
  export default {
    name: "lottery",
    data(){
      return store;
    },
    methods:method,
    mounted(){
      store.vm = this;

      store.workerID = store.vm.$route.query.workerID ;
      store.inviter = store.vm.$route.query.mobile ;
      store.money = store.vm.$route.query.money ;
      store.number = store.vm.$route.query.number ;
      method.luckyMans();
      method.weChatShare();
      method.network();
      page.title('【住建鸟】又拿了'+store.money+'元现金红包，我已经有'+store.number+'个兄弟加入了你也快来吧！');
    }
  }
</script>

<style scoped>

</style>
