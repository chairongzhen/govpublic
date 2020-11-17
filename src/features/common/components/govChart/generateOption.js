/*
 * @Author: hcluo
 * @Date: 2020-07-20 09:39:12
 * @LastEditors: hcluo
 * @LastEditTime: 2020-07-21 11:58:35
 * @Description: 政府项目
 */
import { dataHandle } from './dataHandle';

export default function generateOption(
  type,
  originalData = [],
  rule = [],
  series = { key: false, values: [] },
  chartConfig,
) {
  let data = dataHandle(originalData, rule, series);
  switch (type) {
    case 'pie':
      return new pieOption(data);
    case 'echart':
      return originalData;
    default:
      if (Array.isArray(type)) return new BasicOption(type, data, chartConfig);
  }
}
class BasicOption {
  constructor(type, data, chartConfig = {}) {
    this.xAxis = Object.assign(chartConfig.xAxis || {}, {
      type: 'category',
      data: data[0].map(i => i.name),
    });

    if (Array.isArray(chartConfig.yAxis)) {
      this.yAxis = chartConfig.yAxis;
    } else {
      this.yAxis = {
        type: 'value',
      };
    }
    this.series = [];
    if (Array.isArray(type)) {
      type.map((item, i) => {
        this.series.push({
          type: item,
          data: data[i],
          yAxisIndex: i & 1,
        });
      });
    } else {
      this.series.push({
        type: type,
        data: data,
      });
    }
  }
}

class pieOption {
  constructor(data) {
    // this.legend = {
    //   bottom: 10,
    //   left: 'center',
    // };
    this.series = {
      type: 'pie',
      data: data[0],
    };
  }
}
