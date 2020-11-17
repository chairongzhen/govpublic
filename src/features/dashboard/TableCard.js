/*
 * @Author: your name
 * @Date: 2020-11-15 17:19:18
 * @LastEditTime: 2020-11-17 13:12:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\src\features\dashboard\TableCard.js
 */
import React from 'react';
// import PropTypes from 'prop-types';

export default function TableCard(props) {
  const { table, title } = props;
  return (
    <div className="dashboard-table-card">
      {title ? <div className="title">{title}</div> : ''}
      <div className="table" style={{ height: title ? '85%' : '100%' }}>
        {table}
      </div>
    </div>
  );
}

TableCard.propTypes = {};
TableCard.defaultProps = {};
