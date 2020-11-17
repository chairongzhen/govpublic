/*
 * @Author: hcluo
 * @Date: 2020-07-28 16:39:04
 * @LastEditors: jfzhang.Jeffry
 * @LastEditTime: 2020-09-24 15:50:54
 * @Description: 政府项目
 */
// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.

import moment from 'miment';

const initialState = {
  searchText: '',
  location: {
    label: '上海',
    value: '0301010000',
    memo: ['0301010000', '0301010000']
  },
  category: '经济运行',
  year: moment().add(-1,"YYYY").format("YYYY"),
  yearDisabled: false
};

export default initialState;
