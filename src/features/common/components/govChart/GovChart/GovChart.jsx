import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import echarts from '../Echarts';
import windTheme from '../Echarts/wind.standard.theme.json';
import { toThousandSeparator } from '../../../../../common/formatters';
import backChina from '../../../../../assets/imgs/backChina.svg';
import globalColor from '../globalStyle.js';

const colorList = [...globalColor, ...globalColor, ...globalColor];

// function getNumber(num, defaultResult = null) {
//   let str = Number(num);
//   if (str.toString() !== 'NaN') {
//     return str;
//   }
//   return defaultResult;
// }

// function getIndicatorNameInMap(param) {
//   let result = '';
//   if (param && param.data && param.data.unit && param.data.unit.length === 2) {
//     if (param.data.unit[0].length > 0) {
//       result = param.data.unit[0] + ': ';
//     }
//   }
//   return result;
// }

// function getIndicatorUnitInMap(param) {
//   let result = '';
//   if (param && param.data && param.data.unit && param.data.unit.length === 2) {
//     if (param.data.unit[1].length > 0) {
//       result = param.data.unit[1];
//     }
//   }
//   return result;
// }

/**
 * 数据series
 */
function getChartSeries(indicators, chartSetting, mapUnit) {
  let series = [];
  let exchangeXY = chartSetting && chartSetting.exchangeXY;
  let maxNum = chartSetting && chartSetting.maxNum;
  indicators.forEach(element => {
    let seriesData = {};
    let type = element.meta.type.toLowerCase();
    seriesData.type = type;
    if (element.meta.unit === undefined || element.meta.unit === null) {
      element.meta.unit = ['', ''];
    } else if (typeof element.meta.unit === 'string') {
      element.meta.unit = ['', element.meta.unit];
    } else if (element.meta.unit.length < 2) {
      element.meta.unit.unshift('');
    }
    seriesData.unit = element.meta.unit;
    seriesData = Object.assign(seriesData, element.meta[type]);
    switch (type) {
      case 'line':
      case 'bar':
      case 'scatter':
        seriesData.name = element.meta.name;
        let data = cloneDeep(element.data);
        data = getStandardData(data, type, element.meta[type]);
        if (exchangeXY) {
          data = exchangeDataXY(data);
        }
        if (maxNum) {
          data = data.filter((a, i) => i <= maxNum);
        }
        seriesData.data = data;
        if (element.meta.yPosition == null || element.meta.yPosition === 'left') {
          seriesData.yAxisIndex = 0;
        } else if (element.meta.yPosition === 'right') {
          seriesData.yAxisIndex = 1;
        }
        if (element.meta.averageLine) {
          seriesData.markLine = {
            symbol: 'circle',
            label: {
              show: true,
              formatter: '{b}：{c}',
            },
            data: [
              {
                name: '平均值',
                type: 'average',
              },
            ],
          };
        }
        //确定各个地区的索引，来确定颜色取值,并保证显示的顺序
        let cacheItem = {},
          regions = [];
        (seriesData.data || []).forEach((item, index) => {
          if (!cacheItem.hasOwnProperty(item[0])) {
            cacheItem[item[0]] = index;
            regions.push(item[0]);
          }
        });
        if (indicators[0].meta.hasOwnProperty('stack')) {
          series = [];
          regions.forEach(region => {
            let item = seriesData.data.find(item => item[0] === region && item[2] === true);
            if (item) {
              let seriesItem = {
                type: 'bar',
                stack: 'city',
                data: [
                  {
                    name: item[0],
                    value: item[1],
                    itemStyle: { color: colorList[cacheItem[region]] },
                  },
                ],
                barWidth: 20,
                barCategoryGap: '-100%',
              };
              series.push(seriesItem);
            }
          });
          let total = series.reduce((res, cur) => res + Number(cur.data[0].value) || 0, 0);
          series.forEach(item => {
            let curValue = item.data[0].value;
            item.data[0]['initData'] = curValue;
            item.data[0].value = (Number(curValue) / total) * 100;
          });
          break;
        }

        if (type === 'bar' && element.meta.bar && element.meta.bar.oneSeriesColors) {
          let length = element.data.length; // 单系列每个柱图有不同的颜色,oneSeriesColors应与阈值、特别色互斥
          let baseData = [];
          for (let i = 0; i < length; i++) {
            baseData.push([element.data[i][0], 0]);
          }
          for (let i = 0; i < length; i++) {
            let newSeriesData = cloneDeep(seriesData);
            let newData = cloneDeep(baseData);
            newSeriesData.name = newData[i][0];
            newSeriesData.barGap = '-100%';
            newData[i][1] = element.data[i][1];
            if (exchangeXY) {
              newData = exchangeDataXY(newData);
            }
            if (maxNum) {
              newData = newData.filter((a, i) => i <= maxNum);
            }
            newSeriesData.data = newData;
            series.push(newSeriesData);
          }
          break;
        }

        if (element.meta.hasOwnProperty('multiColor') && element.meta['multiColor']) {
          //柱状图多种颜色渲染
          seriesData['itemStyle'] = {
            normal: {
              color: function(params) {
                return colorList[(cacheItem[params.name] || 0) % 36];
              },
            },
          };
        }
        series.push(seriesData);
        break;
      case 'pie':
        seriesData.data = [];
        seriesData.name = element.meta.name;
        element.data.forEach(dataEle => {
          let obj = {};
          if (dataEle.length !== 2) {
            return;
          }
          obj.value = dataEle[1];
          obj.name = dataEle[0];
          seriesData.data.push(obj);
        });
        series.push(seriesData);
        break;
      case 'treemap':
        seriesData.name = element.meta.name;
        seriesData.data = element.data;
        // seriesData.nodeClick = !this.props.chartConfig.disableClick;
        series.push(seriesData);
        break;
      default:
    }
  });
  return series;
}

