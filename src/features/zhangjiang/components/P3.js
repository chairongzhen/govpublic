import React, { useRef, forwardRef, useState, useMemo, useEffect } from 'react';
import useRequest from '../../common/requestHook';
import { WindChart } from '../../common/components/govChart';
import { useSize } from 'ahooks'
import useInterval from 'ahooks/es/useInterval';
import Counter from './counter';
import { cloneDeep } from 'lodash'
import p3json from './p4.json'
//更新时间
let useIntervalTime = 60000 * 60 * 12;
let chartData = []
const P3 = forwardRef((props, ref3) => {
	const [updateData, setUpdateData] = useState(0);
	const [data, status, request] = useRequest(() => {
		return { "MethodAlias": "GetSariCountryHistory", "Parameter": [] }
	}, [updateData])
	//定时发送
	// useInterval(() => {
	// 	setUpdateData((v) => v + 1)
	// }, useIntervalTime);
	//  读取本地文件
	// const data = p3json;

	const Counters = useMemo(() => {
		let dataList = Object.entries(data);
		//总数
		let Counters = [];
		// let timeLineData = [];
		let myDate = new Date();
		let year = myDate.getFullYear();
		let mouth = myDate.getMonth() + 1;
		if (mouth < 10) {
			mouth = "0" + mouth;
		}
		let day = myDate.getDate();
		if (day < 10) {
			day = "0" + day;
		}
		let dataBuffer = year + "-" + mouth + "-" + day;
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
			// 		// 时间标签
			// 		show: false,
			// 		text: stringBuffer,
			// 	},{
			// 		// 数值展示
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
				aData.name = listData.City;
				aData.value = (listData.SureCount - listData.CureCount - listData.DeadCount);
				aData.valueDate = everyData[0];
				dataStart.push(aData);
				num += (listData.SureCount - listData.CureCount - listData.DeadCount);
			}
			//总数值
			// dataStart.title[1].text = num;
			if (stringBuffer != dataBuffer) {
				chartData.push(dataStart);
				Counters.push(num)
			}

		}
		chartData = chartData.slice(5);
		Counters = Counters.slice(5);

		return Counters
	}, [data]);


	//自适应比例
	const ref = useRef();
	const size = useSize(ref);
	const style = useMemo(() => {
		//自适应屏幕比例，保持地图长宽比例不变
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
	}, [size]);

	const [index, setIndex] = useState(0);


	// props.option1.series.data = chartData[index]
	// props.option.options = chartData;
	// props.option.baseOption.timeline.currentIndex=index




	const instance = useRef()

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
		ref3.current = (i)=>{
			setIndex(i)
			window.instance?.setOption?.({series:[{data:chartData[i]}]})
		};
	}

	return (
		<div className="zhangjiang-components-p-3" ref={ref}>
			{/* 渐变数字 */}
			<div className="p-3number">
				<Counter value={Counters[index]} />
			</div>
			{/* 地图显示 */}
			<div style={style}>
				<WindChart
					ref={onRef}
					option={ props.option }
				/>
			</div>
		</div>
	);
});
export default P3;

