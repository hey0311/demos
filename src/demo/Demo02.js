import React, {Component} from 'react';
import * as d3 from 'd3';
import './Demo02.css'

//完整柱形图
class Demo02 extends Component {
    componentDidMount() {
        let width = 600, height = 600;
        //画布周边的空白
        var padding = {left: 30, right: 30, top: 20, bottom: 20};
        let svg = d3.select("#demo01")
            .append("svg")
            .attr("width", width)
            .attr("height", height);//创建svg元素
        var dataset = [10, 20, 30, 40, 33, 24, 12, 5];
        //x轴的比例尺,序数
        var xScale = d3.scale.ordinal()
            .domain(d3.range(dataset.length))//输入范围
            .rangeRoundBands([0, width - padding.left - padding.right]);//输出范围,需要去除两边空白
        //y轴的比例尺
        var yScale = d3.scale.linear()
            .domain([0,d3.max(dataset)])
            .range([height - padding.top - padding.bottom, 0]);
        //定义x轴
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");
        //定义y轴
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
        //矩形之间的空白
        var rectPadding = 4;
        //添加矩形元素
        var rects = svg.selectAll(".MyRect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class","MyRect")
            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
            .attr("x", function(d,i){
                return xScale(i) + rectPadding/2;
            })
            .attr("y",function(d){
                return yScale(d);
            })
            .attr("width", xScale.rangeBand() - rectPadding )
            .attr("height", function(d){
                return height - padding.top - padding.bottom - yScale(d);
            });
        //添加文字元素
        var texts = svg.selectAll(".MyText")
            .data(dataset)
            .enter()
            .append("text")
            .attr("class","MyText")
            .attr("transform","translate(" + padding.left + "," + padding.top + ")")//平移
            .attr("x", function(d,i){
                return xScale(i) + rectPadding/2;
            } )
            .attr("y",function(d){
                return yScale(d);
            })
            .attr("dx",function(){
                return (xScale.rangeBand() - rectPadding)/2;
            })
            .attr("dy",function(d){
                return 20;
            })
            .text(function(d){
                return d;
            });
        //添加x轴
        svg.append("g")
            .attr("class","axis")
            .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
            .call(xAxis);
        //添加y轴
        svg.append("g")
            .attr("class","axis")
            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
            .call(yAxis);
    }

    render = () => {
        return (
            <div id="demo01" className="d3-container">
                <p>柱形图</p>
            </div>
        );
    }
}

export default Demo02;