/**
 * 数据标准化
 */
function getStandardData(data, type, typeStyle) {
  if (!data || !typeStyle) {
    return data;
  }
  if (typeStyle.setItem == null && typeStyle.threshold == null) {
    return data;
  }
  let threshold = typeStyle.threshold; // 阈值处理
  let i, elem;
  let newSetItem = {};
  if (typeStyle.setItem != null) {
    // 特殊处理，如柱状图中高亮一根柱子
    typeStyle.setItem.forEach(item => {
      newSetItem[item.key] = item;
    });
  }

  if (threshold) {
    threshold = mergeJS(
      {
        value: 0,
        big: {
          color: 'red',
          label: {
            show: false,
            position: 'inside',
          },
        },
        small: {
          color: 'blue',
          label: {
            show: false,
            position: 'left',
          },
        },
      },
      threshold,
    );
  } else {
    threshold = {
      big: {},
      small: {},
    };
  }
  let { label: bigLabel, ...bigRes } = threshold.big;
  let { label: smallLabel, ...smallRes } = threshold.small;

  for (i = 0; i < data.length; i++) {
    elem = data[i];
    if (elem.length >= 2 && type === 'bar') {
      let obj = {
        value: [elem[0], elem[1]],
      };
      if (typeStyle.threshold != null) {
        if (obj.value[1] >= threshold.value) {
          obj.itemStyle = bigRes;
          obj.label = bigLabel;
        } else {
          obj.itemStyle = smallRes;
          obj.label = smallLabel;
        }
      }
      if (newSetItem[elem[0]] !== undefined && newSetItem[elem[0]] !== null) {
        obj.itemStyle = newSetItem[elem[0]];
      }
      data[i] = obj;
    }
  }
  return data;
}

/**
 * 数据series中x、y数据交换
 */
function exchangeDataXY(data) {
  if (!data) {
    return [];
  }
  data.forEach(element => {
    if (element.value !== undefined && element.value !== null) {
      element.value = switchValue(element.value);
    } else if (element.length >= 2) {
      element = switchValue(element);
    }
  });
  return data;
}

function switchValue(array, index1 = 0, index2 = 1) {
  if (!array) {
    return array;
  }
  let maxIndex = Math.max(index1, index2);
  if (maxIndex.toString() === 'NaN') {
    return array;
  }
  if (array.length < maxIndex + 1) {
    return array;
  }
  let item = array[index1];
  array[index1] = array[index2];
  array[index2] = item;
  return array;
}

/**
 * x轴配置
 */
