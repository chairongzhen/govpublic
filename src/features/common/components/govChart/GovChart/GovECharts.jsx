/*
 * @Author: hcluo
 * @Date: 2020-05-07 14:48:04
 * @LastEditors: hcluo
 * @LastEditTime: 2020-05-08 16:37:49
 * @Description: 政府项目
 */
import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
// import worldJson from './world.json';
// echarts.registerMap('world', worldJson);

export default function GovECharts(props) {
  return (
    <ReactEchartsCore
      echarts={echarts}
      option={props.option}
      showLoading={false}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

GovECharts.propTypes = {};
GovECharts.defaultProps = {
  // option: {
  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       type: 'line',
  //     },
  //   ],
  // },
};
