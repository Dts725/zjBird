<template>
    <div class="contains fz15">
        <p>1、工友邀请的每个新工友认证只可享受一次活动奖励，重复认证不重复获得奖励。同一好友认证不得重复参加活动，同一登录帐号，同一手机号，同一终端设备号同一支付账号同一IP或其他同理显示同一用户的情形，均视为同一用户。</p>
        <p>2、邀请的好友通过住建鸟认证后，老工友才能获得拉新抽奖机会一次。</p>
        <p>3、红包不影响参加其它优惠活动。</p>
        <p>4、禁止作假，住建鸟针对新用户进行防刷等其他反作弊手段监控，一旦发现违规行为将不计入奖励，并取消领取资格。</p>
        <p>5、本活动最终解释权归住建鸟所有。</p>

    </div>
</template>
<script>
import core from '../../core/jsbridge/core'
export default {
    name : 'activeDes',
    data () {
        return {
            title_info : {
                "title":"活动说明",
                "actionRight":{
                "actionIcon":"",
                "actionText":"",
                "actionTextColor":"#ff9d00"//ios不传可能闪退
                },
            "bgColor":"#ffffff"
            }
        }
    },
    mounted () {
        let hander = setInterval (() => {
            if (!window.WebViewJavascriptBridge) {
                return
            } else {
                clearInterval(hander);
            }
            core.$app('title_info_control', this.title_info).then(function (res) {
            });
        },0)
    }
    
}
</script>
<style scoped lang = 'scss'> 
    .contains {
        padding: 1.85rem 1.5rem;
        p {
            line-height: 25px;
        }
    }
</style>