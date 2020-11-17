/*
 * @overview:
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-11-13 20:54:57
 */
export default {
  '1': [
    {
      name: '企业概览',
      url: '/dashboard/enterpriseoverview',
      contrastPattern: false,
      components: 'EnterpriseOverview',
    },
    {
      name: '上市企业',
      url: '/dashboard/listedcompanies',
      contrastPattern: false,
      components: 'ListedCompanies',
    },
    {
      name: '主要民企',
      url: '/dashboard/invest',
      contrastPattern: true,
      components: 'Investment',
    },
  ],
  '2': [
    {
      name: '土地大全',
      url: '/dashboard/land',
      contrastPattern: false,
      components: 'LandAuction',
    },
    {
      name: '招投标',
      url: '/dashboard/ztb',
      contrastPattern: false,
      components: 'Zhaotoubiao',
    },
    {
      name: '招商引资',
      url: '/dashboard/investment',
      contrastPattern: false,
      components: 'InvestAttract',
    },
  ],
};
