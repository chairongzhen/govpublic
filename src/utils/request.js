/*
 * @Author: hcluo
 * @Date: 2020-04-26 14:48:22
 * @LastEditors: hcluo
 * @LastEditTime: 2020-08-14 09:38:45
 * @Description: 政府项目
 */
import { getQueryString } from './util.js';
import { getSessionId, getUserInfo } from '../common/jsBirdge';

// url 配置
const config = {
  fetchUser: {
    url: '/mock/getUserInfo',
  },
  fetchCities: {
    url: '/govwebapi/gov/wap/api/tree/chinaregion',
  },
  fetchData: {
    url: '/govwebapi/gov/wap/api/integration/dataset/datainfo',
  },
  fetchEDDData: {
    url: '/govwebapi/gov/wap/api/dimension/datainfo',
  },
  fetchDyamics: {
    url: '/govwebapi/gov/wap/api/dynamicdiagram/list',
  },
  fetchDyamicsDetail: {
    url: '/govwebapi/gov/wap/api/dynamicdiagram/detail',
  },
  fetchBarData: {
    url: '/mock/getBarData',
  },
  fetchNews: {
    url: '/mock/getNews',
  },
  fetchRisks: {
    url: '/mock/getRisks',
  },
  fetchMoreNews: {
    url: '/mock/getMoreNews',
  },
  fetchBarHData: {
    url: '/mock/getBarHData',
  },
  fetchIndicate: {
    url: '/govwebapi/gov/wap/api/dimension/datainfo',
  },
  funcPoint: {
    url: '/govwebapi/gov/web/api/funcpoint/save',
    // body: {
    //   business: {
    //     action: '',
    //     item: [],
    //   },
    // },
  },
  fetchDefault: {
    url: '/govwebapi/gov/wap/api/pageconfig/list',
  },
  fetchDs: {
    url: '/mock/indicator.json',
  },
  fetchMonitorSummary: {
    url: '/govwebapi/gov/wap/api/entriskmonitor',
  },
  share: {
    url: '/govwebapi/gov/wap/api/usershare/add',
  },
  fetchAreaCode: {
    url: '/govwebapi/gov/map/api/boundary/list',
  },
};

//const session = getQueryString('wind.sessionid') || '078006eba8e742de8c03166774f1bf81';
const session = getSessionId();
console.log('%c 🍫 session: ', 'font-size:20px;background-color: #B03734;color:#fff;', session);
let right = getQueryString('right');
let host = (() => {
  // 添加sessionStorage
  let host = getQueryString('host');
  return host ?? '';
})();

export const requests = {};
// let requests = {}

for (let [k, v] of Object.entries(config)) {
  let { url, method } = v;
  let opt = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'wind.sessionid': session,
      'App-Version': getUserInfo() && getUserInfo().version ? getUserInfo().version : '',
      'User-Agent': navigator.userAgent,
    },
  };

  // 第三方鉴权码
  // if (!!right) opt.headers.right = right;

  // 判断是否从PC终端进入
  // if (!window.external || !window.external.ClientFunc) {
  //   opt.headers['wind.sessionid'] = session;
  // }

  /*

{
    business:{
        "params": {
            "dataSetCode": "a7b4f429650311eaaa93fa163ed85ccc",
            "sectorIds": "0301010000",
            "pageSize": "5",
            "pageNo": "2",
        }
  }
  */
  requests[k] = business => {
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
        } else if (res.resultCode === '403') {
          window.location.href = './403.html';
        } else {
          console.error('服务端错误：', localHost, newUrl, res);
          return Promise.reject(res);
        }
      });

    // if (/mock/.test(newUrl)) {
    //   return fetch(newUrl)
    //     .then(response => {
    //       if (!response.ok) {
    //         return Promise.reject(response.status);
    //       }
    //       return response.json();
    //     })
    //     .then(res => {
    //       if (res.resultCode === '200') {
    //         return Promise.resolve(res.resultData);
    //       } else if (res.resultCode === '403') {
    //         window.location.href = './403.html';
    //       } else {
    //         console.error('服务端错误：', host + newUrl, res);
    //         return Promise.reject(res.resultMessage);
    //       }
    //     });
    // } else {
    //   return fetch(encodeURI(host + newUrl), opt)
    //     .then(response => {
    //       if (!response.ok) {
    //         return Promise.reject(response.status);
    //       }
    //       return response.json();
    //     })
    //     .then(res => {
    //       if (res.resultCode === '200') {
    //         return Promise.resolve(res.resultData);
    //       } else if (res.resultCode === '403') {
    //         window.location.href = './403.html';
    //       } else {
    //         console.error('服务端错误：', host + newUrl, res);
    //         return Promise.reject(res);
    //       }
    //     });
    // }
  };
}

// body: {
//   business: {
//     action: '',
//     item: [],
//   },
// },

export const funcPoint = (action, item) => {
  requests.funcPoint({ params: { action, item } }).then(res => {
    console.log('保存功能点', res, action, item);
  });
};


export const requestYQData = (data) => {
  let hosts  = `http://114.80.154.45/govwebapi/windsariweb/WindSariWeb/sari/AjaxHandler.aspx?r=${Math.random()}&lan=zh&data=${JSON.stringify(data)}`;

  return fetch(encodeURI(hosts))
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then(res => {
      if (res.Data) {

        // console.log("res.Data",res.Data);
        return Promise.resolve(res.Data);
      } else {
        console.error('服务端错误：', hosts, res);
        return Promise.reject(res);
      }
    }).catch(err=>{
      
      let dataOp =JSON.stringify(data).substring(16,37);
      return getLocalData(`./mock/${dataOp}.json`)
      
    }).then(res=>{
      if (res) {
        return Promise.resolve(res);
      } else {
        console.error('服务端错误：', hosts, res);
        return Promise.reject(res);
      }
    })
}

const getLocalData = (url)=>{
  return fetch(url).then(response => {
    if (!response.ok) {
      return Promise.reject(response.status);
    }
    return response.json();
  })
}
