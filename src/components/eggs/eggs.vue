<template>
    <div v-cloak>
        <tops :is-show="flag" :eggs-number="eggNum">
            <div slot="topRight1" class="available" @click="available()"></div>
            <div slot="topRight2" class="available" @click="available()"></div>
            <div slot="topRight3" class="available" @click="available()"></div>
        </tops>

        <div>
            <div v-if ='imgIsShow' class="w100 flex-clounm-ajc egg-pay-zero">
                <img src="../../assets/images/eggs/zu.png" alt="">
                <p class="fz15 fc1">还没有鸟蛋收支情况~</p>
                <!-- <p v-if="noMoreBotter"  @click="loadMore()" class=" fz14" style="margin-top: 10px;color:#02AF67;">点击加载更多~</p> -->
            </div>

            <div  v-if="!imgIsShow"  v-for="i in noLists" :key="i.id">


            <div v-if="!imgIsShow" class="pa11 egg-lis-top ">
                <p class="fz15" v-if="this.dateCurrent">本月</p>
                <p class="fz15" v-else>{{i.month.substr(-1)}}月</p>
                <p class="fz14 fc1">支出 <span class="fc1">{{i.data.outcome}}</span> 个收入<span class="fc1">{{i.data.income}}个</span></p>
            </div>
            <div v-if="!imgIsShow" class="egg-list-div">
                <ul>
                    <li class="flex-space-between bg-white egg-list-li" v-for="item in i.arr" :key="item.index" @click="payDetails(item.type,item.bpDetailid)">


                        <div class="flex-clounm-spac-between  h100 pad16">
                            <p v-show ='item.type ===2' class="fz15">支出</p>
                            <p v-show ='item.type ===1' class="fz15">收入</p>
                            <p class="fz13 fc1">{{item.dataCreateTime}}</p>
                        </div>
                        <div>
                            <p class="fz25"  v-show ='item.type ===2 && String(item.eggNum).length >2'>-{{String(item.eggNum).substr(0,String(item.eggNum).length-2)}}<span class="fz14">{{String(item.eggNum).substr(-2)}}</span><span class="fz13 fc1">个</span></p>
                            <p class="fz25"  v-show ='item.type ===2 && String(item.eggNum).length<=2'>-{{item.eggNum}} <span class="fz13 fc1">个</span></p>
                            <p class="fz25"  v-show ='item.type ==1  && String(item.eggNum).length >2'>+{{String(item.eggNum).substr(0,String(item.eggNum).length-2)}}<span class="fz14">{{String(item.eggNum).substr(-2)}}</span><span class="fz13 fc1">个</span></p>
                            <p class="fz25"  v-show ='item.type ==1  && String(item.eggNum).length <=2'>+{{item.eggNum}} <span class="fz13 fc1">个</span></p>
                        </div>
                    </li>
                    <!-- <li class="egg-bottom-more pr" v-if ="axiosTrue">
                        <p v-show ='noMore && !imgIsShow' @click="loadMore()" class=" fz14">点击加载更多~</p>
                        <p v-show ='!noMore && !imgIsShow' class="fz14 fc1">没有更多内容了~</p>
                        <img v-show ='!noMore && !imgIsShow' src="../../assets/images/eggs/noeMany.png" alt="">
                    </li> -->


                </ul>



            </div>

            </div>
              <div class="egg-bottom-more pr">
                        <p  v-show="noMoreBotter" @click="loadMore()" class="fz14">点击加载更多~</p>
                        <p v-show ='!imgIsShow && !noMoreBotter' class="fz14 fc1">没有更多内容了~</p>
                        <img v-show ='!imgIsShow && !noMoreBotter' src="../../assets/images/eggs/noeMany.png" alt="">
              </div>
            </div>
        </div>


</template>
<script>
import tops from "./top";
import core from "../../core/jsbridge/core";
import api from "../../services/api";
// import { List } from "vant";

