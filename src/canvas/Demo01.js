import React, {Component} from 'react';
import * as d3 from 'd3';
import './Demo01.css'

//条形图
class Demo01 extends Component {
    componentDidMount() {
        var canvas=document.getElementById('canvas'),
            c=canvas.getContext('2d');
        c.font='38pt Arial';
        c.fillStyle='yellow'
        c.strokeStyle='blue'
        c.save()
        // 绘制文字
        // context.fillText('hello canvas',canvas.width/2-150,canvas.height/2+15)
        // context.strokeText('hello canvas',canvas.width/2-150,canvas.height/2+15)

        //阴影
/*        c.shadowColor='red'
        c.shadowOffsetX=1
        c.shadowOffsetY=2*/

        //绘制矩形
/*        c.fillRect(50,50,100,200);
        c.strokeRect(150,250,50,50)
        c.clearRect(80,80,30,30)*/
        //另一种绘制矩形
        // c.rect(50,50,100,100)
        // c.fill()
        // c.arc(50,50,100,100,Math.PI)
        // c.fill()
        c.beginPath()
        c.rect(50,50,100,100)
        c.fill()
        c.beginPath()
        c.rect(150,150,50,50)
        c.stroke()

        //渐变
/*        c.restore()
        var gradient=c.createLinearGradient(0,0,canvas.width,0);
        gradient.addColorStop(0.1,'yellow')
        gradient.addColorStop(0.7,'green')
        c.fillStyle=gradient
        c.fillRect(0,450,500,500)*/


    }
    render=()=> {
        return (
            <div id="demo01" className="canvas-container">
                <p>hello canvas</p>
                <canvas id="canvas" width={600} height={700}></canvas>
            </div>
        );
    }
}

export default Demo01;
