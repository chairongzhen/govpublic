/*
 * @Author: hcluo
 * @Date: 2020-05-07 14:48:04
 * @LastEditors: jfzhang.Jeffry
 * @LastEditTime: 2020-10-10 21:57:41
 * @Description: 政府项目
 */
import React, { useEffect, useState, useMemo, useRef, forwardRef } from 'react';
import WindChart from './windCharts/WindCharts';
import BarChartRace from '../barChartRace/barChartRace';
import { dataHandle } from './dataHandle';
import checkMap from './map/mapHandle';
import Option from './options';
// import { ActivityIndicator } from '@wind/wind-ui-mobile';
import { useBoolean, useVirtualList } from 'ahooks';

import * as echarts from 'echarts';
// import './index.less';

const destroyQueue = [];
let oldOnBeforeUnload = undefined;
if (typeof window.onbeforeunload === 'function') {
  oldOnBeforeUnload = window.onbeforeunload;
}
window.onbeforeunload = function(e) {
  while (destroyQueue.length) {
    let echartsInstance = destroyQueue.shift();
    console.log(
      '%c 🍱 echartsInstance: ',
      'font-size:20px;background-color: #7F2B82;color:#fff;',
      echartsInstance,
    );
    echarts.dispose(echartsInstance);
  }
  oldOnBeforeUnload?.();
};

const Chart = ({
  type,
  data,
  rule,
  option,
  location,
  hideLoading,
  instance,
  status,
  ...others
}) => {
  // const [loading, { setTrue, setFalse }] = useBoolean(hideLoading);
  const [loading, setLoading] = useState(status);
  useEffect(() => {
    setLoading(status);
  }, [status]);

  const [chartOption, setChartOption] = useState({});

  const dataset = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      if (rule) return dataHandle(data, rule);
      else return data;
    } else {
      return [];
    }
  }, [data, rule]);

  const onRef = ref => {
    if (instance) {
      instance.current = ref && ref.getEchartsInstance && ref.getEchartsInstance();
      // 将echart实例保存，在页面unload前销毁
      if (instance.current) destroyQueue.push(instance.current);
    }
  };

  useEffect(() => {
    let newOption = new Option(type);
    dataset.length > 0 && newOption.setDataset(dataset);
    option && newOption.merge(option);
    if (type === 'map') {
      setLoading(1);
      /**
       * 检查本地是否有地图，
       * 若无，发送网络请求，注册地图，并返回地图名称
       */
      checkMap(location).then(mapName => {
        newOption.setSeries([{ type: 'map', map: mapName }]);
        setChartOption(newOption);
        setLoading(3);
      });
    } else {
      if (dataset.length > 0) {
        setChartOption(newOption);
        setLoading(0);
      }
    }
  }, [location, dataset, type, option, setChartOption, setLoading]);

  /**
   *    状态      loading    !!dataset.length     结果
   *   初始值         1             0            loading
   *   发送请求       1             0            loading
   *   有数据返回     0             1             show
   *   返回空数据     0             0             nodata
   *    请求出错      2             0|1            error
   */
  switch (loading * 10 + !!dataset.length) {
    case 1:
    case 30:
    case 31:
      return <WindChart ref={onRef} option={chartOption} {...others} />;

    case 20:
    case 21:
    case 0:
      return (
        <div className="noDataCon">
          <img className="chartImg" alt="暂无数据" src="./assets/images/nodata.svg" />
          <div>暂无数据</div>
        </div>
      );

    case 10:
    case 11:
    case 'NaN':
    default:
      // return <ActivityIndicator />;
      return <div/>;
  }

  // if (loading) return <ActivityIndicator />;
  // else if (showLoading > 2) {
  //   console.error('%c 🍺 数据出错: ', 'font-size:20px;background-color: #E41A6A;color:#fff;');
  //   if (dataset.length === 0) {

  //   }
  //   return '数据出错';
  // } else {
  //   console.log(
  //     '%c 🍛 chartOption: ',
  //     'font-size:20px;background-color: #3F7CFF;color:#fff;',
  //     chartOption,
  //   );
  //   return <WindChart ref={onRef} option={chartOption} {...others} showLoading={!!showLoading} />;
  // }
};

Chart.propTypes = {};
Chart.defaultProps = {};

export default Chart;
export { Option, WindChart, BarChartRace, dataHandle };
