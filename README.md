# bezier-curve-animation
动态绘制贝塞尔虚线动画效果
### 使用方法
`let bezier = Bezier(canvasObj, points, lineWidth)`
###### 参数说明 #####
``` 
const canvas = document.querySelector('canvas');
const width = 1920;
const height = 1080;
canvas.setAttribute('width', width);
canvas.setAttribute('height',height);

let points = [
    {x:0,y:1}, // 开始点
    {x:0.25,y:0.25}, // 控制点
    {x:0.75,y:0.75}, // 控制点
    {x:1,y:0} // 终点
];
let bezier = new Bezier({canvas: canvas, width: width, height: height}, points, 0.2);
``` 
### 动画效果
[bezier.gif]: https://raw.githubusercontent.com/ABCDEFboy/bezier-curve-animation/master/GIF.gif "bezier.gif"
![bezier.gif]
