/*
 * @Author: hcluo
 * @Date: 2020-07-17 13:37:01
 * @LastEditors: hcluo
 * @LastEditTime: 2020-08-11 15:11:33
 * @Description: 政府项目
 */

import { useEffect, useState } from 'react';
import { COMMON_GET_CITIES } from './constants';
import useRequest from '../requestHook';
import { handleLocationTreeForSearch, handleLocationTreeForMenu } from './locationSelectorHelper';


var cities = JSON.parse(window.localStorage.locationTree||'{}');
var flag = true;

export function useGetCities() {
  const [data, status, request, errorMsg] = useRequest('fetchCities');
  const [result, setResult] = useState([]);
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    if (!cities.code && flag) {
      flag = false;
      request({});
    }else if(!flag &&data?.children){
        window.localStorage.locationTree= JSON.stringify(data);
        cities = data;
        let dataList =data;
        flag = true;
        let res = handleLocationTreeForSearch([dataList]);
        res[0].children.shift();
        setResult(res[0].children);
        let menu = handleLocationTreeForMenu([dataList]);
        menu[0].children.shift();
        setMenu(menu[0].children);
    }else{
      // let localData=JSON.parse(window.localStorage.locationTree);
      // cities = localData;
      let dataList =cities;
      let res = handleLocationTreeForSearch([dataList]);
      res[0].children.shift();
      setResult(res[0].children);
      let menu = handleLocationTreeForMenu([dataList]);
      menu[0].children.shift();
      setMenu(menu[0].children);
    }
  }, [data, setMenu, setResult,request]);

  return {
    data: result,
    menu: menu,
    status,
    errorMsg,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_GET_CITIES:
      return {
        ...state,
      };

    default:
      return state;
  }
}
