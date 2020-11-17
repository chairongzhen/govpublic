/*
 * @overview:
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-11-14 22:27:30
 */
import React, { useEffect, useState } from 'react';
import { WindChart } from '../common/components/govChart';
// import { req as request } from '../common/request';
import request from './comment/request';
import IndeicalCard from './components/IndeicalCard';
import BarChartRace from '../common/components/govChart/BarChartRace/barChartRace';
import citys from './components/default/city';
import Tabs from './components/Tabs';
// import reques from './comment/request';
// import PropTypes from 'prop-types';
const tes = new RegExp(/^\-/);
const isZero = (nowPrice, last_close) => {
  if (!last_close) {
    return nowPrice;
  }
  if (parseFloat(nowPrice) === 0) {
    return last_close;
  }
  return nowPrice;
};

// todo 包装
export default function ListedCompanies({ cityCode }) {
  const [tab1_1, setTab1_1] = useState([]);
  const [tab1_2, setTab1_2] = useState([]);
  const [tab2, setTab2] = useState([]);
  const [tab3, setTab3] = useState([]);
  const [tab4, setTab4] = useState([]);
  useEffect(() => {
    request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds: cityCode || '0301010000',
        pageNo: '1',
        pageSize: '500',
        dataSetCode: 'a9c811b53c3011eaaa93fa163ed85ccc',
        dealMarket: '1',
      },
    }).then(res => {
      if (res?.dataList && res.dataList.length > 0) {
        const temptab1 = [];
        const temptab2 = [];
        const tempRight = { TotalMarket: 0, TotalAssets: 0, NetProfit: 0 };
        res.dataList.map(item => {
          const t = {};
          const t2 = {};
          t.name = item.Industry;
          t2.name = item.Industry;
          t.value = item.CompaniesAmount;
          t2.value = Number(item.TotalMarket).toFixed(2);
          temptab1.push(t);
          temptab2.push(t2);

          tempRight.TotalMarket += Number(item.TotalMarket);
          tempRight.TotalAssets += Number(item.TotalAssets);
          tempRight.NetProfit += Number(item.NetProfit);
        });
        tempRight.TotalMarket = (tempRight.TotalMarket / 10000).toFixed(2);
        tempRight.TotalAssets = (tempRight.TotalAssets / 100000000).toFixed(2);
        tempRight.NetProfit = (tempRight.NetProfit / 100000000).toFixed(2);
        const tempkk = [
          {
            value: tempRight.TotalMarket,
            name: '总市值',
          },
          {
            value: tempRight.TotalAssets,
            name: '总资产',
          },
          {
            value: tempRight.NetProfit,
            name: '净利润',
          },
        ];
        setTab1_1(temptab1);
        console.log('zc-=-=-', temptab1);
        setTab1_2(temptab2);
        tempkk.sort((frist, second) => {
          if (Number(frist.value) > Number(second.value)) {
            return 1;
          } else {
            return -1;
          }
        });
        setTab3(tempkk);
      }
    });
    // todo 换需要session的
    request('/govwebapi/gov/web/api/bs-citycenter/index/quotation/get', {
      params: {
        codes: '000001.SH,000688.SH,000300.SH,399106.SZ,399102.SZ,881001.WI',
        date: '20201116',
      },
    }).then(res => {
      if (res) {
        const temptab4 = [
          {
            key: '000001.SH',
            name: '上证指数',
          },
          {
            key: '000688.SH',
            name: '科创50',
          },
          {
            key: '000300.SH',
            name: '沪深300',
          },
          {
            key: '399106.SZ',
            name: '深证综指',
          },
          {
            key: '399102.SZ',
            name: '创业板综',
          },
          {
            key: '881001.WI',
            name: '万得全A',
          },
        ];
        temptab4.forEach(item => {
          const t = res[item.key];
          const newData = [];
          newData.push(isZero(t?.nowPrice, t?.last_close));
          newData.push(t?.upAndDown);
          newData.push(t?.upAndDownRate);
          newData.push(t?.yearToDateRate);
          item.data = newData;
        });
        setTab4(temptab4);
      }
    });
  }, [cityCode]);
  useEffect(() => {
    request('/govwebapi/gov/web/api/listedCompany/governmentMA', {
      params: {
        cloudCalcType: '7',
        sectorIds: '0301010000',
        pageNo: '1',
        pageSize: '50',
        dataSetCode: '6c45cb1a5ebe11eaaa93fa163ed85ccc',
        type: '1',
        years: '10',
      },
    }).then(res => {
      res.dataList.map(item => {
        item.value = item.value * 10000;
        item.valueDate = item.valueDate - 60;
        citys.children.map(change => {
          if (change.code === item.sectorId) {
            item.sectorId = change.chn;
          }
        });
      });
      setTab2(res.dataList);
    });
  }, []);
  const dynamicChartConfig = {
    nameField: 'sectorId',
    divideColorBy: 'sectorId',
    divideBy: 'sectorId',
    valueField: 'value',
    timeField: 'valueDate',
    barHeight: 15,
    labelSize: 18,
    maxNumber: 8,
    format: ',.0f',
  };
  return (
    <div className="dashboard-listed-companies">
      <div className="listed-companies-1">
        <div>
          {/* todo 闪动 */}
          <IndeicalCard title="上市公司行业分布">
            {/* todo 动画 */}
            <Tabs
              titleTabs={['按企业数量', '按总市值']}
              titleTabsStyle={{ color: '#2BF9FF', width: '72%', fontSize: '0.083333rem' }}
            >
              <div>
                {tab1_1.length > 0 ? (
                  <WindChart
                    option={{
                      animation: false,
                      backgroundColor: 'rgb(0, 0, 0, 0)',
                      legend: {
                        bottom: 0,
                      },
                      tooltip: {
                        show: true,
                      },

                      series: [
                        {
                          type: 'treemap',
                          //   leafDepth: 1,
                          roam: false,
                          nodeClick: 'link',
                          visibleMin: 300,
                          data: tab1_1,
                          breadcrumb: { show: false },
                          top: '1%',
                          nodeClick: false,
                          zoomToNodeRatio: 0.0 * 0.0,
                          emphasis: {
                            //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                            label: {
                              show: true,
                              position: 'top',
                              distance: 0,
                              textStyle: {
                                color: 'transparent',
                              },
                            },
                            borderColor: '#4C9899',
                            areaColor: '#24B4FF', // 点击
                          },
                        },
                      ],
                    }}
                  />
                ) : (
                  '暂无数据'
                )}
              </div>
              <div>
                {tab1_2.length > 0 ? (
                  <WindChart
                    option={{
                      animation: false,
                      legend: {
                        bottom: 0,
                      },
                      //   grid: { top: 40, bottom: 25 },
                      tooltip: {
                        show: true,
                      },

                      series: [
                        {
                          type: 'treemap',
                          visibleMin: 300,
                          data: tab1_2,
                          breadcrumb: { show: false },
                        },
                      ],
                    }}
                  />
                ) : (
                  '暂无数据'
                )}
              </div>
            </Tabs>
            {/* <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="按企业数量" key="1">
                {tab1_1.length > 0 ? (
                  <WindChart
                    option={{
                      backgroundColor: 'rgb(0, 0, 0, 0)',
                      legend: {
                        bottom: 0,
                      },
                      //   grid: { top: 40, bottom: 25 },
                      //   tooltip: {
                      //     show: true,
                      //   },

                      series: [
                        {
                          type: 'treemap',
                          //   leafDepth: 1,
                          roam: false,
                          nodeClick: 'link',
                          visibleMin: 300,
                          data: tab1_1,
                          breadcrumb: { show: false },
                          emphasis: {
                            //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                            label: {
                              show: true,
                              position: 'top',
                              distance: 0,
                              textStyle: {
                                color: 'transparent',
                              },
                            },
                            borderColor: '#4C9899',
                            areaColor: '#24B4FF', // 点击
                          },
                        },
                      ],
                    }}
                  />
                ) : (
                  '暂无数据'
                )}
              </Tabs.TabPane>
              <Tabs.TabPane tab="按总市值" key="2">
                {tab1_2.length > 0 ? (
                  <WindChart
                    option={{
                      legend: {
                        bottom: 0,
                      },
                      //   grid: { top: 40, bottom: 25 },
                      tooltip: {
                        show: true,
                      },

                      series: [
                        {
                          type: 'treemap',
                          visibleMin: 300,
                          data: tab1_2,
                          breadcrumb: { show: false },
                        },
                      ],
                    }}
                  />
                ) : (
                  '暂无数据'
                )}
              </Tabs.TabPane>
            </Tabs> */}
          </IndeicalCard>
        </div>
      </div>
      <div className="listed-companies-2">
        <div>
          <IndeicalCard title="地区变化比较">
            {tab2.length > 0 ? (
              <BarChartRace id={'SYQW'} chartConfig={dynamicChartConfig} data={tab2} />
            ) : (
              '暂无数据'
            )}
          </IndeicalCard>
        </div>
      </div>
      <div className="listed-companies-3">
        <div>
          <IndeicalCard title="上市公司行业统计">
            {tab3.length > 0 ? (
              <WindChart
                option={{
                  grid: { top: 20, bottom: 25, left: 30, right: 80 },
                  tooltip: {
                    show: true,
                    formatter: value => {
                      return `${value.data.name}：${value.data.value}亿元`;
                    },
                  },
                  textStyle: {
                    color: '#6BCBFE',
                  },
                  axisLine: {
                    lineStyle: { color: '#337C9A' },
                  },
                  xAxis: [
                    {
                      type: 'value',
                      position: 'top',
                      //坐标轴
                      axisLine: {
                        show: false,
                      },
                      //刻度
                      axisTick: {
                        show: false,
                      },
                      splitLine: {
                        show: true,
                        lineStyle: {
                          type: 'dashed',
                          width: 1,
                          color: '#307693',
                        },
                      },
                    },
                    {
                      type: 'value',
                      position: 'bottom',
                      //坐标轴
                      axisLine: {
                        show: true,
                        lineStyle: {
                          color: '#337C9A',
                        },
                      },
                      //刻度
                      axisTick: {
                        show: false,
                      },
                      splitLine: {
                        show: false,
                      },
                    },
                  ],
                  yAxis: [
                    {
                      type: 'category',
                      splitLine: {
                        show: false,
                      },
                      axisLine: {
                        show: true,
                        lineStyle: {
                          color: '#337C9A',
                        },
                      },
                      axisTick: {
                        show: false,
                      },
                    },
                  ],
                  dataset: {
                    dimensions: ['name', 'value'],
                    source: tab3,
                  },

                  series: [
                    {
                      type: 'bar',
                      itemStyle: {
                        color: {
                          type: 'linear',
                          x: 1,
                          y: 0,
                          x2: 0,
                          y2: 0,
                          colorStops: [
                            {
                              offset: 0,
                              color: '#6FCDFF',
                              // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: '#1579B3', // 100% 处的颜色
                            },
                          ],
                          global: false, // 缺省为 false
                        },
                      },
                      // data: tab3,
                      //   animation: false,
                      barWidth: 20,
                      label: {
                        show: true,
                        position: 'right',
                        color: '#F68717',
                        fontSize: 16,
                      },
                    },
                  ],
                }}
              />
            ) : (
              '暂无数据'
            )}
          </IndeicalCard>
        </div>
      </div>
      <div className="listed-companies-4">
        <div>
          <IndeicalCard title="上市公司行业分布">
            <div className="companies-4-table">
              <table className="stock-table">
                <thead>
                  <tr>
                    <th className="left-table-second-column">名称</th>
                    <th>现价</th>
                    <th>涨跌</th>
                    <th>涨跌幅</th>
                    <th>年初至今</th>
                  </tr>
                </thead>
                <tbody>
                  {tab4
                    ? tab4.map(item => {
                        return (
                          <tr key={item.key}>
                            <td className="left-table-second-column">{item.name}</td>
                            <td className={tes.test(item.data[1]) ? 'green-font' : ''}>
                              {item.data[0]}
                            </td>
                            <td className={tes.test(item.data[1]) ? 'green-font' : ''}>
                              {item.data[1]}
                            </td>
                            <td
                              className={tes.test(item.data[1]) ? 'green-font' : ''}
                            >{`${item.data[2]}%`}</td>
                            <td
                              className={tes.test(item.data[3]) ? 'green-font' : ''}
                            >{`${parseFloat(item.data[3]).toFixed(2)}%`}</td>
                          </tr>
                        );
                      })
                    : '暂无数据'}
                </tbody>
              </table>
            </div>
          </IndeicalCard>
        </div>
      </div>
    </div>
  );
}

ListedCompanies.propTypes = {};
ListedCompanies.defaultProps = {};
