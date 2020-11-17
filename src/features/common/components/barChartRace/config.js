// import colorList from '../globalStyle.js';

export const defaultConfig = {
  // 数据源的编码方式。
  // 默认为UTF-8。
  // 如果是国内用户，且使用旧版Execl处理数据，保存的编码很可能是GBK的，如果出现乱码则将这里改成GBK。
  // 不建议修改这里。而是建议将自己制作完毕的csv文件的内容复制到example.csv中。因为example.csv的编码格式是所有语言都支持的。
  encoding: 'UTF-8',

  // 每个时间节点最多显示的条目数。
  maxNumber: 20,

  // 控制是否显示顶部附加信息文字。
  showMessage: false,
  // 附加信息内容。
  // left label
  itemLabel: '左侧文字',
  // right label
  typeLabel: '右侧文字',

  // 时间自动排序
  auto_sort: true,

  nameField: 'name',
  valueField: 'value',
  valueLabelField: 'value',
  //表示时间的字段名
  timeField: 'date',
  // 类型根据什么字段区分？如果是name，则关闭类型显示
  divideBy: 'name',
  // 时间格式化
  timeFormat: '%Y-%m-%d',

  // 倒序，使得最短的条位于最上方
  reverse: false,

  // 颜色根据什么字段区分？
  divideColorBy: 'name',
  color: {
    '意大利': '#121F5B',
    '伊朗': '#38447C',
    '韩国': '#737CA7',
    '西班牙': '#1F927D',
    '法国': '#43A08F',
    '德国': '#7AC7B9',
    '美国': '#DD5B01',
    '日本': '#FF8029',
    '瑞士': '#FFA96E',
    '挪威': '#8A0000',
    '瑞典': '#C21313',
    '丹麦': '#F24848',
    '荷兰': '#2942C6',
    '英国': '#6175DE',
    '比利时': '#A4B2F9',
    '奥地利': '#5E0989',
    '卡塔尔': '#842FAF',
    '巴林': '#BA6DE1',
    '新加坡': '#D20E32',
    '澳大利亚': '#EA4160',
    '马来西亚': '#FF7F97',
    '加拿大': '#186ED0',
    '希腊': '#4992E6',
    '捷克': '#84BAF7',
    '冰岛': '#5D2F8C',
    '芬兰': '#7D609A',
    '以色列': '#A58FBB',
    '斯洛文尼亚': '#8C300D',
    '阿联酋': '#A8502E',
    '伊拉克': '#D8815F',
    '埃及': '#A38E28',
    '科威特': '#DAA403',
    '印度': '#FEC210',
    '葡萄牙': '#FFE082',
    '巴西': '#121F5B',
    '圣马力诺': '#38447C',
    '泰国': '#737CA7',
    '爱尔兰': '#1F927D',
    '黎巴嫩': '#43A08F',
    '沙特阿拉伯': '#7AC7B9',
    '罗马尼亚': '#DD5B01',
    '菲律宾': '#FF8029',
    '波兰': '#FFA96E',
    '越南': '#8A0000',
    '俄罗斯': '#C21313',
    '印度尼西亚': '#F24848',
    '智利': '#2942C6',
    '巴勒斯坦': '#6175DE',
    '阿根廷': '#A4B2F9',
    '克罗地亚': '#5E0989',
    '爱沙尼亚': '#842FAF',
    '卢森堡': '#BA6DE1',
    '阿尔及利亚': '#D20E32',
    '文莱': '#EA4160',
    '格鲁吉亚': '#FF7F97',
    '塞尔维亚': '#186ED0',
    '保加利亚': '#4992E6',
    '哥斯达黎加': '#84BAF7',
    '阿尔巴尼亚': '#5D2F8C',
    '秘鲁': '#7D609A',
    '巴基斯坦': '#A58FBB',
    '斯洛伐克': '#8C300D',
    '白俄罗斯': '#A8502E',
    '厄瓜多尔': '#D8815F',
    '阿曼': '#DAA403',
    '南非': '#FEC210',
    '匈牙利': '#FFE082',
    '拉脱维亚': '#A38E28',
    '阿塞拜疆': '#121F5B',
    '巴拿马': '#38447C',
    '突尼斯': '#737CA7',
    '墨西哥': '#1F927D',
    '波黑': '#43A08F',
    '塞内加尔': '#7AC7B9',
    '塞浦路斯': '#DD5B01',
    '马耳他': '#FF8029',
    '北马其顿': '#FFA96E',
    '哥伦比亚': '#8A0000',
    '马尔代夫': '#C21313',
    '阿富汗': '#F24848',
    '亚美尼亚': '#2942C6',
    '巴拉圭': '#6175DE',
    '摩尔多瓦': '#A4B2F9',
    '摩洛哥': '#5E0989',
    '多米尼加': '#842FAF',
    '新西兰': '#BA6DE1',
    '柬埔寨': '#D20E32',
    '列支敦士登': '#EA4160',
    '乌克兰': '#FF7F97',
    '孟加拉国': '#186ED0',
    '斯里兰卡': '#4992E6',
    '玻利维亚': '#84BAF7',
    '立陶宛': '#5D2F8C',
    '刚果(金)': '#7D609A',
    '喀麦隆': '#A58FBB',
    '安道尔': '#8C300D',
    '尼日利亚': '#A8502E',
    '布基纳法索': '#D8815F',
    '摩纳哥': '#DAA403',
    '洪都拉斯': '#FEC210',
    '牙买加': '#FFE082',
    '不丹': '#A38E28',
    '土耳其': '#121F5B',
    '圭亚那': '#38447C',
    '多哥': '#737CA7',
    '尼泊尔': '#1F927D',
    '梵蒂冈': '#43A08F',
    '科特迪瓦': '#7AC7B9',
    '约旦': '#DD5B01',
    '蒙古': '#FF8029',
  },
  colorRange: [
    '#38447C',
    '#43A08F',
    '#FF8029',
    '#C21313',
    '#6175DE',
    '#842FAF',
    '#EA4160',
    '#4992E6',
    '#7D609A',
    '#A8502E',
    '#FEC210',
    '#A38E28',
    '#2C3663',
    '#358072',
    '#CC6620',
    '#9B0F0F',
    '#4D5DB1',
    '#69258C',
    '#BB344C',
    '#3A74B8',
    '#644C7B',
    '#864024',
    '#CB9B0C',
    '#827120',
    '#5F6996',
    '#68B3A5',
    '#FF9953',
    '#CE4242',
    '#8090E4',
    '#9C58BF',
    '#EE677F',
    '#6DA7EB',
    '#977FAE',
    '#B97357',
    '#FECE3F',
    '#B5A453',
  ],
  // colorRange: colorList,

  //主题颜色
  // themeColor: "#38447C",

  // 字段的值与其对应的颜色值
  // color: {
  //   // "上海": "#00aec7",
  // },

  // 榜首项目信息的水平位置 。
  // Top item information horizontal location
  item_x: 0,

  // 时间点间隔时间。

  interval_time: 1.5,

  // 上方文字水平高度。
  text_y: -50,

  // 右侧文字横坐标
  text_x: 1000,
  // 偏移量
  offset: 35,

  // 长度小于display_barInfo的bar将不显示barInfo。
  // Hide barInfo if bar is shorter than barInfo
  display_barInfo: 10000000,

  // 是否自动播放
  // auto_play: false,
  // 使用计数器
  // 注意！使用计时器和使用类型目前不能兼容，即不能同时开启！
  // 计数器会出现在右上角，记录着当前榜首的持续时间。
  use_counter: false,
  // 每个时间节点对于计数器的步长。
  // 比如时间节点日期的间隔可能为1周(七天)，那么step的值就应该为7。
  step: 1,

  //////////////////////////////////////////////////////////////////////////////
  // 格式化数值
  // 这里控制着数值的显示位数。主要靠修改中间的数字完成，如果为1则为保留一位小数。
  // 逗号表示每隔三位数用","分割
  // '.2f' means keeping two decimals.
  format: ',.0f',

  // 后缀
  postfix: '',

  // 如果看不懂这是在干什么的话，建议不要修改这里。
  // 反格式化函数:
  // 格式化操作可能会导致NaN问题。此函数将格式化后的数值反格式化为JS可以识别的数字。
  deformat: function (val, postfix) {
    return Number(val.replace(postfix, '').replace(/,/g, ''));
  },
  //////////////////////////////////////////////////////////////////////////////

  // 图表左右上下间距。
  // 注意，left_margin不包括左侧的label，修改数值较小会导致左侧label不显示,字符串rem，数字为px
  // 例如：    left_margin: '1.86667rem',    left_margin: 10,
  left_margin: '0.3rem',
  right_margin: '0.4rem',
  top_margin: '0.15rem',
  bottom_margin: '-0.07rem',

  // 是否开启时间标签。
  dateLabel_switch: true,
  // 时间标签坐标。建议x：1000 y：-50开始尝试，默认位置为x:null,y:null
  dateLabel_x: null,
  dateLabel_y: null,

  // 允许大于平均值的条消失时上浮。
  allow_up: false,

  // 所有条目上浮 - 用于反向排行榜等情况
  always_up: false,

  // 设置动画效果，如果为true，则新进入的条目从0开始。
  enter_from_0: false,

  // 如果要使用半对数坐标，则开启此项
  use_semilogarithmic_coordinate: false,

  // barinfo太长？也许可以试试这个
  long: false,

  // 延迟多少个时间节点开始
  wait: 0,

  // 单独控制交换动画速度倍率
  update_rate: 0.7,

  // 开启匀速动画效果
  // animation:'linear',

  showLabel: false,

  // label x轴位置
  labelx: -5,

  use_img: false,
  // 图片路径，本地图片或者网上图片。
  // 也可在imgs.js中配置。
  imgs: {
    任意名称: 'path/to/img',
  },

  // 全局背景颜色
  background_color: 'rgba(0,0,0,0)',

  // 矩形柱是否为圆角矩形
  rounded_rectangle: false,

  // 限制bar info 展示的长度
  // limit bar info display length
  bar_name_max: 30,

  //bar的高度
  barHeight: '8%',
  //barInfo字体属性
  barInfoSize: 0,
  //label字体属性
  labelSize: '15pt',
  //value字体属性
  valueY: 17,

  labely: 16,

  valueSize: '15pt',

  // 是否显示x轴轴线
  showXTick: false,
  // 如果所有数字都很大，导致拉不开差距则开启此项使得坐标原点变换为(最小值)*2-(最大值)
  big_value: true,

  tickPadding: 10,

  unit: '',
};
