<template>
  <div class="bt-container bgf5 w100 h100">
    <div class="w100 pa2" style="background-color: #FFF0AB;">
      <div class="title-bar" v-if="lists.status == 1">住建鸟将在2-14个工作日内处理，请耐心等待</div>
      <div class="title-bar" v-if="lists.status == 2" v-cloak>{{lists.rejectReason}}</div>
      <div class="title-bar" v-if="lists.status == 16">{{whiteDatsName}}申请已通过，当前可用额度：{{lists.quota}}元</div>
    </div>
    <div class="bgf kt-box">
      <div class="flex-space-between f3 pa3 border-b">
        <div class="flex-ajc">
          <div class="img-box worker-img mr3">
            <img :src="userImg" alt=""  class="b50">
          </div>
          <p cllo class="fz20 fw7-m" v-cloak>{{workerName}}</p>
        </div>
        <p :class="lists.status != 16 ?'cred': 'notice'" v-cloak>{{text[lists.status]}} </p>
      </div>
      <div class="ph3 f3">
        <div class="flex-space-between ph15 border-b">
          <p>手机号</p>
          <p class="c9" v-cloak>{{workerTel | tel}}</p>
        </div>

      </div>
      <div class="ph3 f3">
        <div class="flex-space-between ph15">
          <p>身份证号码</p>
          <p class="c9" v-cloak>{{lists.idCardNO}}</p>
        </div>

      </div>
    </div>
    <div v-if="lists.contactUser" class="bgf ph3 f3">
      <div class="mt3 border-b">
        <div class="flex-space-between ph15">
          <p>紧急联系人</p>
          <p class="c9" v-cloak>{{lists.contactUser}}</p>
        </div>

      </div>
      <div class="flex-space-between ph15">
        <p>联系手机号</p>
        <p class="c9" v-cloak>{{lists.contactTel}}</p>

      </div>
    </div>
    <div v-if="lists.contactUser1" class="bgf ph3 f3">
      <div class="mt3 border-b">
        <div class="flex-space-between ph15">
          <p>紧急联系人</p>
          <p class="c9" v-cloak>{{lists.contactUser1}}</p>
        </div>

      </div>
      <div class="flex-space-between ph15">
        <p>联系手机号</p>
        <p class="c9" v-cloak>{{lists.contactTel1}}</p>

      </div>
    </div>
    <div v-if="lists.contactUser2" class="bgf ph3 f3">
      <div class="mt3 border-b">
        <div class="flex-space-between ph15">
          <p>紧急联系人</p>
          <p class="c9" v-cloak>{{lists.contactUser2}}</p>
        </div>

      </div>
      <div class="flex-space-between ph15">
        <p>联系手机号</p>
        <p class="c9" v-cloak>{{lists.contactTel2}}</p>

      </div>
    </div>
    <div class="card-img-box f3 mt3 bgf">
      <p class="p23 border-b">身份证照片</p>
      <div>
        <div class="img-box p23 border-b">
          <div class="bg_picWrapper"  :style="{backgroundImage:'url('+lists.idCardImage+')'}"></div>
        </div>
        <div class="img-box p23">
          <!-- <img src="../../assets/images/upload-reverse.png" alt=""> -->
          <div class="bg_picWrapper"  :style="{backgroundImage:'url('+lists.idCardImage2+')'}"></div>
          <!-- <img :src="lists.idCardImage2" alt=""> -->
        </div>
      </div>
    </div>
    <router-link to="/argremment"><p class="flex-ajc bgf5 pv4 f3 cdorange" :class="{'mb5' : lists.status == 2 }">《{{whiteDatsName}}协议》</p></router-link>
    <router-link to="/registerBt" class="btn-bt pf w100 f3" v-if="lists.status == 2">重新认证</router-link>


  </div>
</template>

<script>
  import core from '../../core/jsbridge/core'
  import addr from '../../conf/api'
  import api from '../../services/api'
  import error from '../../services/error'
  import StatusCode from '../../services/StatusCode'

  var method = {};
  var store = {};
    store.workerID = '';
    store.userImg = "" ;//用户图片地址
    store.lists = [];
    store.workerName =  "";
    store.workerTel = "";//工友电话
            store.whiteDatsName ='';

    // store.name = store.vm.state.INFO_FN.INFO.name;
    store.text = StatusCode.lookStatus;

    method.lookBt = function () {
    // console.log(store.vm.$store.state.INFO_FN.INFO.name);
    core.$app("get_user_info","info").then((res) => {
      res =JSON.parse(res).avator;
      store.userImg = res;
    });

    api.lookBt({workerID:store.workerID}).then(function (res) {
        let data =JSON.stringify(res);
           data = JSON.parse(data);
          //  console.log(data);
        if(data.code === 200)
          store.lists = data.result;

    })
  };

  store.form = {};

    export default {
        name: "lookBt",
      data(){
        return store;
      },
      methods:method,
      created(){
      store.whiteDatsName =this.$store.state.AO_WHITE_TEXT.AO_WHITE_BAR_DATA;

        store.vm = this;
      let handler = setInterval(function() {
        if(!window.WebViewJavascriptBridge) {
          return
        }
        clearInterval(handler);
        core.$app('get_user_info',"info").then(res => {
          console.log(res);
          store.workerID = JSON.parse(res).user_id;
          store.workerName = JSON.parse(res).name;
          store.workerTel = JSON.parse(res).mobile;
          method.lookBt();

        });
      store.title_info = {
            "title": store.whiteDatsName + "开通信息",
            "actionRight":{
              "actionText":"",
              "actionTextColor":"#333333"//ios不传可能闪退
            },
            "bgColor":"#ffffff"
          };
      core.$app('title_info_control',store.title_info).then((res) => {

          });
      },0);

      }
    }
</script>
<style scoped>
.cred {
  color: #FF1C00;
}
</style>
