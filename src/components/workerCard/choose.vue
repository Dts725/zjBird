<template>
    <div class="imgManagement w100 h100">
        <ul class="flex-start-warp w100" >
            <li class="flex-ajc relative" v-for="(item,index) in imgList" :key="index">
                <div @click="selectImg(index)">
                    <img v-if="!deleteImg(index)" src="../../assets/images/wechat/workerCars/组 1341@2x.png" alt="">
                    <img v-if="deleteImg(index)" src="../../assets/images/wechat/workerCars/组 134@2x.png" alt="">
                </div>
                <img class="imgListChoose" :src="item.url" alt="">
            </li>
        </ul>
        <div class="footer w100" @click="submit('h5test/8899')">
            <p class="fz14">已选中<span style="color:rgba(255, 28, 0, 1)">{{num}}</span>张</p>
            <p class="fz17">确认</p>
        </div>
    </div>
</template>
<script>
import api from "../../services/api";
import aliOss from "../../tools/aliUpload";
import { Indicator } from "mint-ui";
export default {
  name: "choose",
  data() {
    return {
      imgList: [],
      selectList: [], //缓存选中数组index
      selectNum: 1, //选中个数数
      submitList: [] // 用来提交上传的
    };
  },
  mounted() {
    this.getAliOss();
    this.selectImg();
  },
  updated() {
    this.computedHeight(10);
  },
  computed: {
    num: function() {
      return this.selectList.length;
    }
  },
  methods: {
    //获取图片
    getAliOss() {
      Indicator.open();
      api.getAliOss({ userId: 2352 }).then(res => {
        this.imgList = res.data.result[0].data;
        console.log(this.imgList);
      });
    },

    //计算高度
    computedHeight(padding = 5) {
      let el = document.querySelector("li"),
        elLi = document.querySelectorAll("li"),
        width = Math.round(el.offsetWidth);
      elLi.forEach(element => {
        element.style.height = width + "px";
      });
      let img = document.querySelectorAll(".imgListChoose");
      img.forEach(el => {
        el.style.height = width - padding + "px";
        el.style.width = width - padding + "px";
      });
    },

    //获取选中图片
    selectImg($index = 0) {
      if (this.selectList.indexOf($index) !== -1) {
        let num = this.selectList.indexOf($index);
        this.selectList.splice(num, 1);
        return false;
      } else {
        this.selectList.push($index);
      }
    },

    //删除选中图片
    deleteImg($index) {
      if (this.selectList.indexOf($index) !== -1) {
        return true;
      } else {
        return false;
      }
    },

    //确认提交
    submit(name) {
      new Promise(resolve => {
        this.selectList.forEach(el => {
          this.submitList.push(this.imgList[el]);
        });
        resolve("111");
      }).then(res => {
        console.log(this.submitList);
        api.uploadAliOss({
          userId: 2352,
          data: this.submitList
        }).then(res => {
          console.log(res);
        });
      });
    }
  }
};
</script>
<style scoped lang='scss'>
.imgManagement {
  padding-top: 1.9rem;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  box-shadow: 0rem -0.1rem 0rem rgba(236, 236, 236, 1);
  p:nth-of-type(1) {
    line-height: 4.05rem;
    padding-left: 1rem;
  }
  p:nth-of-type(2) {
    width: 12rem;
    line-height: 4.05rem;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    background-color: rgba(255, 209, 2, 1);
  }
}
</style>
