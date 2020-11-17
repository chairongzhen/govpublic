/*
 * @overview:
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-11-13 14:46:26
 */
import React, { useEffect, useRef, useState } from 'react';
// import { req as request } from '../common/request';
import request from './comment/request';
import { WindChart } from '../common/components/govChart';
import echarts from 'echarts';
import cityMapCode from './components/default/cityMapCode';
import IndeicalCard from './components/IndeicalCard';
import shanghai from './components/default/shanghai.json';
import returnButton from './images/returnButton.svg';
import fangda from './images/fangda.svg';
import suoxiao from './images/suoxiao.svg';
import center1 from './images/center1.svg';
import SvgCom from './components/SvgCom';
// import PropTypes from 'prop-types';

echarts.registerMap('shanghai', shanghai);
let eMap = null;
const generateChart = (data, barName, barUnit, barFormat, lineName, lineUnit, lineFormat) => {
  return (
    <WindChart
      option={{
        legend: {
          bottom: -4,
          textStyle: {
            color: '#6BCBFE',
            fontSize: 12,
          },
        },
        grid: { top: 24, bottom: 25 },
        tooltip: {
          show: true,
        },
        xAxis: {
          type: 'category',
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: { color: '#337C9A' },
          },
          axisTick: {
            show: false,
            // lineStyle: { color: '#CECECE' },
          },
          axisLabel: {
            show: true,
            color: '#6BCBFE',
          },
        },
        yAxis: [
          {
            type: 'value',
            // name: barUnit,
            min: function(value) {
              return value.min > 0 ? 0 : value.min;
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#307693',
                type: 'dashed',
              },
            },
            axisLine: {
              show: true,
              lineStyle: { color: '#337C9A' },
            },
            axisTick: {
              show: false,
              //   lineStyle: { color: '#CECECE' },
            },
            axisLabel: {
              color: '#6BCBFE',
            },
          },
          {
            type: 'value',
            // name: lineUnit,
            min: function(value) {
              return value.min > 0 ? 0 : value.min;
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: { color: '#337C9A' },
            },
            axisTick: {
              show: false,
              //   lineStyle: { color: '#CECECE' },
            },
            axisLabel: {
              color: '#6BCBFE',
            },
          },
        ],
        dataset: {
          dimensions: ['time', 'value', 'tongbi'],
          source: data,
        },
        series: [
          {
            name: barName,
            type: 'bar',
            itemStyle: {
              color: '#2FB7FD',
            },
            animation: false,
            tooltip: {
              formatter: barFormat,
            },
            barWidth: 20,
          },
          {
            name: lineName,
            type: 'line',
            symbolSize: 6,
            itemStyle: {
              color: '#C56C12 ',
              borderColor: '#FFF',
            },
            lineStyle: {
              color: '#A56120',
            },
            yAxisIndex: 1,
            animation: false,

            smooth: 0.5,
            tooltip: {
              formatter: lineFormat,
            },
          },
        ],
      }}
    />
  );
};

