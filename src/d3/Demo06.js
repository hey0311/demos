import React, {Component} from 'react';
import * as d3 from 'd3';
import './Demo06.css'

//力向导图
class Demo06 extends Component {
    componentDidMount() {
        let width = 600, height = 600;
        //画布周边的空白
        var padding = {left: 30, right: 30, top: 20, bottom: 20};
        let svg = d3.select("#demo01")
            .append("svg")
            .attr("width", width)
            .attr("height", height);//创建svg元素
        var nodes = [ { name: "桂林" }, { name: "广州" },
            { name: "厦门" }, { name: "杭州" },
            { name: "上海" }, { name: "青岛" },
            { name: "天津" } ];

        var edges = [ { source : 0 , target: 1 } , { source : 0 , target: 2 } ,
            { source : 0 , target: 3 } , { source : 1 , target: 4 } ,
            { source : 1 , target: 5 } , { source : 1 , target: 6 } ];
        var force = d3.layout.force()
            .nodes(nodes) //指定节点数组
            .links(edges) //指定连线数组
            .size([width,height]) //指定作用域范围
            .linkDistance(150) //指定连线长度
            .charge([-400]); //相互之间的作用力
        force.start();
        var svg_edges = svg.selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .style("stroke","#ccc")
            .style("stroke-width",1);

        var color = d3.scale.category20();

        //添加节点
        var svg_nodes = svg.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r",20)
            .style("fill",function(d,i){
                return color(i);
            })
            .call(force.drag);  //使得节点能够拖动

        //添加描述节点的文字
        var svg_texts = svg.selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .style("fill", "black")
            .attr("dx", 20)
            .attr("dy", 8)
            .text(function(d){
                return d.name;
            });
        force.on("tick", function(){ //对于每一个时间间隔
            //更新连线坐标
            svg_edges.attr("x1",function(d){ return d.source.x; })
                .attr("y1",function(d){ return d.source.y; })
                .attr("x2",function(d){ return d.target.x; })
                .attr("y2",function(d){ return d.target.y; });

            //更新节点坐标
            svg_nodes.attr("cx",function(d){ return d.x; })
                .attr("cy",function(d){ return d.y; });

            //更新文字坐标
            svg_texts.attr("x", function(d){ return d.x; })
                .attr("y", function(d){ return d.y; });
        });
    }

    render = () => {
        return (
            <div id="demo01" className="d3-container">
                <p>力向导图</p>
            </div>
        );
    }
}

export default Demo06;

