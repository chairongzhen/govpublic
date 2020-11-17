/*
 * @overview:
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-11-17 00:06:47
 */
/*
 * @overview:
 */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import select from '../images/zcSelect.svg';
import unselect from '../images/xdSelect.svg';

export default function Tabs({ titleTabs, titleTabsStyle, titleContentStyle, children }) {
  const [page, setPage] = useState(0);
  return (
    <div className="dashboard-components-tabs">
      {titleTabs ? (
        <div className="tabs-title" style={{ ...titleTabsStyle }}>
          {titleTabs.map((item, index) => {
            return (
              <div
                className="title-k mouse"
                style={{ ...titleContentStyle }}
                key={index}
                onClick={() => {
                  setPage(index);
                }}
              >
                <img className={page === index ? '' : 'display-none'} src={select} alt={{ item }} />
                <img src={unselect} alt={{ item }} />
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      ) : null}

      <div className="tabs-content">
        {React.Children.map(children, (value, index) => {
          console.log('zjf---index:', index);
          return <div className={page === index ? '' : 'display-none'}>{value.props.children}</div>;
        })}
      </div>
    </div>
  );
}

Tabs.propTypes = {};
Tabs.defaultProps = {};
