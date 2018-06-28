import React, {Component} from 'react';
import * as d3 from 'd3';
import './Demo08.css'
import json from './json/china.geojson'

//力向导图
class Demo08 extends Component {
    componentDidMount() {
        var width  = 1000;
        var height = 1000;

        var svg = d3.select("#demo01").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0,0)");

        var projection = d3.geo.mercator()
            .center([107, 31])
            .scale(850)
            .translate([width/2, height/2]);

        var path = d3.geo.path()
            .projection(projection);


        var color = d3.scale.category20();


        d3.json(json, function(error, root) {

            if (error)
                return console.error(error);
            console.log(root.features);

            svg.selectAll("path")
                .data( root.features )
                .enter()
                .append("path")
                .attr("stroke","#000")
                .attr("stroke-width",1)
                .attr("fill", function(d,i){
                    return color(i);
                })
                .attr("d", path )
                .on("mouseover",function(d,i){
                    d3.select(this)
                        .attr("fill","yellow");
                })
                .on("mouseout",function(d,i){
                    d3.select(this)
                        .attr("fill",color(i));
                });

        });
    }

    render = () => {
        return (
            <div id="demo01" className="d3-container">
                <p>地图</p>
            </div>
        );
    }
}

export default Demo08;

