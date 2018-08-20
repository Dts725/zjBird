<template>
  <div class="workerDetail-container" style="padding-bottom: 4.5rem;">
      <header class="workerDetail-header bgf">
        <div class="one-header flex">
          <div class="flex">
            <div class="img-box mr15">
              <img :src="worker.avator" alt="" class="workerheader" v-if="worker.avator">
              <img src="../../assets/images/noheader.png" alt="" class="workerheader" v-else>
            </div>
            <div>
              <div class="flex-ac mt3">
                <p class="fz20 mr3" v-cloak>{{worker.name}}</p>
                <div class="img-box" style="width: 5rem;">
                  <img src="../../assets/images/img/workerCard/icon_approve.png" alt="">
                </div>
              </div>
              <div class="flex-ac mt3">
                <div class="img-box mr3" style="width: 1.3rem;">
                  <img src="../../assets/images/img/workerCard/icon_addr.png" alt="">
                </div>
                <p class="fz15" v-cloak>{{worker.service_center}}体验中心</p>
              </div>

            </div>
          </div>
          <div class="mt3">
            <router-link :to="{path:'/orderDetail',query:{user_id:form.user_id}}" class="fz14 btn-order" v-show="wechat"> 预约工友</router-link>
          </div>
        </div>
        <div class="two-header flex-space-between mt4">
          <div class="item flex">
            <div style="margin-top: -0.25rem;">
              <star-rating  :rating = worker.stars
                            :read-only = true
                            :rounded-corners = true
                            :star-points = '[29,8,20,23,6,25,16,40,13,56,29,49,44,56,42,40,52,25,37,23]'
                            :increment = 0.1
                            active-color ='rgb(51, 51, 51)'
                            inactive-color = 'rgb(255,255,255)'
                            border-color = 'rgb(51, 51, 51)'
                            :star-size="17"
                            :show-rating= false
                            :border-width='2'
              > </star-rating>
            </div>
            <p class="fz13 ml2" v-cloak>{{worker.star}}评分</p>
          </div>
          <div class="flex-ac item" style="margin-left: -2rem;">
            <p class="fz18 b" v-cloak>{{worker.worker_order_count}}</p>
            <p class="fz13">累计预约</p>
          </div>
          <div class="flex-ac item">
            <p class="fz18 b" v-cloak>{{worker.orders}}</p>
            <p class="fz13">完成订单</p>
          </div>
        </div>
        <div class="border-b mt15 mb15"></div>
        <div class="three-header w100">
          <div class="w100 flex" >
            <div class="w-90" :class="{ 'tips-off' : isTips}">
              <div class="worker-tips flex" >
                <p class="tips-item" v-for="tip in worker.howner_labels" :key="tip">{{tip}}</p>
              </div>
            </div>
            <a href="javascript:void(0);" class="w-10 clightgreen mt2 fz14 tr" @click="isTips = !isTips" v-text="isTips ? '展开' : '合起'" v-show="labellen > 2"></a>
          </div>
          <div class="worker-comment fz14" v-cloak>{{worker.comment}}</div>
        </div>
      </header>
      <div class="workerDetail-main mt3 bgf">
        <div class="worker-case-box">
          <div class="worker-title flex-space-between">
            <p class="fz20">施工案例</p>
            <p class="case-manage" v-show="!wechat">管理</p>
          </div>
          <div class="case-img-box w100 flex-space-between ">
            <div class="img-box" v-show="!ImgLists[0]">
              <div class="case-imgs" :style="{backgroundImage:'url('+img+')'}" ></div>
            </div>
            <div class="img-box" v-show="ImgLists[0]" v-for="(imgs,index) in ImgLists" :key="imgs.index" v-if="index < 4" :class=" index == 3 ? 'pr': ''" @click="showImg(index)">
              <div class="case-imgs" :style="{backgroundImage:'url('+imgs.caseUrl+')'}" ></div>
              <div class="on-case case-imgs" @click.stop="lookMoreImg(index)" v-show="wechat && ImgLists.length > 4 && index == 3">
                <div class="text">
                  <p class="white">+{{ImgLists.length - 4}}</p>
                  <p class="white mt15">查看更多</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
        <!--用户评价先没有-->
        <!--
        <div class="worker-comment-box mt4">
          <div class="worker-title flex-space-between">
            <p class="fz20">用户评价</p>
            <p class="case-manage" v-show="!wechat">管理</p>
          </div>
          <div class="comment-box">
            <div class="bgf5 p23 mb3">
              <div class="comment-item">
                <div class="flex">
                  <div class="img-box mr2" style="width: 5rem;">
                    <img src="../../assets/images/noheader.png" alt="">
                  </div>
                  <div>
                    <p class="fz15 mt2">张先生</p>
                    <p class="fz14 mt2">安装五金配件</p>
                  </div>
                </div>
                <p class="mt2 fz13 c6">2017年11月30日</p>


              </div>
              <div class="mt3 fz14">
                <p>看风景阿大口径的辅导费记得看房东发电机房看到附件的方法积分卡放假啊发加快</p>
              </div>
            </div>
            <div class="bgf5 p23 mb3">
              <div class="comment-item">
                <div class="flex">
                  <div class="img-box mr2" style="width: 5rem;">
                    <img src="../../assets/images/noheader.png" alt="">
                  </div>
                  <div>
                    <p class="fz15 mt2">张先生</p>
                    <p class="fz14 mt2">安装五金配件</p>
                  </div>
                </div>
                <p class="mt2 fz13 c6">2017年11月30日</p>


              </div>
              <div class="mt3 fz14">
                <p>看风景阿大口径的辅导费记得看房东发电机房看到附件的方法积分卡放假啊发加快</p>
              </div>
            </div>
            <p class="fz17 clightgreen tac" v-show="wechat">更多评价</p>
          </div>
        </div>

      </div>  -->
    <router-link :to="{path:'/regWorker',query:{workerID:workerid,mobile:worker.mobile}}" v-show="wechat" class="pflow g-btn g-btn-on fz17 w100">我要定制名片，加入住建鸟</router-link>
  </div>
