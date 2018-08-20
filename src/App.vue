<template>
  <div id="app" class="h100" :class="{borderT : !this.$store.state.INFO_FN.EGGS_ROUTER}" v-cloak>
    <router-view ></router-view>
    <!--<div>app</div>-->
  </div>
</template>
<script>

  import core from './core/jsbridge/core'
  import api from './services/api'
  export default {
    name: 'app',
    watch:{
      $route(){
        document.body.classList.remove('custom-van')
      }
    },
    data() {
      return {

      }
    },
    created () {
    var that = this;
    api.textConfig().then(function (res) {
          that.$store.commit('AO_WHITE_BAR_DATA_MUT',res.result.name);
      });
    },
  }
</script>

<style lang="scss">

.borderT{
  border-top: 1px solid #ececec;
}
[v-cloak] {
  display: none !important;
}
  @import "assets/scss/style.scss";
</style>
