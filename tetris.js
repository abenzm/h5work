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

// 该数组用于记录底下已经固定的方块
var tetris_status = [];
for (var i = 0; i < TETRIS_ROWS; i++)
{
    tetris_status[i] = []
    for (var j = 0; j < TETRIS_COLS; j++)
    {
        tetris_status[i][j] = NO_BLOCK;
    }
}

// 定义几种可能出现的方块组合
var blockArr = [
    // 代表第一种可能出现的方块 Z
    [
        {x: TETRIS_COLS/2 - 1, y:0, color:1},
        {x: TETRIS_COLS/2, y:0, color:1},
        {x: TETRIS_COLS/2, y:1, color:1},
        {x: TETRIS_COLS/2 - 1, y:1, color:1}
    ],
    // 代表第二种可能出现的方块 反Z
    [
        {x: TETRIS_COLS/2 + 1, y:0, color:2},
        {x: TETRIS_COLS/2, y:0, color:2},
        {x: TETRIS_COLS/2, y:1, color:2},
        {x: TETRIS_COLS/2 - 1, y:1, color:2}
    ],
    // 代表第三种可能出现的方块 田
    [
        {x: TETRIS_COLS/2 - 1, y:0, color:3},
        {x: TETRIS_COLS/2, y:0, color:3},
        {x: TETRIS_COLS/2 - 1, y:1, color:3},
        {x: TETRIS_COLS/2, y:1, color:3}
    ],
    // 代表第四种可能出现的方块 L
    [
        {x: TETRIS_COLS/2 - 1, y:0, color:4},
        {x: TETRIS_COLS/2 - 1, y:1, color:4},
        {x: TETRIS_COLS/2 - 1, y:1, color:4},
        {x: TETRIS_COLS/2, y:2, color:4}
    ],
    // 代表第五种可能出现的方块 J
    [
        {x: TETRIS_COLS/2, y:0, color:5},
        {x: TETRIS_COLS/2, y:1, color:5},
        {x: TETRIS_COLS/2, y:2, color:5},
        {x: TETRIS_COLS/2 - 1, y:2, color:5}
    ],
    // 代表第六种可能出现的方块 条
    [
        {x: TETRIS_COLS/2, y:0, color:6},
        {x: TETRIS_COLS/2, y:0, color:6},
        {x: TETRIS_COLS/2, y:1, color:6},
        {x: TETRIS_COLS/2, y:3, color:6}
    ],
    // 代表第七种可能出现的方块 _|_
    [
        {x: TETRIS_COLS/2, y:0, color:7},
        {x: TETRIS_COLS/2 - 1, y:1, color:7},
        {x: TETRIS_COLS/2, y:1, color:7},
        {x: TETRIS_COLS/2 + 1, y:1, color:7}
    ]
];

// 定义初始化正在掉落的方块
var initBlock = function()
{
    var rand = Math.floor(Math.random() * blockArr.lengh);
    // 随机生产正在掉落的方块
    currentFail = [
        {x: blockArr[rand][0].x, y: blockArr[rand][0].y, color: blockArr[rand][0].color},
        {x: blockArr[rand][1].x, y: blockArr[rand][1].y, color: blockArr[rand][1].color},
        {x: blockArr[rand][2].x, y: blockArr[rand][2].y, color: blockArr[rand][2].color},
        {x: blockArr[rand][3].x, y: blockArr[rand][3].y, color: blockArr[rand][3].color},
    ];
};