export default function EnterpriseOverview({ cityCode, setCurrentCity, setCurrentPage }) {
  const chartRef = useRef(null);
  const [left1, setLeft1] = useState([]);
  const [left2, setLeft2] = useState([]);
  const [left3, setLeft3] = useState([]);
  const [center1, setCenter1] = useState({});
  const [center2, setCenter2] = useState({});
  const [center3, setCenter3] = useState({});
  const [right1, setRight1] = useState({});
  const [right2, setRight2] = useState({});
  const [echartZIndex, setEchartZIndex] = useState(1);
  useEffect(() => {
    request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds: cityCode || '0301010000',
        endDate: '20201231',
        dataType: 'list',
        dataSetCode: '430615ff2df811eaaa93fa163ed85ccc',
        funcIds: '10600112,10600112$10600112',
        startDate: '20090102',
      },
    })
      .then(res => {
        console.log('zjf---------------res:', res);
        if (res?.dataList?.length) {
          const tempLeftUp = [];
          for (let i = 0; i < res.dataList.length; i += 2) {
            const t = {};
            t.time = res.dataList[i].valueDate?.substr(0, 4);
            t.value = res.dataList[i].value?.toFixed(2);
            t.tongbi = res.dataList[i + 1].value?.toFixed(2);
            tempLeftUp.push(t);
          }
          setLeft1(tempLeftUp);

          const tempcenter = {};
          tempcenter.currentValue = res.dataList?.[res.dataList.length - 2]
            ? res.dataList[res.dataList.length - 2].value?.toFixed(2)
            : 0;
          tempcenter.sequential = res.dataList?.[res.dataList.length - 1]
            ? res.dataList[res.dataList.length - 1].value?.toFixed(2)
            : 0;
          setCenter1(tempcenter);
        }
      })
      .catch(error => {
        setLeft1([]);
        setCenter1([]);
      });
    request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds: cityCode || '0301010000',
        endDate: '20201231',
        dataType: 'list',
        dataSetCode: '430615ff2df811eaaa93fa163ed85ccc',
        funcIds: '10400048,10400048$10400048',
        startDate: '20090102',
      },
    })
      .then(res => {
        if (res?.dataList?.length) {
          const tempLeftUp = [];
          for (let i = 0; i < res.dataList.length; i += 2) {
            const t = {};
            t.time = res.dataList[i].valueDate?.substr(0, 4);
            t.value = res.dataList[i].value?.toFixed(2);
            t.tongbi = res.dataList[i + 1].value?.toFixed(2);
            tempLeftUp.push(t);
          }
          setLeft2(tempLeftUp);

          const tempcenter = {};
          tempcenter.currentValue = res.dataList?.[res.dataList.length - 2]
            ? res.dataList[res.dataList.length - 2].value?.toFixed(2)
            : 0;
          tempcenter.sequential = res.dataList?.[res.dataList.length - 1]
            ? res.dataList[res.dataList.length - 1].value?.toFixed(2)
            : 0;
          setCenter2(tempcenter);
        }
      })
      .catch(error => {
        request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
          params: {
            sectorIds: '0301010000',
            endDate: '20201231',
            dataType: 'list',
            dataSetCode: '430615ff2df811eaaa93fa163ed85ccc',
            funcIds: '10400048,10400048$10400048',
            startDate: '20090102',
          },
        })
          .then(res => {
            if (res?.dataList?.length) {
              const tempLeftUp = [];
              for (let i = 0; i < res.dataList.length; i += 2) {
                const t = {};
                t.time = res.dataList[i].valueDate?.substr(0, 4);
                t.value = res.dataList[i].value?.toFixed(2);
                t.tongbi = res.dataList[i + 1].value?.toFixed(2);
                tempLeftUp.push(t);
              }
              setLeft2(tempLeftUp);

              const tempcenter = {};
              tempcenter.currentValue = res.dataList?.[res.dataList.length - 2]
                ? res.dataList[res.dataList.length - 2].value?.toFixed(2)
                : 0;
              tempcenter.sequential = res.dataList?.[res.dataList.length - 1]
                ? res.dataList[res.dataList.length - 1].value?.toFixed(2)
                : 0;
              setCenter2(tempcenter);
            }
          })
          .catch(error => {
            setLeft2([]);
            setCenter2([]);
          });
        // setLeft2([]);
        // setCenter2([]);
      });
    request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds: cityCode || '0301010000',
        endDate: '20201231',
        dataType: 'list',
        dataSetCode: '430615ff2df811eaaa93fa163ed85ccc',
        funcIds: '10800002,10800002$10800002',
        startDate: '20090102',
      },
    })
      .then(res => {
        if (res?.dataList?.length) {
          const tempLeftUp = [];
          for (let i = 0; i < res.dataList.length; i += 2) {
            const t = {};
            t.time = res.dataList[i].valueDate?.substr(0, 4);
            t.value = res.dataList[i].value?.toFixed(2);
            t.tongbi = res.dataList[i + 1].value?.toFixed(2);
            tempLeftUp.push(t);
          }
          setLeft3(tempLeftUp);

          const tempcenter = {};
          tempcenter.currentValue = res.dataList?.[res.dataList.length - 2]
            ? res.dataList[res.dataList.length - 2].value?.toFixed(2)
            : 0;
          tempcenter.sequential = res.dataList?.[res.dataList.length - 1]
            ? res.dataList[res.dataList.length - 1].value?.toFixed(2)
            : 0;
          setCenter3(tempcenter);
        }
      })
      .catch(error => {
        setLeft3([]);
        setCenter3([]);
      });
    /* request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds: cityCode || '0301010000',
        endDate: '20201231',
        freq: '6',
        dataSetCode: '1eb539e3312f11eaaa93fa163ed85ccc',
        funcIds: '10600112',
        startDate: '20080103',
      },
    })
      .then(res => {
        const tempcenter = {};
        tempcenter.currentValue = res.currentValue ? res.currentValue.toFixed(2) : 0;
        tempcenter.sequential = res.sequential ? res.sequential.toFixed(2) : 0;
        setCenter1(tempcenter);
      })
      .catch(error => {
        setCenter1([]);
      }); */
    /* request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds: cityCode || '0301010000',
        endDate: '20201231',
        freq: '6',
        dataSetCode: '1eb539e3312f11eaaa93fa163ed85ccc',
        funcIds: '10400048',
        startDate: '20090102',
      },
    })
      .then(res => {
        const tempcenter = {};
        tempcenter.currentValue = res.currentValue ? res.currentValue.toFixed(2) : 0;
        tempcenter.sequential = res.sequential ? res.sequential.toFixed(2) : 0;
        setCenter2(tempcenter);
      })
      .catch(error => {
        setCenter2([]);
      }); */
    /* request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds: cityCode || '0301010000',
        endDate: '20201231',
        freq: '6',
        dataSetCode: '1eb539e3312f11eaaa93fa163ed85ccc',
        funcIds: '10800002',
        startDate: '20090102',
      },
    })
      .then(res => {
        const tempcenter = {};
        tempcenter.currentValue = res.currentValue ? res.currentValue.toFixed(2) : 0;
        tempcenter.sequential = res.sequential ? res.sequential.toFixed(2) : 0;
        setCenter3(tempcenter);
      })
      .catch(error => {
        setCenter3([]);
      }); */
    request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds: cityCode || '0301010000',
        pageNo: '1',
        pageSize: '500',
        dataSetCode: 'a9c811b53c3011eaaa93fa163ed85ccc',
        dealMarket: '1',
      },
    })
      .then(res => {
        if (res?.dataList && res.dataList.length > 0) {
          const tempRight = { CompaniesAmount: 0, TotalMarket: 0, TotalAssets: 0, NetProfit: 0 };
          res.dataList.map(item => {
            tempRight.CompaniesAmount += Number(item.CompaniesAmount);
            tempRight.TotalMarket += Number(item.TotalMarket);
            tempRight.TotalAssets += Number(item.TotalAssets);
            tempRight.NetProfit += Number(item.NetProfit);
          });
          tempRight.TotalMarket = (tempRight.TotalMarket / 10000).toFixed(2);
          tempRight.TotalAssets = (tempRight.TotalAssets / 100000000).toFixed(2);
          tempRight.NetProfit = (tempRight.NetProfit / 100000000).toFixed(2);
          setRight1(tempRight);
        }
      })
      .catch(error => {
        setRight1([]);
      });
    request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds: cityCode || '0301010000',
        pageNo: '1',
        pageSize: '1000',
        dataSetCode: 'a296b4053c3911eaaa93fa163ed85ccc',
      },
    })
      .then(res => {
        if (res?.dataList && res.dataList.length > 0) {
          const tempRight = { compNum: 0, money: 0 };
          let frist = res.dataList[0].industry,
            second = res.dataList[1].industry,
            thrid = res.dataList[2].industry;
          res.dataList.map(item => {
            tempRight.compNum += Number(item.compNum);
            tempRight.money += Number(item.money);
          });
          tempRight.money = (tempRight.money / 10000).toFixed(2);
          setRight2(old => {
            return {
              ...old,
              compNum: tempRight.compNum,
              money: tempRight.money,
              frist,
              second,
              thrid,
            };
          });
        }
      })
      .catch(error => {
        setRight2([]);
      });
    request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds: cityCode || '0301010000',
        pageNo: '1',
        pageSize: '500',
        dataSetCode: 'a9c814b43c3011eaaa93fa163ed85ccc',
      },
    })
      .then(res => {
        if (res?.dataList && res.dataList.length > 0) {
          const tempRight = { CompaniesAmount: 0 };
          res.dataList.map(item => {
            if (item.EnterpriseNature === '民营企业') {
              tempRight.CompaniesAmount += item.CompaniesAmount;
            }
          });
          setRight2(old => {
            return {
              ...old,
              CompaniesAmount: tempRight.CompaniesAmount,
            };
          });
        }
      })
      .catch(error => {
        setRight2([]);
      });
    /* fetch(host + '/govweb/mapJson/province/shanghai.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //   'wind.sessionid': session,
        'User-Agent': navigator.userAgent,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        console.log('zjf---resq:-----------------', res);
        
      }); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityCode]);

  useEffect(() => {
    // todo 待优化
    request('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        sectorIds:
          '0301010103,0301010104,0301010105,0301010107,0301010108,0301010109,0301010110,0301010111,0301010112,0301010113,0301010114,0301010115,0301010116,0301010117,0301010102,0301010101,',
        pageNo: '1',
        pageSize: '500',
        dataSetCode: 'a29882e63c3911eaaa93fa163ed85ccc',
      },
    }).then(res2 => {
      if (res2.dataList && res2.dataList.length > 0) {
        const tempRight = [];
        res2.dataList.forEach(item => {
          const t = {};
          if (item.areaCode === cityCode) {
            t.selected = true;
          }
          t.cityCode = item.areaCode;
          t.name = cityMapCode[item.areaCode];
          t.value = item.compNum;
          tempRight.push(t);
        });

        // console.log('zjf---tempRight:', tempRight);
        const chartFunc = () => {
          if (chartRef.current) {
            eMap = echarts.init(chartRef.current);
            eMap.setOption({
              //   backgroundColor: '#fff',
              tooltip: {
                trigger: 'item',
                // backgroundColor: '#FFFFCC',
                // borderColor: '#FFFFCC',
                // showDelay: 0,
                // hideDelay: 0,
                // enterable: true,
                // transitionDuration: 0,
                // extraCssText: 'z-index:100',
                formatter: function(params, ticket, callback) {
                  //根据业务自己拓展要显示的内容
                  var res = '';
                  var name = params.name;
                  var value = params.value;
                  res = '<span>' + name + '</span><br/>' + '数据：<span>' + value + '</span>';
                  return res;
                },
              },
              /* legend: {
                        orient: 'vertical',
                        top: 'top',
                        left: 'right',
                        data: ['credit_pm2.5'],
                        textStyle: {
                          color: '#fff',
                        },
                      }, */
              visualMap: {
                //颜色的设置  dataRange
                show: false,
                x: 'left',
                y: 'center',
                seriesIndex: [1],
                min: 50000,
                max: 500000,
                text: ['高', '低'], // 文本，默认为数值文本
                textStyle: {
                  color: '#fff',
                },
                inRange: {
                  color: [
                    // '#fec723',
                    // '#fdca31',
                    // '#fdce3f',
                    // '#fdd14d',
                    // '#fdd55b',
                    // '#fdd86a',
                    // '#fddc78',
                    // '#fddf86',
                    // '#fde394',
                    // '#fde6a2',
                  ],
                },
              },
              /* geo: {
                      map: 'shanghai',
                      // left: '350',
                      itemStyle: {
                        //地图区域的多边形 图形样式
                        color: '#fff',
                        normal: {
                          //是图形在默认状态下的样式
                          label: {
                            show: true, //是否显示标签
                            textStyle: {
                              color: '#ff0',
                            },
                          },
      
                          borderWidth: 1,
                          borderColor: 'rgba(37,124,169)',
                          shadowColor: '#e8e8e8',
                          shadowOffsetY: 15,
                          shadowOffsetX: 8,
                        },
                      },
                    }, */
              series: [
                {
                  name: 'credit_pm2.5',
                  type: 'effectScatter',
                  //   left: '150',
                  coordinateSystem: 'geo',
                  //   zoom: echartZIndex,
                  roam: true,
                  data: tempRight,
                  symbolSize: function(val) {
                    return val[2] / 5;
                  },
                  showEffectOn: 'render',
                  rippleEffect: {
                    brushType: 'stroke',
                  },
                  hoverAnimation: true,
                  label: {
                    normal: {
                      show: false,
                      formatter: '{b}',
                      //   position: 'bottom',
                      color: '#fff',
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: '#10f9ff',
                      shadowBlur: 0,
                      shadowColor: '#05C3F9',
                    },
                  },
                  zlevel: 1,
                },
                {
                  type: 'map',
                  mapType: 'shanghai',
                  selectedMode: 'single',
                  coordinateSystem: 'geo',
                  //   left: '350',
                  zoom: echartZIndex,
                  //   aspectScale: 0.5,
                  roam: true, //是否开启鼠标缩放和平移漫游
                  itemStyle: {
                    //地图区域的多边形 图形样式
                    // color: ['rgb(11,85,142)', 'rgb(13,106,177)'],
                    normal: {
                      //是图形在默认状态下的样式
                      //   label: {
                      //     show: true, //是否显示标签
                      //     formatter: value => {
                      //       return value.name;
                      //     },
                      //     textStyle: {
                      //       color: '#FFFFFF',
                      //     },
                      //   },
                      borderWidth: 1,
                      borderColor: '#5FBEBF', //边框颜色
                      areaColor: '#1582BB', // 未点击
                    },
                    emphasis: {
                      //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                      label: {
                        show: false,
                        textStyle: {
                          color: 'transparent',
                        },
                      },
                      borderColor: '#4C9899',
                      areaColor: '#24B4FF', // 点击
                    },
                  },

                  data: tempRight,
                },
              ],
            });
            eMap.on('click', e => {
              setCurrentCity({
                chn: e.data.name,
                parentCode: '0300000000',
                treeLevel: 1,
                code: e.data.cityCode,
              });
              console.log('zjf---eeee:', e.data);
            });
            return;
          }
          setTimeout(() => {
            chartFunc();
          }, 200);
        };
        chartFunc();
      }
    });
    return () => {
      eMap?.off('click');
    };
  }, [cityCode, echartZIndex, setCurrentCity]);

  const centerCard = (title, data1, data2, color, unit) => {
    return (
      <div className="center-one-frist">
        <div className="frist-content">
          <div className="title">{title}</div>
          <div className="data">{data1}</div>
          <div className="unit">{unit}</div>
          <div className="data_bili" style={{ color }}>
            {data2}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-enterprise-overview">
      <div className="left">
        <div className="left-1">
          <IndeicalCard title="房地产开发投资完成额">
            {left1.length > 0
              ? generateChart(
                  left1,
                  '房地产开发投资完成额',
                  '亿元',
                  function(params) {
                    return `${params.data.time}年：${params.data.value}亿元`;
                  },
                  '房地产开发投资完成额同比',
                  '%',
                  function(params) {
                    return `${params.data.time}年：${params.data.tongbi}%`;
                  },
                )
              : '暂无数据'}
          </IndeicalCard>
        </div>
        <div className="left-2">
          <div>
            <IndeicalCard title="实际外商直接投资">
              {left2.length > 0
                ? generateChart(
                    left2,
                    '实际外商直接投资（美元）',
                    '万元',
                    function(params) {
                      return `${params.data.time}年：${params.data.value}亿元`;
                    },
                    '实际外商直接投资（美元）同比',
                    '%',
                    function(params) {
                      return `${params.data.time}年：${params.data.tongbi}%`;
                    },
                  )
                : '暂无数据'}
            </IndeicalCard>
          </div>
        </div>
        <div className="left-3">
          <IndeicalCard title="社会消费零售总额">
            {left3.length > 0
              ? generateChart(
                  left3,
                  '社会消费品零售总额',
                  '元',
                  function(params) {
                    return `${params.data.time}年：${params.data.value}亿元`;
                  },
                  '社会消费品零售总额同比',
                  '%',
                  function(params) {
                    return `${params.data.time}年：${params.data.tongbi}%`;
                  },
                )
              : '暂无数据'}
          </IndeicalCard>
        </div>
      </div>
      <div className="center">
        <div className="center-one">
          <IndeicalCard>
            <SvgCom center1={center1} center2={center2} center3={center3}></SvgCom>
            {/* <div className="center-one-all">
              {centerCard(
                '房地产开发投资完成额',
                center1.currentValue ? `${center1.currentValue}万亿元` : '暂无数据',
                center1.sequential ? `${center1.sequential}%` : '暂无数据',
                Number(center1.sequential) > 0 ? 'red' : 'green',
              )}
              {centerCard(
                '实际外商直接投资',
                center2.currentValue ? `${center2.currentValue}万亿元` : '暂无数据',
                center2.sequential ? `${center2.sequential}%` : '暂无数据',
                Number(center2.sequential) > 0 ? 'red' : 'green',
              )}
              {centerCard(
                '社会消费零售总额',
                center3.currentValue ? `${center3.currentValue}万亿元` : '暂无数据',
                center3.sequential ? `${center3.sequential}%` : '暂无数据',
                Number(center3.sequential) > 0 ? 'red' : 'green',
              )}
            </div> */}
          </IndeicalCard>
        </div>
        <div className="center-two">
          <div
            className="chongzhi mouse"
            onClick={() => {
              setCurrentCity('0300000000');
              setEchartZIndex(1);
            }}
          >
            <img src={returnButton} alt="" />
          </div>
          <div
            className="fangda mouse"
            onClick={() => {
              setEchartZIndex(old => {
                return old + 0.1;
              });
            }}
          >
            <img src={fangda} alt="" />
          </div>
          <div
            className="suoxiao mouse"
            onClick={() => {
              setEchartZIndex(old => {
                return old - 0.1;
              });
            }}
          >
            <img src={suoxiao} alt="" />
          </div>
          <div className="echartRef" ref={chartRef}></div>
        </div>
      </div>
      <div className="right">
        <div className="right-1">
          <div>
            <IndeicalCard
              title="上市公司汇总统计"
              more
              moreClick={() => {
                setCurrentPage({
                  name: '上市企业',
                  url: '/dashboard/listedcompanies',
                  contrastPattern: false,
                  components: 'ListedCompanies',
                });
              }}
            >
              <div className="center-one-all right-card-size">
                {centerCard(
                  '企业数量',
                  right1.CompaniesAmount ? `${right1.CompaniesAmount}` : '暂无数据',
                  undefined,
                  undefined,
                  '家',
                )}
                {centerCard(
                  '总市值',
                  right1.NetProfit ? `${right1.NetProfit}` : '暂无数据',
                  undefined,
                  undefined,
                  '家',
                )}
                {centerCard(
                  '总资产',
                  right1.TotalAssets ? `${right1.TotalAssets}` : '暂无数据',
                  undefined,
                  undefined,
                  '亿元',
                )}
                {centerCard(
                  '净利润',
                  right1.TotalMarket ? `${right1.TotalMarket}` : '暂无数据',
                  undefined,
                  undefined,
                  '亿元',
                )}
              </div>
            </IndeicalCard>
          </div>
        </div>

        <div className="right-2">
          <div>
            <IndeicalCard
              title="主要民企汇总统计"
              more
              moreClick={() => {
                setCurrentPage({
                  name: '主要民企',
                  url: '/dashboard/invest',
                  contrastPattern: true,
                  components: 'Investment',
                });
              }}
            >
              <div className="center-one-all right-card-size">
                {centerCard(
                  '企业数量',
                  right2.CompaniesAmount ? `${right2.CompaniesAmount}` : '暂无数据',
                  undefined,
                  undefined,
                  '家',
                )}
                {centerCard(
                  '上市企业',
                  right2.compNum ? `${right2.compNum}` : '暂无数据',
                  undefined,
                  undefined,
                  '家',
                )}
                {centerCard(
                  `注册资本`,
                  right2.money ? `${right2.money}` : '暂无数据',
                  undefined,
                  undefined,
                  '亿元',
                )}
                <div className="center-one-frist">
                  <div className="frist-content">
                    <div className="title">{'主要行业'}</div>
                    <div className="data2" style={{ marginTop: '0.052083rem' }}>
                      {right2.frist ? `${right2.frist}` : '暂无数据'}
                    </div>
                    <div className="data2">{right2.frist ? `${right2.second}` : '暂无数据'}</div>
                    <div className="data2">{right2.frist ? `${right2.thrid}` : '暂无数据'}</div>
                  </div>
                </div>
              </div>
            </IndeicalCard>
          </div>
        </div>
      </div>
    </div>
  );
}

EnterpriseOverview.propTypes = {};
EnterpriseOverview.defaultProps = {};
