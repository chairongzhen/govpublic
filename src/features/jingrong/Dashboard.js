/*
 * @overview:
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-09-24 14:09:03
 */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import LeftLayout from './components/LeftLayout';
import CenterLayout from './components/CenterLayout';
import RightLayout from './components/RightLayout';
import News from './components/News';

export default function Dashboard() {
  const [displayNew, setDisplayNew] = useState(0);
  const [id, setId] = useState('');
  window.document.title = '上海城市运行“一网统管”金融风险监测';
  const newShow = id => {
    setDisplayNew(1);
    setId(id);
  };

  return (
    <div className="jinrong-dashboard">
      <LeftLayout />
      <CenterLayout />
      <RightLayout showNew={newShow} />
      <News display={displayNew} setDisplayNew={setDisplayNew} id={id} />
    </div>
  );
}

Dashboard.propTypes = {};
Dashboard.defaultProps = {};
