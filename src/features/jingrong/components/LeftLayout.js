/*
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-09-04 15:15:07
 * @LastEditTime: 2020-10-11 15:36:54
 * @Descripttion: 
 */
import echarts from 'echarts';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import WindChart from './WindCharts/WindChart';
import world from './WindCharts/world.json';
import "echarts/lib/chart/map"
import stock from "./jsondata/stock.json"
import StockTable from './StockTable';
import SvgComponent from './SvgDitu';
import { useRequest } from 'ahooks';
import { req as request } from '../../common/request';
import { getSessionId } from '../../../common/jsBirdge';
import { getQueryString } from '../../../utils/util';
import { now } from 'd3';

const latitudeLongitude = [
  // 东经 北纬
  {
    name: '中国',
    /* label: {
      show: true,
      position: [1000, 1000],
      // distance: 100,
      formatter: [
        'a',
      ].join('\n'),
      // offset:[1000,1000],
    }, */
    value: ['121.52', '31.10', 1]
  },
  {
    name: '上海',
    value: ['121.52', '31.10', 1]
  },
  {
    name: '纽约',
    value: ['-74.00', '40.42', 1]
  }, {
    name: '东京',
    value: ['139.69', '35.70', 1]
  }, {
    name: '香港',
    value: ['114.12', '22.26', 1]
  }, {
    name: '阿姆斯特丹',
    value: ['0.53', '52.22', 1]
  }, {
    name: '伦敦',
    value: ['0.1', '51.3', 1]
  }, {
    name: '孟买',
    value: ['72.49', '18.56', 1]
  }, {
    name: '多伦多',
    value: ['-79.23', '43.38', 1]
  }, {
    name: '深圳',
    value: ['114.05', '22.38', 1]
  },
]

const nameMap = {
  'China': '中国'
}

const sessionId = getSessionId();
const host = getQueryString('host') || '';
const newUrl = `${host}/govwebapi/gov/web/api/bs-citycenter/index/quotation/get`;
const business = {
  "business": {
    "codes": "FTSE.GI,000001.SH,399001.SZ,STI.GI,N225.GI,DJI.GI,IXIC.GI,SPX.GI,000688.SH,000300.SH,399106.SZ,399102.SZ,881001.WI,RAY.GI,VIX.GI,GSPTSE.GI"
  }
}

//英国富时100  上证指数 深证成指 富时新加坡海峡指数 日经225 道琼斯工业指数 纳斯达克指数 标普500
//科创50 沪深300 深证综指 创业板综 万得全A 罗素3000指数 CBOE波动率 多伦多300
// 
const getIndex = () => {
  return fetch(newUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "wind.sessionid": sessionId,
    },
    body: JSON.stringify(business)
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(response.status);
    }
    return response.json();
  }).then(res => {
    if (res.resultCode === '200') {
      return Promise.resolve(res.resultData);
    } else {
      return Promise.reject(res);
    }
  }).catch(err => {
      console.error('网络错误：', err);
      return Promise.reject(err);
    });
}

