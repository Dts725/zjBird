// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import store from './store/index'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import selectbox from './components/common/typeSelect/selectlist'

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

import VuePreview from 'vue-preview'
import {
  ToastMintui
} from 'mint-ui';


import * as VConsole from 'vconsole'
import 'vue2-animate/dist/vue2-animate.min.css';
import VueAMap from 'vue-amap';
import { lazyAMapApiLoaderInstance } from 'vue-amap';
// import image from './components/image'

// import Loading from './components/loadding'
// import hook from './tools/hook'
// import VueCookie from 'vue-cookie'

// import messagebox from './components/common/dialog'
// import Calendar from './components/common/calendar'



// import wcSwiper from 'wc-swiper'
// import 'wc-swiper/style.css'




import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
Vue.use(Slick);
Vue.use(VueAMap);
Vue.config.productionTip = false
// console.log = function () {};
Vue.use(MintUI)
Vue.use(Toast)
Vue.use(selectbox)
Vue.use(Vant);
Vue.use(VuePreview)
// Vue.use(image)



// VueAMap.initAMapApiLoader({
//   // 高德的key
//   key: '7ba5c511608e7c436fa1e75b5bcefab4',
//   // 插件集合
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 高德 sdk 版本，默认为 1.4.4
//   v: '1.4.9',
//   uiVersion: '1.0.11' // 版本号
// });


Vue.filter('times', function (val) {
  return String(val).slice(0, 10);
});

Vue.filter('tel', function (val) {
  return val.substr(0, 3) + "****" + val.substr(7);
});



new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
