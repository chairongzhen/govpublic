import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import GovChart from '../common/components/govChart/GovChart';
import req from './comment/request';
import citys from './components/default/city';
import { WindChart } from '../common/components/govChart';

export default function InvestAttract(props) {
  const [parkNum, setParkNum] = useState([]);
  const [cityNum, setCityNum] = useState([]);
  const [companyNum, setCompanyNum] = useState([]);
  const [park, setPark] = useState([]);
  const [industry, setIndustry] = useState([]);
  useEffect(() => {
    //园区类型分布
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: 'cd9823d260fd11eaaa93fa163ed85ccc',
        pageNo: '1',
        pageSize: '50',
        sectorIds: props.cityCode,
      },
    }).then(res => {
      res.dataList.map(item => {
        item.name = item.parkTypeName;
        item.value = item.countPark;
      });
      setPark(res.dataList);
    });
    //园区企业行业分布
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: 'cd98269d60fd11eaaa93fa163ed85ccc',
        pageNo: '1',
        pageSize: '50',
        sectorIds: props.cityCode,
      },
    }).then(res => {
      res.dataList.map(item => {
        item.name = item.windIndustryName;
        item.value = item.countCompany;
      });
      setIndustry(res.dataList);
    });

    //园区企业数量、园区数量
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: 'cd982c7a60fd11eaaa93fa163ed85ccc',
        pageNo: '1',
        pageSize: '50',
        sectorIds:
          '0301010103,0301010104,0301010105,0301010107,0301010108,0301010109,0301010110,0301010111,0301010112,0301010113,0301010114,0301010115,0301010116,0301010117,0301010102,0301010101,',
      },
    }).then(res => {
      const cityNums = [];
      const parkNums = [];
      const companyNums = [];
      res.dataList.map(item => {
        citys.children.map(change => {
          if (change.code === item.sectorId) {
            item.sectorId = change.chn;

            cityNums.push(item.sectorId);
            parkNums.push(item.countPark);
            companyNums.push(item.countCompany);
          }
        });
      });
      setCityNum(cityNums);
      setParkNum(parkNums);
      setCompanyNum(companyNums);
    });
  }, [props.cityCode]);
  //table1
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
        meta: { type: 'treemap', name: '园区数量', unit: ['', '个'], treemap: {} },
        data: park,
      },
    ],
  };
  //   {
  //     grid: { top: 20, bottom: 25, left: 20, right: 40 },
  //     tooltip: {
  //       show: true,
  //     },
  //     textStyle: {
  //       color: '#6BCBFE',
  //     },
  //     axisLine: {
  //       lineStyle: { color: '#337C9A' },
  //     },
  //     xAxis: [
  //       {
  //         type: 'value',
  //         position: 'top',
  //         //坐标轴
  //         axisLine: {
  //           show: false,
  //         },
  //         //刻度
  //         axisTick: {
  //           show: false,
  //         },
  //         splitLine: {
  //           show: true,
  //           lineStyle: {
  //             type: 'dashed',
  //             width: 1,
  //             color: '#307693',
  //           },
  //         },
  //       },
  //       {
  //         type: 'value',
  //         position: 'bottom',
  //         //坐标轴
  //         axisLine: {
  //           show: true,
  //           lineStyle: {
  //             color: '#337C9A',
  //           },
  //         },
  //         //刻度
  //         axisTick: {
  //           show: false,
  //         },
  //         splitLine: {
  //           show: false,
  //         },
  //       },
  //     ],
  //     yAxis: [
  //       {
  //         type: 'category',
  //         splitLine: {
  //           show: false,
  //         },
  //         axisLine: {
  //           show: true,
  //           lineStyle: {
  //             color: '#337C9A',
  //           },
  //         },
  //         axisTick: {
  //           show: false,
  //         },
  //       },
  //     ],

  //     series: [
  //       {
  //         type: 'bar',
  //         itemStyle: {
  //           color: {
  //             type: 'linear',
  //             x: 1,
  //             y: 0,
  //             x2: 0,
  //             y2: 0,
  //             colorStops: [
  //               {
  //                 offset: 0,
  //                 color: '#6FCDFF',
  //                 // 0% 处的颜色
  //               },
  //               {
  //                 offset: 1,
  //                 color: '#1579B3', // 100% 处的颜色
  //               },
  //             ],
  //             global: false, // 缺省为 false
  //           },
  //         },
  //         // data: tab3,
  //         //   animation: false,
  //         barWidth: 20,
  //         label: true,
  //       },
  //     ],
  //   }
  //table2
  const configPark = {
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
        data: industry,
      },
    ],
  };
  //table3
  const option3 = {
    tooltip: {
      show: true,
      padding: 5,
    },
    xAxis: {
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
      data: cityNum,
    },
    yAxis: {
      type: 'value',
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
        show: true,
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: '#307693',
        },
      },
    },
    textStyle: {
      color: '#6BCBFE',
    },
    axisLine: {
      lineStyle: { color: '#337C9A' },
    },
    series: [
      {
        data: parkNum,
        type: 'bar',
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)',
        },
        barWidth: 20,
        itemStyle: {
          color: '#2999D2',
          //   color: {
          //     type: 'linear',
          //     x: 0,
          //     y: 0,
          //     x2: 0,
          //     y2: 1,
          //     colorStops: [
          //       {
          //         offset: 0,
          //         color: '#6FCDFF',
          //         // 0% 处的颜色
          //       },
          //       {
          //         offset: 1,
          //         color: '#1579B3', // 100% 处的颜色
          //       },
          //     ],
          //     global: false, // 缺省为 false
          //   },
        },
        label: {
          show: false,
        },
      },
    ],
  };
  //table4
  const option4 = {
    grid: { top: 25, bottom: 10, left: 65, right: 30 },
    tooltip: {
      show: true,
      // padding: 5,
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
        data: cityNum,
        inverse: true,
      },
    ],
    series: [
      {
        data: companyNum,
        type: 'bar',
        itemStyle: {
          color: '#2999D2',
          //   color: {
          //     type: 'linear',
          //     x: 1,
          //     y: 0,
          //     x2: 0,
          //     y2: 0,
          //     colorStops: [
          //       {
          //         offset: 0,
          //         color: '#2999D2',
          //         // 0% 处的颜色
          //       },
          //       {
          //         offset: 1,
          //         color: '#1579B3', // 100% 处的颜色
          //       },
          //     ],
          //     global: false, // 缺省为 false
          //   },
        },
        // barWidth: 20,
        //label: true,
        label: {
          show: true,
          position: 'right',
          color: '#F68717',
        },
      },
    ],
  };
  return (
    <div className="dashboard-invest-attract">
      <div>
        <div>产业园区类型分布</div>
        <div style={{ color: '#1b5f82' }}>
          {park.length > 0 ? (
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
                    data: park,
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
      </div>
      <div>
        <div>产业园区企业行业分布</div>
        <div style={{ color: '#1b5f82' }}>
          {industry.length > 0 ? (
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
                    data: industry,
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
      </div>
      <div>
        <div>同级地区产业园区对比-园区数量(个)</div>
        <div style={{ color: '#1b5f82' }}>
          <WindChart option={option3} />
        </div>
      </div>
      <div>
        <div>同级地区产业园区对比-入驻园区企业数量(家)</div>
        <div style={{ color: '#1b5f82' }}>
          <WindChart option={option4} />
        </div>
      </div>
    </div>
  );
}

InvestAttract.propTypes = {};
InvestAttract.defaultProps = {};
