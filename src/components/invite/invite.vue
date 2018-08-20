<template>
    <div class="h100 bgc " style="overflow:hidden;">
        <div>
            <img src="../../assets/images/img/invite/oldNew1.png" alt="">
            <p class="flex-clounm-spac-between invite-count" @click="inviteRouter()"><span class="white fz14">邀请</span><span class="white fz14">记录</span></p>
        </div>
        <div class="invite-bottom">
            <p class="fz24 white"  @click="share()">立即邀请拿红包</p>
        </div>
    </div>
</template>
<script>
import core from '../../core/jsbridge/core'
import wechat from '../../conf/api'
export default {
    name : 'invite',
    data () {
        return {
            mobile : '',//手机号
            workerID : '',
            toastControlWchart : false,//弹窗显示
            title_info : {
                "title":"邀请领红包",
                "actionRight":{
                "actionIcon":"http://dist.zjbird.com/icon/icon_share.png",
                "actionText":"",
                "actionTextColor":"#ff9d00"//ios不传可能闪退
                },
            "bgColor":"#ffffff"
            }
        }
    },


    mounted () {
        //注册apptitle

        let hander = setInterval( () => {
           if (!window.WebViewJavascriptBridge) {
          return
        } else {
            clearInterval(hander);
            core.$app('title_info_control', this.title_info).then(function (res) {
            });
            core.$reg('title_right_click', this.share).then(function (res) {
            }) ;
            core.$app('get_user_info', 'info').then( res => {
                console.log(res);
            let worker_info = JSON.parse(res);
            this.$store.commit('INFO_FN_MUT',worker_info);
            this.mobile = this.$store.state.INFO_FN.INFO.mobile;
            this.workerID = this.$store.state.INFO_FN.INFO.user_id;
          });
          }
        },0);

    },
    methods : {
        //微信分享
        share () {

            this.toastControlWchart = !this.toastControlWchart;
            let data = {
            shareUrl:  wechat.wechat +"/#/regWorker?workerID="+ this.workerID+ '&mobile='+ this.mobile,
            shareTitle : "【住建鸟】 千元购物礼包,水电,建材,全都有!我已经领了你也快来吧",
            shareDesc  : "有活儿干, 有前途, 假一赔百 好保障!",
            shareIcon  : "http://dist.zjbird.com/icon/red_packet.png"
            };
            console.log(data);
            core.$app('user_share',data).then(res => {
            this.toastControlWchart = false;
            })

        },

        isTostShow () {
            this.toastControlWchart = !this.toastControlWchart;
        },

        inviteRouter () {
            this.$router.push({path : '/regRecord'})
        }

    }
}
</script>
<style scoped lang="scss">
.bgc {
    background:  rgba(255, 223, 156, 1);
}
.invite-bottom {
    height: 4.8rem;
    width: 22.5rem;
    position: absolute;
    left: 50%;
    bottom: 2.6rem;
    transform: translateX(-50%);
    p {
        line-height: 4.8rem;
        background: linear-gradient(rgba(252, 155, 12, 1),rgba(250, 94, 25, 1));
        text-align: center;
        border-radius:2.5rem;


    }
}
  .toast-mask-wchart {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    /* background: url('../../assets/images/img/invite/组 155@2x.png') no-repeat; */
    z-index: 10000;
    width: 100%;
    height: 100%
  }
    .alert-body {
    background-color: rgba(239, 240, 240, 1);
    height: 16rem;
    position: fixed;
    bottom: 0;
    z-index: 10001;
    width: 100%;
       p{
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
  .invite-count {
      box-sizing: border-box;
      width: 5.9rem;
      height: 4.7rem;
      padding: 0.75rem 1.05rem 0.7rem 1.95rem;
      border-top-left-radius:4rem;
      border-bottom-left-radius:4rem;
      text-align: center;
      background:#eb9b00;
      position: fixed;
      top:45%;
      right: 0;

  }
</style>
