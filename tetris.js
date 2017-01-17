// 定义一个创建canvas组件的函数
var createCanvas = function(rows, cols, cellWidth, cellHeight)
{
    tetris_canvas = document.createElement("canvas");
    // 设置canvas组件的高度、宽度
    tetris_canvas.width = cols * cellWidth;
    tetris_canvas.height = rows * cellHeight;
    // 设置canvas组件的边框
    tetris_canvas.style.border = "1px solid black";
    // 获取canvas上的绘图API
    tetris_ctx = tetris_canvas.getContext('2d');
    // 开始创建路径
    tetris_ctx.beginPath();
    // 绘制横向网格对应的路径
    for (var i = 1; i < TETRIS_ROWS; i++)
    {
        tetris_ctx.moveTo(0, i * CELL_SIZE);
        tetris_ctx.lineTo(TETRIS_COLS * CELL_SIZE, i * CELL_SIZE);
    }
    // 绘制竖向网格对应的路径
    for (var i = 1; i < TETRIS_COLS; i++)
    {
        tetris_ctx.moveTo(i * CELL_SIZE, 0);
        tetris_ctx.lineTo(i * CELL_SEZE, TETRIS_ROWS * CELL_SIZE);
    }
    tetris_ctx.closePath();
    // 设置笔触颜色
    tetris_ctx.strokeStyle = "#aaa";
    // 设置线条粗细
    tetrix_ctx.lineWidth = 0.3
    // 绘制线条
    tetrix_ctx.stroke();
}
