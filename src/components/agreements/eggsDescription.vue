<template>
  <div class="warp w100 h100 fz15 bg-white">

    <p> 1、住建鸟工友在充值鸟蛋后自动成为为住建鸟工友端会员。</p>

    <p> 2、住建鸟鸟蛋会员专享获取本人邀请新工友补贴提成的特权。</p>

    <p> 3、住建鸟鸟蛋会员专享鸟蛋抵用购物金额的权限。</p>
  
    <p>4、住建鸟鸟蛋会员尊享专属抵用的权益。</p>

    <p> 5、住建鸟鸟蛋会员专享线下实物领取权益。</p>

    <p>7、住建鸟鸟蛋会员专享充值鸟蛋增值权益。</p>

  </div>
</template>

<script>
  import core from '../../core/jsbridge/core'

export default {
    name: "eggsDescription",
    data () {
        return {
            title_info : null
        }
    },
    created() {
        this.title_info =  {
                title: "权益说明",
                actionRight: {
                    actionIcon: "",
                    actionText: "",
                    actionTextColor: "#ff9d00" //ios不传可能闪退
                },
                bgColor: "#ffffff"
            };
           let hander = setInterval(() => {
            if (!window.WebViewJavascriptBridge) {
              return
            }
            else {
              clearInterval(hander)
           console.log(this.title_info)
            core.$app('title_info_control', this.title_info).then(function (res) {
            });
             }
          }, 10);
    }
};
</script>

<style  scoped>
.warp {
    padding: 20px 10px;
}
.warp p {
    line-height: 25px;
}
</style>