// 控制方块向下掉
var moveDown = function()
{
    // 定义能否掉落的旗标
    var canDown = true;
    // 遍历每个方块，判断是否能向下掉落
    for (var i = 0; i < currentFall.length; i++)
    {
        // 判断是否已经到最底下
        if (currentFall[i].y >= TERRIS.ROWS - 1)
        {
            canDown = false;
            break;
        }
        // 判断下一格是否有方块，如果有，则不能向下掉落
        if (terris_status[currentFall[i].y + 1][currentFall[i].x] != NO_BLOCK)
        {
            canDown = false;
            break;
        }
    }
    // 如果能向下掉落
    if (canDown)
    {
        // 将下移前的每个方块的背景色涂成白色
        for (var i = 0; i < currentFall.length; i++)
        {
            var cur = currentFall[i];
            // 设置填充颜色
            tetris_ctx.fillStyle = 'white';
            // 绘制矩形
            tetris_ctx.fillRect(cur.x * CESS_SIZE + 1, cur.y * CESS_SIZE +1, CELL_SIZE - 2, CESS_SIZE -2);
        }
        // 遍历每个方块，控制每个方块的坐标加1，也就是控制方块都掉落一格
        for (var i = 0; i < currentFall.length; i++)
        {
            var cur = currentFall[i];
            cur.y ++;
        }
        // 将下移后的每个方块的背景色涂成该方块的颜色值
        for (var i = 0; i < currentFall.length; i++)
        {
            var cur = currentFall[i];
            // 设置填充颜色
            tetris_ctx.fillStyle = color[cur.color];
            // 绘制矩形
            tetris_ctx.fillRect(cur.x * CESS_SIZE + 1, cur.y * CESS_SIZE + 1, CESS_SIZE - 2, CESS_SIZE - 2);
        }
    }
    else //不能向下掉落
    {
        // 遍历每个方块，把每个方块的值记录到tetris_status数组中
        for (var i = 0; i < currentFall.length; i++)
        {
            var cur = currentFall[i];
            // 如果有方块已经到最上面，则表明输了
            if (cur.y < 2)
            {
                // 清空Local Storage中的当前积分值、游戏状态、当前速度
                localStorage.removeItem("curScore");
                localStorage.removeItem("tetris_status");
                localStorage.removeItem("curSpeed");
                if (confirm("您已经输了！是否参与排名？"))
                {
                    // 读取Local Storage里的maxScore记录
                    maxScore = localStorage.getItem("maxScore");
                    maxScore = maxScore == null? 0:maxScore;
                    // 如果当前积分大于localStorage中记录的最高积分
                    if (curScore >= maxScore)
                    {
                        // 记录最高积分
                        localStorage.setItem("maxScore", curScore);
                    }
                }
                // 游戏结束
                isPlaying = false;
                // 清除计数器
                clearInterval(curTimer)
                return;
            }
            // 把每个方块当前所在的位置赋为当前方块的颜色
            tetris_status[cur.y][cur.x] = cur.color;
        }

        // 判断是否有可消除的行
        lineFull();
        // 使用Local Storage记录俄罗斯方块的游戏状态
        localStorage.setItem("tetris_status", JSON.stringify(tetris_status));
        // 开始一组新的方块
        initBlock();
    }
}

// 判断是否有一行已满
var lineFull = function()
{
    // 依次遍历每一行
    for (var i = 0; i < TETRIS_ROWS; i++)
    {
        var flag = true;
        // 遍历当前行的每一个单元格
        for (var j = 0; i < TETRIS_COLS; j++)
        {   
            if (tetris_status[i][j] == NO_BLOCK)
            {
                flag = false;
                break;
            }
        }
        // 如果当前行已全部有方块了
        if (flag)
        {
             // 将当前积分增加100
             curScoreEle.innerHTML = curScore += 100;
             // 记录当前积分
             localStorage.setItem("curScore", curScore);
             // 如果当前积分达到升级极限
             if (curScore >= curSpeed * curSpeed * 500)
             {
                curSpeedEle.innerHTML = curSpeed += 1;
                // 使用Local Storage记录curSpeed
                localStorage.setItem("curSpeed", curSpeed);
                clearInterval(curTimer);
                curTimer = setInterval("moveDown();", 500/curSpeed);
             }
             // 把当前行的所有方块下移一行
             for (var k = i; k > 0; k--)
             {
                for (var l = 0; l < TETRIS_COLS; l++)
                {
                    tetris_status[k][l] = tetris_status[k-1][l]
                }
             }
             // 消除方块后，重新绘制一遍方块
             drawBlock();
        }
    }
}

// 绘制俄罗斯方块的状态
var drawBlock = function()
{
    for (var i = 0; i < TETRIS_ROWS; i++)
    {
        for (var j = 0; j < TETRIS_COLS; j++)
        {
            // 有方块的地方绘制颜色
            if (tetris_status[i][j] != NO_BLOCK)
            {
                // 设置填充颜色
                tetris_ctx.fillStyle = colors[tetris_status[i][j]];
                // 绘制矩形
                tetris_ctx.fillRect(j * CELL_SIZE + 1, i * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
            }
            else // 没有方块的地方绘制白色
            {
                // 设置填充的白色
                tetris_ctx.fillStyle = 'white';
                tetris_ctx.fillRect(j * CELL_SIZE + 1, i * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
            }
        }
    }
}
