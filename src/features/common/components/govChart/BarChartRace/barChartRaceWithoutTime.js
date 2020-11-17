import React, { Component } from 'react';
import * as d3 from 'd3';
import { defaultConfig } from './config';
import './barChartRace.less';
// import _ from 'lodash';
import { toThousandSeparator } from '../../../common/formatters';

export default class BarChartRaceWithoutTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataIndex: 0,
        }
    }

    componentDidMount() {
        var { data, chartConfig } = this.props;
        let config = {};
        config = Object.assign(config, defaultConfig, chartConfig);
        var height = this.refs.parent.clientHeight;
        var width = this.refs.parent.clientWidth;
        data && data.length > 0 && this.drawChart(data, config, width, height);

        //增加受控组件的写法 
        this.props.onRef(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.removeChart();
            var { data, chartConfig } = nextProps;
            let config = {};
            config = Object.assign(config, defaultConfig, chartConfig);
            var height = this.refs.parent.clientHeight;
            var width = this.refs.parent.clientWidth;
            data && data.length > 0 && this.drawChart(data, config, width, height)
        }
    }

    render() {
        var { chartStyle, data, chartConfig } = this.props;
        var date = [];
        var timeField = chartConfig.timeField;
        data.forEach(element => {
            if (date.indexOf(element[timeField]) === -1) {
                date.push(element[timeField]);
            }
        });
        return <div id={this.props.id} className={"barChartRace"} ref="parent" style={chartStyle || { width: "calc(100% - 20px)", height: "calc(100% - 20px)", margin: 10 }}>
            <svg id="chart" width="100%" height="calc(100% - 40px)"></svg>
            <svg id="icon" className="icon" style={{display:"none"}}></svg>
            <input id="input" className="progress" 
                style={{ width: "calc(100% - 60px)", marginBottom: 15 , display:"none"}}
                type="range"
                //defaultValue={this.state.dataIndex}
                value={this.state.dataIndex}
                onChange={this.onDrag.bind(this)}
                max={date.length - 1}
                mmin="0" />
        </div>
    }

    onDrag(e) {
        console.log("LHJ",e.target.value)
        this.setState({
            dataIndex: e.target.value
        })
    }

    onChange(value){
        let  { id } = this.props;
        let svg = d3.select(`#${id}`).select("#input");
        console.log("onchange", value);
        svg.node().value = value;
        this.setState({
            dataIndex: value
        },()=>{
            svg.dispatch("myclick");
        })
    }

    removeChart() {
        var { id } = this.props;
        const svg1 = d3.select(`#${id}`).select("#chart");
        const svg2 = d3.select(`#${id}`).select("#icon");
        svg1.selectAll("g").remove();
        svg2.selectAll("g").remove();
    }

    drawChart(data, config, width, height) {
        var me = this;
        var { id } = this.props;
        var date = [];
        var timeField = config.timeField;
        var nameField = config.nameField;
        var valueField = config.valueField;
        data.forEach(element => {
            if (date.indexOf(element[timeField]) === -1) {
                date.push(element[timeField]);
            }
        });
        let rate = [];
        var auto_sort = config.auto_sort;
        var time;
        if (auto_sort) {
            time = date.sort((x, y) => Number(x) - Number(y));
        } else {
            time = date;
        }
        var use_semilogarithmic_coordinate = config.use_semilogarithmic_coordinate;
        var big_value = config.big_value;
        var divideBy = config.divideBy;
        var divideColorBy = config.divideColorBy;
        var name_list = [];
        data.sort((a, b) => Number(b[valueField]) - Number(a[valueField]))
            .forEach(e => {
                if (name_list.indexOf(e[nameField]) === -1) {
                    name_list.push(e[nameField]);
                }
            });
        var baseTime = 1500;

        var labelGroups = [];
        // 选择颜色
        function getColor(d) {
            const colorRange = window.color || config.colorRange;
            const len = colorRange.length;
            if (d[divideColorBy] in config.color) {
                return config.color[d[divideColorBy]];
            }
            else {
                if (config.themeColor) {
                    return config.themeColor
                }
                else {
                    if (labelGroups.indexOf(d[divideColorBy]) > -1) {
                        let i = labelGroups.indexOf(d[divideColorBy]);
                        i = i % len;
                        return colorRange[i];
                    } else {
                        labelGroups.push(d[divideColorBy]);
                        let i = labelGroups.indexOf(d[divideColorBy]);
                        i = i % len;
                        return colorRange[i];
                    }
                }
            }
        }
        var showMessage = config.showMessage;
        var allow_up = config.allow_up;
        var always_up = config.always_up;
        var interval_time = config.interval_time;
        var text_y = config.text_y;
        var itemLabel = config.itemLabel;
        var typeLabel = config.typeLabel;
        // 长度小于display_barInfo的bar将不显示barInfo
        var display_barInfo = config.display_barInfo;
        var use_type_info;
        // 显示类型
        if (divideBy !== nameField) {
            use_type_info = true;
        } else {
            use_type_info = false;
        }
        // 使用计数器
        var use_counter = config.use_counter;
        // 每个数据的间隔日期
        var step = config.step;
        var long = config.long;
        var format = config.format;
        var left_margin = config.left_margin;
        var right_margin = config.right_margin;
        var top_margin = config.top_margin;
        var bottom_margin = config.bottom_margin;
        // var timeFormat = config.timeFormat;
        var item_x = config.item_x;
        var maxNumber = config.maxNumber;
        var reverse = config.reverse;
        var text_x = config.text_x;
        var offset = config.offset;
        var animation = config.animation;
        // var deformat = config.deformat;
        config.imgs = config.imgs;

        const margin = {
            left: left_margin,
            right: right_margin,
            top: top_margin,
            bottom: bottom_margin
        };
        var background_color = config.background_color;

        d3.select(`#${id}`).style("background", background_color);

        var enter_from_0 = config.enter_from_0;
        interval_time /= 3;
        var lastData = [];
        var currentdate = time[0] && time[0].toString();
        var currentData = [];
        var lastname;
        const svg = d3.select(`#${id}`).select("#chart");
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom - 40;
        const xValue = d => Number(d[valueField]);
        const yValue = d => d[nameField];
        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xAxisG = g
            .append("g")
            .attr("transform", `translate(0, ${innerHeight})`);
        const yAxisG = g.append("g");

        xAxisG
            .append("text")
            .attr("class", "axis-label")
            .attr("x", innerWidth / 2)
            .attr("y", 200);

        var xScale = d3.scaleLinear();
        if (use_semilogarithmic_coordinate) {
            xScale = d3.scalePow().exponent(0.5);
        } else {
            xScale = d3.scaleLinear();
        }
        const yScale = d3
            .scaleBand()
            .paddingInner(0.3)
            .paddingOuter(0);

        const xTicks = document.body.clientWidth >= 1920 ? 4 : 3;
        const xAxis = d3
            .axisTop()
            .scale(xScale)
            .ticks(xTicks)
            .tickPadding(config.tickPadding)
            .tickFormat(d => {
                if (d <= 0) {
                    return "";
                }
                return toThousandSeparator(d);
            })
            .tickSize(innerHeight);

        const yAxis = d3
            .axisLeft()
            .scale(yScale)
            .tickPadding(5)
            .tickSize(-innerWidth);

        var dateLabel_switch = config.dateLabel_switch;
        var dateLabel_x = config.dateLabel_x;
        var dateLabel_y = config.dateLabel_y;
        //dateLabel位置
        if (dateLabel_x == null) {
            dateLabel_x = innerWidth + 130; //默认
        }
        if (dateLabel_y == null) {
            dateLabel_y = innerHeight; //默认
        }
        //是否隐藏
        if (dateLabel_switch === false) {
            dateLabel_switch = "hidden";
        } else {
            dateLabel_switch = "visible";
        }
        var dateLabel = g.insert("text")
            .data(currentdate)
            .attr("class", "dateLabel-dy")
            .attr("style:visibility", dateLabel_switch)
            .attr("x", dateLabel_x)
            .attr("y", dateLabel_y)
            .attr("text-anchor", function () {
                return "end";
            })
            .text(currentdate);

        var topLabel = g
            .insert("text")
            .attr("class", "topLabel")
            .attr("x", item_x)
            .attr("y", text_y);

        // var unitLable = g
        //     .insert("text")
        //     .attr("class", "unitLabel")
        //     .attr("style:visibility", "visible")
        //     .attr("x", innerWidth + 50)
        //     .attr("y", 0 - config.tickPadding)
        //     .text(config.unit);

        function dataSort() {
            if (reverse) {
                currentData.sort(function (a, b) {
                    if (Number(a[valueField]) === Number(b[valueField])) {
                        var r1 = 0;
                        var r2 = 0;
                        for (let index = 0; index < a[nameField].length; index++) {
                            r1 = r1 + a[nameField].charCodeAt(index);
                        }
                        for (let index = 0; index < b[nameField].length; index++) {
                            r2 = r2 + b[nameField].charCodeAt(index);
                        }
                        return r2 - r1;
                    } else {
                        return Number(a[valueField]) - Number(b[valueField]);
                    }
                });
            } else {
                currentData.sort(function (a, b) {
                    if (Number(a[valueField]) === Number(b[valueField])) {
                        var r1 = 0;
                        var r2 = 0;
                        for (let index = 0; index < a[nameField].length; index++) {
                            r1 = r1 + a[nameField].charCodeAt(index);
                        }
                        for (let index = 0; index < b[nameField].length; index++) {
                            r2 = r2 + b[nameField].charCodeAt(index);
                        }
                        return r2 - r1;
                    } else {
                        return Number(b[valueField]) - Number(a[valueField]);
                    }
                });
            }
        }

        function getCurrentData(date, index) {
            rate = [];
            currentData = [];

            data.forEach(element => {
                if (element[timeField] === date && parseFloat(element[valueField]) !== 0) {
                    var tail = "";
                    if (element[nameField] && element[nameField].length > config.bar_name_max) {
                        tail = "...";
                    } else {
                        tail = "";
                    }
                    element[nameField] = element[nameField] && element[nameField].slice(0, config.bar_name_max - 1) + tail;
                    currentData.push(element);
                }
            });

            rate["MAX_RATE"] = 0;
            rate["MIN_RATE"] = 1;
            currentData.forEach(e => {
                lastData.forEach(el => {
                    if (el[nameField] === e[nameField]) {
                        rate[e[nameField]] = Number(Number(e[valueField]) - Number(el[valueField]));
                    }
                });
                if (rate[e[nameField]] === undefined) {
                    rate[e[nameField]] = rate["MIN_RATE"];
                }
                if (rate[e[nameField]] > rate["MAX_RATE"]) {
                    rate["MAX_RATE"] = rate[e[nameField]];
                } else if (rate[e[nameField]] < rate["MIN_RATE"]) {
                    rate["MIN_RATE"] = rate[e[nameField]];
                }
            });
            currentData = currentData.slice(0, maxNumber);
            dataSort();

            d3.transition()
            .each(redraw)
            .each(change);
            
            lastData = currentData;
        }

        if (showMessage) {
            // 左1文字
            g.insert("text")
                .attr("class", "growth")
                .attr("x", 0)
                .attr("y", text_y)
                .text(itemLabel);

            // 右1文字
            g.insert("text")
                .attr("class", "growth")
                .attr("x", text_x)
                .attr("y", text_y)
                .text(typeLabel);

            // 榜首日期计数
            if (use_counter === true) {
                var days = g
                    .insert("text")
                    .attr("class", "days")
                    .attr("x", text_x + offset)
                    .attr("y", text_y);
            } else {
                // 显示榜首type
                if (use_type_info === true) {
                    var top_type = g
                        .insert("text")
                        .attr("class", "days")
                        .attr("x", text_x + offset)
                        .attr("y", text_y);
                }
            }
        }

        var counter = {
            value: 1
        };

        var avg = 0;

        function redraw() {
            if (currentData.length === 0) return;

            if (big_value) {
                xScale
                    .domain([
                        2 * d3.min(currentData, xValue) - d3.max(currentData, xValue) > 0 ? 2 * d3.min(currentData, xValue) - d3.max(currentData, xValue) : 0,
                        d3.max(currentData, xValue) + (d3.max(currentData, xValue) - d3.min(currentData, xValue)) * 0.05
                    ])
                    .range([0, innerWidth]);
            } else {
                xScale
                    .domain([0, d3.max(currentData, xValue) + (d3.max(currentData, xValue) - d3.min(currentData, xValue)) * 0.05])
                    .range([0, innerWidth]);
            }

            dateLabel.text(currentdate);

            xAxisG
                .transition()
                .duration(baseTime * interval_time)
                .ease(d3.easeLinear)
                .call(xAxis);
            yAxisG
                .transition()
                .duration(baseTime * interval_time)
                .ease(d3.easeLinear)
                .call(yAxis);

            yAxisG.selectAll(".tick").remove();
            if (!config.showXTick) {
                xAxisG.selectAll(".tick").remove();
            }

            yScale
                .domain(currentData.map(d => d[nameField]).reverse())
                .range([innerHeight, 0]);

            var bar = g.selectAll(".bar").data(currentData, function (d) {
                return d[nameField];
            });

            if (showMessage) {
                // 榜首文字
                topLabel.data(currentData).text(function (d) {
                    if (lastname === d[nameField]) {
                        counter.value = counter.value + step;
                    } else {
                        counter.value = 1;
                    }
                    lastname = d[nameField];
                    if (d[nameField].length > 24) return d[nameField].slice(0, 23) + "...";
                    return d[nameField];
                });
                if (use_counter === true) {
                    // 榜首持续时间更新
                    days
                        .data(currentData)
                        .transition()
                        .duration(baseTime * interval_time)
                        .ease(d3.easeLinear)
                        .tween("text", function (d) {
                            var self = this;
                            var i = d3.interpolate(self.textContent, counter.value),
                                prec = (counter.value + "").split("."),
                                round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

                            return function (t) {
                                self.textContent = d3.format(format)(
                                    Math.round(i(t) * round) / round
                                );
                            };
                        });
                } else if (use_type_info === true) {
                    // 榜首type更新
                    top_type.data(currentData).text(function (d) {
                        return d["type"];
                    });
                }
            }

            var barEnter = bar
                .enter()
                .insert("g", ".axis")
                .attr("class", "bar")
                .attr("transform", function (d) {
                    return "translate(0," + yScale(yValue(d)) + ")";
                });

            if (config.use_img) {
                barEnter
                    .append("defs")
                    .append("pattern")
                    .attr("id", d => d[nameField])
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .append("image")
                    .attr("x", "0")
                    .attr("y", "0")
                    .attr("width", "40")
                    .attr("height", "40")
                    .attr("href", d => config.imgs[d[nameField]]);

                barEnter
                    .append("circle")
                    .attr("fill-opacity", 0)
                    .attr("cy", 63)
                    .attr('fill', d => "url(#" + encodeURIComponent(d[nameField]).replace("'", "%27").replace("(", "%28").replace(")", "%29") + ")")
                    .attr("stroke-width", "0px")
                    .transition("a")
                    .delay(500 * interval_time)
                    .duration(2490 * interval_time)
                    .attr("stroke", d => getColor(d))
                    .attr("stroke-width", "4px")
                    .attr("x", -16)
                    .attr("cx", -22)
                    .attr("cy", 13)
                    .attr("r", 40 / 2)
                    .attr("fill-opacity", 1);
            }
            barEnter
                .append("text")
                .attr("y", 50)
                .attr("fill-opacity", 0)
                .transition("2")
                .delay(500 * interval_time)
                .duration(2490 * interval_time)
                .attr("fill-opacity", 1)
                .attr("y", 0)
                .attr("class", function (d) {
                    return "label ";
                })
                .attr("x", config.labelx)
                .attr("y", config.labely)
                .attr("text-anchor", "end")
                .text(function (d) {
                    if (d[nameField] && d[nameField].length)
                        return d[nameField].length > 4 ? d[nameField].substring(0, 3) + '...' : d[nameField];
                })
                .attr("cursor", "default");

            barEnter
                .append("title")
                .text(function(d){
                    return d.sectorId;
                });
                
            barEnter
                .append("rect")
                .attr("width", function (d) {
                    if (enter_from_0) {
                        return 0;
                    } else {
                        return xScale(currentData[currentData.length - 1][valueField]);
                    }
                })
                .attr("fill-opacity", 0)
                .attr("height", config.barHeight)
                .attr("y", 50)
                .style("fill", d => getColor(d))
                .transition("a")
                .delay(500 * interval_time)
                .duration(2490 * interval_time)
                .attr("y", 0)
                .attr("width", d => xScale(xValue(d)))
                .attr("fill-opacity", 1);

            if (config.rounded_rectangle) {
                d3.selectAll("rect").attr("rx", 13);
            }
            if (config.showLabel === true) {
                barEnter
                    .append("text")
                    .attr("y", 50)
                    .attr("fill-opacity", 0)
                    .style("fill", d => getColor(d))
                    .transition("2")
                    .delay(500 * interval_time)
                    .duration(2490 * interval_time)
                    .attr("fill-opacity", 1)
                    .attr("y", 0)
                    .attr("class", function (d) {
                        return "label ";
                    })
                    .attr("x", config.labelx)
                    .attr("y", config.labely)
                    .attr("text-anchor", "end")
                    .text(function (d) {
                        if (long) {
                            return "";
                        }
                        return d[nameField];
                    });
            }

            // bar上文字
            var barInfo = barEnter
                .append("text")
                .attr("x", function (d) {
                    if (long) return 10;
                    if (enter_from_0) {
                        return 0;
                    } else {
                        return xScale(currentData[currentData.length - 1][valueField]);
                    }
                })
                .attr("stroke", d => getColor(d))
                .attr("class", function () {
                    return "barInfo";
                })
                .attr("y", 50)
                .attr("stroke-width", "0px")
                .attr("fill-opacity", 0)
                .attr("font-size", config.barInfoSize)
                .transition()
                .delay(500 * interval_time)
                .duration(2490 * interval_time)
                .text(function (d) {
                    if (use_type_info) {
                        return d[divideBy] + "-" + d[nameField];
                    }
                    return d[nameField];
                })
                .attr("x", d => {
                    if (long) return 10;
                    return xScale(xValue(d)) - 10;
                })
                .attr("fill-opacity", function (d) {
                    if (xScale(xValue(d)) - 10 < display_barInfo) {
                        return 0;
                    }
                    return 1;
                })
                .attr("y", 2)
                .attr("dy", ".5em")
                .attr("text-anchor", function () {
                    if (long) return "start";
                    return "end";
                })
                .attr("stroke-width", function (d) {
                    if (xScale(xValue(d)) - 10 < display_barInfo) {
                        return "0px";
                    }
                    return "1px";
                });
            if (long) {
                barInfo.tween("text", function (d) {
                    var self = this;
                    self.textContent = d[valueField];
                    var i = d3.interpolate(self.textContent, Number(d[valueField])),
                        prec = (Number(d[valueField]) + "").split("."),
                        round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
                    return function (t) {
                        self.textContent =
                            d[divideBy] +
                            "-" +
                            d[nameField] +
                            "  数值:" +
                            d3.format(format)(Math.round(i(t) * round) / round);
                    };
                });
            }
            if (!long) {
                barEnter
                    .append("text")
                    .attr("x", function () {
                        if (long) {
                            return 10;
                        }
                        if (enter_from_0) {
                            return 0;
                        } else {
                            return xScale(currentData[currentData.length - 1][valueField]);
                        }
                    })
                    .attr("y", 50)
                    .attr("fill-opacity", 0)
                    .style("fill", d => '#5C5C5C')
                    .transition()
                    .duration(2990 * interval_time)
                    .tween("text", function (d) {
                        var self = this;
                        // 初始值为d.value的0.9倍
                        self.textContent = d[valueField] * 0.9;
                        var i = d3.interpolate(self.textContent, Number(d[valueField])),
                            prec = (Number(d[valueField]) + "").split("."),
                            round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
                        if (d.hasOwnProperty('empty') && d.empty === true) {
                            return function (t) {
                                self.textContent = d3.format(format)(
                                    Math.round(i(t) * round) / round
                                ) + config.postfix + `(${d.lastDate}年)`;
                            };
                        } else {
                            return function (t) {
                                self.textContent = d3.format(format)(
                                    Math.round(i(t) * round) / round
                                ) + config.postfix;
                            };
                        }
                    })
                    .attr("fill-opacity", 1)
                    .attr("y", 0)
                    .attr("class", function (d) {
                        return "value";
                    })
                    .attr("x", d => {
                        return xScale(xValue(d)) + 10;
                    })
                    .attr("y", config.valueY);
            }
            var barUpdate = bar
                .transition("2")
                .duration(2990 * interval_time)
                .ease(d3.easeLinear);

            barUpdate
                .select("rect")
                .style("fill", d => getColor(d))
                .attr("width", d => xScale(xValue(d)));
            if (config.showLabel === true) {
                barUpdate
                    .select(".label")
                    .attr("class", function (d) {
                        return "label ";
                    })
                    .style("fill", d => getColor(d))
                    .attr("width", d => xScale(xValue(d)));
            }
            if (!long) {
                barUpdate
                    .select(".value")
                    .attr("class", function (d) {
                        return "value";
                    })
                    .style("fill", d => '#5C5C5C')
                    .attr("width", d => xScale(xValue(d)))
                    .attr("y", config.valueY);
            }
            barUpdate.select(".barInfo").attr("stroke", function (d) {
                return getColor(d);
            });

            if (config.use_img) {
                barUpdate.select("circle").attr("stroke", function (d) {
                    return getColor(d);
                });
            }

            barInfo = barUpdate
                .select(".barInfo")
                .text(function (d) {
                    if (use_type_info) {
                        return d[divideBy] + "-" + d[nameField];
                    }
                    return d[nameField];
                })
                .attr("x", d => {
                    if (long) return 10;
                    return xScale(xValue(d)) - 10;
                })
                .attr("fill-opacity", function (d) {
                    if (xScale(xValue(d)) - 10 < display_barInfo) {
                        return 0;
                    }
                    return 1;
                })
                .attr("stroke-width", function (d) {
                    if (xScale(xValue(d)) - 10 < display_barInfo) {
                        return "0px";
                    }
                    return "1px";
                });

            if (long) {
                barInfo.tween("text", function (d) {
                    var self = this;
                    var str = d[divideBy] + "-" + d[nameField] + "  数值:";

                    var i = d3.interpolate(
                        self.textContent.slice(str.length, 99),
                        Number(d[valueField])
                    ),
                        prec = (Number(d[valueField]) + "").split("."),
                        round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
                    return function (t) {
                        self.textContent =
                            d[divideBy] +
                            "-" +
                            d[nameField] +
                            "  数值:" +
                            d3.format(format)(Math.round(i(t) * round) / round);
                    };
                });
            }
            if (!long) {
                barUpdate
                    .select(".value")
                    .tween("text", function (d) {
                        var self = this;
                        var i;
                        // if postfix is blank, do not slice.
                        // 检查当前的标签中是否包含日期,匹配年份
                        if (/\(\d\d\d\d年\)/.test(self.textContent)) {
                            i = d3.interpolate(Number(self.textContent.slice(0, -7).replace(/,/g, '')), Number(d[valueField]));
                        } else {
                            i = d3.interpolate(Number(self.textContent.replace(/,/g, '')), Number(d[valueField]));
                        }

                        //i = d3.interpolate(deformat(self.textContent, config.postfix), Number(d[valueField]))

                        var prec = (Number(d[valueField]) + "").split("."),
                            round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
                        if (!d.hasOwnProperty('empty') || d.empty === false) {
                            return function (t) {
                                self.textContent = d3.format(format)(
                                    Math.round(i(t) * round) / round
                                );
                            };
                        } else {
                            return function (t) {
                                self.textContent = d3.format(format)(
                                    Math.round(i(t) * round) / round
                                ) + `(${d.lastDate}年)`;
                            };
                        }
                    })
                    .duration(2990 * interval_time)
                    .attr("x", d => xScale(xValue(d)) + 10);
            }
            avg =
                (Number(currentData[0][valueField]) +
                    Number(currentData[currentData.length - 1][valueField])) /
                2;

            var barExit = bar
                .exit()
                .attr("fill-opacity", 1)
                .transition()
                .duration(2500 * interval_time);
            barExit
                .attr("transform", function (d) {
                    if (always_up) {
                        return "translate(0,-100)";
                    }
                    if (Number(d[valueField]) > avg && allow_up) {
                        return "translate(0,-100)";
                    }
                    return "translate(0,1000)";
                })
                .remove()
                .attr("fill-opacity", 0);
            barExit
                .select("rect")
                .attr("fill-opacity", 0)
                .attr("width", () => {
                    if (always_up) return xScale(0);
                    return xScale(currentData[currentData.length - 1][valueField])
                })
            if (!long) {
                barExit
                    .select(".value")
                    .attr("fill-opacity", 0)
                    .attr("x", () => {
                        if (always_up) return xScale(0);
                        return xScale(currentData[currentData.length - 1][valueField]);
                    });
            }
            barExit
                .select(".barInfo")
                .attr("fill-opacity", 0)
                .attr("stroke-width", function (d) {
                    return "0px";
                })
                .attr("x", () => {
                    if (long) return 10;
                    if (always_up) return xScale(0);
                    return xScale(currentData[currentData.length - 1][valueField]);
                });
            barExit.select(".label").attr("fill-opacity", 0);
            if (config.use_img) {
                barExit.select("circle").attr("fill-opacity", 0)
            }
        }

        function change() {
            yScale
                .domain(currentData.map(d => d[nameField]).reverse())
                .range([innerHeight, 0]);
            if (animation === "linear") {
                g.selectAll(".bar")
                    .data(currentData, function (d) {
                        return d[nameField];
                    })
                    .transition("1")
                    .ease(d3.easeLinear)
                    .duration(baseTime * update_rate * interval_time)
                    .attr("transform", function (d) {
                        return "translate(0," + yScale(yValue(d)) + ")";
                    });
            } else {
                g.selectAll(".bar")
                    .data(currentData, function (d) {
                        return d[nameField];
                    })
                    .transition("1")
                    .duration(baseTime * update_rate * interval_time)
                    .attr("transform", function (d) {
                        return "translate(0," + yScale(yValue(d)) + ")";
                    });
            }
        }
        const input = d3.select(`#${id}`).select("#input");
        input.on("click", function () {
            console.log("d3的点击事件触发了啦");
            i = d3.select(this).node().value;
            currentdate = time[i];
            getCurrentData(time[i], i);
        })
        .on("myclick", function (value) {
            console.log("d3的点击事件myclick触发了啦");
            i = d3.select(this).node().value;
            let event = d3.event;
            console.log(i,event.value);
            currentdate = time[i];
            getCurrentData(time[i], i);
        })

        const icon = d3.select(`#${id}`).select("#icon");
        const iconG = icon
            .append("g")
            .attr("transform", `translate(0,0)`);

        const btn = iconG.append("image")
            .attr("href", "assets/imgs/play.png")
            .attr("height", 35)
            .attr("width", 35)
            .attr("x", 25)
            .attr("y", 5)
            .attr("cursor", "pointer")
            .on("click", function () {
                click();
            })

        var i = time.length - 1;
        me.setState({
            dataIndex: i
        })
        var clickParam = 0;
        var p = config.wait;
        var update_rate = config.update_rate;

        currentdate = time[i];
        getCurrentData(time[i], i);
        i++;

        var inter = setInterval(function next() {

        }, baseTime * interval_time);

        function click() {
            if (clickParam % 2 === 0) {
                btn.attr("href", "assets/imgs/pause.png")
                if (i >= time.length) {
                    i = 0;
                    g.selectAll(".bar").remove()
                }
                inter = setInterval(function next() {
                    // 空过p回合
                    while (p) {
                        p -= 1;
                        return;
                    }
                    currentdate = time[i];
                    getCurrentData(time[i], i);
                    me.setState({
                        dataIndex: i
                    })
                    i++;
                    if (i >= time.length) {
                        clickParam++;
                        btn.attr("href", "assets/imgs/play.png")
                        window.clearInterval(inter);
                    }
                }, baseTime * interval_time);
                clickParam++;
            } else {
                btn.attr("href", "assets/imgs/play.png")
                window.clearInterval(inter);
                clickParam++;
            }
        }
        return {click}
    }
    
}