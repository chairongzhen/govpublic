/*
 * @Author: hcluo
 * @Date: 2020-05-07 14:48:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-16 20:34:46
 * @Description: 政府项目
 */
import React, { forwardRef, useEffect } from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
// import * as echarts from 'echarts/lib/echarts';
import * as echarts from 'echarts';
import registerTheme from './eChartTheme';
// import 'echarts/lib/component/dataset';
// import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/treemap';
// import 'echarts/lib/chart/map';
import 'echarts/map/js/china';
// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/grid';
// import 'echarts/lib/component/legendScroll';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/axisPointer';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/visualMap';
// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';
// import 'echarts/lib/component/geo';
import world from './world.json';
echarts.registerMap('world', world);
registerTheme(echarts);

// import * as echarts from 'echarts/lib/echarts';
/**
 * 中文文档： https://www.jianshu.com/p/f6c1c4618c22
 */
const WindCharts = forwardRef((props, ref) => {
  return <ReactEchartsCore ref={ref} echarts={echarts} {...props} />;
});

// class WindCharts extends React.Component {
//   constructor(props) {
//     super(props);
//     if (this.props) {
//     }
//   }

//   render() {
//     return <ReactEchartsCore ref={this.props.ref} echarts={echarts} {...this.props.props} />;
//   }
// }

WindCharts.propTypes = {};
WindCharts.defaultProps = {
  style: {
    width: '100%',
    height: '100%',
  },
  opts: {
    // renderer: 'svg',
  },
  theme: 'windTheme',
  notMerge: true,
  lazyUpdate: false,
  showLoading: false,

  option: {
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#337C9A',
        },
      },
      axisLabel: {
        color: '#6BCBFE',
      },
      // data: citiesInfo,
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: '#337C9A',
        },
      },
      axisLabel: {
        color: '#6BCBFE',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#307693',
          type: 'dotted',
          opacity: 0.5,
        },
      },
    },
  },
};

export default WindCharts;
