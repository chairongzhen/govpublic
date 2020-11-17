/*
 * @Author: hcluo
 * @Date: 2020-07-08 16:41:53
 * @LastEditors: hcluo
 * @LastEditTime: 2020-09-04 10:55:57
 * @Description: 政府项目
 */

import find from 'lodash/find';
import commonRoute from '../features/common/route';
import zhangjiangRoute from '../features/zhangjiang/route';
import jingrongRoute from '../features/jingrong/route';
import dashboardRoute from '../features/dashboard/route';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.

// function App({ children }) {
//   return <div className="app-container">{children}</div>;
// }

const childRoutes = [commonRoute, zhangjiangRoute, jingrongRoute, dashboardRoute];

const routes = [
  {
    path: '/',
    // component: Layout,
    childRoutes: [
      ...childRoutes,
    ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
  },
];

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = find(route.childRoutes, child => child.isIndex);
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
