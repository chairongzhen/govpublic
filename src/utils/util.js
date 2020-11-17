/**
 * @name: 将数字转换成千分位
 * @param val 需要转换的数字
 * @return: 千分位字符串
 */
export function toThousandSeparator(val) {
  if (val) {
    return (val + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
  } else {
    return val;
  }
}

// 格式化工具函数
export const format = {
  /**
   * 将数值处理成千分位格式, 保留指定小数位
   * @param {string|number } value - 待处理的数据
   * @param { number } decimals - 要保留的小数位数, 默认保留两位小数
   * @returns {string}
   */
  toThousands(value, decimals = 2) {
    if (Number(value).toString() === 'NaN') {
      return value;
    }

    const isNotNumber = parseFloat(value).toString() === 'NaN';
    if (isNotNumber) {
      return value;
    }

    const str = `${value}`;
    if (str.includes(',')) {
      str.replace(/,/g, '');
    }

    const num = `${Math.abs(parseFloat(str)).toFixed(decimals)}`;
    const reg = /\d{1,3}(?=(\d{3})+$)/g;
    let res = num.replace(/^(\d+)((\.\d+)?)$/, (s, s1, s2) => s1.replace(reg, '$&,') + s2);

    if (str.includes('-')) {
      res = `-${res}`;
    }

    return res;
  },

  /**
   * 保留指定小数位
   * @param {string|number } value - 待处理的数据
   * @param { number } decimals - 要保留的小数位数, 默认保留两位小数
   * @returns {string}
   */
  toFixed(value, decimals = 2) {
    if (Number(value).toString() === 'NaN') {
      return value;
    }

    const isNotNumber = parseFloat(value).toString() === 'NaN';
    if (isNotNumber) {
      return value;
    }

    const str = `${value}`;
    let res = `${Math.abs(parseFloat(str)).toFixed(decimals)}`;
    if (str.includes('-')) {
      res = `-${res}`;
    }
    return res;
  },

  /**
   * 将 'yyyyMMdd' 日期字符串格式化为 'yyyy-MM-dd'
   * @param {string|number } value - 待处理的数据
   * @returns {string}
   */
  addConnector(value) {
    let str = value && `${value}`;
    if (str) {
      str = `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`;
    }
    return str;
  },
  /**
   * 表格内字符串的格式化处理
   * 主要是将数据为空的时候，转为 --
   * @param {string} value
   */
  tableTextFormat(value) {
    if (!value || value === '') {
      return '--';
    }
    return value;
  },
};

// 日期扩展函数
export const enhanceDate = {
  format(d, fmt) {
    let o = {
      'M+': d.getMonth() + 1, // 月份
      'd+': d.getDate(), // 日
      'h+': d.getHours(), // 小时
      'm+': d.getMinutes(), // 分
      's+': d.getSeconds(), // 秒
      'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
      S: d.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, `${d.getFullYear()}`.substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
        );
      }
    }
    return fmt;
  },

  SDate(d = new Date()) {
    return this.format(d, 'yyyyMMdd');
  },
  Date(d = new Date()) {
    return this.format(d, 'yyyy-MM-dd');
  },
  addDays(number) {
    const d = new Date();
    return new Date(d.getTime() + 24 * 60 * 60 * 1000 * number);
  },
  UTC(d = new Date()) {
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  },
};

const requestData = {
  /**
   * 将网络返还的数组数据，加一个id元素
   * 如果原始数据里带有id，则跳过
   * @param {array} data - 返回的数据
   * @returns {array} - 原始的数据返回
   */
  addId(data) {
    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].id) {
          data[i].id = i + 1;
        }
      }
    }
    return data;
  },
};

/**
 * 数组去重 (不会改变原数组)
 * @param {array} arr - 待处理的数组
 * @returns {array}
 */
export function unique(arr) {
  // 通过 Set 对象, 对数组去重, 结果返回一个 Set 对象
  // 通过扩展运算符将其转为数组
  return [...new Set(arr)];
}

/**
 * 获取url查询字符串
 * @param {string} name - 需要查询的url参数
 * @param {string} url - url
 * @returns {string} - 返回字符串或null
 */
export function getQueryString(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  let regexS = `[\\?&]${name}=([^&#]*)`;
  let regex = new RegExp(regexS, 'i');
  let results = regex.exec(url);
  return results == null ? null : results[1];
}

/**
 * 比较两个简单类型数组是否相等
 * @param {array} arr1 - 数组1
 * @param {array} arr2 - 数组2
 * @returns {boolean} - 返回布尔值
 */
export function isEquals(arr1, arr2) {
  return (
    arr1.length === arr2.length && arr1.sort().every((value, index) => value === arr2.sort()[index])
  );
}

/**
 * 债券F9中将table数据转为对象
 * @param {array} data - 源数据
 * @returns {array} - 返回数组
 */
function unPlatDataConverter(data = {}) {
  let result = [],
    i,
    j,
    obj;
  if (data.Cols && data.Cols.length > 0 && data.Rows && data.Rows.length > 0) {
    for (i = 0; i < data.Rows.length; i++) {
      obj = {};
      for (j = 0; j < data.Cols.length; j++) {
        obj[data.Cols[j]] = data.Rows[i][j];
      }
      result.push(obj);
    }
  }
  return result;
}