P3.propTypes = {};
P3.defaultProps = {
	option: {
		title: [
			{
			left:'47%',
			bottom: '88%',
			textAlign:'center',
			textStyle: {
				color:'black',
				fontSize: window.lib.flexible.rem2px(0.0945833384328420),
			},
		},
		{
			left:'47%',
			// right: '43%',
			bottom: '55%',
			textAlign:'center',
			textStyle: {			
				color:'black',
				fontSize: window.lib.flexible.rem2px(0.1145833384328420),
			},
		},
		{
			text:'全球现有确诊',
			left:'47%',
			textAlign:'center',
			bottom: '64%',
			textStyle: {
				color:'#333333',
				fontSize: window.lib.flexible.rem2px(0.085),
			},
		}
	],
		
		visualMap: {
			show: true,
			type: 'piecewise',
			align: 'right',
			right: '0%',
			// orient:'horizontal',
			itemWidth: window.lib.flexible.rem2px(0.08593750382463154),
			itemHeight: window.lib.flexible.rem2px(0.12916667686568412),
			// splitNumber: 10,
			itemSymbol: 'rect',
			itemGap: -3,
			// text: ['    人\n'],
			max: 3000000,
			min: 800,
			showLabel: true,
			seriesIndex: 0,
			color: [
				'#671203',
				'#7C1301',
				'#971701',
				'#ab0607',
				'#C01617',
				'#CE2223',
				'#D63031',
				'#DE3031',
				'#E44C46',
				'#EE4C46',
				'#F6645E',
				'#FF8C6F',
				'#FEB790',
				'#FDD3A1',
				'#FFDEB7',
				'#FFF1D0',
				'#FFF8E9',
				'#CAF79E'
			],
			pieces: [
				{ min: 2000000, },
				{ min: 1000000, max: 1999999 },
				{ min: 500000, max: 999999 },
				{ min: 200000, max: 499999 },
				{ min: 100000, max: 199999 },
				{ min: 50000, max: 99999 },
				{ min: 20000, max: 49999 },
				{ min: 10000, max: 19999 },
				{ min: 5000, max: 9999 },
				{ min: 2000, max: 4999 },
				{ min: 1000, max: 1999 },
				{ min: 500, max: 999 },
				{ min: 200, max: 499 },
				{ min: 100, max: 199 },
				{ min: 50, max: 99 },
				{ min: 10, max: 49 },
				{ min: 1, max: 9 },
				{ min: 0, max: 0 },
			],
			bottom: -1,
			formatter: function(val1, val2) {
				if (typeof val2 == 'number'){
					if(val2=='Infinity'){
						return `> ${val1.toLocaleString()}`;
					}else{
						return `${val1.toLocaleString()} - ${val2.toLocaleString()}`;
					}		
				}
				else{
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
		series: [
			{
				type: 'map',
				top: '6%',
				left: '0%',
				right: '17.2%',
				bottom: '7%',
				mapType: 'world', // 自定义扩展图表类型
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
					itemStyle: {
						// areaColor: '#F6EEEE',
						// borderColor: '#000',
						// borderWidth: 2,
						// opacity: 0,
					},
				},
				data: [],
				// 自定义名称映射
				nameMap: {
					Afghanistan: '阿富汗',
					Angola: '安哥拉',
					Albania: '阿尔巴尼亚',
					Algeria: '阿尔及利亚',
					Argentina: '阿根廷',
					Armenia: '亚美尼亚',
					Australia: '澳大利亚',
					Austria: '奥地利',
					Azerbaijan: '阿塞拜疆',
					Bahamas: '巴哈马',
					Bangladesh: '孟加拉国',
					Belgium: '比利时',
					Benin: '贝宁',
					'Burkina Faso': '布基纳法索',
					Burundi: '布隆迪',
					Bulgaria: '保加利亚',
					'Bosnia and Herz.': '波斯尼亚和黑塞哥维那',
					Belarus: '白俄罗斯',
					Belize: '伯利兹',
					Bermuda: '百慕大群岛',
					Bolivia: '玻利维亚',
					Brazil: '巴西',
					Brunei: '文莱',
					Bhutan: '不丹',
					Botswana: '博茨瓦纳',
					Cambodia: '柬埔寨',
					Cameroon: '喀麦隆',
					Canada: '加拿大',
					'Central African Rep.': '中非共和国',
					Chad: '乍得',
					Chile: '智利',
					China: '中国',
					Colombia: '哥伦比亚',
					Congo: '刚果',
					'Costa Rica': '哥斯达黎加',
					"Côte d'Ivoire": '科特迪瓦',
					Croatia: '克罗地亚',
					Cuba: '古巴',
					Cyprus: '塞浦路斯',
					'Czech Rep.': '捷克共和国',
					'Dem. Rep. Korea': '朝鲜',
					'Dem. Rep. Congo': '民主刚果',
					Denmark: '丹麦',
					Djibouti: '吉布提',
					'Dominican Rep.': '多米尼加共和国',
					Ecuador: '厄瓜多尔',
					Egypt: '埃及',
					'El Salvador': '萨尔瓦多',
					'Eq. Guinea': '赤道几内亚',
					Eritrea: '厄立特里亚',
					Estonia: '爱沙尼亚',
					Ethiopia: '埃塞俄比亚',
					'Falkland Is.': '福克兰群岛',
					Fiji: '斐济',
					Finland: '芬兰',
					France: '法国',
					'French Guiana': '法属圭亚那',
					'Fr. S. Antarctic Lands': '法属南部领地',
					Gabon: '加蓬',
					Gambia: '冈比亚',
					Germany: '德国',
					Georgia: '格鲁吉亚',
					Ghana: '加纳',
					Greece: '希腊',
					Greenland: '格陵兰',
					Guatemala: '危地马拉',
					Guinea: '几内亚',
					'Guinea-Bissau': '几内亚比绍',
					Guyana: '圭亚那',
					Haiti: '海地',
					'Heard I. and McDonald Is.': '赫德岛和麦克唐纳群岛',
					Honduras: '洪都拉斯',
					Hungary: '匈牙利',
					Iceland: '冰岛',
					India: '印度',
					Indonesia: '印度尼西亚',
					Iran: '伊朗',
					Iraq: '伊拉克',
					Ireland: '爱尔兰',
					Israel: '以色列',
					Italy: '意大利',
					'Ivory Coast': '象牙海岸',
					Jamaica: '牙买加',
					Japan: '日本',
					Jordan: '乔丹',
					Kashmir: '克什米尔',
					Kazakhstan: '哈萨克斯坦',
					Kenya: '肯尼亚',
					Kosovo: '科索沃',
					Kuwait: '科威特',
					Kyrgyzstan: '吉尔吉斯斯坦',
					Laos: '老挝',
					'Lao PDR': '老挝人民民主共和国',
					Latvia: '拉脱维亚',
					Lebanon: '黎巴嫩',
					Lesotho: '莱索托',
					Liberia: '利比里亚',
					Libya: '利比亚',
					Lithuania: '立陶宛',
					Luxembourg: '卢森堡',
					Madagascar: '马达加斯加',
					Macedonia: '马其顿',
					Malawi: '马拉维',
					Malaysia: '马来西亚',
					Mali: '马里',
					Mauritania: '毛里塔尼亚',
					Mexico: '墨西哥',
					Moldova: '摩尔多瓦',
					Mongolia: '蒙古',
					Montenegro: '黑山',
					Morocco: '摩洛哥',
					Mozambique: '莫桑比克',
					Myanmar: '缅甸',
					Namibia: '纳米比亚',
					Netherlands: '荷兰',
					'New Caledonia': '新喀里多尼亚',
					'New Zealand': '新西兰',
					Nepal: '尼泊尔',
					Nicaragua: '尼加拉瓜',
					Niger: '尼日尔',
					Nigeria: '尼日利亚',
					Korea: '韩国',
					'Northern Cyprus': '北塞浦路斯',
					Norway: '挪威',
					Oman: '阿曼',
					Pakistan: '巴基斯坦',
					Panama: '巴拿马',
					'Papua New Guinea': '巴布亚新几内亚',
					Paraguay: '巴拉圭',
					Peru: '秘鲁',
					'Republic of the Congo': '刚果共和国',
					Philippines: '菲律宾',
					Poland: '波兰',
					Portugal: '葡萄牙',
					'Puerto Rico': '波多黎各',
					Qatar: '卡塔尔',
					'Republic of Serbia': '塞尔维亚共和国',
					Romania: '罗马尼亚',
					Russia: '俄罗斯',
					Rwanda: '卢旺达',
					Samoa: '萨摩亚',
					'Saudi Arabia': '沙特阿拉伯',
					Senegal: '塞内加尔',
					Serbia: '塞尔维亚',
					'Sierra Leone': '塞拉利昂',
					Slovakia: '斯洛伐克',
					Slovenia: '斯洛文尼亚',
					'Solomon Is.': '所罗门群岛',
					Somaliland: '索马里兰',
					Somalia: '索马里',
					'South Africa': '南非',
					'S. Geo. and S. Sandw. Is.': '南乔治亚和南桑德威奇群岛',
					'S. Sudan': '南苏丹',
					Spain: '西班牙',
					'Sri Lanka': '斯里兰卡',
					Sudan: '苏丹',
					Suriname: '苏里南',
					Swaziland: '斯威士兰',
					Sweden: '瑞典',
					Switzerland: '瑞士',
					Syria: '叙利亚',
					Tajikistan: '塔吉克斯坦',
					Tanzania: '坦桑尼亚',
					Thailand: '泰国',
					'Timor-Leste': '东帝汶',
					Togo: '多哥',
					'Trinidad and Tobago': '特立尼达和多巴哥',
					Tunisia: '突尼斯',
					Turkey: '土耳其',
					Turkmenistan: '土库曼斯坦',
					Uganda: '乌干达',
					Ukraine: '乌克兰',
					'United Arab Emirates': '阿拉伯联合酋长国',
					'United Kingdom': '大不列颠联合王国',
					'United Republic of Tanzania': '坦桑尼亚联合共和国',
					'United States': '美国',
					'United States of America': '美利坚合众国',
					Uruguay: '乌拉圭',
					Uzbekistan: '乌兹别克斯坦',
					Vanuatu: '瓦努阿图',
					Venezuela: '委内瑞拉',
					Vietnam: '越南',
					'West Bank': '西岸',
					'W. Sahara': '西撒哈拉',
					Yemen: '也门',
					Zambia: '赞比亚',
					Zimbabwe: '津巴布韦',
				},
			},
		],
	}
}