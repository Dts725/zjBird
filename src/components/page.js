import pageService from '../services/pageServ';
var page = {};
page.title = function (title) {
  document.title = title;
  pageService.title = title;
};

/**
 * 检测该页面是否在微信中进行分享
 * */
page.WechatShare = function () {
  let share_check = location.href.match(/singlemessage/);
  if (!share_check) {
    return false;
  } else {
    return true;
  }
};

/**
 * 检测该页面是否在微信中进行分享
 * */
page.wechat = function () {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
};
export default page;
