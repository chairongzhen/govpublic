import { useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {
  COMMON_SET_YEAR_DISABLED,
} from './constants';

export function setYearDisabled(val) {
  return {
    type: COMMON_SET_YEAR_DISABLED,
    payload: val
  };
}

export function useSetYearDisabled() {
  const dispatch = useDispatch();
  const yearDisabled = useSelector(state=>state.common.yearDisabled);
  const boundAction = useCallback((...params) => dispatch(setYearDisabled(...params)), [dispatch]);
  return { yearDisabled,setYearDisabled: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_YEAR_DISABLED:
      return {
        ...state,
        yearDisabled: action.payload
      };

    default:
      return state;
  }
}