</template>

<script>
  import StarRating from 'vue-star-rating'
  import page from '../page'
  import core from '../../core/jsbridge/core'
  import api from '../../services/api'
  import error from '../../services/error'
  import { ImagePreview } from 'vant';


  var store = {};
  var method = {};
  //获取施工案例图片
  store.formImg = {
    workerId:'',
    caseType:'',//没有是全部，1是优秀案例，2是其他案例
    page:1
  };

  store.form = {user_id:''};
  store.worker = {};
  store.workerid = '';//工友id
  store.wechat = '';
  store.labellen = 0;//标签的长度

  store.isTips = true;
  store.img = require('../../assets/images/img/workerCard/nocase.png');
  store.ImgLists = [];//施工案例图片

  //分享到微信中的方法。点击查看更多图片,跳到查看全部图片
  method.lookMoreImg = function () {
    store.vm.$router.push({path:'/manyImgs',query:{workid:store.workerid}});
  };

  //工友信息
  method.getWorkerInfo = function () {
    if(store.workerid){
      store.form.user_id = store.workerid;
    }else {
      store.form.user_id = store.userId;
    }

    api.workerDetail(store.form).then(function (res) {
      if(res.code == error.success){
        store.worker = res.result;
        store.labellen = store.worker.howner_labels.length;
        if(store.worker.star == 0){
          store.worker.stars = 5;
        }else {
          store.worker.stars = store.worker.star;
        }

          method.weChatShare();


      }
    });
  };

  //施工案例图片
  method.getWorkImg = function () {
    if(store.workerid){
      store.formImg.workerId = store.workerid;

    }else {
      store.formImg.workerId  = store.userId;
    }
    api.get_work_img(store.formImg).then(function (res) {
      if(res.code == error.success){
        store.ImgLists = res.result;
        store.ImgLists.forEach(function(item){
          item.caseUrl = item.caseUrl.match(/(.*)[?]/)[1]+"?x-oss-process=style/w700";
        });
        console.log("施工案例",store.ImgLists);
      }
    })
  };
  //查看大图
  method.showImg = function (index) {
    store.newImgs = [];
    Object.keys(store.ImgLists).forEach(function(key){
      store.newImgs.push(store.ImgLists[key].caseUrl.match(/(.*)[?]/)[1]);
    });
    // store.newImgs = store.newImgs.slice(0,8);
    ImagePreview(store.newImgs,index);

  };



  //微信分享的方法
  method.weChatShare = function () {
    //shareFrom:0和不传是正式环境
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

      try{
        wx.config(config);
        wx.ready(function () {
          var shareData = {
            title:store.worker.name + '的个人档案',
            desc: '住建鸟二维码名片',
            link: window.location.href,
            imgUrl: store.worker.avator,
            success:function () {
              console.log("分享成功了");
            }
          };
          wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareTimeline(shareData);
        });
        wx.error(function(res){
          console.log(res)
        });

      }catch (e) {
        console.log(e.message);
      }

    })
  };

  export default {
      name: "workerDetail",
      data(){
        return store;
      },
      methods:method,
      components: {
          StarRating
      },
      mounted(){
          document.body.classList.add('custom-van');
          page.title("工友名片");
          store.wechat = page.wechat();//true表示是微信浏览器
          store.vm = this;
          store.workerids = store.vm.$route.query.workid;//接受分享来的工友id
        if (typeof store.workerids == 'object'){
          store.workerid = store.workerids[0];
        } else {
          store.workerid = store.workerids;

        }
          // store.workerid = 13708;//接受分享来的工友id
          store.title_info = {
            "title": "工友名片",
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
                  // console.log("xinxi",res);
                  store.worker_info = JSON.parse(res);
                  store.userId = store.worker_info.user_id;
                  // console.log("工友的app里面的id",store.userId);
                });

              } catch (e) {
                console.log(e);
              }
            }
          }, 10);

          method.getWorkerInfo();
          method.getWorkImg();

        }

    }
</script>
<style id="js-worker-style">
.custom-van .van-modal{
  background-color:rgba(0,0,0,1);
}
</style>

