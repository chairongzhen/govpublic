/* eslint-disable no-extend-native */
/*
 * @Author: hcluo
 * @Date: 2020-06-15 16:49:33
 * @LastEditors: hcluo
 * @LastEditTime: 2020-08-05 15:59:23
 * @Description: 政府项目
 */

// import _ from 'lodash';

// export function dataHandle(data, rules) {
//   if (!Array.isArray(data)) return data;
//   return data.map(item => {
//     let newItem = {};
//     rules.map(rule => {
//       ruleHandle(rule, newItem, item);
//       return rule;
//     });

//     return newItem;
//   });
// }

Date.prototype.format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 小时
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  var week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d',
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') +
        week[this.getDay() + ''],
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return fmt;
};

/**
 * @description dataHandle 只是数据分系列处理
 * @param {*} [data=[]]
 * @param {*} [rules=[]]
 * @param {boolean} [series={ key: false, values: [] }]
 * @returns
 */
export const dataHandle = (data = [], rules = [], series = { key: false, values: [] }) => {
  let result = [];
  try {
    let keyToIndex = {};
    series.values.map((key, index) => {
      keyToIndex[key] = index;
      result.push([]);
    });

    if (series.key !== false) {
      data.map(item => {
        if (item[series.key]) {
          let newItem = {};
          rules.map(rule => {
            ruleHandle(rule, newItem, item);
            return rule;
          });
          try {
            keyToIndex[item[series.key]] !== undefined &&
              result[keyToIndex[item[series.key]]].push(newItem);
          } catch (error) {
            console.error(
              '%c 🍹 result[keyToIndex[item[series.key]]]: ',
              'font-size:20px;background-color: #FFDD4D;color:#fff;',
              item,
              series.key,
            );
          }
        }
      });
    } else {
      data.map(item => {
        let newItem = {};
        rules.map(rule => {
          ruleHandle(rule, newItem, item);
          return rule;
        });
        result.push(newItem);
      });
    }
  } catch (error) {
    // result = data;
    console.error('dataHandle 出错：', error);
  }

  return result;
};

const ruleHandle = (rule, newItem, oldItem) => {
  let sourceKey = rule.sourceKey;

  try {
    let distKey = rule.distKey || sourceKey;
    newItem[distKey] = oldItem[sourceKey];

    const ruleItemHandle = handleRule => {
      switch (handleRule.type) {
        case 'divide':
          newItem[distKey] = newItem[distKey] / handleRule.argus;
          break;

        case 'toFixed':
          if (typeof newItem[distKey] === 'number') {
            newItem[distKey] = newItem[distKey].toFixed(handleRule.argus);
          }
          break;

        case 'toNumber':
          if (!isNaN(Number(newItem[distKey]))) newItem[distKey] = Number(newItem[distKey]);
          break;

        case 'time':
          if (/\d{8}/.test(newItem[distKey])) {
            let [, year, mouth, day] = /(\d{4})(\d{2})(\d{2})/.exec(newItem[distKey]);
            newItem[distKey] = new Date([year, mouth, day].join('-')).format(handleRule.argus);
          }

          break;

        case 'replace':
          newItem[distKey] = replace(handleRule.argus, newItem[distKey]);
          break;
        default:
          break;
      }
    };

    if (rule.rule && rule.rule.length) {
      rule.rule.map(handleRule => {
        ruleItemHandle(handleRule);
        return handleRule;
      });
    } else {
      newItem[distKey] = oldItem[sourceKey];
    }
  } catch (error) {
    console.error('%c 🍶 error: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', error);
  }
};

// 生成树型结构
export const generateTreeData = (data, parentColumn, nameColumn, valueColumn) => {
  let parentarr = [];
  data.map(item => {
    let hasPush = false;
    parentarr.forEach(it => {
      if (item[parentColumn] === it.name) {
        hasPush = true;
      }
    });
    if (!hasPush) {
      parentarr.push({
        name: item[parentColumn],
      });
    }
    return item;
  });
  parentarr.forEach((pitem, index) => {
    let children = [];
    data.forEach(rawitem => {
      if (rawitem[parentColumn] === pitem.name) {
        children.push({
          name: rawitem[nameColumn],
          value: rawitem[valueColumn],
        });
      }
    });
    pitem.children = children;
  });

  for (let o of parentarr) {
    if (o.children && o.children.length > 0) {
      let count = 0;
      o.children.forEach(oitem => {
        count = count + parseInt(oitem.value);
      });
      o.value = count;
    }
  }

  return parentarr;
};

const replace = (type, key) => {
  switch (type) {
    case 'location':
      let res = window.findLocation(key);
      if (res.chn) return res.chn;
      else return key;

    default:
      break;
  }
};
