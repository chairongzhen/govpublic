import React, { useRef, forwardRef, useState,useMemo} from 'react';
// import PropTypes from 'prop-types';
// import echarts from '../Echarts';
import useRequest from '../../common/requestHook';
import { WindChart } from '../../common/components/govChart';
import { title } from 'echarts/lib/theme/dark';
import { useSize } from 'ahooks'
import useInterval from 'ahooks/es/useInterval';
import Counter from './counter';
import { cloneDeep } from 'lodash'
import p1json from './p1.json'
import { number } from 'echarts/lib/export';
//更新时间
let useIntervalTime = 60000 * 60 * 12;
let chartData = [];
const P1 = forwardRef((props, ref1) => {

	const [updateData, setUpdateData] = useState(0);
	const [data, status, request] = useRequest(() => {
		return { "MethodAlias": "GetSariProvinceHistory", "Parameter": [] }
	}, [updateData])
	//定时发送
	useInterval(() => {
		setUpdateData((v) => v + 1)
	}, useIntervalTime);
	// 读取本地文件
	//const data=p1json;

	const Counters = useMemo(()=>{
		let dataList = Object.entries(data);
		// let timeLineData = [];
		let Counters = [];
		for (let everyData of dataList) {
			// timeLineData.push(everyData[0]);
			let string1 = everyData[0].substring(0, 4);
			let string2 = everyData[0].substring(4, 6);
			let string3 = everyData[0].substring(6, 8);
			let stringBuffer = string1 + "-" + string2 + "-" + string3;
			// let dataStart = {
			// 	series: {
			// 		data: []
			// 	},
			// 	title: [{
			// 		show: false,
			// 		text: stringBuffer,
			// 	}, {
			// 		show: false,
			// 		text: "",
			// 	}]
			// }
			let dataStart = [];
			let num = 0;
			for (let listData of everyData[1]) {
				let aData = {
					name: "",
					value: '',
					valueDate: ""
				}
				aData.name = listData.Province;
				aData.value = (listData.SureCount - listData.CureCount - listData.DeadCount);
				aData.valueDate = everyData[0];
				dataStart.push(aData);
				num += (listData.SureCount - listData.CureCount - listData.DeadCount);
			}
			// dataStart.title[1].text = num
			chartData.push(dataStart);
			Counters.push(num)
			
		}
		chartData = chartData.slice(1);
		return Counters
	}, [data]);

	const ref = useRef();
	const size = useSize(ref)
	const style = useMemo(()=>{
		let min = Math.min(size.width, size.height);
		let style = {};
		if (size.width > size.height) {
			if (size.width > size.height * 2.1) {
				style = {
					width: 2.1 * min + 'px',
					height: min + 'px',
					margin: '0 auto',
				}
			} else {
				style = {
					width: size.width + 'px',
					height: size.width / 2.1 + 'px',
					margin: '0 auto',
				}
			}
		} else {
			style = {
				width: min + 'px',
				height: min / 2.1 + 'px',
				margin: '0 auto',
			}
		}
		return style;
	},[size]);

	const [index, setIndex] = useState(0);

	const instance = useRef();

	const onRef = ref => {
		if (instance) {
		  instance.current = ref && ref.getEchartsInstance && ref.getEchartsInstance();
		  // 将echart实例保存，在页面unload前销毁
		//   if (instance.current) destroyQueue.push(instance.current);

		  window.instance = instance.current
		}
	  };
	//   useEffect(()=>{
	// 	  window.instance?.setOption?.({series:[{data:chartData}]})
	//   },[chartData])


	if (chartData[0]) {
		ref1.current = (i)=>{
			setIndex(i)
			window.instance?.setOption?.({series:[{data:chartData[i]}]})
		};
	}

	return (
		<div className="zhangjiang-components-p-1" ref={ref}>
			<div className="p-1number">
				<Counter value = {Counters[index]} />
			</div>
			<div style={style}>
				<WindChart
					ref={onRef}
					option={props.option}
				/>
			</div>
		</div>
	);
});
export default P1;

