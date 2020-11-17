/*
 * @Author: hcluo
 * @Date: 2020-09-03 16:36:36
 * @LastEditors: hcluo
 * @LastEditTime: 2020-09-04 09:39:49
 * @Description:
 */
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { Dashboard } from './';

export default {
  path: 'yq',
  childRoutes: [
    { path: '', component: Dashboard },
  ],
};
