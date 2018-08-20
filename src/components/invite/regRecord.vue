<template>
    <div class="h100 w100 record-body">
        <div v-if="missMoneys.code === 200">
            <p class="title-bar pft ">已错过<span class="font-color">¥{{missMoneys.result.miss_mony}}</span>邀请补贴, 联系服务商, 获取邀请补贴</p>
        </div>
        <div id="topRecord" ref="topRecord">
            <img  src="../../assets/images/img/invite/oldNew.png" alt="">
        </div>
        <div class="invite-info-parent" id="dhWarp">
            <ul class="flex-space-between invite-info" >
                <li class="bg-white flex-clounm-spac-between">
                    <div class="flex-start">
                        <img src="../../assets/images/img/invite/invitePend.png" alt="">
                        <span class="invite-info-color fz12">已邀工友</span>
                    </div>
                    <div>
                        <span class="fz17 font-color">{{inviteMoney.sum}}</span>
                        <span class="invite-info-color fz10">人</span>
                    </div>
                </li>
                <li class="bg-white flex flex-column flex-clounm-spac-between">
                    <div class="flex-start">
                        <img src="../../assets/images/img/invite/mony.png" alt="">
                        <span class="invite-info-color fz12">邀请红包</span>
                    </div>
                    <div>
                        <span class="fz17 font-color">{{inviteMoney.red}}</span>
                        <span class="invite-info-color fz10">元</span>
                    </div>
                </li>
                <li class="bg-white flex-clounm-spac-between">
                    <div class="flex-start">
                        <img src="../../assets/images/img/invite/bu.png" alt="">
                        <span class="invite-info-color fz12">邀请补贴</span>
                    </div>
                    <div>
                        <span class="fz16 font-color">{{inviteMoney.profile}}</span>
                        <span class="invite-info-color fz10 font-color">元</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="record-count-info" >
            <div class="relactive" id="imgHeight">
            <div class="pr title-div">
            <p class="fz15 title-bar ">您有<span class="font-color fz18">{{invitCount}}</span>次抽奖机会</p>
            <img id="rowImgRight" src="../../../static/img/row1.png" alt="">
            </div>
            <p class="fz12 font-color prize-active" @click="prizeActive()">去抽奖&nbsp;</p>
            <ul class="flex-ajc fz13 lin35" style="border-bottom:1px solid rgba(238, 228, 218, 1)">
                <li class="w20 tac invite-info-color"></li>
                <li class="w20  invite-info-color ">工 友</li>
                <li class="w20 tac invite-info-color">状 态</li>
                <li class="w20 tac invite-info-color " >邀请红包</li>
                <li class="w20 tac invite-info-color ">邀请补贴</li>
            </ul>
            </div>
        <div class="record-scroll h100" :style="{height : fullHeight}" id="bottomTop">
            <!-- <div v-if='true'> -->
                
            <div  style="overflow:hidden;">
                <ul v-if='recordData.length' class="w100 flex-ajc  fz13 pr" v-for="item in recordData" :key="item.id">
                    <li class="w20 h100 flex-ajc  recored-count-padding-img  "><img style="width:3.5rem;height:3.5rem;" class=" border-radius-100" :src="item.photo ? item.photo : imgDmo" alt=""></li>
                    <li class="w20 h100 flex-clounm-spac-between fontColor02 recored-count-padding ">
                        <p class="fontColor02 " style="overflow:hidden;text-overflow:ellipsis; white-space:nowrap;">{{item.name ? item.name : '未命名'}}</p>
                        <p class="fz11 fontColor02">{{String(item.mobile) |tel}}</p>
                    </li>
                    <li class="w20 h100 flex-clounm-start recored-count-padding" style="text-indent : 1.5px;"><p :class="{fontColor01 : item.rzst === '未通过',fontColor02 : item.rzst !== '未通过'}">{{item.rzst}}</p></li>
                    <li class="w20 h100 flex-clounm-start recored-count-padding" ><p v-if="item.invitereds" class="fontColor01">{{item.invitereds}}元</p></li>
                    <li class="w20 h100 flex-clounm-spac-center recored-count-padding  padding-right" >
                        <p  v-if="item.profile" class="fontColor01">{{item.profile}}元</p>
                        <P class="fz11 fontColor02" v-if="(item.status === -1) && item.profile">已错过</P>
                    </li>
                    <div class="w100 li-border-bottom"></div>
                </ul>
                <div v-show="!recordData.length" class="first w100">
                <p class="fz13">你还没有邀请记录噢 ~</p>
                <div></div>
            </div>
            </div>

        </div>
        </div>
        <div class="w100" @click="smallVault()">
            <p class="fz17 w100 flex-ajc record-bottom">去小金库查看详情</p>
        </div>
    </div>
