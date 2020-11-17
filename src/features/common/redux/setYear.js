import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  COMMON_SET_YEAR,
} from './constants';

export function setYear(pick) {
  return {
    type: COMMON_SET_YEAR,
    payload: pick
  };
}

export function useSetYear() {
  const dispatch = useDispatch();
  const year = useSelector(state=>state.common.year);
  const boundAction = useCallback((...params) => dispatch(setYear(...params)), [dispatch]);
  return { year,setYear: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_YEAR:
      return {
        ...state,
        year: action.payload.join(' ')
      };

    default:
      return state;
  }
}
