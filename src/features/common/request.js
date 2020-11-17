/*
 * @Author: hcluo
 * @Date: 2020-04-26 14:48:22
 * @LastEditors: hcluo
 * @LastEditTime: 2020-08-24 15:06:31
 * @Description: 政府项目
 */
import { getQueryString } from '../../utils/util';
import { getSessionId, getUserInfo } from '../../common/jsBirdge';

const session = getSessionId();
let right = getQueryString('right');
let host = getQueryString('host') || '';

let headers = {
  'Content-Type': 'application/json',
  'wind.sessionid': session,
  'App-Version': getUserInfo() && getUserInfo().version ? getUserInfo().version : '',
  'User-Agent': navigator.userAgent,
};

let opt = {
  method: 'GET',
  headers,
};

export const req = (url, business) => {
  let params = {},
    body = {};
  // url 中携带module code 方便调试的时候查找
  //let newUrl = url + '?code=' + code;
  let newUrl = url + '?code=govmobile';

  if (business.params !== undefined) params.business = business.params;
  if (business.body !== undefined) body.business = business.body;

  // url 参数拼装
  //params['wind.sessionid'] = session; // URL中不需要 session 时删除该行代码

  for (let [key, value] of Object.entries(params))
    if (!!value) newUrl += `&${key}=${JSON.stringify(value)}`; // 若value没有值，则不添加该字段

  // 若有body，则添加
  if (body.business) {
    opt.body = JSON.stringify(body);
  }

  let localHost = /mock/.test(newUrl) ? '.' : host;

  return fetch(encodeURI(localHost + newUrl), opt)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then(res => {
      if (res.resultCode === '200') {
        return Promise.resolve(res.resultData);
      } else {
        console.error('服务端错误：', localHost, newUrl, res);
        return Promise.reject(res);
      }
    })
    .catch(err => {
      console.error('网络错误：', err);
      return Promise.reject(err);
    });
};
