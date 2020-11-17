import React, {useRef, forwardRef, useState } from 'react';
import { BarChartRace, dataHandle } from '../../common/components/govChart';
// import PropTypes from 'prop-types';
import useRequest from '../../common/requestHook';
import p4json from './p4.json'
import useInterval from 'ahooks/es/useInterval';
//更新时间
let useIntervalTime =60000*60*12;
const P4 = forwardRef((props,ref)=> {
 
    const [updateData, setUpdateData] = useState(0);
    const [data, status, request] = useRequest(() => {
      return { "MethodAlias": "GetSariCountryHistory", "Parameter": [] }
    }, [updateData])
    //定时发送
    useInterval(() => {
    setUpdateData((v)=>v+1)
    }, useIntervalTime);

  // 读取本地文件
  //  let data = p4json;
    let chartData=[];
    let dataList=Object.entries(data);
    let myDate=new Date();
    let year=myDate.getFullYear();
    let mouth=myDate.getMonth()+1;
    if(mouth<10){
      mouth="0"+mouth;
    }
    let day=myDate.getDate();
    if(day<10){
      day="0"+day;
    }
    let dataBuffer=year+"-"+mouth+"-"+day;
    for(let everyData of dataList){

        // everyData[1].sort((a,b)=>{
        //   return b.SureCount-a.SureCount;
        //  })
        let neweveryData=everyData[1].slice(1,17);
  
        for(let listData of neweveryData){
          let dataStart={
            empty:false,
            lastDate: ''
          }
          let string1 = everyData[0].substring(0, 4);
          let string2 = everyData[0].substring(4, 6);
          let string3 = everyData[0].substring(6, 8);
          let stringBuffer = string1 + "-" + string2 + "-" + string3;
          dataStart.valueDate = stringBuffer;
          dataStart.sectorId = listData.City;
          dataStart.t=listData.SureCount;
          dataStart.value = (Math.sqrt(listData.SureCount));
  
          if(stringBuffer!=dataBuffer&&listData.City!='中国'){
            chartData.push(dataStart);
          }
        }
      }
    

  return (
    <div className="zhangjiang-components-p-4">
      <div className="w_force_landscape">
        <BarChartRace
          ref={ref}
          chartStyle={{ height: '100%', width: '100%' }}
          chartConfig={props.chartConfig}
          data={chartData}
          id='p4'
          index = {props.index}
        />
      </div>
    </div>
  );
});
export default P4

P4.propTypes = {};
P4.defaultProps = {
  chartConfig: {
    barHeight: '.103rem',
    spaceBetween:'0.04rem',
    // unit: '人',
    labelSize: 10,
    maxNumber: 16,
    divideBy: 'sectorId',
    timeField: 'valueDate',
    nameField: 'sectorId',
    divideColorBy: 'sectorId',
    valueLabelField:'t',
    auto_sort:false,
    interval_time:0.8,
    left_margin:'0.5rem',
    bar_name_max:50
    // auto_play:true,
    // barInfoSize: 0,
    // color: { 上海: '#00aEc7' },
  },
  
};