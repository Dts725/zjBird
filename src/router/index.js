import Vue from 'vue'
import Router from 'vue-router'

import test from '@/components/test'
// import maptest from '@/components/maptest'
import test2 from '@/components/test2'
import test3 from '@/components/test3'
import verifyPhone from '@/components/common/verifyPhone'
import whiteBar from '@/components/BT/whiteBar'
import checkWhiteDetail from '@/components/BT/checkWhiteDetail'
import payBackList from '@/components/BT/payBackList'
import payBackDetail from '@/components/BT/payBackDetail'
import checkPayBackList from '@/components/BT/checkPayBackList'
import argremment from "@/components/BT/argremment"
import registerBt from '@/components/regBt/registerBt'
import openNotes from '@/components/regBt/openNotes'
import lookBt from '@/components/regBt/lookBt'
import redInstructions from '@/components/agreements/redInstructions'

import turntable from '@/components/invite/turntable'
import regRecord from '@/components/invite/regRecord'
import activeDes from "../components/invite/activeDes"
import lottery from '@/components/wechat/invite/lottery'
import regWorker from '@/components/wechat/invite/regWorker'
import invite from '@/components/invite/invite'
import workerDetail from '@/components/workerCard/workerDetail'

import orderDetail from '@/components/wechat/orderWorker/orderDetail'
import manyComments from '@/components/wechat/orderWorker/manyComments'
import manyImgs from '@/components/wechat/orderWorker/manyImgs'
import orderSuccess from '@/components/wechat/orderWorker/orderSuccess'

import imgManagement from '@/components/workerCard/imgManagement'
import choose from '@/components/workerCard/choose'
import evaluate from '@/components/workerCard/evaluate'
import evaluateChoose from '@/components/workerCard/evaluateChoose'
//eggs
import eggs from '@/components/eggs/eggs'
import eggsPayOut from '../components/eggs/eggsPayOut'
import eggsPayDetails from '../components/eggs/eggsPayDetails'
import eggsDescription from '../components/agreements/eggsDescription'

import paySetting from '../components/paySetting/paySetting'
import payPassword from '../components/paySetting/payPassword'
import verifyPay from '../components/paySetting/verifyPay'


//vote
import voteDetail from "../components/vote/voteDetail"
import vote from "../components/vote/vote"
import answer from "../components/vote/answer"
import answerOne from "../components/vote/answer/answerOne"
import answerTwo from "../components/vote/answer/answerTwo"
import answerThree from "../components/vote/answer/answerThree"
import answerFour from "../components/vote/answer/answerFour"



Vue.use(Router)

export default new Router({

  routes: [
    // {
    //   path : "/answer",
    //   component : "answer",
    //   name:"answer",
    //   children : [
    //     {
    //       path : "/answerOne",
    //       component : "answerOne",
    //       name : answerOne
    //     },
    //     {
    //       path : "/answerTwo",
    //       component : "answerTwo",
    //       name : answerTwo
    //     },
    //     {
    //       path : "/answerThree",
    //       component : "answerThree",
    //       name : answerThree
    //     },
    //     {
    //       path : "/answerFour",
    //       component : "answerFour",
    //       name : answerFour
    //     },
    //   ]
    // },
    {
      path: '/vote',
      name: 'vote',
      component: vote
    },
    {
      path: '/voteDetail',
      name: 'voteDetail',
      component: voteDetail
    },
    {
      path: '/eggsPayOut',
      name: 'eggsPayOut',
      component: eggsPayOut
    },
    {
      path: '/eggsPayDetails',
      name: 'eggsPayDetails',
      component: eggsPayDetails
    },

    {
      path: '/answer',
      name: 'answer',
      component: answer
    },
    {
      path: '/eggsDescription',
      name: 'eggsDescription',
      component: eggsDescription
    },
    {
      path: '/eggs',
      name: 'eggs',
      component: eggs
    },

    {
      path: '/test3',
      name: 'test3',
      component: test3
    },
    // {
    //   path: '/maptest',
    //   name: 'maptest',
    //   component: maptest
    // },
    {
      path: '/evaluateChoose',
      name: 'evaluateChoose',
      component: evaluateChoose
    },
    {
      path: '/evaluate',
      name: 'evaluteTemplate',
      component: evaluate
    },
    {
      path: '/choose',
      name: 'choose',
      component: choose
    },
    {
      path: '/imgManagement',
      name: 'imgManagement',
      component: imgManagement
    },
    {
      path: '/activeDes',
      name: 'activeDes',
      component: activeDes
    },
    {
      path: '/invite',
      name: 'invite',
      component: invite
    },
    {
      path: '/regRecord',
      name: 'regRecord',
      component: regRecord
    },
    {
      path: '/argremment',
      name: 'argremment',
      component: argremment
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
      component: whiteBar
    },
    {
      path: '/checkWhiteDetail',
      name: 'checkWhiteDetail',
      component: checkWhiteDetail
    },
    {
      path: '/payBackList',
      name: 'payBackList',
      component: payBackList
    },
    {
      path: '/payBackDetail',
      name: 'payBackDetail',
      component: payBackDetail
    },
    {
      path: '/checkPayBackList',
      name: 'checkPayBackList',
      component: checkPayBackList
    },
    {
      path: '/registerBt',
      name: 'registerBt',
      component: registerBt
    },
    {
      path: '/openNotes',
      name: 'openNotes',
      component: openNotes
    },
    {
      path: '/lookBt',
      name: 'lookBt',
      component: lookBt
    },
    {
      path: '/redInstructions',
      name: 'redInstructions',
      component: redInstructions
    },
    {
      path: '/turntable',
      name: 'turntable',
      component: turntable
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: lottery
    },
    {
      path: '/regWorker',
      name: 'regWorker',
      component: regWorker
    },
    {
      path: '/workerDetail',
      name: 'workerDetail',
      component: workerDetail
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/manyComments',
      name: 'manyComments',
      component: manyComments
    },
    {
      path: '/manyImgs',
      name: 'manyImgs',
      component: manyImgs
    },
    {
      path: '/paySetting',
      name: 'paySetting',
      component: paySetting
    },
    {
      path: '/payPassword',
      name: 'payPassword',
      component: payPassword
    },
    {
      path: '/verifyPay',
      name: 'verifyPay',
      component: verifyPay
    },
    {
      path: '/verifyPhone',
      name: 'verifyPhone',
      component: verifyPhone
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    },
  ]
})
