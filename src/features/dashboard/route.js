/*
 * @overview:
 * @Author: jfzhang.Jeffry
 * @LastEditors: Please set LastEditors
 * @Date: 2020-11-13 14:32:09
 */
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Navigation,
  Zhaotoubiao,
  Investment,
  EnterpriseOverview,
  Data,
  Topic,
  P2,
  P1,
  LandAuction,
  InvestAttract,
  IndustryBalance,
  ListedCompanies,
} from './';

export default {
  path: 'dashboard',
  component: Navigation,
  childRoutes: [
    { path: 'ztb', component: Zhaotoubiao },
    { path: 'invest', component: Investment },
    { path: 'enterpriseoverview', component: EnterpriseOverview },
    { path: 'data', component: Data },
    { path: 'topic', component: Topic },
    { path: 'land', component: LandAuction },
    { path: 'investment', component: InvestAttract },
    { path: 'balance', component: IndustryBalance },
    { path: 'listedcompanies', component: ListedCompanies },
  ],
};
