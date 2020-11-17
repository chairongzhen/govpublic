import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
//import { Tabs, Button } from '@wind/wind-ui';
import GovChart from '../common/components/govChart/GovChart';
import BarChartRace from '../common/components/govChart/BarChartRace/barChartRace';
import req from './comment/request';
import citys from './components/default/city';
import IndustryBalance from './IndustryBalance';
import { WindChart } from '../common/components/govChart';
import zcSelect from './images/zcSelect.svg';
import xdSelect from './images/xdSelect.svg';
import Tabs from './components/Tabs';
export default function Investment(props) {
  const [numData, setNumData] = useState([]);
  const [moneyData, setMoneyData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [countScales, setCountScales] = useState([]);
  const [countMarkettypes, setCountMarkettypes] = useState([]);
  useEffect(() => {
    //按企业数量
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: 'a296b4053c3911eaaa93fa163ed85ccc',
        pageNo: '1',
        pageSize: '50',
        sectorIds: props.cityCode,
      },
    }).then(res => {
      res.dataList.map(item => {
        item.name = item.industry;
        item.value = item.compNum;
      });
      setNumData(res.dataList);
    });
    //按注册资本
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: 'a296b4053c3911eaaa93fa163ed85ccc',
        pageNo: '1',
        pageSize: '50',
        sectorIds: props.cityCode,
      },
    }).then(res => {
      res.dataList.map(item => {
        item.name = item.industry;
        item.value = (item.money / 10000).toFixed(2);
      });
      setMoneyData(res.dataList);
    });
    //地区变化比较
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: '93c38b8a3c4111eaaa93fa163ed85ccc',
        dataType: 'all',
        endDate: `${new Date().format('yyyyMMdd')}`,
        funcIds: '10600112',
        pageNo: '1',
        pageSize: '500',
        sectorIds:
          '0301010103,0301010104,0301010105,0301010107,0301010108,0301010109,0301010110,0301010111,0301010112,0301010113,0301010114,0301010115,0301010116,0301010117,0301010102,0301010101,',
        startDate: '20101117',
      },
    }).then(res => {
      res.dataList.map(item => {
        citys.children.map(change => {
          if (change.code === item.areaCode) {
            item.areaCode = change.chn;
          }
        });
      });
      setCityData(res.dataList);
    });
    //主要民企规模
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: '677b2b0a3a9011eaaa93fa163ed85ccc',
        sectorIds: props.cityCode,
      },
    }).then(res => {
      const scaleData = [];
      res.dataList[0].scale.map(item => {
        if (item.scale === '1') {
          scaleData.push({ name: '大型企业', value: item.countScale });
        } else if (item.scale === '2') {
          scaleData.push({ name: '中型企业', value: item.countScale });
        } else if (item.scale === '3') {
          scaleData.push({ name: '小型企业', value: item.countScale });
        } else if (item.scale === '4') {
          scaleData.push({ name: '微型企业', value: item.countScale });
        }
      });
      setCountScales(scaleData);
    });
    //主要民企上市情况
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: '938216e33abb11eaaa93fa163ed85ccc',
        sectorIds: props.cityCode,
        //大型企业
        Scale: '1',
      },
    }).then(res => {
      const scaleData = [];
      res.dataList[0].markettype.map(item => {
        if (item.marketType === '1') {
          scaleData.push({ name: '非上市', value: item.countMarkettype });
        } else if (item.marketType === '2') {
          scaleData.push({ name: '主板上市', value: item.countMarkettype });
        } else if (item.marketType === '3') {
          scaleData.push({ name: '创业板上市', value: item.countMarkettype });
        } else if (item.marketType === '4') {
          scaleData.push({ name: '中小板上市', value: item.countMarkettype });
        } else if (item.marketType === '5') {
          scaleData.push({ name: '科创板上市', value: item.countMarkettype });
        }
      });
      setCountMarkettypes(scaleData);
    });
  }, [props.cityCode]);
  //table1.1
  const configNUm = {
    config: { legend: { show: false } },
    chart: {
      axisDataType: 'category',
      exchangeXY: false,
      exportTitle: '主要民企行业分布',
      exportDate: '截止日期：2020-11',
    },
    indicators: [
      {
        meta: { type: 'treemap', name: '企业数量', unit: ['', '家'], treemap: {} },
        data: numData,
      },
    ],
  };
  //table1.2
  const configMoney = {
    config: { legend: { show: false } },
    chart: {
      axisDataType: 'category',
      exchangeXY: false,
      exportTitle: '主要民企行业分布',
      exportDate: '截止日期：2020-11',
    },
    indicators: [
      {
        meta: { type: 'treemap', name: '注册资本', unit: ['', '亿元'], treemap: {} },
        data: moneyData,
      },
    ],
  };
  //table2
  const dynamicChartConfig = {
    nameField: 'areaCode',
    divideColorBy: 'areaCode',
    divideBy: 'areaCode',
    valueField: 'sumCompNum',
    timeField: 'year',
    barHeight: 16,
    labelSize: 18,
    maxNumber: 8,
    unit: '家',
    format: ',.0f',
  };
  //table3
  const config3 = {
    tooltip: {
      trigger: 'item',
      formatter: ({ marker, name, percent }) => {
        return marker + name + ':' + percent + '%';
      },
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      data: ['微型企业', '小型企业', '中型企业', '大型企业'],
      show: true,
      textStyle: {
        color: '#6BCBFE',
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        label: {
          show: true,
          //position: 'center',
          fontWeight: 'bold',
        },
        labelLine: {
          show: true,
        },
        data: countScales,
      },
    ],
  };
  //table4
  const config4 = {
    tooltip: {
      trigger: 'item',
      formatter: ({ marker, name, percent }) => {
        return marker + name + ':' + percent + '%';
      },
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      data: ['非上市', '主板上市', '创业板上市', '中小板上市', '科创板上市'],
      show: true,
      textStyle: {
        color: '#6BCBFE',
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        label: {
          show: true,
          //position: 'center',
          fontWeight: 'bold',
        },
        labelLine: {
          show: true,
        },
        data: countMarkettypes,
      },
    ],
  };
  //table4
  return (
    <>
      {!props.contrastPattern ? (
        <div className="dashboard-investment">
          <div>
            <div>主要民企行业分布</div>
            <div>
              <Tabs
                titleTabs={['按企业数量', '按注册资本']}
                titleTabsStyle={{ color: '#2BF9FF', width: '72%', fontSize: '0.083333rem' }}
              >
                <div>
                  {numData.length > 0 ? (
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
                            data: numData,
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
                    'loading'
                  )}
                </div>
                <div>
                  {moneyData.length > 0 ? (
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
                            data: moneyData,
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
                    'loading'
                  )}
                </div>
              </Tabs>

              {/* <Tabs
                style={{ background: 'rgb(0,0,0,0)' }}
                tabBarStyle={{ background: 'rgb(0,0,0,0)' }}
                type="line"
                size="small"
                defaultActiveKey="1"
              >
                <Tabs.TabPane tab="按企业数量" key="1">
                  <GovChart
                    chartConfig={configNUm}
                    chartStyle={({ width: '60%' }, { height: '1.5rem' })}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="按注册资本" key="2">
                  <GovChart
                    chartConfig={configMoney}
                    chartStyle={({ width: '60%' }, { height: '1.5rem' })}
                  />
                </Tabs.TabPane>
              </Tabs> */}
            </div>
          </div>
          <div>
            <div>地区变化比较</div>
            <div>
              <BarChartRace id={'SYQW'} chartConfig={dynamicChartConfig} data={cityData} />
            </div>
          </div>
          <div>
            <div> 主要民企规模</div>
            <div>
              <WindChart option={config3} />
            </div>
          </div>
          <div>
            <div>主要民企上市情况</div>
            <div>
              <WindChart option={config4} />
            </div>
          </div>
        </div>
      ) : (
        <IndustryBalance />
      )}
    </>
  );
}

Investment.propTypes = {};
Investment.defaultProps = {};
