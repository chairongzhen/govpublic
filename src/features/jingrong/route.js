/*
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-09-10 09:17:27
 * @LastEditTime: 2020-09-11 18:02:47
 * @Descripttion: 
 */
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { Dashboard } from './';

export default {
  path: 'yyzx',
  childRoutes: [
    { path: '', component: Dashboard },
  ],
};
