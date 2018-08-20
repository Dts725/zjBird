<template>
  <div class="w100 h100 fz14">
      <phone @userInfo = "userInfo"></phone>


    <div class="pa3 mb6 oh-y-a">
      <header class="bgf p43 br3">
        <div class="one-header flex">
          <div class="flex">
            <div class="img-box mr15">
              <img :src="worker.avator" alt="" class="workerheader" v-if="worker.avator">
              <img src="../../../assets/images/noheader.png" alt="" class="workerheader" v-else>
            </div>
            <div>
              <div class="flex-ac mt3">
                <p class="fz20 mr3" v-cloak>{{worker.name}}</p>
                <p class="fz15">{{worker.service_center}}体验中心</p>
              </div>
              <div class="flex-ajc mt3">
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
                <p class=" ml3 mt2 fz15" v-cloak>{{worker.star}}评分</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="order-main-box pa3 mt3 br3 bgf">
        <div class="flex-space-between">
          <p class="fz14">服务类型</p>
          <div class="flex-ajc pv1" @click="selectService()">
            <p class="fz14" :class="form.rtype ? 'c3':'c9'" v-cloak>{{wtypename }}</p>
            <div class="img-box ml3" style="width: 1.4rem;" >
              <img src="../../../assets/images/img/workerCard/icon_tran.png" alt="">
            </div>
          </div>
        </div>
        <div class="border-t mv3"></div>
        <div>
          <p>需求详情</p>
          <textarea class="needs mt3" placeholder="请填写您的详细需求" maxlength="400" v-model.trim="form.detail"></textarea>
        </div>
      </div>
      <div class="order-main-box pv3 mt3 br3 bgf">
        <div class="flex-space-between ph3">
          <p>联系人</p>
          <input type="text" placeholder="请填写联系人姓名" class="tr bn" maxlength="10" v-model.trim="form.linkman">
        </div>
        <div class="border-b mv3"></div>
        <div class="flex-space-between ph3">
          <p>联系电话</p>
          <p v-cloak>{{mobile}}</p>
        </div>
        <div class="border-b mv3"></div>
        <div class="flex-space-between ph3">
          <p class="fz14">服务地区：{{worker.province + worker.city}}</p>
          <div class="flex-ajc pv1" @click="selectAres()">
            <p class="fz14"  :class="form.area ? 'c3':'c9'" v-cloak>{{areaName}}</p>
            <div class="img-box ml3" style="width: 1.4rem;">
              <img src="../../../assets/images/img/workerCard/icon_tran.png" alt="">
            </div>
          </div>
        </div>
        <div class="border-b mv3"></div>
        <div class="ph3">
          <p>详细地址</p>
          <textarea class="needs mt3" placeholder="请填写您的详细地址" maxlength="400" v-model.trim="form.addr"></textarea>
        </div>
      </div>
    </div>
    <a href="javascript:void(0);" class="tac height-btn g-fixed-bottom w100 fz17 mt5" :class="isNext ? 'btn-bt-orange' : 'btn-bt-default'" @click="order()">确定预约</a>
  </div>
</template>

<script>
  import StarRating from 'vue-star-rating'
  import api from '../../../services/api'
  import error from '../../../services/error'
  import phone from '../../../components/common/getPhone/getPhone'
  import page from '../../page'
  import { Dialog } from 'vant';



  var store = {};
  var method = {};
  store.isNext = false;//控制确定预约的按钮
  store.isNexts = false;//控制确定预约的按钮
  store.workerTypeList = [];//工种列表
  store.wtypename = '选择服务类型';
  store.mobile = '';
  store.worker = {};
  store.areaName = '选择区县';
  store.areaForm = {cityId:''};



  store.form = {
    // custid:'',//用户id
    // workid:'',//工友id
    rtype:'',//服务类型
    linkman:'',//联系人
    tel:'',//手机号
    addr:'',//详细地址,
    detail:'',//需求详情
    area:''//选择区县
  };
  //获取工友信息
  method.getWorkerInfo = function () {
    api.workerDetail({user_id:store.user_id}).then(function (res) {
      if(res.code == error.success){
        store.worker = res.result;
        if(store.worker.star == 0){
          store.worker.stars = 5;
        }else {
          store.worker.stars = store.worker.star;
        }
        store.areaForm.cityId = store.worker.city_id;
        method.getArea();
      }
    });
  };





  //获取工种
  method.get_requtype = function () {
    api.get_requtype().then(function (res) {
      if (res.code == error.success){
        store.serviceTypeList = res.result;
      }
    })
  };
  //选择服务类型
  method.selectService = function () {
    this.$selectbox.show(
      {'name':'服务类型','ind':true},
      {
        cshow:function (id,name){
          store.form.rtype = id;
          store.wtypename = name;
        },
        cb:function () {
        },
        selectData:store.serviceTypeList,
      }
    );
  };

  //获取区县
  method.getArea = function(){
    console.log(store.areaForm);
    api.get_work_area(store.areaForm).then(function (res) {
      if (res.code == error.success){
        store.areaList = res.result;
      }
    })
  };
  //选择区县
  method.selectAres = function () {
    this.$selectbox.show(
      {'name':'选择区县','ind':true},
      {
        cshow:function (id,name){
          store.form.area = id;
          store.areaName = name;
          console.log("quxian",id);
        },
        cb:function () {
        },
        selectData:store.areaList,
      }
    );
  };


  //从弹窗中得到用户登录信息
  method.userInfo = function (info) {
    store.userInfo = info;
    store.form.custid = store.userInfo.user_id;
    store.form.tel = store.userInfo.mobile;
    store.mobile = store.userInfo.mobile;
    console.log("watch当中的用户信息",store.userInfo)
  };

  //确定预约
  method.order = function(){
    store.form.address = store.worker.province + store.worker.city + store.areaName + store.form.addr;
    console.log(store.form);
    api.get_order(store.form).then(function (res) {
      if (res.code == error.success){
        Dialog.alert({
          title:'温馨提示',
          message:'预约成功，工友会尽快与您取得联系<br>请确保手机畅',
          confirmButtonText:'好的',
        }).then(()=>{
          store.vm.$router.push({path:'/orderSuccess'});
        });
      }
    })

  };


    export default {
        name: "orderDetail",
        data(){
          return store;
        },
        methods:method,
        watch:{
          userInfo:method.userInfo,
          form:{
            handler (news ,old){
            for(var key in news){
              if(!news[key]){
                return false;
              }
            }
            store.isNext = true;
            },
            deep:true
          }
        },
        computed: {
          bb() {
            console.log(store.form);
          }
        },
        components: {
          StarRating,phone
        },
        mounted(){
          store.vm = this;
          page.title("预约工友");


          store.user_id = store.vm.$route.query.user_id;//接受前一页传来的工友id
          store.form.workid = store.user_id;
          method.getWorkerInfo();
          method.get_requtype();



        }
    }
</script>

<style lang="scss">
  .van-dialog__content {
    .van-dialog__message{
      text-align: center;
    }
  }
  .van-dialog__confirm{
    .van-button__text{
      color:#02AF67;
    }
  }

</style>
