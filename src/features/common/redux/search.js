import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  COMMON_SEARCH,
} from './constants';

export function search(input) {
  return {
    type: COMMON_SEARCH,
    payload: input
  };
}

export function useSearch() {
  const dispatch = useDispatch();
  const searchText = useSelector(state=>state.common.searchText);
  const boundAction = useCallback((...params) => dispatch(search(...params)), [dispatch]);
  return { searchText, search: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SEARCH:
      return {
        ...state,
        searchText: action.payload
      };

    default:
      return state;
  }
}
