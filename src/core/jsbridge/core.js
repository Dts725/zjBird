import Promise from 'Promise'

let messagingIframe;

function _createQueueReadyIframe() {

  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__/';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)

}

let core = {};
//这个功能没用了
const JsBridge =true;
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
};
core.iosInit = function (callback) {
  if (JsBridge) {
    return new Promise(function (resolve, reject) {
      return resolve(JsBridge);
    })
  }
  else {
    document.addEventListener('WebViewJavascriptBridgeReady', function (WebViewJavascriptBridge) {
      return new Promise(function (resolve, reject) {
        return resolve(WebViewJavascriptBridge)
      })
    }, false);
  }
};

core.init = function () {
    const ua = core.device();
    let ready = null;
    if (ua.android) {
      ready = core.androidInit()
    } else {
      ready = core.iosInit()
    }
    return ready


};
// core.$reg = function (name) {
//   return core.init().then(function (bridge) {
//     console.log("998798");
//     new Promise(function(res))
//   //  if (bridge.hasOwnProperty('registerHandler')) {
//       return window.WebViewJavascriptBridge.registerHandler(name, function (data, response) {
//         return new Promise(function (resolve) {
//           if ('object' != typeof response) {
//             //response = JSON.parse(response)
//           }
//           resolve(data)
//         })
//       })
//     // }
//   })
// }
/*
core.$reg h5 提供给原生的方法
name : h5提供给原生的方法名
info :  要传给ios的内容 可以为string function类型
*/
core.$reg = function (name,info) {
  _createQueueReadyIframe();


  return  core.init().then(function(res){
    return new Promise(function(resolve){
      if(typeof(info) === 'string') {

        return   window.WebViewJavascriptBridge.registerHandler(name, function(data,res) {
          res(info);
          return resolve(data);
        });
      }
      try  {
        return   window.WebViewJavascriptBridge.registerHandler(name, function(data,res) {
          info();
          res(info);
          return resolve(data);
        });
      }
      catch(err) {
        console.log(err);
      }

    })
  })


};


core.$pay = function(name = "pay_by_ali",info = "这儿是了流水号") {
  new Promise (function (resolve){
    return  window.WebViewJavascriptBridge.callHandler(name ,info,function(res) {
      resolve(res)
    })
  })
}

/*
core.$app h5调用原生的方法
name  方法名
options 给原生的数据 可选参数 尽量有一个任意字符串

*/
core.$app = function (name, options) {
  if(typeof(options) != 'string') {
    options = JSON.stringify(options);
  }
  _createQueueReadyIframe();
  return core.init().then(function (res) {
      return new Promise(function (resolve) {
  
        if (options) {
            window.WebViewJavascriptBridge.callHandler(name, options, function (response) {
            if ('object' != typeof response) {
              //response = JSON.parse(response)
            }
           resolve(response)
          })
        }else{
          return window.WebViewJavascriptBridge.callHandler(name, function (response) {
            if ('object' != typeof response) {
              //response = JSON.parse(response)
            }
            resolve(response)
          })
        }
      })
    // }
  })
}


export default core;
