import React, {Component} from 'react';
import * as d3 from 'd3';
import './Demo01.css'

//条形图
class Demo01 extends Component {
    componentDidMount() {
        let width = 600, height = 600;
        let svg = d3.select("#demo01")
            .append("svg")
            .attr("width", width)
            .attr("height", height);//创建svg元素
        let dataset = [500, 400, 300, 250, 450],  //数据(矩形宽度)
            rectHeight = 30;   //每个矩形所占的像素高度(包括空白)
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")//添加rect元素
            .attr("x", 20)//横坐标
            .attr("y", (d, i) => i * rectHeight)//data和index
            .attr("width", (d) => d)//宽
            .attr("height", rectHeight - 3)
            .attr("fill", "#ff7f27");
    }
    render=()=> {
        return (
            <div id="demo01" className="d3-container">
                <p>条形图</p>
            </div>
        );
    }
}

export default Demo01;