</template>
<script>
import core from "../../core/jsbridge/core";
import api from "../../services/api";

export default {
    data() {
        return {
            img: require("../../../static/img/row1.png"),
            imgDmo:
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCADhAOEDASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAIDBAUBBgf/xAAuEAEAAgECBQEHBAMBAAAAAAAAAQIDBBEFEiExQVEGEyJhgZGxMkJSoSNicdH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/VgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmYrEzPaGTJlnJPpHoC6+orXpX4lU57z2mI/4rAS95f+c/cjLeP3SiAurqLR+qN19b1vG9ZYntbTWd4naQbRDHkjJHpMd4TAAAAAAAAAAAAAAAAAAABHJbkpM/YFGfJzW5Y7QqAAAE8eK+a/LjrvP4aJ4bmiu8XpM+jVoKRXS1tHe/WXw3HPajiWbiebFpNRbTYMN5pWMcRvbadpmZn5+AfS3pbHeaXrNbR3h453A+MZ+L6LJXV7W1GltH+SI256W323j1iYdEHtbTW28d2yl4vXeGJDPrqcPwTqcu/uq2rF9vETO2/0B0QiYtETExMT1iYLWisb2mIj5gDPbW44nasTb+ksOonNPTHMRHedwXAAAAAAAAAABzRzcvkAAAUam3WK+nVfM7RvLFe3NabeoPAAAAbNFq64q+6yTtXfetvRweM+x8avW5NZodbhxVzW5r0y9onzMTHr6OkbR6AycM4Zh4VpbYceSc2TJbmy5ZjbmnxER4iGsAHO9oZ24HqPnyx/cOjETM7R1UcT4Vl4loJ01clcXNetpmY36QDn+yfFve4J4dnt8eKN8Uz5r6fT8f8AHTzZrZbbzO1Y7R6OTi9kNRpctM+m4lFcuOd6zOLp+eztZK+525cHx+b2nmiJ+Uf+gomsxtv0367Olhp7vFWvnbqyYMF8mTnvE7b7zM95bgAAAAAAAAAAV5670i0d6oY9R4v918xvExPlitWa2ms+AbYmJjeJ3JmI6yxRMx2mYJmZ7zMgtzZotHLXt5lSAAAAAAABETM7R3GjT4/3z9ATxYoxx/t5lMAAAAAAAAAAAAAAAFWfHzV5o7x3WgMItzYuSd4/TP8ASoAAAAAAAAEsdOe8R92yI2jaEMWPkr17z3TAAAAAAAAAAAAAAAAAAAmImNp7M2XDNOsda/hpAYRpvgrbrXpKm2K9e8fWAQAACIme0brK4L28bR8wVtOHDy/Fbv4j0SpirTr3n1TAAAAAAAAAAAAAAAAAAAAAAAAB5Naz3iJ+hyV/jH2egG23YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q==",
            fullHeight: 0, //计算高度
            workerID: 0,
            missMoneys: 0, //错过金额
            invitCount: 0, //抽奖次数
            inviteMoney: {
                sum: "0",
                red: "0.00",
                profile: "0.00"
            }, //抽奖次数title
            recordData: [],
            title_info: {
                title: "邀请记录", //邀请记录
                actionRight: {
                    actionIcon: "",
                    actionText: "活动说明",
                    actionTextColor: "#999999" //ios不传可能闪退
                },
                bgColor: "#ffffff"
            }
        };
    },
    created() {
        this.workerID = {
            workerid: this.$store.state.INFO_FN.INFO.user_id
            // workerid : 14581,
        };
        (this.workerId = {
            workerId: this.$store.state.INFO_FN.INFO.user_id
        }),
            core
                .$app("title_info_control", this.title_info)
                .then(function(res) {});
        core.$reg("title_right_click", this.clickRight).then(function(res) {});
        this.lotteryCount();
        this.getRecordTitle();
        this.getInviteRecordCount();
        this.missMoney();
    },

    mounted() {
        if (this.$store.state.HEIGHT.HEIGHT) {
            this.fullHeight = this.$store.state.HEIGHT.HEIGHT;
        } else {
        }
    },
    methods: {
        //计算高度
        computeds() {
            let dh = this.$refs.topRecord.offsetHeight;
            let dha = document.querySelector("#dhWarp").offsetHeight;
            let dhb = document.querySelector("#imgHeight").offsetHeight;
            let dhc = document.querySelector("#bottomTop").offsetTop;
            let fullHeight = document.querySelector("body").clientHeight;
            let max = fullHeight - dh - dhb - 108 + "px";
            let tal = this.recordData.length * 55;
            console.log(dh);
            console.log(dhb);
            console.log(max);
            console.log(fullHeight);

            if (max - tal > 55) {
                this.fullHeight = tal + 23 + "px";
                console.log(this.recordData);
                console.log(this.fullHeight + "if");
            } else {
                this.fullHeight = max;
                console.log(this.fullHeight + "else");
            }
            this.$store.commit("COMPUTED_HEIGHT", this.fullHeight);
            //获取原生数据
        },

        //活动说明页面跳转
        clickRight() {
            this.$router.push({ path: "/activeDes" });
        },

        //抽奖页面路由
        prizeActive() {
            this.$router.push({ path: "/turntable" });
        },

        //调用原生去往小金库
        smallVault() {
            core.$app("go2purses").then(res => {});
        },

        //抽奖title
        getRecordTitle() {
            api.inviteRecordTitle(this.workerID).then(res => {
                if (res.result.sum) {
                    this.inviteMoney = res.result;
                }
            });
        },

        //邀请记录
        getInviteRecordCount() {
            console.log(this.workerID);
            api.inviteRecordCount(this.workerID).then(res => {
                console.log(res);
                this.recordData = res.result;
                this.computeds();
            });
        },

        //获取抽奖次数
        lotteryCount() {
            api.geetLuckyDrowCount(this.workerId).then(res => {
                if (!res.result.count) {
                    this.invitCount = 0;
                } else {
                    this.invitCount = res.result.count;
                }
            });
        },

        //是否错过了金额
        missMoney() {
            api.missMoney(this.workerID).then(res => {
                this.missMoneys = res;
            });
        }
    },
    beforeDestroy() {
        console.log("最后执行");
        core.$reg("title_right_click", function() {}).then(function(res) {});
    }
};
</script>
<style scoped lang = 'scss'>
.font-color {
    color: rgba(253, 42, 0, 1);
}
.fontColor01 {
    color: rgba(255, 0, 0, 1);
}
.title-bar {
    line-height: 3.5rem;
    background: rgba(255, 245, 226, 1);
}
.prr {
    position: relative;
    top: 0;
    right: -20%;
}
.fontColor02 {
    color: rgba(118, 74, 35, 1);
}
#rowImgRight {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 14px;
    height: 17px;
    transform: translateY(9.3px);
}
.title-bar {
    padding: 0;
}
.flex-start {
    display: flex;
    justify-content: start;
    align-items: center;
    span {
        text-indent: 1rem;
    }
}
.fw6 {
    font-weight: 650;
}
.title-div {
    margin-bottom: 2rem;
}
.first {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -70%);
    & > p {
        padding: 0 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /* width: 18rem; */
        color: #aeaeae;
        text-align: center;
        background-color: rgba(255, 249, 238, 1);
    }
    & > div {
        height: 1px;
        position: relative;
        width: 80%;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        z-index: -1;
        background-color: #aeaeae;
    }
}
.flex-clounm-spac-center {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.computed-height {
    height: 200px;
}
</style>

