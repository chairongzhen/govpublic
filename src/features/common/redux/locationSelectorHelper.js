import cloneDeep from 'lodash/cloneDeep';
import { now } from 'd3';
var locationSearch = {};
var locationSearchArray = [];
var plateSearch = [];

export const handleLocationTreeForSearch = tree => {
  return tree.map(item => {
    item.label = item.chn;
    item.value = item.code;
    locationSearch[item.code] = item;
    locationSearchArray.push(item);
    let children = [];
    if (item.children && item.children.length > 0) {
      // if (['0301010000', '0302010000', '0303020000', '0303010000'].indexOf(item.code) === -1)
      children = handleLocationTreeForSearch(item.children);
      children.unshift(item);
    }
    return {
      label: item.chn,
      value: item.code,
      children,
    };
  });
};

export const handleLocationTreeForMenu = tree => {
  return tree.map(item => {
    item.label = item.chn;
    item.value = item.code;
    locationSearch[item.code] = item;
    locationSearchArray.push(item);
    let children = [];
    if (item.children && item.children.length > 0) {
      if (['0301010000', '0302010000', '0303020000', '0303010000'].indexOf(item.code) === -1) {
        children = handleLocationTreeForMenu(item.children);
      }
      children.unshift(item);
    } else if (['0304070000', '0304080000', '0304090000'].indexOf(item.code) !== -1) {
      // 港澳台
      children.unshift(item);
    }
    return {
      label: item.chn,
      value: item.code,
      children,
    };
  });
};

export const handlePlateTreeForSearch = tree => {
  console.log('plateTree：', tree);
  tree.map(item => {
    if (item.children && item.children.length > 0) {
      item.children = item.children.map(i => {
        i = locationSearch[i.code];
        return i;
      });
    }
    locationSearch[item.code] = item;
    locationSearchArray.push(item);
    plateSearch.push(item);
    return 0;
  });
};

window.locationSearch = locationSearch;
window.plateSearch = plateSearch;

/**
 * @name: 通过code判断该地区是否存在下级地区
 * @param {string} code
 * @return {boolean} true | false
 */
export const isContainsChildren = code => {
  let children = findLocation(code, -1);
  if (Array.isArray(children) && children.length > 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * @description 通过code查找当前地区的上级或下级或同级
 * @param {*} code
 * @param {number} [resultType=2] -1 返回下一级所有地区 | 0 返回同级地区 | 1 返回上一级地区 | 2 返回当前code地区  | 3 返回所有上级地区  | 4 返回所有省地区  |   默认返回当前
 * @returns resultType = 1 | 2 时返回对象，其他情况返回数组
 */

export const findLocation = (code, resultType = 2) => {
  try {
    if (resultType === 4) {
      let res = locationSearch['0300000000'].children;
      return res;
    }
  } catch (error) {
    console.log(error, code);
  }

  let cur = null;
  if (locationSearch.hasOwnProperty(code)) {
    cur = locationSearch[code];
  } else {
    return 'code无效';
  }

  try {
    if (resultType === 2) return cur;
    if (resultType === -1) return cur.children;
    let parentCode = cur.parentCode;
    if (resultType === 1) return locationSearch[parentCode];
    if (resultType === 0) {
      if (cur.treeLevel === 99) {
        return plateSearch;
      }
      return locationSearch[parentCode].children;
    }
    if (resultType === 3) {
      let res = [];
      for (let index = cur.treeLevel; index >= 0; index = cur.treeLevel) {
        res.unshift(cur);
        cur = findLocation(cur.parentCode, 2);
      }
      return res;
    }
  } catch (error) {
    console.error(`findLocation = (${code}, ${resultType})   `, 'error:', error);
    return locationSearch['0300000000'].children;
  }

  return 'resultType无效';
};

window.findLocation = findLocation;

/**
 * @description 根据中文名称搜索location
 * @param {*} name
 * @returns [array]  返回值为数组
 */
export const searchLocationByChn = (name, parentCode = 'all') => {
  let searchLimit = null;
  let searchLimitClone = null;
  let nameCount = 0;

  if (parentCode === 'all') {
    searchLimit = locationSearchArray;
  } else if (locationSearch.hasOwnProperty(parentCode)) {
    searchLimit = locationSearch[parentCode].children;
  } else {
    console.error('searchLocationByChn 方法中parentCode 找不到', parentCode);
    return [];
  }
  searchLimit.map(item => {
    item.chn.indexOf(name) > -1 && (nameCount = nameCount + 1);
    return item;
  });
  searchLimitClone = cloneDeep(searchLimit);
  return searchLimitClone.filter(item => {
    //判断是否重名，重名时增加上级地区名称字段
    item.parentChn = '';
    // item.code.substr(-2, 2) !== '00' &&
    item.chn.indexOf(name) > -1 &&
      nameCount > 1 &&
      locationSearch[item.parentCode] &&
      (item.parentChn = locationSearch[item.parentCode].chn);
    return item.chn.indexOf(name) > -1;
  });
};
window.searchLocationByChn = searchLocationByChn;

/**
 * @description 根据中文名称搜索location(严格搜索)
 * @param {*} name
 * @returns [array]  返回值为数组
 */
export const searchLocationByChnStrictly = (name, parentCode = 'all') => {
  let searchLimit = null;

  if (parentCode === 'all') {
    searchLimit = locationSearchArray;
  } else if (locationSearch.hasOwnProperty(parentCode)) {
    searchLimit = locationSearch[parentCode].children;
  } else {
    console.error('searchLocationByChn 方法中parentCode 找不到', parentCode);
    return [];
  }

  return searchLimit.filter(item => {
    // if (item.chn === name) {
    //     return item
    // }
    return item.chn === name;
  });
};

window.searchLocationByChnStrictly = searchLocationByChnStrictly;

/**
 * @description 根据地区名称和级别获取阶段
 * @author hcluo
 * @date 2020-08-11
 * @param {*} name
 * @param {*} level
 * @param {string} [result='code']
 * @param {*} [parent=null]
 * @returns
 */
export function findSelftCodeByName(name, level, result = 'code', parent = null) {
  let curLocationNode = searchLocationByChn(name); // 自身节点
  if (!curLocationNode || curLocationNode.length === 0) {
    return null;
  }
  let selfNode = null;
  curLocationNode.forEach(element => {
    if (
      element.treeLevel === level ||
      (level === 3 && element.children && element.children.length === 0)
    ) {
      if (parent && level === 3) {
        // 区县有重名情况
        let parentCode = element.parentCode;
        let parentNode = findLocation(parentCode, 2);
        if (parentNode && parentNode.chn === parent) {
          selfNode = element;
        }
      } else {
        selfNode = element;
      }
    }
  });
  if (selfNode === null || selfNode === undefined) {
    return null;
  }
  if (result === 'code') {
    let code = selfNode.code; //自身code
    return code;
  } else if (result === 'node') {
    return selfNode;
  }
  return null;
}

window.findSelftCodeByName = findSelftCodeByName;
