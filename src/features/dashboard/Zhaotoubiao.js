/*
 * @Author: your name
 * @Date: 2020-11-12 17:41:36
 * @LastEditTime: 2020-11-17 16:34:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\src\features\dashboard\Zhaotoubiao.js
 */
import React, { useEffect, useState } from 'react';
import req from './comment/request';
import { WindChart } from '../common/components/govChart';
import TableCard from './TableCard';
// import DashTable from '../dashboard/components/DashTable';
// import PropTypes from 'prop-types';

export default function Zhaotoubiao(props) {
  const { cityCode } = props;
  const [biddingProgress, setBiddingProgress] = useState([]);
  const [procureMethod, setProcureMethod] = useState([]);
  const [biddingAmount, setBiddingAmount] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    let startTime = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).format(
      'yyyyMMdd',
    );
    let endTime = new Date().format('yyyyMMdd');

    //招投标进度
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: '7871887c640311eaaa93fa163ed85ccc',
        endDate: endTime,
        sectorIds: cityCode,
        startDate: startTime,
      },
    }).then(result => {
      let data = [];
      if (result) {
        for (let r of result.dataList) {
          data.push({
            name: r.progressTypeName,
            value: r.statics,
          });
        }
        setBiddingProgress(data);
      }
    });

    //采购方式
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: '78718a9d640311eaaa93fa163ed85ccc',
        endDate: endTime,
        sectorIds: cityCode,
        startDate: startTime,
      },
    }).then(result => {
      let data = [];
      if (result) {
        for (let r of result.dataList) {
          data.push({
            name: r.purchaseWayName,
            value: r.statics,
          });
        }
        setProcureMethod(data);
      }
    });
    //采购金额
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: '78718ec2640311eaaa93fa163ed85ccc',
        endDate: endTime,
        sectorIds: cityCode,
        startDate: startTime,
      },
    }).then(result => {
      let data = [];
      if (result) {
        for (let r of result.dataList) {
          data.push({
            name: r.purchaseMoneyName,
            value: r.statics,
          });
        }
        setBiddingAmount(data);
      }
    });

    //品目类别
    req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
      params: {
        dataSetCode: '78718cc5640311eaaa93fa163ed85ccc',
        endDate: endTime,
        sectorIds: cityCode,
        startDate: startTime,
      },
    }).then(result => {
      let data = [];
      if (result) {
        for (let r of result.dataList) {
          data.push({
            name: r.categoryTypeName,
            value: r.statics,
          });
        }
        setCategory(data);
      }
    });
  }, [cityCode]);

  return (
    <div className="dashboard-zhaotoubiao">
      <div className="content-middle">
        <div>
          <TableCard
            title="招投标项目统计 - 招投标进度"
            table={
              biddingProgress.length !== 0 ? (
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
                      type: 'scroll',
                      orient: 'horizontal',
                      left: 'center',
                      bottom: '0%',
                    },
                    series: [
                      {
                        type: 'pie',
                        left: 'center',
                        radius: ['35%', '60%'],
                        center: ['50%', '48%'],
                        data: biddingProgress,
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
        <div>
          <TableCard
            title="招投标项目统计 - 采购方式"
            table={
              procureMethod.length !== 0 ? (
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
                      type: 'scroll',
                      orient: 'horizontal',
                      left: 'center',
                      bottom: 0,
                    },
                    series: [
                      {
                        type: 'pie',
                        // roseType: 'area',
                        left: 'center',
                        radius: ['35%', '60%'],
                        center: ['50%', '48%'],
                        data: procureMethod,
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
        <div>
          <TableCard
            title="招投标项目统计 - 品目类别"
            table={
              category.length !== 0 ? (
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
                      type: 'scroll',
                      orient: 'horizontal',
                      left: 'center',
                      bottom: 0,
                    },
                    series: [
                      {
                        type: 'pie',
                        avoidLabelOverlap: true,
                        left: 'center',
                        radius: ['35%', '60%'],
                        center: ['50%', '48%'],
                        z: 1,
                        data: category,
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
        <div>
          <TableCard
            title="招投标项目统计 - 采购金额"
            table={
              biddingAmount.length !== 0 ? (
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
                      type: 'scroll',
                      orient: 'horizontal',
                      left: 'center',
                      bottom: '0%',
                    },
                    series: [
                      {
                        type: 'pie',
                        avoidLabelOverlap: true,
                        left: 'center',
                        radius: ['35%', '60%'],
                        center: ['50%', '48%'],
                        data: biddingAmount,
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
      </div>
    </div>
  );
}

Zhaotoubiao.propTypes = {};
Zhaotoubiao.defaultProps = {};
