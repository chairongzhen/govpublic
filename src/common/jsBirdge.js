/*
 * @Author: hcluo
 * @Date: 2020-08-04 15:58:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-13 08:58:51
 * @Description: 政府项目
 */

import { getQueryString } from '../utils/util';

// 获取sessionId
export const getSessionId = () => {
  let sessionId = getQueryString('wind.sessionid');
  if (!sessionId) sessionId = window?.wdobject?.shellreq?.('{"operate":"getsessionid"}') ?? '';
  return sessionId || 'effe014128794280ac5699ad5eb116a3';
};

/*
  type: 3-微博；4-微信好友；5-微信朋友圈
*/
export const toShare = (type, title, content, url) => {
  let l_data = `{"title":"${title}","content":"${content}","url":"${url}"}`;

  type === 3
    ? (l_data = `{"weiboTitle":"","weiboContent":"${title}，${content}${url}","weiboUrl":"${url}"}`)
    : type === 5 &&
      (l_data = `{"title":"${title}${content ? `，${content}` : ''}","content":"","url":"${url}"}`);

  window.wdobject &&
    window.wdobject.shareContent &&
    window.wdobject.shareContent(null, null, parseInt(type, 10), l_data);
};

//获取GPS接口定义：requestGPS(callback), callback 是自定义回调函数，因为获取GPS是异步操作。
//Callback函数返回格式为lat=1.512,lon=1.234的字符串  lat:纬度，lon:经度。
//获取失败返回空字符串。
// 业务代码中调取DEMO
//window.requestGPSCallback = res => {
//    return res;
//};
export const requestGPS = funcName => {
  window.wdobject && window.wdobject.requestGps && window.wdobject.requestGps(funcName);
};

// 获取访问设备信息
export const getUserInfo = () => {
  let userInfo = window.wdobject ? window.wdobject.shellreq('{"operate":"getuserinfo"}') : {};
  if (typeof userInfo === 'string') {
    userInfo = JSON.parse(userInfo);
  }
  return userInfo;
};

// 跳转到新闻详情
export const PagejumpNews = id => {
  let jsonStr = `{"operate":"pagejump","data":{"functionid":"802300020021","id":"${id}"}}`;
  window.wdobject && window.wdobject.shellreq(jsonStr);
};

// 是否显示app头部 isShow=true 显示title, isShow=false 隐藏title
export const showAppTile = isShow => {
  if (!isShow) {
    window?.wdobject?.openLandScape?.(); // 隐藏title
  } else {
    window.wdobject && window?.wdobject?.closeLandScape?.(); // 显示title
  }
};

// 投屏
export const castScreenAction = id => {
  window.wdobject && window?.wdobject?.castScreenAction?.(id);
};

export const setAppTitle = title => {
  window.document.title = title;
};