function getXAxis(chartSetting, config, indicators, years) {
  let isShouldNaturalNumber = false;
  if (indicators && indicators.length === 2) {
    // 按条件判断是否应该使 x轴负数显示为正数
    let barGapCount = 0;
    let barCount = 0;
    indicators.forEach(element => {
      let type = get(element, 'meta.type');
      let barGap = get(element, 'meta.bar.barGap');
      if (type === 'bar') {
        barCount++;
      }
      if (barGap === '-100%') {
        barGapCount++;
      }
    });
    if (barGapCount === 1 && barCount === 2) {
      isShouldNaturalNumber = true;
    }
  }
  let axisDataType = chartSetting && chartSetting.axisDataType;
  let exchangeXY = chartSetting && chartSetting.exchangeXY;
  let xAxis = null;
  if (exchangeXY) {
    xAxis = {
      type: 'value',
      name: '',
      nameLocation: 'end',
      splitNumber: 4,
      splitLine: {
        show: true,
      },
      axisLabel: {
        margin: 12,
      },
    };
  } else {
    xAxis = {
      type: axisDataType || 'category',
      name: '',
      nameLocation: 'end',
      axisLabel: {
        margin: 12,
      },
    };
  }
  if (xAxis.type === 'value') {
    if (!xAxis.axisLabel) {
      xAxis.axisLabel = { show: true };
    }
    xAxis.axisLabel.formatter = function(value) {
      return toThousandSeparator(value);
    };
  } else if (xAxis.type === 'category' && years?.length > 0) {
    xAxis.data = years;
  }
  if (config && config.xAxis) {
    xAxis = Object.assign(xAxis, config.xAxis);
  }
  let naturalNumber = xAxis.naturalNumber;
  if (typeof naturalNumber === 'boolean') {
    isShouldNaturalNumber = naturalNumber && isShouldNaturalNumber;
  }
  if (xAxis.type === 'value' && isShouldNaturalNumber) {
    if (!xAxis.axisLabel) {
      xAxis.axisLabel = { show: true };
    }
    xAxis.axisLabel.formatter = function(value) {
      if (value < 0) {
        return toThousandSeparator(-value);
      }
      return toThousandSeparator(value);
    };
  }
  return xAxis;
}

/**
 * y轴配置
 */
function getYAxis(chartSetting, config, years) {
  console.log('%c 🍉 years: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', years);
  let axisDataType = chartSetting && chartSetting.axisDataType;
  let exchangeXY = chartSetting && chartSetting.exchangeXY;
  let yAxis = null;
  if (!exchangeXY) {
    yAxis = [
      {
        type: 'value',
        position: 'left',
        splitLine: {
          show: true,
        },
        axisLine: {
          show: true,
        },
        name: '',
        nameLocation: 'end',
      },
      {
        type: 'value',
        position: 'right',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        name: '',
        nameLocation: 'end',
      },
    ];
  } else {
    yAxis = [
      {
        type: axisDataType || 'category',
        position: 'left',
        inverse: true,
        name: '',
        nameLocation: 'start',
      },
      {
        type: axisDataType || 'category',
        position: 'right',
        inverse: true,
        name: '',
        nameLocation: 'start',
      },
    ];
  }
  if (yAxis[0].type === 'category' && years?.length > 0) {
    yAxis[0].data = years;
  }
  if (config && config.yAxis) {
    if (config.yAxis.length == null) {
      yAxis.forEach(elem => {
        elem = Object.assign(elem, config.yAxis);
      });
    } else if (config.yAxis.length === 2) {
      yAxis.forEach((elem, index) => {
        elem = Object.assign(elem, config.yAxis[index]);
      });
    }
  }
  return yAxis;
}

/**
 * 图例
 */
function getLegend(config, indicators, series) {
  let legend = {
    show: true,
    bottom: 0,
  };
  if (config && config.legend) {
    // let meta = ((indicators||[])[0] ||{}).meta || {};
    // if(meta.hasOwnProperty('multiColor') && meta['multiColor'] && series && series.length > 0){
    //   let data = new Set((series[0].data || []).map(item => item[0]));
    //   legend['data'] = [];
    //   for(let item of data){
    //     legend['data'].push(item);
    //   }
    // }
    legend = Object.assign(legend, config.legend);
  }
  return legend;
}

/**
 * 标题
 */
