/*
 * @Author: hcluo
 * @Date: 2020-07-17 11:23:35
 * @LastEditors: hcluo
 * @LastEditTime: 2020-07-28 16:48:23
 * @Description: 政府项目
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMMON_SET_LOCATION } from './constants';

export function setLocation(pick) {
  return {
    type: COMMON_SET_LOCATION,
    payload: pick,
  };
}

export function useSetLocation() {
  const dispatch = useDispatch();
  const location = useSelector(state => state.common.location);
  const boundAction = useCallback((...params) => dispatch(setLocation(...params)), [dispatch]);
  return { location, setLocation: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    default:
      return state;
  }
}
