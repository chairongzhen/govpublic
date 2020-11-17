import React,{ useState } from 'react';
import { useSetMenu } from '../redux/hooks';


export default function Menu(props) {
  const { menu, setMenu } = useSetMenu();

  const onMenuClick = (current)=> {
    setMenu(current);
  }


  return (
    <>
      <div onClick={()=>onMenuClick({index: 0,title: "中国疫情现有确诊动态图"})}>
        <span className={menu.index === 0?"w_current":""}>全国地图</span>
      </div>
      <div onClick={()=>onMenuClick({index: 1,title: "各省疫情动态图"})}>
        <span className={menu.index === 1?"w_current":""}>各省对比</span>
      </div>
      <div onClick={()=>onMenuClick({index: 2,title: "全球疫情动态图"})}>
        <span className={menu.index === 2?"w_current":""}>全球地图</span>
      </div>
      <div onClick={()=>onMenuClick({index: 3,title: "国外疫情动态图"})}>
        <span className={menu.index === 3?"w_current":""}>国外对比</span>
      </div>
    </>
  );
};

Menu.propTypes = {};
Menu.defaultProps = {};
