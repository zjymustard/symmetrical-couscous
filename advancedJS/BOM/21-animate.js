// 左右滚动
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 结束定时器
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 调用回调函数
            callback && callback();
        }
        // 步长值:正数向上取整math.ceil()，负数向下取整math.floor()
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 30);
}