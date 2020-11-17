/*
 * @Author: hcluo
 * @Date: 2020-05-09 18:10:34
 * @LastEditors: hcluo
 * @LastEditTime: 2020-08-11 13:48:31
 * @Description: 政府项目
 */

// import { jsonTree } from './indicatorTree';
// import { jsonTree } from './indicatorTreeNew';
// todo: 闭包优化，指标数据
var indicatorSearch = {};
// export const indicatorTree = jsonTree.resultData.treeList
export const indicatorTree = [];

export const handleIndicatorTreeForSearch = tree => {
  tree.map(item => {
    // indicatorSearchArray.push(item)
    if (item.children && item.children.length > 0) handleIndicatorTreeForSearch(item.children);
    else indicatorSearch[item.code] = item;
    return 0;
  });
};

/**
 * @description 根据code查找指标
 * @param {*} code
 */
export const findIndicatorByCode = (code, resultType = 'all') => {
  try {
    if (resultType === 'all') {
      return indicatorSearch[code];
    } else {
      return indicatorSearch[code][resultType];
    }
  } catch (error) {
    console.error('findIndicatorByCode  出错！ ', code, error);
    return {};
  }
};

/**
 * @description 根据中文名称搜索Indicator
 * @param {*} name
 * @returns
 */
export const searchIndicatorByChn = (name, oldResult = indicatorSearch) => {
  let result = [];
  for (const key in oldResult) {
    const item = oldResult[key];
    if (item.chn.indexOf(name) > -1) {
      result.push(item);
    }
  }
  return result;
};

export const searchIndicatorByChnStrict = (name, oldResult = indicatorSearch) => {
  let result = null;
  for (const key in oldResult) {
    const item = oldResult[key];
    if (item.chn === name) {
      return item;
    }
  }
  return result;
};

window.findIndicatorByCode = findIndicatorByCode;
window.searchIndicatorByChn = searchIndicatorByChn;
window.searchIndicatorByChnStrict = searchIndicatorByChnStrict;
