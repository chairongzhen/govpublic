/*
 * @Author: hcluo
 * @Date: 2020-07-23 13:46:18
 * @LastEditors: hcluo
 * @LastEditTime: 2020-08-03 11:24:32
 * @Description: 政府项目
 */

// 饼图
export let pie = {
  dataset: {
    dimensions: ['dimension', 'GDP', 'CPI', 'PPI'],
    source: [
      { dimension: '2017', GDP: 43.3, CPI: 85.8, PPI: 193.7 },
      { dimension: '2018', GDP: 83.1, CPI: 73.4, PPI: 155.1 },
      { dimension: '2019', GDP: 86.4, CPI: 65.2, PPI: 182.5 },
      { dimension: '2020', GDP: 72.4, CPI: 53.9, PPI: 139.1 },
    ],
  },
  series: [
    {
      radius: '70%',
      type: 'pie',
    },
  ],
};

// 环图
export let ring = {
  dataset: {
    dimensions: ['dimension', 'GDP', 'CPI', 'PPI'],
    source: [
      { dimension: '2017', GDP: 43.3, CPI: 85.8, PPI: 193.7 },
      { dimension: '2018', GDP: 83.1, CPI: 73.4, PPI: 155.1 },
      { dimension: '2019', GDP: 86.4, CPI: 65.2, PPI: 182.5 },
      { dimension: '2020', GDP: 72.4, CPI: 53.9, PPI: 139.1 },
    ],
  },
  legend: {
    show: true,
    right: '10%',
    top: 'center',
    orient: 'vertical',
  },
  series: [
    {
      center: ['35%', '50%'],
      radius: ['30%', '55%'],
      type: 'pie',
      label: { show: false },
    },
  ],
};

// 横向堆叠柱状图
export let barStackH = {
  dataset: {
    dimensions: ['dimension', 'GDP', 'CPI', 'PPI'],
    source: [{ dimension: '2017', GDP: 43.3, CPI: 85.8, PPI: 193.7 }],
  },
  xAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false },
  },
  yAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false },
    type: 'category',
    inverse: true,
  },
  series: [
    {
      type: 'bar',
      stack: 'city',
      barWidth: 40,
      barCategoryGap: '-100%',
      itemStyle: { color: 'red' },
      label: {
        show: true,
        formatter: '{@[1]}%',
      },
    },
    {
      type: 'bar',
      stack: 'city',
      barWidth: 40,
      barCategoryGap: '-100%',
      itemStyle: { color: 'blue' },
      label: {
        show: true,
        formatter: '{@[2]}%',
      },
    },
    {
      type: 'bar',
      stack: 'city',
      barWidth: 40,
      barCategoryGap: '-100%',
      itemStyle: { color: 'green' },
      label: {
        show: true,
        formatter: '{@[3]}%',
      },
    },
  ],
};

// 横向柱状图
export let barH = {
  dataset: {
    dimensions: ['dimension', 'GDP', 'CPI', 'PPI'],
    source: [
      { dimension: '2017', GDP: 43.3, CPI: 85.8, PPI: 193.7 },
      { dimension: '2018', GDP: 83.1, CPI: 73.4, PPI: 155.1 },
      { dimension: '2019', GDP: 86.4, CPI: 65.2, PPI: 182.5 },
      { dimension: '2020', GDP: 72.4, CPI: 53.9, PPI: 139.1 },
    ],
  },
  xAxis: {},
  yAxis: { type: 'category' },
  series: [{ type: 'bar' }],
};

// 柱状图、折线图
export let barLine = {
  dataset: {
    dimensions: ['dimension', 'GDP', 'CPI', 'PPI'],
    source: [
      { dimension: '2017', GDP: 43.3, CPI: 85.8, PPI: 193.7 },
      { dimension: '2018', GDP: 83.1, CPI: 73.4, PPI: 155.1 },
      { dimension: '2019', GDP: 86.4, CPI: 65.2, PPI: 182.5 },
      { dimension: '2020', GDP: 72.4, CPI: 53.9, PPI: 139.1 },
    ],
  },
  xAxis: { type: 'category' },
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'line' }],
};
export let bar = {
  dataset: {
    dimensions: ['dimension', 'GDP', 'CPI', 'PPI'],
    source: [
      { dimension: '2017', GDP: 43.3, CPI: 85.8, PPI: 193.7 },
      { dimension: '2018', GDP: 83.1, CPI: 73.4, PPI: 155.1 },
      { dimension: '2019', GDP: 86.4, CPI: 65.2, PPI: 182.5 },
      { dimension: '2020', GDP: 72.4, CPI: 53.9, PPI: 139.1 },
    ],
  },
  xAxis: { type: 'category' },
  series: [{ type: 'bar' }],
};
export let line = {
  dataset: {
    dimensions: ['product', '2015'],
    source: [
      { product: 'M', '2015': 43.3 },
      { product: 'T', '2015': 83.1 },
      { product: 'C', '2015': 86.4 },
      { product: 'W', '2015': 72.4 },
    ],
  },
  xAxis: { type: 'category' },
  series: [{ type: 'line' }],
};

