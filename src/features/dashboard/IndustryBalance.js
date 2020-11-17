import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import PropTypes from 'prop-types';
import GovChart from '../common/components/govChart/GovChart';
import { Dropdown, Button, Radio, Checkbox, Icon, Menu } from 'antd';
import req from './comment/request';
import { Select } from 'antd';
import citys from './components/default/city';
import { WindChart } from '../common/components/govChart';
import Tabs from './components/Tabs';
export default function IndustryBalance(props) {
    const [numData, setNumData] = useState([]);
    const [moneyData, setMoneyData] = useState([]);
    const [countScales, setCountScales] = useState([]);
    const [countMarkettypes, setCountMarkettypes] = useState([]);
    const [city1, setCity1] = useState('0301010000');
    const [city2, setCity2] = useState('0301010112');
    const [numData1, setNumData1] = useState([]);
    const [moneyData1, setMoneyData1] = useState([]);
    const [countScales1, setCountScales1] = useState([]);
    const [countMarkettypes1, setCountMarkettypes1] = useState([]);
    //1.1
    useEffect(() => {
        //按企业数量
        req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
            params: {
                dataSetCode: 'a296b4053c3911eaaa93fa163ed85ccc',
                pageNo: '1',
                pageSize: '50',
                sectorIds: city1,
            },
        }).then((res) => {
            res.dataList.map((item) => {
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
                sectorIds: city1,
            },
        }).then((res) => {
            res.dataList.map((item) => {
                item.name = item.industry;
                item.value = (item.money / 10000).toFixed(2);
            });
            setMoneyData(res.dataList);
        });
        //主要民企规模
        req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
            params: {
                dataSetCode: '677b2b0a3a9011eaaa93fa163ed85ccc',
                sectorIds: city1,
            },
        }).then((res) => {
            const scaleData = [];
            res.dataList[0].scale.map((item) => {
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
                sectorIds: city1,
                //大型企业
                Scale: '1',
            },
        }).then((res) => {
            const scaleData = [];
            res.dataList[0].markettype.map((item) => {
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
    }, [city1]);
    //1.2
    useEffect(() => {
        //按企业数量
        req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
            params: {
                dataSetCode: 'a296b4053c3911eaaa93fa163ed85ccc',
                pageNo: '1',
                pageSize: '50',
                sectorIds: city2,
            },
        }).then((res) => {
            res.dataList.map((item) => {
                item.name = item.industry;
                item.value = item.compNum;
            });
            setNumData1(res.dataList);
        });
        //按注册资本
        req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
            params: {
                dataSetCode: 'a296b4053c3911eaaa93fa163ed85ccc',
                pageNo: '1',
                pageSize: '50',
                sectorIds: city2,
            },
        }).then((res) => {
            res.dataList.map((item) => {
                item.name = item.industry;
                item.value = (item.money / 10000).toFixed(2);
            });
            setMoneyData1(res.dataList);
        });
        //主要民企规模
        req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
            params: {
                dataSetCode: '677b2b0a3a9011eaaa93fa163ed85ccc',
                sectorIds: city2,
            },
        }).then((res) => {
            const scaleData = [];
            res.dataList[0].scale.map((item) => {
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
            setCountScales1(scaleData);
        });
        //主要民企上市情况
        req('/govwebapi/gov/web/api/integration/dataset/datainfo', {
            params: {
                dataSetCode: '938216e33abb11eaaa93fa163ed85ccc',
                sectorIds: city2,
                //大型企业
                Scale: '1',
            },
        }).then((res) => {
            const scaleData = [];
            res.dataList[0].markettype.map((item) => {
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
            setCountMarkettypes1(scaleData);
        });
    }, [city2]);
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
    //table3
    const config3 = {
        tooltip: {
            trigger: 'item',
            formatter: ({ marker, name, percent }) => {
                return marker + name + ':' + percent + '%';
            },
        },
        grid: {},
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
                    show: false,
                    position: 'center',
                    formatter: ({ name, percent }) => {
                        return name + ':' + '\n' + '\n' + percent + '%';
                    },
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold',
                    },
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
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold',
                        formatter: ({ name, percent }) => {
                            return name + ':' + '\n' + '\n' + percent + '%';
                        },
                    },
                },
                labelLine: {
                    show: false,
                },
                data: countMarkettypes,
            },
        ],
    };
    //---------------------------------------------------------------------------------------------------------
    //table1.1
    const configNUm1 = {
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
                data: numData1,
            },
        ],
    };
    //table1.2
    const configMoney1 = {
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
                data: moneyData1,
            },
        ],
    };
    //table31
    const config31 = {
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
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold',
                        formatter: ({ name, percent }) => {
                            return name + ':' + '\n' + '\n' + percent + '%';
                        },
                    },
                },
                labelLine: {
                    show: false,
                },
                data: countScales1,
            },
        ],
    };
    //table41
    const config41 = {
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
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold',
                        formatter: ({ name, percent }) => {
                            return name + ':' + '\n' + '\n' + percent + '%';
                        },
                    },
                },
                labelLine: {
                    show: false,
                },
                data: countMarkettypes1,
            },
        ],
    };

    const city = useMemo(() => {
        if (citys.children[0].chn !== '上海市') {
            citys.children.unshift({
                chn: '上海市',
                parentCode: '0300000000',
                treeLevel: 1,
                code: '0301010000',
                children: [],
            });
        }
        return citys.children;
    }, []);
    const menu1 = useMemo(() => {
        return (
            <Menu>
                {city.map((item, index) => {
                    return (
                        <Menu.Item
                            key={index}
                            onClick={() => {
                                // console.log('zc', item.code);
                                setCity1(item.code);
                            }}
                        >
                            {item.chn}
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }, [city]);
    const menu2 = useMemo(() => {
        return (
            <Menu>
                {city.map((item, index) => {
                    return (
                        <Menu.Item
                            key={index}
                            onClick={() => {
                                setCity2(item.code);
                            }}
                        >
                            {item.chn}
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }, [city]);
    return (
        <div className='dashboard-industry-balance'>
            <div>
                <div>
                    <div>
                        <Dropdown
                            overlay={menu1}
                            placement='bottomCenter'
                            overlayClassName='overlayClassName'
                        >
                            <Button
                                style={{
                                    width: '0.78125rem',
                                    height: '0.15625rem',
                                    backgroundColor: ' #0e4677',
                                    borderColor: '#0e4677',
                                    color: '#22EAF6',
                                    fontSize: '0.09375rem',
                                    whiteSpace: 'pre',
                                    borderRadius: '4px',
                                }}
                            >
                                {city.map((item) => {
                                    if (item.code === city1) {
                                        return item.chn;
                                    }
                                })}
                                <Icon type='down' />
                            </Button>
                        </Dropdown>
                    </div>
                    <div>主要民企行业分布</div>
                    <div>
                        <Tabs
                            titleTabs={['按企业数量', '按注册资本']}
                            titleTabsStyle={{
                                color: '#2BF9FF',
                                width: '72%',
                                fontSize: '0.083333rem',
                            }}
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
                    </div>
                </div>
                <div>
                    <div className='investTitle'>主要民企上市情况</div>
                    <div>
                        <WindChart option={config3} />
                    </div>
                </div>
                <div>
                    <div className='investTitle'>主要民企上市情况</div>
                    <div>
                        <WindChart option={config4} />
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <Dropdown
                            overlay={menu2}
                            placement='bottomCenter'
                            overlayClassName='overlayClassName'
                        >
                            <Button
                                style={{
                                    width: '0.78125rem',
                                    height: '0.15625rem',
                                    backgroundColor: ' #0e4677',
                                    borderColor: '#0e4677',
                                    color: '#22EAF6',
                                    fontSize: '0.09375rem',
                                    whiteSpace: 'pre',
                                    borderRadius: '4px',
                                }}
                            >
                                {city.map((item) => {
                                    if (item.code === city2) {
                                        return item.chn;
                                    }
                                })}
                                <Icon type='down' />
                            </Button>
                        </Dropdown>
                    </div>
                    <div>主要民企行业分布</div>
                    <div>
                        <Tabs
                            titleTabs={['按企业数量', '按注册资本']}
                            titleTabsStyle={{
                                color: '#2BF9FF',
                                width: '72%',
                                fontSize: '0.083333rem',
                            }}
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
                                                    data: numData1,
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
                                                    data: moneyData1,
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
                    </div>
                </div>
                <div>
                    <div className='investTitle'>主要民企上市情况</div>
                    <div>
                        <WindChart option={config31} />
                    </div>
                </div>
                <div>
                    <div className='investTitle'>主要民企上市情况</div>
                    <div>
                        <WindChart option={config41} />
                    </div>
                </div>
            </div>
        </div>
    );
}

IndustryBalance.propTypes = {};
IndustryBalance.defaultProps = {};