function getTitle(config) {
  let title = {
    show: false,
  };
  if (config && config.title) {
    title = Object.assign(title, config.title);
  }
  return title;
}

/**
 * 图形位置grid
 */
function getGrid(config) {
  let grid = null;
  if (config && config.grid) {
    grid = Object.assign({}, config.grid);
  } else {
    grid = {
      top: 40,
    };
  }
  return grid;
}

/**
 * 修改标准option,智能优化
 */
function updateOption(option, exchangeXY) {
  if (option.grid && option.grid.length === 0) {
    option.grid = null;
  }
  let leftYAxisCount = 0;
  let rightYAxisCount = 0;
  let leftYAxisName = null;
  let rightYAxisName = null;
  let pureLineOrScatter = true;
  let barSerieses = [];
  let isHaveBarWidthMaxMin = false;
  option.series.forEach(seriesData => {
    if (seriesData.type === 'bar') {
      pureLineOrScatter = false;
      barSerieses.push(seriesData);
      if (seriesData.barMaxWidth !== undefined || seriesData.barMinWidth !== undefined) {
        isHaveBarWidthMaxMin = true;
      }
    }
    if (seriesData.yAxisIndex === 0) {
      leftYAxisCount++;
      if (!leftYAxisName || (seriesData.unit[1] && !leftYAxisName[1])) {
        leftYAxisName = [].concat(seriesData.unit);
      }
    } else if (seriesData.yAxisIndex === 1) {
      rightYAxisCount++;
      if (!rightYAxisName || (seriesData.unit[1] && !rightYAxisName)) {
        rightYAxisName = [].concat(seriesData.unit);
      }
    }
  });
  if (!leftYAxisName) {
    leftYAxisName = ['', ''];
  }
  if (!rightYAxisName) {
    rightYAxisName = ['', ''];
  }
  if (exchangeXY) {
    switchValue(leftYAxisName);
    switchValue(rightYAxisName);
  }
  option.yAxis[0].name = leftYAxisName[1];
  option.yAxis[1].name = rightYAxisName[1];
  option.xAxis.name = leftYAxisName[0] || rightYAxisName[0];
  if (pureLineOrScatter) {
    option.yAxis[0].scale = true;
    option.yAxis[1].scale = true;
  }
  if (option.series && option.yAxis && option.yAxis.length === 2) {
    if (leftYAxisCount === 0 && rightYAxisCount > 0) {
      option.yAxis[0].axisLine = {
        show: false,
      };
      option.yAxis[0].name = '';
    } else if (leftYAxisCount > 0 && rightYAxisCount === 0) {
      option.yAxis[1].axisLine = {
        show: false,
      };
      option.yAxis[1].name = '';
    } else if (rightYAxisCount + leftYAxisCount === 0) {
      option.yAxis = null;
      option.xAxis = null;
    } else if (rightYAxisCount === 1 && leftYAxisCount === 1) {
      // 两个y轴去掉分割线
      option.yAxis[0].splitLine = { show: false };
      option.yAxis[0].splitLine = { show: false };
    }

    if (option.series.length === 1 && option.series[0].type === 'treemap') {
      option.legend.show = false;
      // if (option.series[0].colorAlpha == null) {
      //   option.series[0].colorAlpha = [0.5, 1];
      // }
      if (option.series[0].breadcrumb == null) {
        option.series[0].breadcrumb = { show: false };
      }
    }
  }

  if (!isHaveBarWidthMaxMin && barSerieses.length > 0) {
    let barSeries = barSerieses[barSerieses.length - 1];
    barSeries.barMinWidth = 12;
    barSeries.barMaxWidth = 36;
    if (barSerieses.length > 1) {
      barSeries.barMinWidth = 6;
      barSeries.barMaxWidth = 36;
    }
    if (document.body.clientWidth > 1920) {
      barSeries.barMinWidth *= 2;
      barSeries.barMaxWidth *= 2;
    }
    if (exchangeXY) {
      barSeries.barMinWidth = 8;
      barSeries.barMaxWidth = 48;
    }
  }

  return option;
}