// 中国地图
export let map = {
  // geo: {
  //   nameProperty: 'code',
  // },
  series: [
    {
      type: 'map',
      map: 'china',
      data: [
        { name: '北京', value: 722.5754251671142, level: 'province', cityCode: 110000 },
        { name: '天津', value: 223.7669284347805, level: 'province', cityCode: 120000 },
        { name: '河北', value: 79.08971121105468, level: 'province', cityCode: 130000 },
        { name: '山西', value: 503.1320665632879, level: 'province', cityCode: 140000 },
        {
          name: '内蒙古自治区',
          value: 976.4893562697022,
          level: 'province',
          cityCode: 150000,
        },
        { name: '辽宁', value: 203.83874191712238, level: 'province', cityCode: 210000 },
        { name: '吉林', value: 677.5577518309914, level: 'province', cityCode: 220000 },
        { name: '黑龙江', value: 484.9458809468321, level: 'province', cityCode: 230000 },
        { name: '上海', value: 668.2601544352258, level: 'province', cityCode: 310000 },
        { name: '江苏', value: 775.3276905532023, level: 'province', cityCode: 320000 },
        { name: '浙江', value: 784.1325578413538, level: 'province', cityCode: 330000 },
        { name: '安徽', value: 312.25970444085306, level: 'province', cityCode: 340000 },
        { name: '福建', value: 913.8119735935009, level: 'province', cityCode: 350000 },
        { name: '江西', value: 5.796391233787723, level: 'province', cityCode: 360000 },
        { name: '山东', value: 546.3421807092678, level: 'province', cityCode: 370000 },
        { name: '河南', value: 105.03966373914753, level: 'province', cityCode: 410000 },
        { name: '湖北', value: 625.215195673541, level: 'province', cityCode: 420000 },
        { name: '湖南', value: 967.9400088049057, level: 'province', cityCode: 430000 },
        { name: '广东', value: 337.19849660428116, level: 'province', cityCode: 440000 },
        {
          name: '广西壮族自治区',
          value: 61.0223626849169,
          level: 'province',
          cityCode: 450000,
        },
        { name: '海南', value: 310.5870589188524, level: 'province', cityCode: 460000 },
        { name: '重庆', value: 146.8210693196541, level: 'province', cityCode: 500000 },
        { name: '四川', value: 97.87397976244705, level: 'province', cityCode: 510000 },
        { name: '贵州', value: 983.5073684215125, level: 'province', cityCode: 520000 },
        { name: '云南', value: 909.58524219515, level: 'province', cityCode: 530000 },
        {
          name: '西藏自治区',
          value: 425.74006313397786,
          level: 'province',
          cityCode: 540000,
        },
        { name: '陕西', value: 138.5838572707716, level: 'province', cityCode: 610000 },
        { name: '甘肃', value: 226.18644981419723, level: 'province', cityCode: 620000 },
        { name: '青海', value: 55.24946224199412, level: 'province', cityCode: 630000 },
        {
          name: '宁夏回族自治区',
          value: 211.69209571031277,
          level: 'province',
          cityCode: 640000,
        },
        {
          name: '新疆维吾尔自治区',
          value: 131.83213475437648,
          level: 'province',
          cityCode: 650000,
        },
        { name: '台湾', value: 523.9165507116102, level: 'province', cityCode: 710000 },
        {
          name: '香港特别行政区',
          value: 832.8059253148155,
          level: 'province',
          cityCode: 810000,
        },
        {
          name: '澳门特别行政区',
          value: 946.6038502162712,
          level: 'province',
          cityCode: 820000,
        },
      ],
    },
  ],
};

export let treemap = {
  series: {
    name: '行业分布',
    id: 'unit(亿元)',
    type: 'treemap',
    nodeClick: false,
    breadcrumb: { show: false },
    data: [
      { name: '制造业', value: '65152.21' },
      { name: '金融、保险业', value: '60014.44' },
      { name: '交通运输、仓储业', value: '42872.28' },
      { name: '房地产业', value: '19197.78' },
      { name: '信息技术业', value: '9317.44' },
      { name: '批发和零售贸易', value: '9120.20' },
      { name: '社会服务业', value: '7601.34' },
      { name: '其它行业', value: '7109.88' },
      { name: '综合类', value: '6809.59' },
      { name: '建筑业', value: '4823.25' },
      { name: '采掘业', value: '1147.90' },
      { name: '传播与文化产业', value: '549.50' },
      { name: '农、林、牧、渔业', value: '295.30' },
    ],
  },
};
