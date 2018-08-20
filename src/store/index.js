import Vue from 'vue'
import Vuex from 'vuex'
import INFO_FN from './modules/androidIosInfo'
import AO_WHITE_TEXT from './modules/whiteArgrement'
import HEIGHT from './modules/computedHight'
import custInfo from './modules/custInfo'
import egg from './modules/egg'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        INFO_FN,
        AO_WHITE_TEXT,
        HEIGHT,
        custInfo,
        egg
    },
})