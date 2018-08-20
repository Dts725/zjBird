import OSS from 'ali-oss'
import co from 'co'
import { Indicator } from 'mint-ui';
let aliOss = {};
aliOss.fileChange = function (el, vueDataList) {
  //判断是否选中图片
  return new Promise ((resolve)=>{
    try {
      if (!el.target.files[0].size) {
        return
      }
    new Promise((resolve) => {
        let fileList = el.target.files
        resolve(fileList);
      }).then((resolve) => {
        for (var i = 0; i < resolve.length; i++) {
          let render = new FileReader();
          render.readAsDataURL(resolve[i]);
          render.onloadend = function () {
            aliOss.compress(this.result, vueDataList)
          }
        }
      });
      resolve("读取图片成功了")
    } catch (err) {
      console.log(err);
    }
  })
};
//转换base64 
aliOss.compress = function (fileObj, vueData) {
  if (typeof (FileReader) === 'undefined') {
    console.log("当前浏览器内核不支持base64图标压缩");
    //调用上传方式不压缩  
    vueData.push(fileObj);
    // uploadFile(name,fileObj);
  } else {
    try {
      let Img = new Image();
      Img.src = fileObj;

      Img.onload = function () {
        let canvas = document.createElement('canvas'),

          width = Img.width,
          height = Img.height;
        canvas.width = width;
        // console.log(width)
        // console.log(height)
        canvas.height = height;
        let context = canvas.getContext('2d');
        //压缩完成执行回调  
        context.drawImage(Img, 0, 0, width, height);
        let data = canvas.toDataURL('image/jpeg', 0.7);
        console.log(data);
        vueData.push(data);
      }
    } catch (e) {
      console.log("压缩失败!");
      vueData.push(fileObj);
      //调用直接上传方式  不压缩 
      // uploadFile(name,fileObj);
    }
  }
};

//上传文件到aliOss
aliOss.uploadFile = function (name, vueDataList, aliOssResult = 'moren') {
  Indicator.open('上传中 请稍等...');
  return   new Promise(function (resolve) {
      let client = new OSS.Wrapper({
        endpoint: 'oss-cn-hangzhou.aliyuncs.com',
        region: 'frontend2.oss-cn-hangzhou.aliyuncs.com',
        accessKeyId: 'LTAIr7Wg5qXL2crB',
        accessKeySecret: 'PchxY1WBvD5QPiG9Nfj0svWOnCWpEy',
        bucket: 'frontend2'
      });

      co(function* () {
        let tims = new Date();
        let data = JSON.stringify(vueDataList);
        let result = yield client.put(name + tims + '.jpg', new Buffer(data));

        if (typeof (aliOssResult) == 'function') {
          aliOssResult(result);
        }
        Indicator.close();
        resolve(result);
        // console.log(result)
      })
    });
};

//删除文件待用
//name : array
aliOss.deletefile = function (name) {
  let client = new OSS.Wrapper({
    endpoint: 'oss-cn-hangzhou.aliyuncs.com',
    region: 'frontend2.oss-cn-hangzhou.aliyuncs.com',
    accessKeyId: 'LTAIr7Wg5qXL2crB',
    accessKeySecret: 'PchxY1WBvD5QPiG9Nfj0svWOnCWpEy',
    bucket: 'frontend2'
  });
  co(function* () {
    let result = yield client.deleteMulti(name, {
      quite: true
    });
    console.log(result);
  }).catch(function (err) {
    console.log(err);
  });

};
export default aliOss
