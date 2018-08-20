<template>
  <div class="fix-img-wrap p23 " >
    <div class="fix-img-item" v-for="(imgs,index) in ImgLists" :key="imgs" @click="showImg(index)">
      <img :src="imgs.caseUrl">
    </div>
  </div>
</template>

<script>
  import page from '../../page'
  import api from '../../../services/api'
  import error from '../../../services/error'
  import { ImagePreview } from 'vant';

  var store = {};
  var method = {};
  store.ImgLists = [];//施工案例图片


  //获取施工案例图片
  store.formImg = {
    workerId:'',
    caseType:'',//没有是全部，1是优秀案例，2是其他案例
    page:1
  };

  //施工案例图片
  method.getWorkImg = function () {
      store.formImg.workerId = store.workid;
    api.get_work_img(store.formImg).then(function (res) {
      if(res.code == error.success){
        store.ImgLists = res.result;
        console.log(store.ImgLists);
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
    store.instance = ImagePreview(store.newImgs,index);
  };

  export default {
    name: "manyImgs",
    data(){
      return store;
    },
    methods:method,
    mounted(){
      document.body.classList.add('custom-van');
      store.vm = this;
      page.title("全部案例图片");
      store.workid = store.vm.$route.query.workid;//接受前一页传来的工友id
      console.log(store.workid);
      method.getWorkImg();
    },
    beforeDestroy(){
      store.instance.close();
    }
  }
</script>

<style id="js-worker-style">
  .custom-van .van-modal{
    background-color:rgba(0,0,0,1);
  }
</style>
