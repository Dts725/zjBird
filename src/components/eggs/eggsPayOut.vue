<template>
    <div class="w100 h100">
        <div class="pd bg-white">
            <div class="egg-details flex-clounm-ajc w100">
            <p class="fz30" v-if='details.eggNum.toString().length<=2'>-{{details.eggNum}}</p>
            <p class="fz30" v-else>-{{details.eggNum.toString().substr(0,details.eggNum.toString().length-2)}}<span class="fz25">{{details.eggNum.toString().substr(-2)}}</span></p>
            <p style="margin-top:1.5rem;color:rgba(153, 153, 153, 1);" class="fz15">支出</p>
        </div>
        <!-- 订单编号 -->
        <div class="flex-space-between egg-details-order pd8">
            <p class="fz14">订单编号</p>
            <p class="fz14 text-justify" @click="toAppOrder(details.orderId,details.workstatus)">{{details.orderId}}<span class="icon-arrow"></span></p>
        </div>
        <!-- 只出现请显示 -->
        <div class="">
            <ul class="flex-clounm-spac-between egg-pay-info">
                <li class="flex-space-between">
                   <span class="fz14 fc1">支出时间</span>
                   <span class="fz14 fc2 text-justify">{{details.date}}</span>
                </li>
                <li class="flex-space-between">
                    <span class="fz14 fc1">支出说明</span>
                    <span class="fz14 fc2 text-justify">{{details.demo}}</span>
                </li>
            </ul>
        </div>
        </div>
    </div>
</template>

<script>
import core from "../../core/jsbridge/core";
import api from "../../services/api";

export default {
    name: "eggsPayOut",
    data() {
        return {
            title_info: {
                title: "鸟蛋支出详情",
                actionRight: {
                    actionIcon: "",
                    actionText: "",
                    actionTextColor: "#ff9d00" //ios不传可能闪退
                },
                bgColor: "#ffffff"
            },
            details: {}
        };
    },
    created() {
        this.getInit();
        let hander = setInterval(() => {
            if (!window.WebViewJavascriptBridge) {
                return;
            } else {
                clearInterval(hander);
                core
                    .$app("title_info_control", this.title_info)
                    .then(function(res) {});
            }
        });
    },
    methods: {
        //跳转原声顶订单信息
        toAppOrder(order_id, workstatus) {
            var toApp = {
                orderId: order_id,
                orderStatus: workstatus
            };
            core.$app("go_order_detail", toApp).then(function(res) {});
        },

        //获取初始数据
        getInit() {
            let data = {
                bpDetailid: this.$route.params.bpDetailId
            };
            api.getBirdeggDetails(data).then(res => {
                this.details = res.result;
            });
        }
    }
};
</script>

<style scoped>
.container {
    border-top: 1px solid #ccc;
}
.fc1 {
    color: rgba(153, 153, 153, 1);
}
.fc2 {
    color: rgba(51, 51, 51, 1);
}
.pd {
    padding: 0 0.9rem;
}
.pd8 {
    padding-right: 8px;
}
.icon-arrow,
.icon-arrow-s {
    width: 9px;
    height: 9px;
    background-color: transparent;
    left: 4.5px;
}
.text-justify {
    text-align: justify;
}
</style>
