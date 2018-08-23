<template>
    <div class="imgManagement w100">
        <ul class="flex-start-warp w100" >
            <li class="relative">
                <input type="file" @change="fileChange($event,imgList)" accept="image/*" multiple>
                <img id="mange" src="../../assets/images/wechat/workerCars/选择案例图片@2x.png" alt="">
            </li>
            <li class="flex-ajc relative" v-for="(item,index) in imgList" :key="index">
                <div>
                    <img @click="deleteImg(index)" src="../../assets/images/wechat/workerCars/关闭@2x.png" alt="">
                </div>
                <img id="imgList" :src="item" alt="">
            </li>
        </ul>
        <div class="footer w100 fz17" @click="uploadFile(name,upImgList)">
            <p>确定</p>
        </div>
    </div>
</template>
<script>
import aliOss from "../../tools/aliUpload";
import api from "../../services/api";
export default {
  name: "imgManagement",
  data() {
    return {
      imgList: [], //图片缓存
      name: "h5test/8609",
      upImgList: [] //缓存上传数组
    };
  },
  created() {},
  mounted() {
    let el = document.querySelector("li"),
      elLi = document.querySelectorAll("li"),
      inputs = document.querySelector("input"),
      width = Math.round(el.offsetWidth);
    elLi.forEach(element => {
      element.style.height = width + "px";
    });
    inputs.style.width = width - 10 + "px";
    inputs.style.height = width - 10 + "px";
  },
  updated() {
    let img = document.querySelectorAll("#imgList"),
      el = document.querySelector("#mange"),
      width = Math.round(el.offsetWidth);
    img.forEach(el => {
      el.style.height = width + "px";
      el.style.width = width + "px";
    });
  },
  methods: {
    //点击按钮删除图片
    deleteImg($index) {
      this.imgList.splice($index, 1);
      this.upImgList.splice($index, 1);

      console.log(this.upImgList);
    },

    //点击添加图片
    fileChange(el, imgList) {
      let a = [3, 4, 5, "32"];
      aliOss.fileChange(el, imgList).then(res => {
        this.upImgList = this.upImgList.concat(res);
        console.log(this.upImgList);
      });
    },
    callback() {
      this.$router.push({ path: "/choose" });
    },
    //点击上传图片
    uploadFile(name, list) {
      aliOss.uploadFile(name, list).then(res => {
        console.log(res);
        api
          .uploadAliOss({
            userId: 2352,
            data: res
          })
          .then(res => {
            this.callback();
          });
      });
    }
  }
};
</script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
}
.footer p {
  line-height: 5rem;
  width: 100%;
  background-color: rgba(255, 209, 2, 1);
  text-align: center;
}
</style>
