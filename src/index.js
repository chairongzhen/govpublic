/*
 * @Author: hcluo
 * @Date: 2020-07-09 11:43:56
 * @LastEditors: hcluo
 * @LastEditTime: 2020-08-21 17:00:09
 * @Description: 政府项目
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './common/flexible';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import './styles/index.less';

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
