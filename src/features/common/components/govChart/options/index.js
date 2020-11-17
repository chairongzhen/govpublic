/*
 * @Author: hcluo
 * @Date: 2020-07-23 13:46:18
 * @LastEditors: hcluo
 * @LastEditTime: 2020-08-18 17:12:16
 * @Description: echart Option处理
 */
import * as options from './options';

const isArray = function(arr) {
  // 判断是否是一个数组
  return Object.prototype.toString.call(arr) === '[object Array]';
};

const isObject = function(obj) {
  // 判断是否是一个对象
  return Object.prototype.toString.call(obj) === '[object Object]';
};

/**
 * @description 获取变量类型代码
 * @param {*} obj
 * @returns {number} 1|数组，2|对象，0|其他
 */
const getTypeCode = obj => {
  if (isArray(obj)) {
    return 1;
  }
  if (isObject(obj)) {
    return 2;
  }
  return 0;
};

function merge(target, source, overwrite = true) {
  for (let prop in source) {
    if (overwrite) {
      let value = source[prop];
      if (value !== undefined) {
        target[prop] = value;
      }
    } else {
      continue;
    }
  }

  return target;
}

function getMinMax(data) {
  if (data.length < 2) {
    return {};
  }

  let min, max;
  if (data[0].value < data[1].value) {
    min = data[0].value;
    max = data[1].value;
  } else {
    max = data[0].value;
    min = data[1].value;
  }
  for (let index = 2; index < data.length; index++) {
    if (data[index] > max) max = data[index];
    else if (data[index] < min) min = data[index];
  }
  return { min, max };
}

export default class Option {
  /**
   *Creates an instance of Option.
   * @author hcluo
   * @date 2020-07-23
   * @param {*} dataset 支持对象和数组，详情参考echart文档
   * @param {*} type
   * @memberof Option
   */
  constructor() {
    switch (arguments.length) {
      case 0:
        merge(this, options['bar']);
        break;
      case 1:
        let argus0 = arguments[0];

        if (typeof argus0 === 'string') {
          merge(this, options[argus0] || {});
        } else if (isObject(argus0)) {
          merge(this, argus0);
        } else if (typeof argus0 === 'undefined') {
          // merge(this, argus0);
        } else {
          merge(this, options['bar']);
        }
        break;

      case 2:
        merge(this, options['bar']);
        break;

      default:
        break;
    }
  }

  merge({ _range, ...option }) {
    if (typeof option === 'object') {
      let type;
      if (isArray(option.series)) {
        type = option.series[0].type;
      } else if (isObject(option.series)) {
        type = option.series.type;
      }
      // 当图形类型包含 bar 或者 line ，且为未设置yAxis时，自动添加双Y轴
      let mergeObj = {};
      switch (type) {
        case 'bar':
        case 'line':
          merge(mergeObj, {
            grid: {
              containLabel: true,
              left: '3%',
              right: '3%',
              top: '6%',
              bottom: 30,
            },
            legend: {
              type: 'scroll',
              bottom: '2%',
            },
            xAxis: { type: 'category', inverse: true },
            yAxis: [
              {
                splitNumber: 4,
                type: 'value',
              },
              {
                splitNumber: 4,
                type: 'value',
                splitLine: {
                  show: false,
                },
              },
            ],
          });
          break;

        case 'pie':
          break;

        case 'map':
          // let level = 10;
          // function getOxNum(num, count = 2, defaultResult = 'ff') {
          //   let ox = parseInt(num, 10);
          //   if (ox > 255) {
          //     ox = 255;
          //   }
          //   ox = ox.toString(16);
          //   if (ox === 'NaN') {
          //     return defaultResult;
          //   }

          //   while (ox.length < count) {
          //     ox = '0' + ox;
          //   }
          //   return ox;
          // }
          // let start = [0xfe, 0xc7, 0x23];
          // let end = [0xfd, 0xea, 0xb1];
          // let res = [[], [], []];
          // for (let index = 0; index < start.length; index++) {
          //   let step = (end[index] - start[index]) / level;
          //   for (let i = 0; i < level; i++) {
          //     res[index][i] = start[index] + step * i;
          //   }
          // }
          // let color = [];
          // for (let i = 0; i < level; i++) {
          //   color.push('#' + getOxNum(res[0][i]) + getOxNum(res[1][i]) + getOxNum(res[2][i]));
          // }
          // console.log(color);

          merge(mergeObj, {
            visualMap: {
              show: false,
              dimension: 'value',
              color: [
                '#fec723',
                '#fdca31',
                '#fdce3f',
                '#fdd14d',
                '#fdd55b',
                '#fdd86a',
                '#fddc78',
                '#fddf86',
                '#fde394',
                '#fde6a2',
              ],
              ..._range,
            },
          });
          break;

        default:
          break;
      }

      merge(this, mergeObj);
      merge(this, option);

      // merge(this, option);
      // Object.keys(mergeObj).map(key => {
      //   if (this.hasOwnProperty(key)) delete mergeObj[key];
      // });

      // merge(this, mergeObj);
    }
    return this;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setLegend(legend) {
    this.legend = legend;
    return this;
  }

  setGrid(grid) {
    this.grid = grid;
    return this;
  }

  setXAxis(xAxis) {
    this.xAxis = xAxis;
    return this;
  }

  setYAxis(yAxis) {
    this.yAxis = yAxis;
    return this;
  }

  setTooltip(tooltip) {
    this.tooltip = tooltip;
    return this;
  }

  setDataset(dataset) {
    let dimensions = [];
    if (dataset[0]) dimensions = Object.keys(dataset[0]);

    this.dataset = { dimensions, source: dataset };
    return this;
  }

  setSeries(series) {
    this.series = series;
    return this;
  }

  addSeries(seriesItem) {
    let thisMode = getTypeCode(this.series);
    let itemMode = getTypeCode(seriesItem);

    switch (thisMode * 10 + itemMode) {
      case 11: //[] {}
        this.series.push(seriesItem);
        break;

      case 12: // [] []
        this.series.push(...seriesItem);
        break;

      case 21: // {} []
        this.series = [this.series, ...seriesItem];
        break;

      case 22: // {} {}
        this.series = [this.series, seriesItem];
        break;

      default:
        break;
    }

    return this;
  }
}
