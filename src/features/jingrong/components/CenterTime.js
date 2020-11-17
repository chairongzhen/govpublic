/*
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-09-04 15:18:12
 * @Descripttion:
 */
import React, { useState, useEffect } from 'react';
import moment from 'miment';

export default function CenterTime() {
  const [nowTime, setNowTime] = useState('00时00分00秒');
  const [nowDate, setNowDate] = useState('2020年01月01日');
  useEffect(() => {
    const changeTime = () => {
      const date = moment();
      setNowDate(date.format('YYYY年MM月DD日'));
      setNowTime(date.format('hh时mm分ss秒'));
    };
    const intervalId = setInterval(() => {
      changeTime();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [setNowTime, setNowDate]);

  return (
    <div>
      <div id="time">{nowDate}</div>
      <div>上海城市运行“一网统管”金融风险监测</div>
      <div>{nowTime}</div>
    </div>
  );
}

CenterTime.propTypes = {};
CenterTime.defaultProps = {};
