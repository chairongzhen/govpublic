import React, { useEffect, forwardRef, useState } from 'react';
import { BarChartRace, dataHandle } from '../../common/components/govChart';
// import PropTypes from 'prop-types';
import useRequest from '../../common/requestHook';
import useInterval from 'ahooks/es/useInterval';
import p2json from './p1.json';

//更新时间
const useIntervalTime =60000*60*12;
const P2 = forwardRef((props, ref) => {
  
  const [updateData, setUpdateData] = useState(0);
  const [data, status, request] = useRequest(() => {
    return { "MethodAlias": "GetSariProvinceHistory", "Parameter": [] }
  }, [updateData])
  let chartData = [];
  //定时发送
	useInterval(() => {
    setUpdateData((v)=>v+1)
	}, useIntervalTime);
  
  //let data =p2json;
  let dataList = Object.entries(data);
  for (let everyData of dataList) {


    // everyData[1].sort((a,b)=>{
    //   return b.SureCount-a.SureCount;
    //  })

    let neweveryData=everyData[1].slice(0,16);

    for (let listData of neweveryData) {
      let dataStart = {
        empty: false,
        lastDate: ''
      }
      let string1 = everyData[0].substring(0, 4);
      let string2 = everyData[0].substring(4, 6);
      let string3 = everyData[0].substring(6, 8);
      let stringBuffer = string1 + "-" + string2 + "-" + string3;
      dataStart.valueDate = stringBuffer;
      dataStart.sectorId = listData.Province;
      dataStart.t = listData.SureCount;
      dataStart.value = Math.pow(listData.SureCount, 1 / 5);
      // dataStart.value = Math.log(listData.SureCount);
      chartData.push(dataStart);
    }
  }

  return (
    <div className="zhangjiang-components-p-2">
      <div className="w_force_landscape">
        <BarChartRace
          ref={ref}
          chartStyle={{ height: '100%', width: '100%' }}
          chartConfig={props.chartConfig}
          data={chartData.slice(3)}
          id='p2'
          index={props.index}
        />
      </div>
    </div>
  );
});
export default P2

P2.propTypes = {};
P2.defaultProps = {
  chartConfig: {
    barHeight: '.103rem',
    spaceBetween: '0.04rem',
    // unit: '人',
    labelSize: 10,
    maxNumber: 16,
    divideBy: 'sectorId',
    timeField: 'valueDate',
    nameField: 'sectorId',
    divideColorBy: 'sectorId',
    valueLabelField: 't',
    auto_sort: false,
    dateLabel_switch: false,
    interval_time: 0.8,
    // barInfoSize: 0,
    // color: { 上海: '#00aEc7' },
  },
};