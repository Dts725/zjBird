import Vue from 'vue'
import Router from 'vue-router'

import test from '@/components/test'
import test2 from '@/components/test2'
import test3 from '@/components/test3'
// import whiteBar from '@/components/BT/whiteBar'
// import checkWhiteDetail from '@/components/BT/checkWhiteDetail'
// import payBackList from '@/components/BT/payBackList'
// import payBackDetail from '@/components/BT/payBackDetail'
// import checkPayBackList from '@/components/BT/checkPayBackList'
// import argremment from "@/components/BT/argremment"
// import registerBt from '@/components/regBt/registerBt'
// import openNotes from '@/components/regBt/openNotes'
// import lookBt from '@/components/regBt/lookBt'
// import redInstructions from '@/components/agreements/redInstructions'

// import turntable from '@/components/invite/turntable'
// import regRecord from '@/components/invite/regRecord'
// import activeDes from "@/components/invite/activeDes"
// import lottery from '@/components/wechat/invite/lottery'
// import regWorker from '@/components/wechat/invite/regWorker'
// import invite from '@/components/invite/invite'
// import workerDetail from '@/components/workerCard/workerDetail'

// import orderDetail from '@/components/wechat/orderWorker/orderDetail'
// import manyComments from '@/components/wechat/orderWorker/manyComments'
// import manyImgs from '@/components/wechat/orderWorker/manyImgs'

// import imgManagement from '@/components/workerCard/imgManagement'
// import choose from '@/components/workerCard/choose'
// import evaluate from '@/components/workerCard/evaluate'
// import evaluateChoose from '@/components/workerCard/evaluateChoose'
//eggs
// import eggs from '@/components/eggs/eggs'
// import eggsPayOut from '../components/eggs/eggsPayOut'
// import eggsPayDetails from '../components/eggs/eggsPayDetails'

// import paySetting from '../components/paySetting/paySetting'
// import payPassword from '../components/paySetting/payPassword'
// import verifyPay from '../components/paySetting/verifyPay'




Vue.use(Router)



 const routes = [{
      path: '/eggsPayOut',
      name: 'eggsPayOut',
      component: resolve => require(['@/components/eggs/eggsPayOut'], resolve)
    },
    {
      path: '/eggsPayDetails',
      name: 'eggsPayDetails',
      component: resolve => require(['../components/eggs/eggsPayDetails'], resolve)
    },
    {
      path: '/eggs',
      name: 'eggs',
      component: resolve => require(['@/components/eggs/eggs'], resolve)
    },
    {
      path: '/test3',
      name: 'test3',
      component: test3
    },
    {
      path: '/evaluateChoose',
      name: 'evaluateChoose',
      component: resolve => require(['@/components/workerCard/evaluateChoose'], resolve)
    },
    {
      path: '/evaluate',
      name: 'evaluteTemplate',
      component: resolve => require(['@/components/workerCard/evaluate'], resolve)
    },
    {
      path: '/choose',
      name: 'choose',
      component: resolve => require(['@/components/workerCard/choose'], resolve)
    },
    {
      path: '/imgManagement',
      name: 'imgManagement',
      component: resolve => require(['@/components/workerCard/imgManagement'], resolve)
    },
    {
      path: '/activeDes',
      name: 'activeDes',
      component: resolve => require(["@/components/invite/activeDes"], resolve)
    },
    {
      path: '/invite',
      name: 'invite',
      component: resolve => require(['@/components/invite/invite'], resolve)
    },
    {
      path: '/regRecord',
      name: 'regRecord',
      component: resolve => require(['@/components/invite/regRecord'], resolve)
    },
    {
      path: '/argremment',
      name: 'argremment',
      component: resolve => require(['@/components/BT/argremment'], resolve)
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/whiteBar',
      name: 'whiteBar',
      component: resolve => require(['@/components/BT/whiteBar'],resolve)
    },
    {
      path: '/checkWhiteDetail',
      name: 'checkWhiteDetail',
      component: resolve =>(['@/components/BT/checkWhiteDetail'],resolve)
    },
    {
      path: '/payBackList',
      name: 'payBackList',
      component: resolve => require(['@/components/BT/payBackList'], resolve)
    },
    {
      path: '/payBackDetail',
      name: 'payBackDetail',
      component: resolve => require(['@/components/BT/payBackDetail'], resolve)

    },
    {
      path: '/checkPayBackList',
      name: 'checkPayBackList',
      component: resolve => require(['@/components/BT/checkPayBackList'], resolve)
    },
    {
      path: '/registerBt',
      name: 'registerBt',
      component: resolve => require(['@/components/regBt/registerBt'], resolve)
    },
    {
      path: '/openNotes',
      name: 'openNotes',
      component: resolve => require(['@/components/regBt/openNotes'], resolve)
    },
    {
      path: '/lookBt',
      name: 'lookBt',
      component: resolve => require(['@/components/regBt/lookBt'], resolve)
    },
    {
      path: '/redInstructions',
      name: 'redInstructions',
      component: resolve => require(['@/components/agreements/redInstructions'], resolve)
    },
    {
      path: '/turntable',
      name: 'turntable',
      component: resolve => require(['@/components/invite/turntable'], resolve)
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: resolve => require(['@/components/wechat/invite/lottery'], resolve)
    },
    {
      path: '/regWorker',
      name: 'regWorker',
      component: resolve => require(['@/components/wechat/invite/regWorker'], resolve)
    },
    {
      path: '/workerDetail',
      name: 'workerDetail',
      component: resolve => require(['@/components/workerCard/workerDetail'], resolve)
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: resolve => require(['@/components/wechat/orderWorker/orderDetail'], resolve)
    },
    {
      path: '/manyComments',
      name: 'manyComments',
      component: resolve => require(['@/components/wechat/orderWorker/manyComments'], resolve)
    },
    {
      path: '/manyImgs',
      name: 'manyImgs',
      component: resolve => require(['@/components/wechat/orderWorker/manyImgs'], resolve)

    },
    {
      path: '/paySetting',
      name: 'paySetting',
      component: resolve => require(['../components/paySetting/paySetting'], resolve)
    },
    {
      path: '/payPassword',
      name: 'payPassword',
      component: resolve => require(['../components/paySetting/payPassword'], resolve)
    },
    {
      path: '/verifyPay',
      name: 'verifyPay',
      component: resolve => require(['../components/paySetting/verifyPay'], resolve)
    },
  ];
const router = new Router(routes);
export default router
