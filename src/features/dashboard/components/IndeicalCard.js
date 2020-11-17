/*
 * @overview:
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-11-15 13:54:55
 */
import React from 'react';
// import PropTypes from 'prop-types';
import moreSvg from '../images/more.svg';

export default function IndeicalCard({ children, title, titleTabsStyle, more, moreClick }) {
  return (
    <div className="dashboard-components-indeical-card">
      {title ? (
        <div className="indeical-card-title" style={{ ...titleTabsStyle }}>
          <div className="title-one">{title}</div>
          {more ? (
            <div className="moren mouse" onClick={moreClick}>
              详情
              <img src={moreSvg} alt="" />
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="indeical-card-content">{children}</div>
    </div>
  );
}

IndeicalCard.propTypes = {};
IndeicalCard.defaultProps = {};
