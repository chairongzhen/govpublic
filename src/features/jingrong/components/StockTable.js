/*
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-09-09 14:39:19
 * @LastEditTime: 2020-10-15 16:18:22
 * @Descripttion: 
 */
import React from 'react';

const tes = new RegExp(/^\-/);

const StockTable = (props) => {
return (
  <table className="stock-table">
    <thead>
      <tr>
        <th className="left-table-firstlast-column"></th>
        <th className="left-table-second-column">名称</th>
        <th>现价</th>
        <th>涨跌</th>
        <th>涨跌幅</th>
        <th>年初至今</th>
        <th className="left-table-firstlast-column"></th>
      </tr>
    </thead>
    <tbody>
      {props.domestic?.map((item) => {
        return (
          <tr key={item.key}>
            <td className="left-table-firstlast-column"></td>
            <td className="left-table-second-column">{item.name}</td>
            <td className={tes.test(item.data[1]) ? "green-font" : ""}>{item.data[0]}</td>
            <td className={tes.test(item.data[1]) ? "green-font" : ""}>{item.data[1]}</td>
            <td className={tes.test(item.data[1]) ? "green-font" : ""}>{`${item.data[2]}%`}</td>
            <td className={tes.test(item.data[3]) ? "green-font" : ""}>{`${parseFloat(item.data[3]).toFixed(2)}%`}</td>
            <td className="left-table-firstlast-column"></td>
          </tr>
        )
      })}
    </tbody>
  </table>
)
}

export default StockTable;