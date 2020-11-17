/*
 * @Author: hcluo
 * @Date: 2020-09-03 16:38:40
 * @LastEditors: jfzhang.Jeffry
 * @LastEditTime: 2020-09-04 14:50:51
 * @Description:
 */
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Menu, P1, P2, P3, P4, Scroll } from './';
import { useSetMenu } from './redux/hooks';
import useRequest from '../common/requestHook';
import useInterval from 'ahooks/es/useInterval';
import { stat } from 'fs-extra';
import p1 from '../zhangjiang/components/p1.json'

//更新时间间隔
let useIntervalTime = 60000 * 60 * 12;
export default function Dashboard(props) {

  const { menu, setMenu } = useSetMenu();

  const [updateData, setUpdateData] = useState(0);
  const [data, status, request] = useRequest(() => {
    return { "MethodAlias": "GetSariProvinceHistory", "Parameter": [] }
  }, [updateData])
  let chartData = [];
  //定时发送
	useInterval(() => {
    setUpdateData((v)=>v+1)
	}, useIntervalTime);  
  // // 读取本地文件
  // const data=p1;

  const P1Ref = useRef();
  const P2Ref = useRef();
  const P3Ref = useRef();
  const P4Ref = useRef();
  const PSRef = useRef();

  let dataList = Object.entries(data);
  let timeLineData = [];
  for (let everyData of dataList) {
    timeLineData.push(everyData[0]);
  }


  window.P2Ref = P2Ref
  const [index, setIndex] = useState(0)



  // p1 38.5  30MS

   // p3 71.8   60MS  // p3  setOption - timeline  74.9

   // P2 18.7  15.7

   // P4 65.7  63

  // P1 P4 109 102
  const updateChart = async (index) => {
    P1Ref.current(index);
    P4Ref.current.click(index, true);
    P3Ref.current(index);
    P2Ref.current.click(index, true)
  }
  useEffect(()=>{ 
    let int = setInterval(() => {
      if(P2Ref.current.click&&P4Ref.current.click&&P3Ref.current&&P1Ref.current){
        PSRef.current.click()
        clearInterval(int)
      }
    }, 100);
  },[])

 

  return (
  
    <div className="zhangjiang-dashboard">
      
      <div>
        <div>
          <div> {menu.title}</div>
          <div>
            <img src="./assets/images/logo.png" alt="" />
          </div>
        </div>

      </div>
      <div className="China-Sum">全国累计确诊</div>
      <div className="World-Sum">国外累计确诊</div>
      <div>
        <div >
          <P1 ref={P1Ref} index={0} />
        </div>
        <div>
          <P3 ref={P3Ref} index={0} />
        </div>
        <div>
          {/* {p2} */}
          <P2 ref={P2Ref} index={0} />
          {/* <P4 ref={P2Ref} index={0} /> */}
        </div>
        <div>
          <P4 ref={P4Ref} index={0} />
        </div>
        <div>
          <Scroll timeLineData={timeLineData.slice(1, timeLineData.length - 1)} updateChart={updateChart} ref={PSRef}/>
        </div>
      </div>
    </div>

  );
}


Dashboard.propTypes = {};
Dashboard.defaultProps = {};
