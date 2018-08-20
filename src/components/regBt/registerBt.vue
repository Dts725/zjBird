<template>
    <div class="bt-container bgf5 w100 h100">
      <!--工友身份信息-->
    <div class="warp">
      <div class="ph3 bgf">
        <div class="f3 payback-detail-item flex-space-between border-b">
          <p>真实姓名</p>
          <p class="c9" v-cloak>{{userName}}</p>
        </div>
        <div class="f3 payback-detail-item flex-space-between" style="position:relative">
          <p style="width:26%;">身份证号码</p>
          <input type="text" placeholder="请输入证件号码" class="tar idNum" v-model="idNum" maxlength="18" style="width:70%;">
        </div>
      </div>
      <!--上传照片-->
      <div class="mt3 bgf f3">
        <div class="border-b tips-title">
          <p>身份证照片</p>
          <p class="c9 mt2">必须本人手持身份证，保证身份证上信息清晰可见</p>
        </div>
        <!--放照片-->
        <div class="ph3">
          <div class="border-b pv4 flex-space-between p">
            <div class="img-box id-example">
              <img src="../../assets/images/idReverse.png" alt="">
            </div>
            <div  class="img-box id-content" >
              <!--<img @click="frontTrue('front')" v-if="!upLoadFront" :src="idCardImage" alt="" class="img-class">-->
              <div class="bg_picWrapper"  :style="{backgroundImage:'url('+idCardImage+')'}" @click="frontTrue('front')" v-if="!upLoadFront"></div>
              <img @click="front()" v-if="upLoadFront" src="../../assets/images/upload-front.png" alt="">
            </div>
          </div>
          <div class="pv4 flex-space-between p">
            <div class="img-box id-example">
              <img src="../../assets/images/idFront.png" alt="">
            </div>
            <div class="img-box id-content">
              <!--<img @click="frontTrue('revrse')" v-if="!upLoadReserve" :src="idCardImage2" alt="">-->
              <div class="bg_picWrapper"  :style="{backgroundImage:'url('+idCardImage2+')'}" @click="frontTrue('revrse')" v-if="!upLoadReserve"></div>
              <img @click="reverse()" v-if="upLoadReserve" src="../../assets/images/upload-reverse.png"  alt="">
            </div>
          </div>
        </div>
      </div>
    <!-- 底部 -->
      <div class="checkbox  mt4 mb4">
        <input type="checkbox" id="check" v-model="isCheck">
        <label for="check"></label>
        <span class="cdorange f3 argremment-bottom"  @click.stop="viewRegister()">我已阅读并同意{{whiteDatsName}}协议</span>
      </div>
      <!--固定的我要还款按钮-->

      <div class="pfx tac height-btn  w100 f3" :class="isNext ? 'btn-bt-orange' : 'btn-bt-default'" @click.stop="nextOne()">下一步

      </div>
      <div class="pfx-top" v-show="!isNext">
          <div class="tac height-btn  w100 f3"></div>
      </div>


    </div>
    </div>
</template>

