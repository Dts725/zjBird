<template>
  <div class="container h100" style="overflow:auto;">
      <div class="lucky-wheel">
      <!-- <div class="lucky-title"></div> -->
      <div class="wheel-main">
        <div class="wheel-pointer-box">
          <div class="wheel-pointer" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
        </div>
        <!---->
        <div  class="pr wheel-bg-parent" style="overflow:hidden;">
          <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
        </div>
        </div>
      </div>

    </div>
    <div class="main">
      <div class="main-bg"></div>
      <div class="content flex-ajc">`
        <div class="lottery_ticket white"> 剩余 {{lottery_ticket.count}} 次抽奖机会</div>
      </div>
      <!-- 中奖列表展示 -->
      <div class="relative prize-warp">

        <span class="prize-content-title fw7">中奖记录</span>
        <div class="star-img">
          <img src="../../assets/images/img/fivee-star.png" alt="">
          <img src="../../assets/images/img/fivee-star.png" alt="">
        </div>
        <div class="prize-list-show-parent" >
            <div v-if="prize_record.length ===0" class="first w100">
                <p class="fz13">您还没有中奖记录呢 ~</p>
                <div></div>
            </div>
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill ='autoFill' :top-distance = '20'>
        <ul class="page-loadmore-list" :class="{uls : prize_record.length<4}">
           <li v-for="(item,index)  in prize_record" :key="index" class="flex-space-between fz13"><span class="fc17">{{item.timeStamp}}</span><span class="fc17">{{item.goods}}元</span></li>
        </ul>
      </mt-loadmore>
    </div>

      </div>
      </div>
    </div>
    <!-- 弹窗中奖 -->
    <div v-show="toast_control">
          <div class="toast toast-self" >
      <div class="toast-container relactive">
        <img src="../../assets/images/img/invite/prosit.png" class="toast-picture">
        <img src="../../assets/images/img/invite/redMony.png" class="toast-picture-center">
        <div class="close" @click="close_toast()"></div>
        <div class="toast-title">
          <p class="fz14 fw6">获得<span style="color:#e34320" class="fz17 fw6">{{money}}</span>现金红包,请到小金库查看</p>
        </div>
        <div class="toast-btn fz16">
          <div class="toast-cancel fw5 fz20"  @click="share()">炫耀一下</div>
        </div>
      </div>
    </div>
    <div class="toast-mask" ></div>
    <!-- <div class="toast-mask-wchart" v-show="toastControlWchart"  @click="isTostShow()"></div> -->
    <div class="toast-mask-between"></div>
    </div>


    <!-- 没有抽奖机会弹窗 -->
    <div v-show="inviteFriend">
          <div class="toast toast-self" >
      <div class="toast-container relactive">
        <img src="../../assets/images/img/invite/noprosit.png" class="toast-picture">
        <img src="../../assets/images/img/invite/noredMony.png" class="toast-picture-center">
        <div class="close" @click="close_toast_invite()"></div>
        <div class="toast-title">
          <p class="fz14 fw6 "  style="padding: 0 14px;">没有可用抽奖机会，邀请好友认证成功
                    即可获得抽奖机会！</p>
        </div>
        <div class="toast-btn fz16">
          <div class="toast-cancel fw5 fz20"  @click="inviteShare()">邀请好友</div>
        </div>
      </div>
    </div>
    <div class="toast-mask" ></div>
    <!-- <div class="toast-mask-wchart" v-show="toastControlWchart"  @click="isTostShow()"></div> -->
    <!-- <div class="toast-mask-between"></div> -->
    </div>
  </div>
</template>
<script>
import core from "../../core/jsbridge/core";
import api from "../../services/api";
import wechat from "../../conf/api";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import { Loadmore } from "mint-ui";
export default {
  name: "turntable",
  data() {
    return {
      inviteFriend: 0,
      turnFlag: 0, // 点击抽奖 默认为否
      topFlag: 0, //是否下拉加载
      lodDownFlag: 0,
      closes: "",
      autoFill: false,
      wrapperHeight: 0,
      allLoaded: false,
      firstFlag: 1, //标记是否点击抽奖
      easejoy_bean: 0, //金豆
      lottery_ticket: {
        count: 0
      }, //抽奖次数
      money: "100元",
      mobile: "", //手机号
      toastControlWchart: false,
      workerID: null, //缓存worid
      title_info: {
        title: "邀请抽奖转盘",
        actionRight: {
          actionIcon: "",
          actionText: "",
          actionTextColor: "#ff9d00" //ios不传可能闪退
        },
        bgColor: "#ffffff"
      },
      prize_list: [
        {
          // icon: require("../../assets/images/img/bean_500.png"),
          count: 10,
          name: "38.88",
          isPrize: 1
        },
        {
          // icon: require("../../assets/images/img/point_ten.png"),
          count: 10,
          name: "5.88",
          isPrize: 1
        },
        {
          // icon: require("../../assets/images/img/point_five.png"),
          count: 5,
          name: "8.88",
          isPrize: 1
        },
        {
          // icon: require("../../assets/images/img/bean_one.png"),
          count: 10,
          name: "58.88",
          isPrize: 1
        },
        {
          // icon: require("../../assets/images/img/bean_500.png"), // 奖品图片
          count: 10, // 奖品数量
          name: "1.28", // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          // icon: require("../../assets/images/img/bean_five.png"),
          count: 5,
          name: "88.88",
          isPrize: 1
        }
      ], //奖品列表
      prize_record: [], //中奖记录
      toast_control: 0, //抽奖结果弹出框控制器
      hasPrize: false, //是否中奖
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度

      start_rotating_degree_pointer: 0, //指针初始旋转角度
      rotate_angle_pointer: 0, //指针将要旋转的度数
      rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
      click_flag: true, //是否可以旋转抽奖
      i: 0 //测试使用
    };
  },
  created() {
    let hander = setInterval(() => {
      if (!window.WebViewJavascriptBridge) {
        return;
      } else {
        clearInterval(hander);
        let title_info = {
          title: "邀请抽奖转盘", //邀请记录
          actionRight: {
            actionIcon: "",
            actionText: "",
            actionTextColor: "#999999" //ios不传可能闪退
          },
          bgColor: "#ffffff"
        };
        core.$app("title_info_control", title_info).then(function(res) {});
        core.$app("get_user_info", "info").then(res => {
          console.log(res);
          let worker_info = JSON.parse(res);

          //首次进入页面
          this.firstFlag = 1;
          this.mobile = worker_info.mobile;
          this.workerUserId = worker_info.user_id;
          this.workerID = {
            workerId: worker_info.user_id,
            page: 1
          };
          this.lotteryCount();
          this.getRecordList();
          this.init_prize_list();
        });
      }
    }, 0);
  },
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
    //注册apptitle
    core.$app("title_info_control", this.title_info).then(function(res) {});
  },
  beforeDestroy() {
    this.closes.close();
  },
  methods: {
    loadTop() {
      this.topFlag = 1;
      this.firstFlag = 0;
      this.allLoaded = false;
      this.workerID.page = 1;
      this.getRecordList();
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      }, 1500);
    },

    loadBottom() {
      this.topFlag = 0;
      this.workerID.page++;
      this.firstFlag = 0;
      this.lodDownFlag = 1;
      this.getRecordList();
      setTimeout(() => {
        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
    },

    isTostShow() {
      this.toastControlWchart = !this.toastControlWchart;
    },

    //微信分享
    inviteShare() {
      console.log("11111111111111111111111");
      let data = {
        shareUrl:
          wechat.wechat +
          "/#/regWorker?workerID=" +
          this.workerUserId +
          "&mobile=" +
          this.mobile,
        shareTitle:
          "【住建鸟】 千元购物礼包,水电,建材,全都有!我已经领了你也快来吧",
        shareDesc: "有活儿干, 有前途, 假一赔百 好保障!",
        shareIcon: "http://dist.zjbird.com/icon/red_packet.png"
      };
      console.log(data);
      core.$app("user_share", data).then(res => {
        console.log("949234229429349");
        this.inviteFriend = 0;
      });
    },

    //获取抽奖次数
    lotteryCount() {
      api.geetLuckyDrowCount(this.workerID).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.lottery_ticket = res.result;
        } else {
          this.lottery_ticket.count = 0;
          // this.inviteFriend = 1;
        }
      });
    },

    //微信分享
    share() {
      this.turnFlag = 0;
      this.toastControlWchart = false;
      this.toast_control = false;
      let data = {
        shareUrl:
          wechat.wechat +
          "/#/lottery?workerID=" +
          this.workerID.workerId +
          "&mobile=" +
          this.mobile +
          "&money=" +
          this.money +
          "&number=" +
          this.lottery_ticket.total,
        shareTitle:
          "【住建鸟】又拿了" +
          this.money +
          "元现金红包,我已经有" +
          this.lottery_ticket.total +
          "个兄弟加入了 你也快来吧!",
        shareDesc: "有活儿干, 有前途, 假一赔百 好保障!",
        shareIcon: "http://dist.zjbird.com/icon/red_packet.png"
      };
      core.$app("user_share", data).then(res => {
        this.toastControlWchart = false;
      });
      //调用成功关闭
    },

    //此方法为处理奖品数据
    init_prize_list(list) {},
    rotate_handle() {
      this.rotating();
    },

    //获取中奖纪录
    getRecordList() {
      api.luckList(this.workerID).then(res => {
        if (!res.result) {
          this.allLoaded = true;
          if (this.firstFlag) {
            return true;
          }
          this.closes = Toast("数据加载完毕");
          this.$refs.loadmore.onBottomLoaded();

          return true;
        }
        if (this.topFlag) {
          this.prize_record = [];
        }
        this.prize_record = this.prize_record.concat(res.result);
        console.log(this.prize_record);
      });
    },

    //点击抽奖
    rotating(index) {
      Indicator.close();
      if (this.turnFlag) {
        Toast("请稍等在点击就抽奖...");
        return false;
      }

          this.turnFlag = 1;


      // 获取抽奖次数
      api.doLuckyDraw(this.workerID).then(res => {
        this.lotteryCount();

        if (res.code !== 200) {
          Indicator.close();
          if (res.msg === "您的抽奖次数已用完") {
            this.inviteFriend = 1;
            this.turnFlag = 0;

          } else {
            this.closes = Toast(res.msg);
            this.turnFlag = 0;

          }
        }

        // 抽奖次数
        var random = 0; //从后台拿数据，0-5表示0-5当中的奖品！！！！！
        this.money = res.result.money;
        this.prize_list.forEach((el, index) => {
          if (el.name == this.money) {
            random = index;
            return false;
          }
        });

        // if (!this.click_flag) return;
        var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
        var during_time = 5; // 默认为1s
        // var random = Math.floor(Math.random() * 7);
        var result_index = index || random; // 最终要旋转到哪一块，对应prize_list的下标
        var result_angle = [60, 120, 180, 240, 300, 360]; //最终会旋转到下标的位置所需要的度数
        var rand_circle = 6; // 附加多转几圈，2-3
        // this.click_flag = false; // 旋转结束前，不允许再次触发
        if (type == 0) {
          // 转动盘子
          var rotate_angle =
            this.start_rotating_degree +
            rand_circle * 360 +
            result_angle[result_index] -
            this.start_rotating_degree % 360;
          this.start_rotating_degree = rotate_angle;
          this.rotate_angle = "rotate(" + rotate_angle + "deg)";
          // // //转动指针
          // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
          // this.start_rotating_degree_pointer =360*rand_circle;
          var that = this;
          // 旋转结束后，允许再次触发
          // if (this.turnFlag) {
          //   Toast("请稍等在点击就抽奖...");
          //   return false;
          // }
          setTimeout(function() {
            that.click_flag = true;
            that.game_over(this.i);
            that.prize_record = [];
            //中奖纪录
            that.getRecordList();
            this.turnFlag = 0;
          }, during_time * 1000 + 1500); // 延时，保证转盘转完
        } else {
          //
          this.turnFlag = 0;
        }
      });
    },

    game_over() {
      this.toast_control = true;
      this.hasPrize = this.prize_list[this.i].isPrize;
    },

    //关闭弹窗
    close_toast() {
        this.turnFlag = 0;
      this.flagCode = 0;
      this.toastControlWchart = false;
      this.toast_control = false;
    },

    //关闭邀请弹窗
    close_toast_invite() {
      this.inviteFriend = 0;
      this.flagCode = 0;
      this.toastControlWchart = false;
      this.toast_control = false;
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  background: url("../../../static/img/oldNew2.png") no-repeat;
  background-size: 100%;
  background-color: #ffde9a;
  width: 100%;
}
.lucky-wheel {
  padding-top: 4rem;
}

.wheel-main {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.wheel-bg {
  box-sizing: border-box;
  height: 33.1rem;
  width: 33.1rem;
  background: url("../../../static/img/draw_wheel.png") no-repeat center top;
  background-size: 100%;
  color: #fff;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: transform 3s ease;
}
.wheel-pointer-box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -60%);
  width: 8.5rem;
  height: 11rem;
}
.wheel-pointer {
  width: 8.4rem;
  height: 11rem;
  background: url("../../../static/img/draw_btn.png") no-repeat center top;
  background-size: 100%;
  transform-origin: center 60%;
}
.wheel-bg div {
  text-align: center;
}
.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}
.prize-list .prize-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.prize-list .prize-item:first-child {
  top: 0;
  left: 8.3125rem;
  transform: rotate(20deg);
}
.prize-list .prize-item:nth-child(2) {
  top: 2.8rem;
  left: 10.8rem;
  transform: rotate(67deg);
}
.prize-list .prize-item:nth-child(3) {
  top: 6.4rem;
  left: 10.6rem;
  transform: rotate(-250deg);
}
.prize-list .prize-item:nth-child(4) {
  top: 9rem;
  left: 8.2125rem;
  transform: rotate(-210deg);
}
.prize-list .prize-item:nth-child(5) {
  top: 9.2125rem;
  left: 4.4rem;
  transform: rotate(-160deg);
}
.prize-list .prize-item:nth-child(6) {
  top: 6.3875rem;
  left: 1.9rem;
  transform: rotate(-111deg);
}
.prize-list .prize-item:nth-child(7) {
  top: 2.8rem;
  left: 1.8125rem;
  transform: rotate(-69deg);
}
.prize-list .prize-item:nth-child(8) {
  top: 0;
  left: 4.5rem;
  transform: rotate(-20deg);
}
.prize-item {
  width: 5.875rem;
  height: 9rem;
}

.prize-pic img {
  width: 4.0625rem;
  height: 2.5rem;
  margin-top: 1.5625rem;
}
.prize-count {
  font-size: 0.875rem;
}
.prize-type {
  font-size: 0.75rem;
}
.bg-p {
  width: 100%;
  height: 2.95rem;
  background: rgb(252, 207, 133);
}
.content {
  padding: 2rem 0;
}

.tip {
  position: relative;
  margin: 2.5rem auto 0;
  width: 17.5rem;
  border: 1px solid #fbc27f;
}
.tip-title {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1rem;
  color: #fccc6e;
  background: rgb(243, 109, 86);
  padding: 0.3125rem 0.625rem;
}
.tip-content {
  padding: 1.5625rem 0.625rem;
  font-size: 0.875rem;
  color: #fff8c5;
  line-height: 1.5;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  /* background: url('../../assets/images/img/invite/组 155@2x.png') no-repeat; */
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast-mask-wchart {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  /* background: url('../../assets/images/img/invite/组 155@2x.png') no-repeat; */
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast-mask-between {
  position: fixed;
  top: 0;
  left: 0;
  background: url("../../../static/img/photo1.png") no-repeat top center;
  background-size: 100%;
  z-index: 10001;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -50%);
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.3125rem;
  background-color: #fff;
  width: 80%;
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.toast-picture {
  width: 16.1rem;
  height: 3.95rem;
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
}
.toast-picture-center {
  width: 50%;
  margin-bottom: 5rem;
  position: relative;
  top: 5.6rem;
  left: 50%;
  transform: translateX(-50%);
}
.toast-pictrue-change {
  position: absolute;
  top: -1.5rem;
  left: -1.375rem;
  width: 17.5rem;
  height: 3.125rem;
}
.toast-title {
  padding: 2.8125rem 0;
  font-size: 18px;
  text-align: center;
}
.toast-title > p {
  color: #764a23;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9375rem;
}
.toast-btn div {
  background-color: rgba(255, 88, 0, 1);

  box-shadow: 0px 4px 0px 0px rgba(233, 59, 0, 1);
  width: 12.5rem;
  height: 4rem;
  border-radius: 1.875rem;
  text-align: center;
  line-height: 4.4rem;
  color: #fff;
  margin-bottom: 1.6rem;
}
.close {
  color: #764a23;
  position: absolute;
  bottom: -8.5rem;
  right: 50%;
  width: 4rem;
  height: 4rem;
  background: url("../../assets/images/img/invite/fork.png") no-repeat center
    top;
  background-size: 100%;
  transform: translateX(50%);
}
.toast-cancel {
  width: 12.5rem;
}
.alert-body {
  background-color: rgba(239, 240, 240, 1);
  height: 16rem;
  position: fixed;
  bottom: 0;
  z-index: 10001;
  width: 100%;
  p {
    line-height: 4.4rem;
    text-align: center;
  }
  ul {
    li {
      width: 25%;
      img {
        width: 50%;
      }
    }
  }
}
.page-loadmore-list {
  padding: 0.75rem 1.5rem 0 1.95rem;
}
.first {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  & > p {
    padding: 0 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // width: 13rem;
    color: #aeaeae;
    text-align: center;
    background-color: #fff;
  }
  & > div {
    height: 1px;
    position: relative;
    width: 65%;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    background-color: #aeaeae;
  }
}
.uls {
  height: 9.1rem;
}
.fc17 {
  color: rgba(118, 74, 35, 1);
}
.toast-self {
  // width: 28.5rem;
  // height: 33.5rem;
}
.wheel-bg-parent {
  height: 33.6rem;
  z-index: 1;
}
</style>

