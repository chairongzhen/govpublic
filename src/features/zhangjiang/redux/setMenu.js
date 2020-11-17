import { useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {
  ZHANGJIANG_SET_MENU,
} from './constants';

export function setMenu(menu) {
  return {
    type: ZHANGJIANG_SET_MENU,
    payload: menu
  };
}

export function useSetMenu() {
  const dispatch = useDispatch();
  const menu = useSelector(state=>state.zhangjiang.menu);
  const boundAction = useCallback((...params) => dispatch(setMenu(...params)), [dispatch]);
  return { menu,setMenu: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case ZHANGJIANG_SET_MENU:
      return {
        ...state,
        menu: action.payload
      };

    default:
      return state;
  }
}
