import Promise from 'Promise'
import init from './webview1'

init();
let core = {}

const JsBridge = window.WebViewJavascriptBridge;
// console.log(typeof JsBridge);
core.device = function () {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  return {
    android: isAndroid,
    ios: isiOS
  }
}
core.androidInit = function () {
  if (JsBridge) {
    return new Promise(function (resolve, reject) {
      return resolve(JsBridge)
    })
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function (WebViewJavascriptBridge) {
      return new Promise(function (resolve, reject) {
        return resolve(WebViewJavascriptBridge)
      })
    }, false);
  }
}
core.iosInit = function (callback) {
  if (JsBridge) {
    return new Promise(function (resolve, reject) {
      return resolve(JsBridge)
    })
  }
}
core.init = function () {
  const ua = this.device()
  let ready = null;
  if (ua.android) {
    ready = core.androidInit()
  } else {
    ready = core.iosInit()
  }
  return ready
}
core.$reg = function (name) {
  return core.init().then(function (bridge) {
    if (bridge.hasOwnProperty('registerHandler')) {
      return bridge.registerHandler(name, function (data, response) {
        return new Promise(function (resolve) {
          if ('object' != typeof response) {
            //response = JSON.parse(response)
          }
          resolve(data)
        })
      })
    }
  })
}
core.$app = function (name, options) {
  return core.init().then(function (bridge) {
    if (bridge.hasOwnProperty('callHandler')) {
      return new Promise(function (resolve) {
        if (options) {
          return bridge.callHandler(name, options, function (response) {
            console.log(response);
            if ('object' != typeof response) {
              //response = JSON.parse(response)
            }
            resolve(response)
          })
        }else{
          return bridge.callHandler(name, function (response) {
            if ('object' != typeof response) {
              //response = JSON.parse(response)
            }
            resolve(response)
          })
        }
      })
    }
  })
}

export default core;
