import React, {Component} from 'react';
import * as d3 from 'd3';
import './Demo05.css'

//交互
class Demo05 extends Component {
    componentDidMount() {
        let width = 600, height = 600;
        //画布周边的空白
        var padding = {left: 30, right: 30, top: 20, bottom: 20};
        let svg = d3.select("#demo01")
            .append("svg")
            .attr("width", width)
            .attr("height", height);//创建svg元素
        var dataset = [10, 20, 30, 40, 33, 24, 12, 5];
        let pie = d3.layout.pie();
        let piedata = pie(dataset);//得到饼图转换后的数据
        let outerRadius = 150, innerRadius = 0;
        let arc = d3.svg.arc()//弧生成器
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        let arcs = svg.selectAll('g')
            .data(piedata)
            .enter()
            .append('g')
            .on('click',(d,i)=>{
                alert(d.data)
            })
            .attr('cursor','pointer')
            .attr('transform', `translate(${width / 2},${width / 2})`);
        var c10 = d3.scale.category10();
        arcs.append('path')
            .attr('fill', (d, i) => {
                return c10(i);
            })
            .attr('d', (d) => {
                return arc(d);
            })
        arcs.append('text')
            .attr('transform', (d) => {
                return `translate(${arc.centroid(d)})`
            })
            .attr('text-anchor', 'middle')
            .text((d) => {
                return d.data;
            })
    }

    render = () => {
        return (
            <div id="demo01" className="d3-container">
                <p>柱形图</p>
            </div>
        );
    }
}

export default Demo05;