/* eslint-disable */
// 生成唯一标识
function generateGUID() {
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

//手机终端分享功能
function toShare(type, title, content, url) {
  let l_data = '{"title":"' + title + '","content":"' + content + '","url":"' + url + '"}';

  3 === type
    ? (l_data =
        '{"weiboTitle":"","weiboContent":"' +
        title +
        '，' +
        content +
        url +
        '","weiboUrl":"' +
        url +
        '"}')
    : 5 === type &&
      (l_data =
        '{"title":"' +
        title +
        (content ? '，' + content : '') +
        '","content":"","url":"' +
        url +
        '"}');

  window.wdobject && window.wdobject.shareContent(null, null, parseInt(type, 10), l_data);
}

function compInter(list, interNum = 2) {
  let array = [];
  if (list && list.length > 0 && !Number.isNaN(interNum) && interNum !== 0) {
    let count = list.length - 2;
    array.push(0);
    for (let i = 0; i < count; i++) {
      let num = i * interNum + interNum;
      if (num < count) {
        array.push(num);
      }
    }
    array.push(list.length - 1);
  }
  return array;
}

/**
 * 获取url查询字符串
 * @returns {string} - 返回字符串或null
 */
function getLang() {
  let lang = '';
  const { search } = window.location;
  const match = search.match(/[?|&](lang|lan)=([^&]+)/);
  // url优先
  if (match && match.length === 3) {
    lang = match[2];
  } else {
    // safari is 'zh-cn', while other browser is 'zh-CN';
    lang = navigator.language && navigator.language.toLowerCase().split(/[_-]/)[0];
  }
  lang = lang && lang.toLowerCase();
  return lang;
}

function loadjs(url, callback) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.defer = 'defer';
  if (script.onreadystatechange) {
    // eslint-disable-next-line func-names
    script.onreadystatechange = function() {
      console.log('readyState loaded');
      if (script.readyState === 'loaded' || script.readyState === 'complate') {
        callback();
      }
    };
  } else {
    // eslint-disable-next-line func-names
    script.onload = function() {
      console.log('onload');
      callback();
    };
  }
  document.getElementsByTagName('head')[0].appendChild(script);
}

/* eslint-enable */

const SmartReader = {
  getWFTVersion() {
    let version = null;
    try {
      let ipresult = window.external.ClientFunc("{ func=querydata, isGlobal=1, name='version2' }");
      if (ipresult != null) {
        version = JSON.parse(`(${ipresult})`).result;
      }
    } catch (ex) {
      console.log(ex);
    }
    return version;
  },
  isIE() {
    let myNav = navigator.userAgent.toLowerCase();
    return myNav.indexOf('msie') !== -1 ? window.parseInt(myNav.split('msie')[1]) : false;
  },
  openWindow(url) {
    if (!window.open(url, `_newTab${new Date().valueOf()}`)) {
      document.location.href = url;
    }
  },

  openNEWS(id, title, lan = 'cn') {
    if (!this.isIE()) {
      let wftVersion = this.getWFTVersion();
      if (wftVersion && wftVersion >= '152253523') {
        window.external.ClientFunc(
          JSON.stringify({
            func: 'command',
            isGlobal: 1,
            cmdid: '1900',
            ID: id,
            Title: title,
            disableuppercase: 1,
          }),
        );
      } else {
        this.openWindow(
          `https://EquitySalesServer/EquitySalesWeb/SmartReader/default.aspx?type=1&id=${id}&lan=${lan}`,
        );
      }
      return true;
    }
    return false;
  },
};

// export {
//   format,
//   enhanceDate,
//   requestData,
//   unique,
//   getQueryString,
//   isEquals,
//   unPlatDataConverter,
//   generateGUID,
//   getLang,
//   loadjs,
//   // eslint-disable-next-line func-names
//   versions: (function () {
//     let u = navigator.userAgent;
//     return {
//       webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
//       gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
//       mobile: !!u.match(/Mobile/), // 是否为移动终端
//       ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
//       iosVer: u.match(/OS (\d+)_(\d)?_(\d)?/),
//       android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
//       androidVer: u.substr(u.indexOf('Android') + 8, 3),
//       iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
//       iPad: u.indexOf('iPad') > -1, // 是否iPad
//       // flag_userType_softwareType_InnerVersion
//       instock: !!u.match(/wstock/i),
//       wstVer: u.match(/wstock_(\S+)_(\S+)_(\S+)/i),
//       wstock: !!u.match(/wstock_210/i),
//       xcstock: !!u.match(/xc wstock/i) || !!u.match(/wstock_270/i),
//       wfund: !!u.match(/wfund/i),
//       wfuVer: u.match(/wfund_(\S+)_(\S+)_(\S+)/i),
//       wft: !!u.match(/wft wstock/i) || !!u.match(/wstock_S12/i),
//       wfc: !!u.match(/wfc wstock/i) || !!u.match(/wstock_S17/i),
//       weixin: !!u.match(/MicroMessenger/i),
//       abn: !!u.match(/abn wstock/i),
//       inWeb: !!u.match(/inWeb/i),
//     };
//   }()),
//     toShare,
//     compInter,
//     SmartReader,
// };