function mergeJS(target, source) {
  if (
    source === undefined ||
    source === null ||
    target === undefined ||
    target === null ||
    typeof source !== 'object' ||
    typeof target !== 'object'
  ) {
    return target;
  }
  let keysS = Object.keys(source);
  let key;
  for (let i = 0; i < keysS.length; i++) {
    key = keysS[i];
    if (
      target[key] !== undefined &&
      target[key] !== null &&
      typeof target[key] === 'object' &&
      typeof source[key] === 'object'
    ) {
      target[key] = mergeJS(target[key], source[key]);
    }
    // else if (source[key] != undefined && source[key] instanceof Array) {
    //   target[key] = [].concat(source[key]);
    // }
    else if (source[key] !== undefined && source[key] != null) {
      target[key] = source[key];
    }
  }
  return target;
}

function setTooltip(indicators, exchangeXY, series, config) {
  let isPieTooltip = false;
  let isOneSeriesColorsTooltip = false;
  if (indicators instanceof Array) {
    indicators.forEach(element => {
      if (
        (element.meta && element.meta.type === 'pie') ||
        (element.meta && element.meta.type === 'treemap')
      ) {
        isPieTooltip = true;
      }
      if (element.meta.type === 'bar' && element.meta.bar && element.meta.bar.oneSeriesColors) {
        isOneSeriesColorsTooltip = true;
      }
    });
  }
  let tooltip = {
    show: true,
  };

  if (config && config.tooltip) {
    tooltip = {
      ...config.tooltip,
    };
    if (tooltip.showType === 'auto' || tooltip.show === false) {
      return tooltip;
    }
  }

  if (!isPieTooltip && !isOneSeriesColorsTooltip) {
    tooltip = {
      show: true,
      trigger: 'axis',
      confine: true,
      formatter: params => {
        let str = '';
        if (params[0].axisType === 'xAxis.time') {
          if (!exchangeXY) {
            str += params[0].data[0];
          } else {
            str += params[0].data[1];
          }
        } else if (params[0].name) {
          str += params[0].name;
        }
        let unit = '';
        params.forEach(element => {
          let name = element.seriesName;
          series.forEach(sData => {
            if (sData.name === name && name !== '') {
              unit = sData.unit[1] || sData.unit[2] || '';
            }
          });
          let val;
          if (exchangeXY) {
            val = element.value[0];
          } else {
            val = element.value[1];
          }
          str += '<br />';
          if (
            ['城镇居民人均生活消费支出', '农村居民人均消费支出'].indexOf(element.seriesName) !== -1
          ) {
            val = -val;
          }
          if (Number(val).toString() !== 'NaN') {
            val = toThousandSeparator(val);
          }
          str += element.marker + element.seriesName + ': ' + val + unit;
        });
        return str;
      },
    };
  } else if (isPieTooltip) {
    tooltip = {
      show: true,
      trigger: 'item',
      confine: true,
      formatter: params => {
        let str = '';
        str += params.name;
        let unit = '';
        let name = params.seriesName;
        series.forEach(sData => {
          if (sData.name === name && name !== '') {
            unit = sData.unit[1] || sData.unit[2] || '';
          }
        });
        let val;
        val = params.value;
        str += '<br />';
        if (Number(val).toString() !== 'NaN') {
          val = toThousandSeparator(val);
        }
        str += params.marker + params.seriesName + ': ' + val + unit;
        if ((((indicators || [])[0] || {}).meta || {}).type === 'pie') {
          //饼图的tooltp特殊处理
          str = params.marker + params.name + ':' + params.percent + '%';
          // +
          // 	`\n${val}${unit}`;
        }
        return str;
      },
    };
  } else if (isOneSeriesColorsTooltip) {
    tooltip = {
      show: true,
      trigger: 'item',
      confine: true,
      formatter: params => {
        let str = '';
        let unit = '';
        let name = params.seriesName;
        series.forEach(sData => {
          if (sData.name === name && name !== '') {
            unit = sData.unit[1];
          }
        });
        let val;
        if (exchangeXY) {
          val = params.value[0];
        } else {
          val = params.value[1];
        }
        if (Number(val).toString() !== 'NaN') {
          val = toThousandSeparator(val);
        }
        str += params.marker + params.seriesName + ': ' + val + unit;
        return str;
      },
    };
  }
  return tooltip;
}

class GovChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.elDom = null;
    this.instance = null;
    this.isUpdateOption = true;
    this.windTheme = mergeJS({}, windTheme);
    this.windTheme.color = window.color || colorList;
    this.mapUnit = props.mapUnit;
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
    this.updateChart();
    window.addEventListener('resize', this.chartResize, false);
    if (this.props.download) {
      if (!this.instance) {
        return;
      }
      let url = this.instance.getDataURL({
        // pixelRatio: 5, //导出的图片分辨率比率,默认是1
        backgroundColor: '#fff', //图表背景色
        type: 'png', //图片类型支持png和jpeg
      });
      if (this.props.setCanvasUrl && typeof this.props.setCanvasUrl === 'function') {
        this.props.setCanvasUrl(url);
      }
    }
  }

  componentDidUpdate() {
    if (this.state.magnifyMapDisplay === 'block' || this.hideBigMapAction) {
      this.hideBigMapAction = false;
      return;
    }
    this.updateChart();
  }

  componentWillUnmount() {
    this.instance.dispose();
    this.instance.off('click');
    this.instance = null;
    this.elDom = null;
    window.removeEventListener('resize', this.chartResize);

    if (this.copyInstance) {
      this.copyInstance.dispose();
      this.copyInstance.off('click');
      this.copyInstance = null;
      document.body.removeEventListener('click', this.bodyClick);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.downloadCount !== nextProps.downloadCount) {
      this.downloadImg(this.props.title);
    }
  }

  updateChart = (chartConfig = this.props.chartConfig, years = this.props.years) => {
    console.log('%c 🍎 years: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', years);
    if (this.elDom == null) {
      return;
    }
    let indicators = chartConfig.indicators;
    let chartSetting = chartConfig.chart;
    let exchangeXY = chartSetting && chartSetting.exchangeXY;
    let mapUnit = this.props.mapUnit ? this.props.mapUnit : ['', ''];
    let config = chartConfig.config;
    let series = getChartSeries(indicators, chartSetting, mapUnit);
    let xAxis = getXAxis(chartSetting, config, indicators, years);
    let yAxis = getYAxis(chartSetting, config, years);
    let legend = getLegend(config, indicators, series);
    let grid = getGrid(config);
    let title = getTitle(config);
    let backgroundColor = config && config.backgroundColor;
    let tooltip = setTooltip(indicators, exchangeXY, series, config);
    let option = {
      ...config,
      backgroundColor: 'rgb(0,0,0,0)',
      title: title,
      yAxis: yAxis,
      xAxis: xAxis,
      series: series,
      grid: grid,
      legend: legend,
      tooltip: tooltip,
    };
    if (chartConfig.hasOwnProperty('stack')) {
      //地区pk页面表格柱状图特殊处理
      //处理series 展示百分比,实现图形两端对齐
      option['yAxis'] = {
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
      };
      option.yAxis['type'] = 'category';
      option.yAxis['data'] = ['city'];
      option.yAxis['inverse'] = true;
      option['xAxis'] = {
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        min: 0,
        max: 100,
      };
      option.tooltip['formatter'] = params => {
        return `<div>${params.marker}<span>${params.name}</span>: <span>${toThousandSeparator(
          params.data.initData,
        )}${indicators[0].meta.unit[1]}</span></div>`;
      };
    } else {
      option = updateOption(option, exchangeXY);
    }

    if (chartConfig.hasOwnProperty('areaPK')) {
      //地区pk页面弹出窗口特殊处理
      let areaPkData = [];
      let areaSeries = option.series[0];
      let len = 50;
      option.yAxis = {
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      };
      option.yAxis['data'] = [];
      if (areaSeries !== undefined) {
        (areaSeries.data || []).forEach(item => {
          let name = item[0];
          if (name && name.length * 13 + 5 > len) {
            len = name.length * 13 + 5;
          }
          if (item[2] === true) {
            areaPkData.push([item[1], item[0]]);
          }
        });
      }
      areaPkData.sort((a, b) => Number(b[0]) - Number(a[0]));
      areaPkData.forEach(item => option.yAxis.data.push(item[1]));
      option.series[0]['data'] = areaPkData;
      option.xAxis['type'] = 'value';
      option.yAxis['type'] = 'category';
      option.yAxis['inverse'] = 'true';
      option.xAxis['type'] = 'value';
      option.xAxis['position'] = 'top';
      option.xAxis['name'] = indicators[0].meta.yAxisName;
      option.xAxis['nameLocation'] = 'end';
      option.xAxis['nameGap'] = 20;
      option['grid'] = {
        bottom: '5%',
        left: len,
        top: '10%',
      };
    }
    this.option = option;

    let meta = (indicators[0] || {}).meta || {};
    if (meta.hasOwnProperty('isShowyAxis') && meta.isShowyAxis) {
      // this.option.yAxis['name'] =  meta.yAxisName;
      // this.option.yAxis['nameLocation'] = 'end';
    }
    if (this.instance === null || this.instance === undefined) {
      let ops = {
        width: this.elDom.clientWidth + 'px',
        height: this.elDom.clientHeight + 'px',
      };
      this.instance = echarts.init(this.elDom, this.windTheme, ops);
      if (!!option.dataZoom) {
        this.instance.on('datazoom', params => {
          let endValue = this.instance.getOption().dataZoom[0].endValue;
          let startValue = this.instance.getOption().dataZoom[0].startValue;
          this.props.onDataZoomChange && this.props.onDataZoomChange(startValue, endValue);
        });
      }
    }

    if (option.series.length >= 1 && option.series[0].type === 'treemap') {
      if (!chartConfig.config.disableCallback) {
        this.instance.off('click', this.onTreeMapClick);
        this.instance.on('click', 'series', this.onTreeMapClick);
        this.props.setConfig &&
          this.props.setConfig({
            industry: '',
            industryCode: undefined,
          });
      }
      this.windTheme.color = colorList;
      this.option.series[0].nodeClick = false;
      this.option.series[0].roam = false;
      this.option.series[0].data.forEach(item => {
        item['itemStyle'] = {};
      });
    }
    this.instance.clear();
    this.instance.setOption(this.option);
    // console.log('option', option);
    this.chartResize();
  };

  setOption = option => {
    this.updateChart(option);
  };

  onTreeMapClick = params => {
    if (!this.props.chartConfig.config.disableCallback) {
      this.props.setConfig &&
        this.props.setConfig({
          industry: params.data.name,
          industryCode: params.data.industryCode,
        });
    }
    this.updateTreeMap(params.dataIndex);
  };

  updateTreeMap = dataIndex => {
    this.option.series[0].data.forEach((item, index) => {
      if (dataIndex !== null && dataIndex !== undefined && index === dataIndex - 1) {
        item['itemStyle'] = {
          borderColor: '#fff',
          borderWidth: 3,
          // color: 'black',
        };
      } else {
        item['itemStyle'] = {};
      }
    });
    this.instance.setOption(this.option);
  };

  chartResize = () => {
    if (this.instance && this.elDom) {
      let ops = {
        width: this.elDom.clientWidth + 'px',
        height: this.elDom.clientHeight + 'px',
      };
      this.instance.resize(ops);
    }
  };

  getDom = dom => {
    this.elDom = dom;
  };

  getCopyDom = dom => {
    this.copyDom = dom;
  };

  /**
   * 下载功能
   */
  downloadImg = fileName => {
    if (!this.instance) {
      return;
    }
    let url = this.instance.getDataURL({
      // pixelRatio: 5, //导出的图片分辨率比率,默认是1
      backgroundColor: '#fff', //图表背景色
      type: 'png', //图片类型支持png和jpeg
    });
    let exportTitle = get(this.props, 'chartConfig.chart.exportTitle');
    if (this.copyDom && exportTitle) {
      if (!this.copyInstance) {
        let ops = {
          width: this.elDom.clientWidth + 'px',
          height: this.elDom.clientHeight + 'px',
        };
        this.copyInstance = echarts.init(this.copyDom, this.windTheme, ops);
      }
      let copyOption = cloneDeep(this.option);
      copyOption.title = {
        show: true,
        text: exportTitle,
        left: 'center',
      };
      let exportDate = get(this.props, 'chartConfig.chart.exportDate');
      if (exportDate) {
        copyOption.graphic = {
          type: 'text',
          style: {
            fill: '#666',
            text: exportDate,
            fontSize: '13px',
          },
          bottom: 0,
          left: '10%',
        };
      }
      copyOption.animation = false;
      this.copyInstance.setOption(copyOption);
      url = this.copyInstance.getDataURL({
        // pixelRatio: 5, //导出的图片分辨率比率,默认是1
        backgroundColor: '#fff', //图表背景色
        type: 'png', //图片类型支持png和jpeg
      });
    }
    let aDom = document.createElement('a');
    aDom.href = url;
    aDom.download = fileName;
    aDom.click();
    if (this.copyInstance) {
      this.copyInstance.clear();
    }
  };

  render() {
    let indicators = this.props.chartConfig.indicators;
    let isShowBackButton = false;
    if (
      indicators &&
      indicators.length > 0 &&
      (((indicators[0] || {}).meta || {}).type || '').toLowerCase() === 'treemap'
    ) {
      isShowBackButton = true;
    }
    const chartStyle = this.props.chartStyle;
    return (
      <div style={chartStyle}>
        {isShowBackButton ? (
          <div
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '10px',
              // left: '10px',
              width: 24,
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1,
            }}
          >
            <img
              style={{ marginBottom: 5 }}
              //src={backChina}
              alt=""
              onClick={() => {
                this.updateChart();
              }}
            />
          </div>
        ) : (
          ''
        )}
        <div style={{ height: '100%', width: '100%' }} ref={this.getDom}>
          loading...
        </div>
        <div style={{ height: '100%', width: '100%', display: 'none' }} ref={this.getCopyDom} />
      </div>
    );
  }
}

