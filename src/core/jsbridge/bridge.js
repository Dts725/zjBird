import core from './core'

let bridge = {}
bridge.install = function (Vue) {
  Vue.prototype.$bridge = core.$app
}

export default bridge;