P1.propTypes = {};
P1.defaultProps = {
	option: {
		title: [
			{
				left: '50.75%',
				bottom: '88%',
				textAlign: 'center',
				textStyle: {
					color: 'black',
					fontSize: window.lib.flexible.rem2px(0.0945833384328420),
				},
			},
			{
				// right: '50%',
				left: '52.75%',
				bottom: '74%',
				textAlign: 'center',
				textStyle: {
					color: 'black',
					fontSize: window.lib.flexible.rem2px(0.1145833384328420),
				},
			},
			{
				text: '全国现有确诊',
				textAlign: 'center',
				left: '52.75%',
				bottom: '81%',
				textStyle: {
					color: '#333333',
					fontSize: window.lib.flexible.rem2px(0.085),
				},
			}
		],
		// timeline: {
		// 	//data: ['1990', '1991','1992','1993','1994'],
		// 	show: false,
		// 	autoPlay: false,
		// 	// bottom:'-1%',
		// 	//是否循环播放
		// 	// loop: false,
		// 	//播放速度
		// 	playInterval: 500,
		// 	axisType: 'category',
		// 	currentIndex: 0,
		// 	lineStyle: {
		// 		width: window.lib.flexible.rem2px(0.025),
		// 		color: '#EEEEEE',
		// 	},
		// 	itemStyle: {
		// 		// color: 'rgba(0, 0, 0, 0)',
		// 		color: 'rgba(0, 0, 0, 0)',
		// 		// borderColor: '#fff',
		// 		// borderWidth: 1,
		// 	},
		// 	symbol: 'round',
		// 	symbolSize: 20,
		// 	emphasis: {
		// 		itemStyle: {
		// 			color: 'rgba(0, 0, 0, 0)',
		// 		},
		// 		controlStyle: {
		// 			color: '#00AEC7',
		// 		},
		// 	},
		// 	controlStyle: {
		// 		showPrevBtn: false,
		// 		showNextBtn: false,
		// 		itemSize: 25,
		// 		// playIcon:
		// 		// 	'path://M12.8459075,9.23697041 C12.0501433,8.61805302 1.93257015,0.262668313 1.93257015,0.262668313 C1.47784776,-0.149943277 0.79576418,-0.0467903795 0.341041791,0.365821211 C0.113680597,0.572127006 0,0.881585699 0,1.08789149 C0,1.08789149 0,1.08789149 0,1.08789149 C0,1.08789149 0,21.2027065 0,21.718471 C0,22.3373884 0.454722388,22.75 1.13680597,22.75 C1.36416717,22.75 1.70520896,22.6468471 1.81888955,22.4405413 C1.93257015,22.3373884 11.4817403,14.9103798 12.5048657,14.0851566 C13.5279911,13.2599334 13.9827134,12.5378631 13.9827134,11.5063342 C14.096394,10.5779581 13.6416717,9.85588779 12.8459075,9.23697041 Z',
		// 		// stopIcon:
		// 		// 	'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
		// 		// 'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIyMXB4IiB2aWV3Qm94PSIwIDAgMTYgMjEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU0LjEgKDc2NDkwKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT7mmoLlgZw8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0i6aG16Z2iMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuWbveWutuWMuuWfn+eglOeptuS/ruaUuTPliJfooajlpI3liLYtMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQyMC4wMDAwMDAsIC01NDkuMDAwMDAwKSIgZmlsbD0iIzAwQUVDNyI+CiAgICAgICAgICAgIDxnIGlkPSLmmoLlgZwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQyMC4wMDAwMDAsIDU0OS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaLlpI3liLYtMTEiIHg9IjExLjI1IiB5PSIwIiB3aWR0aD0iNC41IiBoZWlnaHQ9IjIwLjI1IiByeD0iMiI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9ouWkjeWIti0xMiIgeD0iMCIgeT0iMCIgd2lkdGg9IjQuNSIgaGVpZ2h0PSIyMC4yNSIgcng9IjIiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+',
		// 		color: '#00AEC7',
		// 	},
		// 	checkpointStyle: {
		// 		color: '#00AEC7',
		// 		borderColor: '#fff',
		// 		borderWidth: 1,
		// 	},
		// 	tooltip: {
		// 		trigger: 'item',
		// 		position: 'top',
		// 		formatter: params => {
		// 			return params.name;
		// 		},
		// 	},
		// 	label: {
		// 		show: false
		// 	}
		// },

		visualMap: {
			show: true,
			type: 'piecewise',
			orient: 'vertical',
			itemWidth: window.lib.flexible.rem2px(0.08593750382463154),
			itemHeight: window.lib.flexible.rem2px(0.1406250107089683),
			// align: 'top',
			// splitNumber: 10,
			itemSymbol: 'rect',
			itemGap: -3,
			// text: ['     人\n'],
			max: 3000000,
			min: 800,
			showLabel: true,
			seriesIndex: 0,
			color: [
				// '#00FF7F',
				'#671203',
				'#7C1301',
				'#971701',
				'#ab0607',
				'#C01617',
				'#CE2223',
				'#D63031',
				'#E44C46',
				'#F6645E',
				'#FF8C6F',
				'#FFA790',
				'#FDD3A1',
				'#FFDEB7',
				'#FFF1D0',
				'#FFF8E9',
				'#CAF79E',

			],
			pieces: [
				// { ,max: NaN},
				{ min: 100000, },
				{ min: 50000, max: 99999 },
				{ min: 20000, max: 49999 },
				{ min: 10000, max: 19999 },
				{ min: 5000, max: 9999 },
				{ min: 2000, max: 4999 },
				{ min: 1500, max: 1999 },
				{ min: 1000, max: 1499 },
				{ min: 700, max: 999 },
				{ min: 500, max: 699 },
				{ min: 200, max: 499 },
				{ min: 100, max: 199 },
				{ min: 50, max: 99 },
				{ min: 10, max: 49 },
				{ min: 1, max: 9 },
				{ min: 0, max: 0 },
			],
			bottom: -1,
			formatter: function (val1, val2) {
				if (typeof val2 == 'number') {
					if (val2 == 'Infinity') {
						return `> ${val1.toLocaleString()}`;
					} else {
						return `${val1.toLocaleString()} - ${val2.toLocaleString()}`;
					}
				}
				else {
					return `${val1.toLocaleString()}`
				}

			},
		},
		tooltip: {
			trigger: 'item',
			// formatter: params => {
			// 	// 地图tooltip
			// 	let str = params.name + '<br />';
			// 	let val = params.value;
			// 	let year = params.data ? params.data.valueDate + '<br />' : '';
			// 	str += year;
			// 	if (Number(val).toString() !== 'NaN') {
			// 		val = params.marker + '碳排放总量：' + calNumber(val, 2);
			// 	} else {
			// 		val = params.marker + '碳排放总量：--';
			// 	}
			// 	return str + val;
			// },
		},
		series: 
			{
				type: 'map',
				top: '6%',
				left: '25%',
				right: '18%',
				bottom: '4%',

				mapType: 'china', // 自定义扩展图表类型
				// normal: {
				// 	// areaColor: '#F6EEEE', //
				// },
				label: {
					show: false,
				},
				itemStyle: {
					areaColor: '#CAF79E',
				},
				emphasis: {
					label: {
						show: false,
					},

				},
				data: [],
			},
	}
};