GovChart.defaultProps = {
  chartStyle: {
    height: '400px',
    width: '400px',
  },
  chartConfig: {
    chart: {
      axisDataType: 'category',
      exchangeXY: false,
      // exportTitle: 'asdfasdf',
    },
    indicators: [
      //   {
      //     meta: {
      //       type: 'map',
      //       name: '热力图系列',
      //       // yPosition: 'left',
      //       line: {}, //折线图自定义设置
      //       bar: {}, //柱状图自定义设置
      //       scatter: {}, //散点图自定义设置
      //       pie: {}, //饼图自定义设置
      //       map: {},
      //     },
      //     data: [
      //       ['北京', 35371.3],
      //       ['天津', 14104.28],
      //       ['河北', 35104.5],
      //       ['山西', 17026.68],
      //       ['内蒙古', 17212.5],
      //       ['辽宁', 24909.5],
      //       ['吉林', 11726.8],
      //       ['黑龙江', 0],
      //       ['上海', 38155.32],
      //       ['江苏', 99631.52],
      //       ['浙江', 62352],
      //       ['安徽', 37114],
      //       ['福建', 42395],
      //     ],
      //   },
      {
        meta: {
          type: 'bar',
          name: '第一个系列',
          // yPosition: 'left',
          line: {}, //折线图自定义设置
          bar: {
            oneSeriesColors: true,
          }, //柱状图自定义设置
          scatter: {}, //散点图自定义设置
          pie: {}, //饼图自定义设置
        },
        data: [
          [1, 1.5],
          [3, 2],
          [5, 4],
          [7, 3],
          [10, 6],
          [15, 5],
          [15, 6],
          [20, 8],
          [30, 7],
          [50, 10],
        ],
      },
      // {
      //   meta: {
      //     type: 'line',
      //     name: '第二个系列',
      //     // yPosition: 'left',
      //   },
      //   data: [[15, 5], [20, 8], [30, 15]],
      // },
      // {
      //   meta: {
      //     type: 'pie',
      //     name: '第三个系列',
      //   },
      //   data: [['第1个指标', 5], ['第2个指标', 8], ['第3个指标', 15]],
      // },
      // {
      //   meta: {
      //     type: 'treemap',
      //     name: '第四个系列',
      //     treemap: {}, //树状数据自定义设置
      //   },
      //   data: [
      //     {
      //       name: '多元金融',
      //       value: 100,
      //       children: [
      //         { name: '多元金融1', value: 30 },
      //         { name: '多元金融2', value: 50 },
      //         { name: '多元金融3', value: 20 },
      //       ],
      //     },
      //     { name: '资本贷物', value: 50 },
      //     { name: '运输', value: 25 },
      //     { name: '房地产', value: 10 },
      //   ],
      // },
    ],
  },
};

export default GovChart;
