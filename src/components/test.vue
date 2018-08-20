<template>
    <div class="h100">
      <p >{{userinfoS}}</p>
      <div style="height: 100px; background: red" class="w100 fz20"  @click="showimg()">shajhdahd </div>
      <!--<images></images>-->
      <!--<van-swipe>-->
        <!--<van-swipe-item v-for="(image, index) in imgData" :key="index">-->
          <!--<img v-lazy="image" />-->
        <!--</van-swipe-item>-->
      <!--</van-swipe>-->
      <vue-preview :slides="imgDatas"></vue-preview>
      <div style="height: 100px; background: red" class="w100 fz20" @click="phone()">clickMe</div>


      <div v-show="phoneNum">
        <phone @userInfo = "userInfo"></phone>
      </div>


    </div>
</template>

<script type="text/babel">
  import phone from '../components/common/getPhone/getPhone'
  import { ImagePreview } from 'vant';
  var store = {};
  var method = {};
  store.imgData= [
    "http://oss.zjbird.com/andpath1526874780053worker15268747800530.png?x-oss-process=style/w700",
    "http://oss.zjbird.com/andpath1526874780687worker15268747806861.png?x-oss-process=style/w700",
    "http://oss.zjbird.com/andpath1526874781340worker15268747813392.png?x-oss-process=style/w700",
    "http://oss.zjbird.com/andpath1526875016806worker152687501680419.png?x-oss-process=style/w700",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530616084998&di=81e44ee3d322c2dae0843dc70ba43810&imgtype=0&src=http%3A%2F%2Fimg.bbs.wisenjoy.com%2Fforum%2F201405%2F14%2F090904nzs02u3f1un21bzq.jpg"
  ];
  store.imgDatas= [
    {
      src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
      msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
      alt: 'picture1',
      title: 'Image Caption 1',
      w: 600,
      h: 400
    },
    {
      src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
      msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
      alt: 'picture2',
      title: 'Image Caption 2',
      w: 1200,
      h: 900
    }
  ];

  // store.userinfo = this.$store.state.custInfo.customer;

  store.phoneNum = true;

  method.showimg = function () {
    ImagePreview(store.imgData);
  };
  // method.phone = function () {
  //  store.userinfo = store.vm.$store.state.customer;
  //  console.log("a");
  //  console.log(store.userinfo);
  //  if(store.userinfo != ''){
  //    store.phoneNum = false;
  //  }
  // };

  // store.userInfo = {};

  method.userInfo = function (info) {
    store.userInfo = info;
    console.log("watch当中的用户信息",store.userInfo)
  };
  export default {
    name:'test',
    data(){
      return store
    },
    watch:{
      userInfo:method.userInfo
    },
    methods:method,
    components : {
      phone
    },
    computed:{
     userinfoS:function (){
          let datd = this.$store.state.custInfo.customer;

        return datd.ID ;
        },
    },
    mounted(){
      store.vm = this;
      // store.userinfo = store.vm.$store.state.customer;
      // console.log("3",store.userinfo);
    },
    updated(){
      // store.userinfo = this.$store.state.custInfo.customer;
      console.log("4",store.userinfo);
    },
    destroyed(){
      store.phoneNum = true;
    }

  }
</script>
