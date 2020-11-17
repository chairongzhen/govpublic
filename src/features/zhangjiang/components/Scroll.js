import React, { Component, Fragment } from 'react';

import play from '../../../images/play.png'
import pause from '../../../images/pause.png'


let inter = undefined
export default class Scroll extends Component {

    constructor(props) {
        super(props)

        this.state = {
            timeLineData: props.timeLineData,
            dataIndex: 0,
            status:false
        }

        this.click.bind(this)
    }

    componentWillReceiveProps(newProps) {
        //填充
        this.setState({timeLineData: newProps.timeLineData})
    }

    click = ()=>{
        let curStatus = !this.state.status
        this.setState({
            
            status:curStatus
        })

        if(curStatus){
            inter && window.clearInterval(inter);
            inter = setInterval(()=>{
                let index = (this.state.dataIndex+1)%this.state.timeLineData.length;
                this.setState({  
                    dataIndex:index
                })
                this.props.updateChart(this.state.dataIndex);
            }, this.props.interval_time*1000);
        }else{
            inter && window.clearInterval(inter);
        }
    }

    onChange = (e) => {
        this.setState({
            dataIndex:e.target.value
        })
    }
    

    render() {
        return (
            <div className="zhangjiang-components-scroll">
                <div className="w_bottom">
                    <img src={ this.state.status ? pause : play } onClick={this.click}/>
                </div>
                <div className="w_bottom_operation">
                    <input id="input" className="progress" type="range"
                        //defaultValue={this.state.dataIndex}
                        value={this.state.dataIndex}
                        onChange={this.onChange}
                        max={this.state.timeLineData.length - 1}
                        min="0"
                    />
                </div>
            </div>
        )
    }  
    
}


Scroll.defaultProps = {
    interval_time:0.8
  };