<script>
  import core from '../../core/jsbridge/core'
  import api from '../../services/api'
  import error from '../../services/error'
  import formError from '../../tools/formerror'
  import lstore from '../../tools/lstore';
  import { Toast } from 'mint-ui';
  var store = {};
  var method = {};
  store.isNext = false;
  store.userName = '';// 绑定用户信息
  store.idNum = '';//绑定身份证号
  store.isCheck = false;
  store.imagePreview = [];//查看大图数组
  store.upLoadFront = true;//是否调用相机
  store.upLoadReserve = true;//是否调用相机
  // store.worker_id = '';
  store.idCardImage = '';//身份证照片正面地址
  store.idCardImage2 = '';//身份证照片反面地址
  store.whiteDatsName ='';


  //点击下一步
  method.nextOne = function () {
    if(method.idNumFun()) {
      return false;
    }
    store.form = {
      idCardNO:store.idNum,
      workerId:store.worker_id,
      idCardImage:store.idCardImage,
      idCardImage2:store.idCardImage2,
      isCheck:store.isCheck
    };
    var errorconf = {
      "idCardNO": {
        "required": true,
        "required_tip": "身份证号码不能为空"
      },
      "idCardImage": {
        "required": true,
        "required_tip": "请上传身份证正面照"
      },
      "idCardImage2": {
        "required": true,
        "required_tip": "请上传身份证反面照"
      },
      "isCheck": {
        "required": true,
        "required_tip": "请勾选"+store.whiteDatsName+"协议"
      }
    };
    var SubmitOk = formError.createErrorTip.call(store.vm, store.form, errorconf);
    if (!SubmitOk) {
      console.log('111111')
      return false;
    }
      console.log('222222')
    // store.isNext = true;
    lstore.set_item('form',store.form);
    store.vm.$router.push({path :'/openNotes'})

  };
  method.viewRegister = function () {
    store.vm.$router.push({path : "/argremment"})
  };

  //获取原生用户信息
    method.app = function () {
      let hander = setInterval(function() {
        if(!window.window.WebViewJavascriptBridge) {
          return
        }
        clearInterval(hander);
        core.$app('get_user_info',"获取用户信息").then((res) => {
            store.userName = JSON.parse(res).name;
            store.worker_id = JSON.parse(res).user_id;
            // store.vm.$store.dispatch("INFO_FN_ACT",res);
        });
        core.$app('title_info_control',store.title_info).then(function (res) {
        });

      },0)
    };
    //身份证正面
    method.front = function () {

          core.$app('take_image','{"cutout":{"width":420,"height":420},"imageCount":1}').then((res) => {
          res=JSON.parse(res);
          store.idCardImage =res[0];
          store.upLoadFront = 0;
        })
    };
    //身份证反面
    method.reverse = function () {
        core.$app('take_image','{"cutout":{"width":420,"height":420},"imageCount":1}').then((res) => {
          console.log(res);
          res=JSON.parse(res);
          store.idCardImage2 = res[0];
          store.upLoadReserve = 0;

        })
    };
    //查看看大图
    method.frontTrue =  function (flag) {
        core.$app('take_image','{"cutout":{"width":420,"height":280},"imageCount":1}').then((res) => {
          console.log(res);
          res=JSON.parse(res);
          if(flag === "front") {
                store.idCardImage = res[0];
                store.upLoadFront =0;
          } else {
                store.idCardImage2 = res[0];
                 store.upLoadReserve = 0;
          };
        });
    };
    method.idNumFun = function () {
      let patt = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            if(!patt.test(store.idNum)){
            // store.vm.$toast("请输入正确的身份证号~","center");
            Toast({
                message: '请输入正确的身份证号~',
                position: 'center',
                duration: 1500,
            });
            return  true;
          };
          },
    method.reverseTrue = function () {
          if (store.idNum && store.idCardImage && store.idCardImage2 && store.isCheck) {
              store.isNext = true;
          } else {
              store.isNext = false;
          }
      };
    export default {
        name: "registerBt",
        data(){
          return store;
        },
        methods:method,
        watch : {
            isCheck       : method.reverseTrue,
            idNum         :  method.reverseTrue,
            idCardImage   :  method.reverseTrue,
            idCardImage2  :  method.reverseTrue,
        },
        mounted(){
      store.whiteDatsName =this.$store.state.AO_WHITE_TEXT.AO_WHITE_BAR_DATA;

      store.title_info = {
          "title":"开通" + store.whiteDatsName,
          "actionRight":{
            "actionIcon":"",
            "actionText":"",
            "actionTextColor":"#333333"//ios不传可能闪退
          },
          "bgColor":"#ffffff"
        };
          method.app();
          store.vm = this;
        }
    }
</script>

<style slot-scope>
.argremment-bottom {
  text-align: center;
}
.warp {
width: 100%;
height: auto;
position: relative;
box-sizing: border-box;
overflow: auto;
z-index:2;
}
.pfx {
  position: fixed;
  bottom:0;
  left: 0;
  z-index: auto;
  width: 100%;
  height: 4.5rem;
}
.pfx-top {
  position: fixed;
  bottom:0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 4.5rem;
}

</style>
