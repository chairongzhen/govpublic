import React, { Component } from 'react';
// import { fromJS } from 'immutable';
import * as d3 from 'd3';
import { defaultConfig } from './config';

function playCounter(id, value, num, option) {

    const {
        delay = 800,
        dur = 500,
        toFixed = 0,
        addDot = false,
    } = option || {};
    (() => {
        d3.select(id).selectAll('div').remove();
    })();
    const duration = dur;
    d3.select(id)
        .text(num)//初始值
        .transition()//加入渐变效果
        // .delay(delay)//加入延迟开始时间
        .duration(duration)//动画时长
        .ease(d3.easeLinear)
        // .ease('linear')//渐变动画效果为普通的线性变化
        .tween('text', () => {
            const i = d3.interpolate(num, value);
            function count(t) {
                let content = 0;
                if (toFixed && addDot) {
                    content = Number(i(t)).toFixed(toFixed).toLocaleString();
                } else if (toFixed && !addDot) {
                    content = Number(i(t)).toFixed(toFixed);
                } else if (!toFixed && addDot) {
                    content = Math.round(i(t)).toLocaleString();
                } else {
                    content = Math.round(i(t));
                }
                this.textContent = content;
                // console.log(t, i(t));
            }
            return count;
        });
}

export default class Counter extends Component {

    static defaultProps = {
        value: 0,
        config: defaultConfig,
        style: {}
    }

    constructor(props) {
        super(props);
        this.num = 0;
    }

    componentDidMount() {
        playCounter(this.counter, this.props.value || 0, this.num, this.option);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps!==this.props) {
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        playCounter(this.counter, this.props.value || 0, this.num, this.option);
        this.num = this.props.value || 0;
    }

    render() {
        this.option = this.props.config;
        return (
            <span className="counter" style={this.props.style} ref={(node) => { this.counter = node; }}></span>
        );
    }
}