/*
 * @Author: your name
 * @Date: 2020-11-13 13:42:20
 * @LastEditTime: 2020-11-13 13:49:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\src\features\dashboard\components\DashTable.js
 */
import React from 'react';
// import PropTypes from 'prop-types';

export default function DashTable(props) {
  const { data } = props;
  const tableColor = [
    '#2277a2',
    '#f68717',
    '#5fbebf',
    '#e05d5d',
    '#4a588e',
    '#e4c557',
    '#63a074',
    '#906f54',
  ];
  let i = 0;
  return data?.map(item => {
    return (
      <div
        className="dashboard-components-dash-table"
        key={item.code}
        style={{ backgroundColor: tableColor[i++] }}
      >
        <div>{item.name}</div>
        <div>{item.code}</div>
        <div>{item.amount}</div>
      </div>
    );
  });
}

DashTable.propTypes = {};
DashTable.defaultProps = {};
