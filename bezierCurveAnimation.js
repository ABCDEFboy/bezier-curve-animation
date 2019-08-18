/**
 * 动态绘制贝塞尔虚线
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array<number>} bezierCtrlNodesArr 控制贝塞尔曲线的点
 * @param  {number} lineWidth 绘制线条宽度
 */
var Bezier = function (canvasObj, points, lineWidth) {
    this.canvas = canvasObj.canvas;
    this.width = canvasObj.width;
    this.height = canvasObj.height;
    this.ctx = this.canvas.getContext('2d');
    this.lineWidth = lineWidth || 3;
    this.points = [];
    this.returnPoints = [];
    this.init(points);
};

Bezier.prototype.init = function (points) {
    this.calculatePoints(points);
};
Bezier.prototype.clearRect = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
}

Bezier.prototype.draw = function (color, percent) { //绘制贝塞尔曲线
    this.ctx.beginPath();
    this.ctx.setLineDash([10, 5]); // 虚线
    this.ctx.strokeStyle = color;
    let basePoints = this.bezier(this.points, percent / 100);
    this.returnPoints = [];
    this.ctx.moveTo(this.points[0].x, this.points[0].y);
    if (this.points.length === 3) {
        this.ctx.quadraticCurveTo(
            basePoints[0].x, basePoints[0].y,
            basePoints[1].x, basePoints[1].y
        );
    } else if (this.points.length === 4) {
        this.ctx.bezierCurveTo(
            basePoints[0].x, basePoints[0].y,
            basePoints[1].x, basePoints[1].y,
            basePoints[2].x, basePoints[2].y
        );
    }
    this.ctx.stroke();
};

Bezier.prototype.bezier = function (arr, time) {
    let points = arr;
    let vectors = [];
    let controlPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        let vector = this.vector(points[i], points[i + 1]);
        vectors.push(vector)
    }
    vectors.forEach((vector, index) => {
        let controlPoint = this.controlPoint(points[index], vector, time);
        controlPoints.push(controlPoint)
    });
    this.returnPoints.push(controlPoints[0]); // 获取每次计算的第一个控制点
    return controlPoints.length >= 1 ? this.bezier(controlPoints, time) : this.returnPoints
};

/**
 * 计算出每个点的坐标
 * 因为points储存的坐标是百分比的值
 */
Bezier.prototype.calculatePoints = function (points = []) {
    this.points = points.map(point => {
        return {
            x: point.x * this.width,
            y: point.y * this.height
        }
    })
};

Bezier.prototype.vector = function (start, end) { //向量公式
    let vector = {x: 0, y: 0};
    vector.x = end.x - start.x;
    vector.y = end.y - start.y;
    return vector
};

/**
 * 通过 P1 和 P2 计算出点 Q，Q 在 P1 P2连成的直线上，并且length( P1, Q ) = length( P1, P2 ) * t
 * @param  {Object} start 开始的点
 * @param  {Object} end 末尾点
 * @param  {number} time 运动时间
 */
Bezier.prototype.controlPoint = function (start, end, time) {
    let point = {x: 0, y: 0};
    point.x = start.x + end.x * time;
    point.y = start.y + end.y * time;
    return point
};
