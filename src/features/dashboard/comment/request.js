/*
 * @overview:
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-11-15 12:42:58
 */
import { getQueryString } from '../../../utils/util';
import { getSessionId, getUserInfo } from '../../../common/jsBirdge';

var session = '80f5904b032c430ca0f9a2f206ba0ba3';
let host = getQueryString('host') || '';
var kt = 0;
var kt2 = 0;
export var sessionOK = false;
export const getSessionFunc = () => {
  console.log('zjf---调用获取session的方法:');
  fetch(encodeURI(host + '/govwebapi/gov/web/api/bigscreen/tokeninfo'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //   'wind.sessionid': session,
      'App-Version': getUserInfo() && getUserInfo().version ? getUserInfo().version : '',
      'User-Agent': navigator.userAgent,
    },
  })
    .then(response => {
      //   console.log('zjf---response:', response);
      return response.json();
    })
    .then(res => {
      if (res.resultCode === '200') {
        console.log('zjf---获取session成功:', res.resultData['wind.sessionid']);
        kt2 = 0;
        session = res.resultData['wind.sessionid'];
        sessionOK = true;
      } else {
        console.log('zjf---获取session失败:', res);
        if (kt2 < 5) {
          setTimeout(() => {
            console.log('zjf---重新发送获取session:');
            getSessionFunc();
          }, 500);
          kt2++;
        }
      }
    });
};
getSessionFunc();
const request = (url, business, type) => {
  let opt = {
    method: type ? type : 'GET',
    headers: {
      'Content-Type': 'application/json',
      'wind.sessionid': session,
      'App-Version': getUserInfo() && getUserInfo().version ? getUserInfo().version : '',
      'User-Agent': navigator.userAgent,
    },
  };
  let params = {},
    body = {};
  // url 中携带module code 方便调试的时候查找
  //let newUrl = url + '?code=' + code;
  let newUrl = url + '?code=govmobile';

  if (business.params !== undefined) params.business = business.params;
  if (business.body !== undefined) body.business = business.body;

  // url 参数拼装
  //params['wind.sessionid'] = session; // URL中不需要 session 时删除该行代码
  if (type) {
    opt.body = JSON.stringify(params);
  } else {
    for (let [key, value] of Object.entries(params))
      if (!!value) newUrl += `&${key}=${JSON.stringify(value)}`; // 若value没有值，则不添加该字段
  }

  // 若有body，则添加
  if (body.business) {
    opt.body = JSON.stringify(body);
  }

  let localHost = /mock/.test(newUrl) ? '.' : host;

  return (
    fetch(encodeURI(localHost + newUrl), opt)
      .then(response => {
        if (!response.ok) {
          //   alert('服务端错误response.ok：', localHost, newUrl, response.ok);
          return Promise.reject(response.status);
        }
        return response.json();
      })
      .then(res => {
        if (res.resultCode === '200') {
          return Promise.resolve(res.resultData);
        } else {
          //   alert('服务端错误：', localHost, newUrl, res);
          console.error('服务端错误：', localHost, newUrl, res);
          return Promise.reject(res);
        }
      })
      /* .then(res => {
      if (res.resultCode === '200') {
        console.log('zjf---重新发送获取数据成功:', kt);
        kt = 0;
        return Promise.resolve(res.resultData);
      } else if (res.resultCode === '403') {
        console.log('zjf---403:', kt);

        getSessionFunc();
        if (kt < 5) {
          kt++;
          setTimeout(() => {
            console.log('zjf---重新发送url, business, type:', url, business, type, kt);
            Promise.resolve(request(url, business, type));
          }, 500);
        } else {
          console.log('zjf---重新  返回了错误:');
          return Promise.reject(res);
        }
      } else {
        if (kt >= 5) {
          console.error('服务端错误：', localHost, newUrl, res, kt);
          return Promise.reject(res, kt);
        }
      }
    }) */
      .catch(err => {
        console.error('网络错误：', err, kt);
        return Promise.reject(err);
      })
  );
};

export default request;