export default {
  name: "eggs",

  components: {
    tops
  },

  data() {
    return {
      dateCurrent: false, //当前月月份时间
      noMoreBotter: 1, //是否到底
      firstFlag: 1, //标记首次进入
      axiosTrue: false,
      nomany: 0, //是否加载完毕
      bpDetailId: 0, //数据库查询ID
      imgIsShow: 1, //图片是否显示
      noMore: 1,
      userType: 1, //
      availableUrl: "", //权益跳转
      queryNum: 10, //查询条数
      date: "2018-07-12", //查询日期
      userType: 0, //用户类型
      flag: 0,
      workerID: null, //工友ID
      ulisShow: 1,
      isflag: 1, //标记支出 收入
      title_info: null,
      eggNum: 0,
      datas: {
        out: 0,
        in: 0
      },
      lists: [],
      noLists: []
    };
  },
  created() {
    this.getDate();
    let hander = setInterval(() => {
      if (!window.WebViewJavascriptBridge) {
        return;
      } else {
        clearInterval(hander);
        core.$app("get_user_info", "info").then(res => {
          let worker_info = JSON.parse(res);
          this.$store.commit("INFO_FN_MUT", worker_info);
          this.workerID = worker_info.user_id;
          // this.workerID = 14763;
          // this.userType = worker_info.
          // //是否会员

          this.getGrade();
          //             //鸟蛋信息
          this.getBirdegg();
          //             //获取信息列表
          this.getBirdeggList();
        });
      }
    }, 0);
  },
  mounted() {

    this.$store.commit("EGGS_ROUTER_MUT", true);
  },
  watch: {
    noLists: function() {
      if (this.noLists.length !== 0) {
        this.imgIsShow = 0;
      }
    },
    deep: true
  },
  methods: {
    //点击加载更多
    loadMore() {
      if (this.noMore) {
        this.bpDetailId = 0;
        let tarr = [];
        let arr = this.date.split("-");
        if (arr[1] != 1) {
          tarr = [arr[0], arr[1] - 1];
        } else {
          tarr = [arr[0] - 1, 12];
        }
        this.date = tarr.join("-");
        this.dateCurrent = false;
        if (this.date === "2018-6") {
          this.noMoreBotter = 0;
        }
      } else {
        let arr = this.noLists[this.noLists.length - 1].arr;
        console.log("88888888");

        this.bpDetailId = arr[arr.length - 1].bpDetailid;
        console.log(this.bpDetailId);

        console.log("88888888");
      }

      this.getBirdeggList();


    },

    //获取工友会员等级
    getGrade() {
      let data = {
        userId: this.workerID
      };
      api.getGrade(data).then(res => {
        if (res.result.isMember) {
          switch (res.result.memberGrade) {
            case 1:
              this.flag = 1;
              this.title_info = {
                title: "VIP鸟蛋",
                actionRight: {
                  actionIcon: "",
                  actionText: "",
                  actionTextColor: "#ff9d00" //ios不传可能闪退
                },
                bgColor: "#FFCA00"
              };
              break;
            case 2:
              this.flag = 2;
              this.title_info = {
                title: "VIP鸟蛋",
                actionRight: {
                  actionIcon: "",
                  actionText: "",
                  actionTextColor: "#ff9d00" //ios不传可能闪退
                },
                bgColor: "#E7D2A5"
              };
              break;
            case 3:
              this.flag = 3;
              this.title_info = {
                title: "VIP鸟蛋",
                actionRight: {
                  actionIcon: "",
                  actionText: "",
                  actionTextColor: "#ffffff" //ios不传可能闪退
                },
                birdTheme: true,
                bgColor: "#211D1E"
              };
              break;
            default:
              this.flag = 0;
              this.title_info = {
                title: "VIP鸟蛋",
                actionRight: {
                  actionIcon: "",
                  actionText: "",
                  actionTextColor: "#ff9d00" //ios不传可能闪退
                },
                bgColor: "#E7D2A5"
              };
          }
          core
            .$app("title_info_control", this.title_info)
            .then(function(res) {});
        }
      });
    },

    // 获取鸟蛋信息
    getBirdegg() {
      let data = {
        userId: this.workerID
      };
      api.getBirdegg(data).then(res => {
        this.eggNum = res.result;
        console.log(this.eggNum);
      });
    },

    //获取当前月份信息
    getDate() {
      let myDate = new Date();
      let year = myDate.getFullYear(),
        month = myDate.getMonth(),
        day = myDate.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 9) {
        month = "0" + (month + 1);
      }
      this.date = year + "-" + month;
      this.dateCurrent = true;
    },

    getBirdeggList() {
      // this.noMore = 1;
      let data = {
        userType: this.userType,
        userId: this.workerID,
        date: this.date,
        // date: '2018-7',
        bpDetailid: this.bpDetailId,
        queryNum: this.queryNum
      };
      console.log(data);
      api.getBirdeggList(data).then(res => {
        this.lists = this.$store.state.egg;
        this.axiosTrue = true;
        if (res.result.eggPaymentResponse.length) {
          var obj = {
            month: this.date,
            data: res.result,
            arr: res.result.eggPaymentResponse
          };

          if (this.noLists.length) {
            if (obj.month === this.noLists[this.noLists.length - 1].month) {


              this.noLists[this.noLists.length - 1].arr = this.noLists[
                this.noLists.length - 1
              ].arr.concat(res.result.eggPaymentResponse);
            } else {
              this.noLists.push(obj);
            }
          } else {
            this.noLists.push(obj);
          }

          this.imgIsShow = 0;
          this.noMore = 0;
          // console.log(res.result.eggPaymentResponse);
          // console.log(data);
        } else {
          // console.log(data);
          this.noMore = 1;
        }
      });
    },

    //权益跳转
    available() {
      console.log("99999");
      this.$router.push({ path: "/eggsDescription" });
    },

    //点击查看详情
    payDetails(type, id) {
      if (type === 1) {
        this.$router.push({
          name: "eggsPayDetails",
          params: { bpDetailId: id }
        });
      } else {
        this.$router.push({
          name: "eggsPayOut",
          params: { bpDetailId: id }
        });
      }
    }
  },
  beforeDestroy() {
    this.noMoreBotter = 1;
    this.$store.commit("EGGS_ROUTER_MUT", false);
  }
};
</script>
<style scoped>
.pad16 {
  padding: 1.6rem 0;
}
.fc1 {
  color: rgba(153, 153, 153, 1);
}
.available {
  width: 15vh;
  height: 8vh;
  position: absolute;
  top: 1vh;
  right: 1vh;
}
.footer-more {
  height: 100px;
  background-color: red;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
}
</style>
