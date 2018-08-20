<template>
  <div class="w100 mt5 fz17 tc">
    <p style="line-height: 2.4rem;">预约成功，工友会尽快与您取得联系<br>请确保手机畅通</p>

    <div class="img-box pa5">
      <img src="../../../assets/images/icon_erweima.png" alt="">
    </div>
    <p style="line-height: 2.4rem;padding-bottom: 4.5rem;">
      长按识别二维码，关注住建鸟微信号<br>及时查看订单详情
    </p>
    <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.housingbirdsrshb" class="pf g-btn g-btn-on w100">下载住建鸟业主端</a>
  </div>
</template>

<script>
  import page from '../../page'
  var method = {};
  var store = {};
    export default {
        name: "orderSuccess",
        data(){
          return store;
        },
        methods:method,
        mounted(){
          page.title("预约工友");
        }
    }
</script>

<style scoped>

</style>
