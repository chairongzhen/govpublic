/*
 * @Author: your name
 * @Date: 2020-11-13 18:51:33
 * @LastEditTime: 2020-11-17 17:09:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\src\features\dashboard\LandAuction.js
 */
import React, { useEffect, useState } from 'react';
import req from './comment/request';
import { WindChart } from '../common/components/govChart';
import TableCard from '../dashboard/TableCard';
// import PropTypes from 'prop-types';

export default function LandAuction(props) {
  const { cityCode } = props;
  const [seriesData1, setSeriesData1] = useState([]);
  const [time1, setTime1] = useState([]);
  const [seriesData2, setSeriesData2] = useState([]);
  const [seriesData4, setSeriesData4] = useState([]);
  const [purveyAreaSum, setPurveyAreaSum] = useState('');
  const [bargainAreaSum, setBargainAreaSum] = useState('');

  useEffect(() => {
    let startTime = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).format(
      'yyyyMMdd',
    );
    let endTime = new Date().format('yyyyMMdd');
    //图表1，3
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        cloudCalcType: '2',
        dataSetCode: '47e0cad32df811eaaa93fa163ed85ccc',
        endDate: endTime,
        pageNo: '1',
        pageSize: '100',
        sectorIds: cityCode,
        startDate: startTime,
      },
    }).then(result => {
      if (result) {
        let purveyArea = [];
        let bargainArea = [];
        let bargainFloorPrice = [];
        let time = [];
        let purveyAreaSumtemp = 0;
        let bargainAreaSumtemp = 0;
        for (let r of result.dataList) {
          if (r?.funcId === 'purveyArea') {
            let temp = r?.value / 10000;
            purveyArea.push(temp);
            purveyAreaSumtemp += temp;
          }
          if (r?.funcId === 'bargainArea') {
            let temp = r?.value / 10000;
            bargainArea.push(temp);
            bargainAreaSumtemp += temp;
          }
          if (r?.funcId === 'bargainFloorPrice') {
            let temp = r?.value;
            bargainFloorPrice.push(temp);
          }
          time.indexOf(r.valueDate) === -1 && time.push(r?.valueDate);
        }
        setSeriesData1([purveyArea, bargainArea, bargainFloorPrice]);
        setTime1(time);
        setPurveyAreaSum(purveyAreaSumtemp.toFixed(2) + '万㎡');
        setBargainAreaSum(bargainAreaSumtemp.toFixed(2) + '万㎡');
      }
    });
    //图表2,3
    let tempdata2 = [];
    for (let use of [
      { name: '住宅用地', code: '811001000,811003000' },
      { name: '商业用地', code: '811002000' },
      { name: '工业用地', code: '811004000' },
      { name: '其他用地', code: '811005000' },
    ]) {
      req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
        params: {
          sectorIds: cityCode, //地区
          startDate: startTime,
          endDate: endTime,
          pageNo: '1',
          compareType: '2', //土地成交：2  土地供应：1
          use: use.code, //全部:"",住宅:"811001000,811003000",商业:"811002000",工业:"811004000",其他:"811005000"
          pageSize: '500',
          dataSetCode: 'a36355b4258711eb9d41fa163e16a4de',
        },
      }).then(result => {
        tempdata2.push({ name: use.name, value: result?.dataList[0]?.tradedLandArea });
        if (tempdata2.length === 4) {
          setSeriesData2(tempdata2);
        }
      });
    }

    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds: '0301010000', //地区
        startDate: startTime,
        endDate: endTime,
        pageNo: '1',
        compareType: '2', //土地成交：2  土地供应：1
        use: '', //全部:"",住宅:"811001000,811003000",商业:"811002000",工业:"811004000",其他:"811005000"
        pageSize: '10',
        dataSetCode: '47e0cbef2df811eaaa93fa163ed85ccc',
      },
    }).then(result => {
      let cities = [['product', '数量（宗）', '面积（万㎡）', '规划建筑面积（万㎡）']];
      for (let item of result.dataList) {
        cities.push([item.city, item.supplyLandNum, item.supplyLandArea, item.supplyArea]);
      }
      setSeriesData4(cities);
    });
  }, [cityCode]);
  return (
    <div className="dashboard-land-auction">
      <div className="content-middle">
        <div className="table1">
          <TableCard
            title="土地供应与成交面积统计"
            table={
              <div className="content-table">
                <div className="content-tableTitle">
                  <div className="content-tableTitle-box">
                    <div className="content-title-title">供应面积</div>
                    <div className="content-title-value">{purveyAreaSum}</div>
                  </div>
                  <div className="content-tableTitle-box">
                    <div className="content-title-title">成交面积</div>
                    <div className="content-title-value">{bargainAreaSum}</div>
                  </div>
                </div>
                <div className="content-tableChart">
                  {seriesData1.length !== 0 ? (
                    <WindChart
                      option={{
                        tooltip: {
                          trigger: 'axis',
                          padding: 5,
                          axisPointer: {
                            type: 'cross',
                          },
                        },
                        grid: {
                          right: '0%',
                          left: '0%',
                          bottom: '10%',
                          top: '10%',
                        },
                        legend: {
                          bottom: '0%',
                          textStyle: {
                            color: '#6BCBFE',
                          },
                        },
                        xAxis: [
                          {
                            type: 'category',
                            axisLine: {
                              lineStyle: {
                                color: '#337C9A',
                              },
                            },
                            axisLabel: {
                              color: '#6BCBFE',
                            },
                            data: time1,
                          },
                        ],
                        yAxis: [
                          {
                            type: 'value',
                            //   name: '万㎡',
                            position: 'left',
                            nameTextStyle: {
                              color: '#6BCBFE',
                            },
                            axisLine: {
                              lineStyle: {
                                color: '#337C9A',
                              },
                            },
                            axisLabel: {
                              color: '#6BCBFE',
                            },
                            splitLine: {
                              show: true,
                              lineStyle: {
                                color: '#307693',
                                type: 'dotted',
                                opacity: 0.5,
                              },
                            },
                          },
                        ],
                        series: [
                          {
                            name: '供应土地面积',
                            type: 'bar',
                            data: seriesData1[0],
                            itemStyle: {
                              color: '#2FB7FD',
                            },
                            // itemStyle: {
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
                            // },
                          },
                          {
                            name: '成交土地面积',
                            type: 'bar',
                            data: seriesData1[1],
                            // itemStyle: {
                            //   color: {
                            //     type: 'linear',
                            //     x: 0,
                            //     y: 0,
                            //     x2: 0,
                            //     y2: 1,
                            //     colorStops: [
                            //       {
                            //         offset: 0,
                            //         color: '#F7BF44',
                            //         // 0% 处的颜色
                            //       },
                            //       {
                            //         offset: 1,
                            //         color: '#C56C12', // 100% 处的颜色
                            //       },
                            //     ],
                            //     global: false, // 缺省为 false
                            //   },
                            // },
                          },
                        ],
                      }}
                    />
                  ) : (
                    'loading'
                  )}
                </div>
              </div>
            }
          />
        </div>

        <div className="table2">
          <TableCard
            title="招投标项目统计 - 招投标进度"
            table={
              seriesData2.length ? (
                <WindChart
                  option={{
                    tooltip: {
                      trigger: 'item',
                    },
                    label: {
                      show: true,
                      formatter: ({ name, percent }) => {
                        // if (name.length > 10) name = name.substring(0, 15) + '...';
                        return `${name}:${percent}%`;
                      },
                    },
                    legend: {
                      bottom: '0%',
                      textStyle: {
                        color: '#6BCBFE',
                      },
                    },
                    series: [
                      {
                        type: 'pie',
                        left: 'center',
                        radius: ['40%', '70%'],
                        center: ['50%', '45%'],
                        data: ['住宅用地', '商业用地', '工业用地', '其他用地'].map(item => {
                          for (let d of seriesData2) {
                            if (d.name === item) {
                              return d;
                            }
                          }
                        }),
                        emphasis: {
                          itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                          },
                        },
                      },
                    ],
                  }}
                />
              ) : (
                'loading'
              )
            }
          />
        </div>
        <div className="table3">
          <TableCard
            title="上海土地成交楼盘价趋势图"
            table={
              seriesData1.length ? (
                <WindChart
                  option={{
                    tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                        type: 'cross',
                        label: {
                          backgroundColor: '#6a7985',
                        },
                      },
                    },
                    legend: {
                      bottom: '0%',
                      textStyle: {
                        color: '#6BCBFE',
                      },
                    },
                    grid: {
                      right: '0%',
                      left: '0%',
                      bottom: '10%',
                      top: '5%',
                      containLabel: true,
                    },
                    xAxis: [
                      {
                        type: 'category',
                        axisLine: {
                          lineStyle: {
                            color: '#337C9A',
                          },
                        },
                        axisLabel: {
                          color: '#6BCBFE',
                        },
                        axisTick: {
                          alignWithLabel: true,
                        },
                        data: time1,
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        axisLine: {
                          lineStyle: {
                            color: '#337C9A',
                          },
                        },
                        axisLabel: {
                          color: '#6BCBFE',
                        },
                        splitLine: {
                          show: true,
                          lineStyle: {
                            color: '#307693',
                            type: 'dotted',
                            opacity: 0.5,
                          },
                        },
                      },
                    ],
                    series: [
                      {
                        name: '成交土地楼盘价',
                        type: 'line',
                        itemStyle: {
                          color: '#1582BB ',
                          borderColor: '#FFF',
                        },
                        lineStyle: {
                          color: '#1582BB',
                        },
                        animation: false,
                        smooth: 0.5,
                        symbol: 'circle',
                        symbolSize: 6,
                        areaStyle: {},
                        data: seriesData1[2],
                      },
                    ],
                  }}
                />
              ) : (
                'loading'
              )
            }
          />
        </div>
        <div className="table4">
          <TableCard
            title="土地供应统计-总计"
            table={
              seriesData4.length ? (
                <WindChart
                  option={{
                    grid: {
                      right: '0%',
                      left: '0%',
                      bottom: '10%',
                      top: '5%',
                    },
                    legend: {
                      bottom: '0%',
                      textStyle: {
                        color: '#6BCBFE',
                      },
                    },
                    tooltip: {
                      trigger: 'axis',
                      padding: 5,
                      axisPointer: {
                        type: 'cross',
                      },
                      formatter: function(params) {
                        var relVal;

                        relVal = params[0].name || '';
                        for (var i = 0; i < params.length; i++) {
                          let marker =
                            typeof params[i].color === 'string'
                              ? params[i].marker
                              : `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params[i].color.colorStops[0].color};"></span>`;
                          relVal +=
                            '<br/>' +
                            marker +
                            params[i].seriesName +
                            ' : ' +
                            params[i].value[i + 1];
                          let result = /^unit\((?<unit>.*)\)/.exec(params[i].seriesId);
                          if (result) {
                            relVal += result.groups.unit;
                          }
                        }
                        return relVal;
                      },
                    },
                    xAxis: {
                      type: 'category',
                      axisLine: {
                        lineStyle: {
                          color: '#337C9A',
                        },
                      },
                      axisLabel: {
                        color: '#6BCBFE',
                      },
                      // data: citiesInfo,
                    },
                    yAxis: [
                      {
                        axisLine: {
                          lineStyle: {
                            color: '#337C9A',
                          },
                        },
                        axisLabel: {
                          color: '#6BCBFE',
                        },
                        splitLine: {
                          show: true,
                          lineStyle: {
                            color: '#307693',
                            type: 'dotted',
                            opacity: 0.5,
                          },
                        },
                      },
                      {
                        axisLine: {
                          lineStyle: {
                            color: '#337C9A',
                          },
                        },
                        axisLabel: {
                          color: '#6BCBFE',
                        },
                        splitLine: {
                          show: true,
                          lineStyle: {
                            color: '#307693',
                            type: 'dotted',
                            opacity: 0.5,
                          },
                        },
                      },
                    ],
                    dataset: { source: seriesData4 },
                    series: [
                      {
                        type: 'line',
                        yAxisIndex: 1,
                        symbol: 'circle',
                        symbolSize: 6,
                        itemStyle: {
                          color: '#c56c12',
                          borderColor: '#FFF',
                        },
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
                        // },
                      },
                      {
                        type: 'bar',
                        barWidth: '25%',
                        itemStyle: {
                          color: '#2FB7FD',
                        },
                        //     type: 'linear',
                        //     x: 0,
                        //     y: 0,
                        //     x2: 0,
                        //     y2: 1,
                        //     colorStops: [
                        //       {
                        //         offset: 0,
                        //         color: '#F7BF44',
                        //         // 0% 处的颜色
                        //       },
                        //       {
                        //         offset: 1,
                        //         color: '#C56C12', // 100% 处的颜色
                        //       },
                        //     ],
                        //     global: false, // 缺省为 false
                        //   },
                        // },
                      },
                      {
                        type: 'bar',
                        barWidth: '25%',
                        // itemStyle: {
                        //   color: '#4c9899',
                        // },
                        //   {
                        //     type: 'linear',
                        //     x: 0,
                        //     y: 0,
                        //     x2: 0,
                        //     y2: 1,
                        //     colorStops: [
                        //       {
                        //         offset: 0,
                        //         color: '#5FFDFF',
                        //         // 0% 处的颜色
                        //       },
                        //       {
                        //         offset: 1,
                        //         color: '#4C9899', // 100% 处的颜色
                        //       },
                        //     ],
                        //     global: false, // 缺省为 false
                        //   },
                        // },
                      },
                    ],
                  }}
                />
              ) : (
                'loading'
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

LandAuction.propTypes = {};
LandAuction.defaultProps = {};