export default function LeftLayout() {
  const { data } = useRequest(getIndex, {
    pollingInterval: 1000,
    pollingWhenHidden:false,
  });
  const [mapIndex, setMapIndex] = useState();
  const [tableIndex, setTableIndex] = useState();
  
  /* request("/govwebapi/gov/web/api/index/quotation/get", { params: { codes: "FTSE.GI,000001.SH,8841246.WI,STI.GI,N225.GI,DJI.GI,IXIC.GI,SPX.GI,000688.SH,000300.SH,399106.SZ,399102.SZ,881001.WI,RAY.GI,VIX.GI,GSPTSE.GI"}}).then(res => {
    console.log("zjf---data:",res);
  }) */

  const isZero = (nowPrice, last_close) => {
    if (!last_close) {
      return nowPrice;
    }
    if (parseFloat(nowPrice) === 0) {
      return last_close;
    }
    return nowPrice;
  }

  useEffect(() => {
    // console.log("zjf---data:",data);
    if (data) {
      const mapDataIndex = ["FTSE.GI", "000001.SH", "399001.SZ", "STI.GI", "N225.GI", "DJI.GI", "IXIC.GI", "SPX.GI",]
      const mapI = {};
      mapDataIndex.forEach((item) => {
        const newData = [];
        newData.push(isZero(data[item]?.nowPrice, data[item]?.last_close));
        newData.push(data[item]?.upAndDown);
        newData.push(data[item]?.upAndDownRate);
        mapI[item] = newData;
      })
      setMapIndex(mapI);
      
      const tableI = {};
      tableI.domestic = [
        {
        "key": "000001.SH",
        "name": "上证指数",
      }, {
        "key": "000688.SH",
        "name": "科创50",
      }, {
        "key": "000300.SH",
        "name": "沪深300",
      }, {
        "key": "399106.SZ",
        "name": "深证综指",
      }, {
        "key": "399102.SZ",
        "name": "创业板综",
      }, {
        "key": "881001.WI",
        "name": "万得全A",
      }
      ];
      tableI.international = [
        {
          "key": "DJI.GI",
          "name": "道琼斯工业指数",
        }, {
          "key": "IXIC.GI",
          "name": "纳斯达克指数",
        }, {
          "key": "SPX.GI",
          "name": "标普500",
        }, {
          "key": "RAY.GI",
          "name": "罗素3000指数",
        }, {
          "key": "VIX.GI",
          "name": "CBOE波动率",
        }, {
          "key": "GSPTSE.GI",
          "name": "多伦多300",
        }
      ];
      // todo 综合一下
      tableI.domestic.forEach((item) => {
        const t = data[item.key];
        const newData = [];
        newData.push(isZero(t?.nowPrice, t?.last_close));
        newData.push(t?.upAndDown);
        newData.push(t?.upAndDownRate);
        newData.push(t?.yearToDateRate);
        item.data = newData;
      })
      tableI.international.forEach((item) => {
        const t = data[item.key];
        const newData = [];
        newData.push(t?.nowPrice);
        newData.push(t?.upAndDown);
        newData.push(t?.upAndDownRate);
        newData.push(t?.yearToDateRate);
        item.data = newData;
      })
      setTableIndex(tableI);
    }
  }, [data, setMapIndex, setTableIndex])

  const option_container = {
    // 默认的颜色数组 （如果不明确设置每个数据项的颜色，则会采用默认的数组
    // 此处的颜色为十六进制表示，也可以使用rgb来表示。简单地理解就是一串字符就代表一个颜色，挑选喜欢的颜色可以自行搜索颜色
    "color": ["#ac6767", "#1d953f", "#6950a1", "#918597"],
    "series": [
      {
        // 图标类型为 地图
        "type": "map",
        "name": "test",
        "label": {
          "show": false,
          "position": "top",
          "margin": 1
        },
        "mapType": "world", // 地图类型为 世界地图
        // data里的每一个{}中，是一项数据整体，标明了该项数据的名称，值，以及颜色等参数。注意：此处的字符串需要加双引号""(输入法切换至英文状态)
        "data": [
          {
            // ItemStyle 中设置每一个数据项的颜色
            "name": "United States",
            "value": 43,
            'itemStyle': {
              'color': "#c23531"
            }
          },
          {
            "name": "Japan",
            "value": 17, // 注意项与项之间的逗号
            'itemStyle': {
              'color': "#CD8500"
            }
          },
          {
            "name": "France",
            "value": 7,
            'itemStyle': {
              'color': "#EE2C2C"
            }
          },
          {
            "name": "Italy",
            "value": 6,
            'itemStyle': {
              'color': "#918597"
            }
          },
          {
            "name": "Canada",
            "value": 5,
            'itemStyle': {
              'color': "#bda29a"
            }
          },
          {
            "name": "United Kingdom",
            "value": 4,
            'itemStyle': {
              'color': "#6950a1"
            }
          },
          {
            "name": "Spain",
            "value": 4,
            'itemStyle': {
              'color': "#1d953f"
            }
          },
          {
            "name": "Holland",
            "value": 4,
            'itemStyle': {
              'color': "#2f4554"
            }
          },
          {
            "name": "Belgium",
            "value": 3,
            'itemStyle': {
              'color': "#EEAD0E"
            }
          }
          , {
            "name": "Germany",
            "value": 2,
            'itemStyle': {
              'color': "#607B8B"
            }
          },
          {
            "name": "Austria",
            "value": 2,
            'itemStyle': {
              'color': "#5CACEE"
            }
          },
          {
            "name": "Switzerland",
            "value": 1,
            'itemStyle': {
              'color': "#4EEE94"
            }
          },
          {
            "name": "Poland",
            "value": 1,
            'itemStyle': {
              'color': "#8DEEEE"
            }
          },
          {
            "name": "Chile",
            "value": 1,
            'itemStyle': {
              'color': "#B23AEE"
            }
          },
        ],
        "roam": true,
        "zoom": 1,
        // 去除各个国家上的小红点
        "showLegendSymbol": false,
      }
    ],

    // 鼠标悬浮，单击产生的效果（在网页上可以动态显示）
    "tooltip": {
      "show": true,
      "trigger": "item",
      "triggerOn": "mousemove|click",
      "axisPointer": {
        "type": "line"
      },
      "textStyle": {
        "fontSize": 14
      },
      "borderWidth": 0
    }
  };

  useEffect(() => {
    if (document.getElementById("map")) {
      const eMap = echarts.init(document.getElementById("map"));
      echarts.registerMap('world', world);
      eMap.setOption({
        baseOption: {
          // backgroundColor: '#1A387D',
          animation: false,
          tooltip: {
            trigger: 'item',
          },
          // visualMap: {
          //   show: false,
          //   min: 0,
          //   max: 0,
          //   inRange: {
          //     color:['#03A4E9']
          //   }
          // },
          series: [{
            name: "上证指数",
            type: 'map',
            map: 'world',
            zoom: 1.2,
            aspectScale: 0.9,
            nameMap: nameMap,
            tooltip: {
              show: false,
            },
            itemStyle: {
              areaColor: '#04A4EB',
              // color: 'red',
            },
            data: latitudeLongitude,
            encode: {
              value: 2,
            },
            symbolSize: (val) => {
              console.log("--------:", val);
              return val;
            },
          }]
        },

      })

    }
    /* return () => {
      if (document.getElementById("map")) {
        document.getElementById("map").innerHTML = '';
      }
    } */
  }, [])

  return (
    <div className="left">
      <div className="boxContainer ">
        <div className="box ">

          <div id="map" >
          </div>
          {/* <WindChart getInstance={i => {
            console.log("--------:",i);
            this.instance = i.current && i.current.getEchartsInstance();
            window.instance = this.instance;
          }}
            option={option_container}
          /> */}
          <div className="mapLabel" >
            {<SvgComponent width={'100%'} height={'100%'} mapIndex={mapIndex}/>}
          </div>
            {/* <object id="mySvg" data={ditu} type="image/svg+xml">
              加载失败
          </object>  */}
          <div className="box_footer"></div>
        </div>
      </div>
      <div className="boxContainer ">
        <div className="box ">
          <h2 className="domestic-stock-title">国内股市市场行情</h2>
          <StockTable domestic={tableIndex?.domestic} />
          <h2 className="domestic-stock-title">国际股市市场行情</h2>
          <StockTable domestic={tableIndex?.international} />
          <div className="box_footer"></div>
        </div>
      </div>
    </div>
  );
};

LeftLayout.propTypes = {};
LeftLayout.defaultProps = {};
