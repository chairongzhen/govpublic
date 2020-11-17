import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  COMMON_SET_CATEGORY,
} from './constants';

export function setCategory(pick) {
  return {
    type: COMMON_SET_CATEGORY,
    payload: pick
  };
}

export function useSetCategory() {
  const dispatch = useDispatch();
  const category = useSelector(state=>state.common.category);
  const boundAction = useCallback((...params) => dispatch(setCategory(...params)), [dispatch]);
  return { category,setCategory: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_CATEGORY:
      return {
        ...state,
        category: action.payload.join(' ')
      };

    default:
      return state;
  }
}
