window.addEventListener('load', function () {
    // 1.鼠标经过显示隐藏左右按钮
    var btnL = document.querySelector('.btn-l');
    var btnR = document.querySelector('.btn-r');
    var box = document.querySelector('.box');

    box.addEventListener('mouseenter', function () {
        btnL.style.display = 'block';
        btnR.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })

    box.addEventListener('mouseleave', function () {
        btnL.style.display = 'none';
        btnR.style.display = 'none';
        timer = setInterval(function () {
            btnR.click();
        }, 5000);
    })

    // 2.动态生成小圆圈
    var ul = box.querySelector('ul');
    var ol = box.querySelector('.circle');
    var boxWidth = box.offsetWidth; // ul移动的距离：小圆圈的索引号×图片宽度，是负值

    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li'); // 创建li标签
        li.setAttribute('index', i); // 生成索引号
        ol.appendChild(li); // li插入ol内

        // 3.小圆圈的排他思想
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';

            // 4.点击小圆圈，图片移动
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * boxWidth);
        });
    }
    ol.children[0].className = 'current'; // ol内的第一个li设置为current

    // 5.克隆第一张图片，放置ul最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 6.点击右侧按钮无缝滚动
    var num = 0;
    var circle = 0; // 控制小圆圈的变化
    var flag = true; // 节流阀

    btnR.addEventListener('click', function () {
        if (flag) {
            flag = false; // 关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0 + 'px';
                num = 0;
            }
            num++;
            animate(ul, -num * boxWidth, function () {
                flag = true; // 打开节流阀
            });

            // 7.点击右侧按钮，小圆圈一起变化
            circle++;
            circle = circle == ol.children.length ? 0 : circle;
            circleChange();
        }
    });

    // 8.左侧按钮
    btnL.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * boxWidth + 'px';
            }
            num--;
            animate(ul, -num * boxWidth, function () {
                flag = true;
            });

            // 9.点击左侧按钮，小圆圈一起变化
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });

    // 10.自动播放：类似于右侧按钮
    var timer = setInterval(function () {
        btnR.click(); // 手动调用
    }, 5000);

    // 控制小圆圈变化的函数
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
})

// // 测试是否引入成功
// // alert(1);

// // 1.鼠标经过显示隐藏左右按钮
// var btnL = document.querySelector('.btn-l');
// var btnR = document.querySelector('.btn-r');
// var box = document.querySelector('.box');
// box.addEventListener('mouseenter', function () {
//     btnL.style.display = 'block';
//     btnR.style.display = 'block';
//     clearInterval(timer);
//     timer = null;
// })
// box.addEventListener('mouseleave', function () {
//     btnL.style.display = 'none';
//     btnR.style.display = 'none';
//     timer = setInterval(function () {
//         btnR.click();
//     }, 2000);
// })

// // 2.动态生成小圆圈
// // var ul=document.querySelector('ul');
// // alert(ul.children.length);
// var ul = box.querySelector('ul');
// var ol = box.querySelector('.circle');
// // ul移动的距离：小圆圈的索引号×图片宽度，是负值
// var boxWidth = box.offsetWidth;
// for (var i = 0; i < ul.children.length; i++) {
//     // 创建li标签
//     var li = document.createElement('li');
//     // 生成索引号
//     li.setAttribute('index', i);
//     // li插入ol内
//     ol.appendChild(li);
//     // 3.小圆圈的排他思想
//     li.addEventListener('click', function () {
//         for (var i = 0; i < ol.children.length; i++) {
//             ol.children[i].className = '';
//         }
//         this.className = 'current';
//         // 4.点击小圆圈，图片移动
//         var index = this.getAttribute('index');
//         // bug1
//         num = index;
//         // bug2
//         circle = index;
//         animate(ul, -index * boxWidth);
//     });
// }
// // ol内的第一个li设置为current
// ol.children[0].className = 'current';

// // 5.克隆第一张图片，放置ul最后
// var first = ul.children[0].cloneNode(true);
// ul.appendChild(first);

// // 6.点击右侧按钮无缝滚动
// var num = 0;
// // 控制小圆圈的变化
// var circle = 0;
// btnR.addEventListener('click', function () {
//     if (num == ul.children.length - 1) {
//         ul.style.left = 0 + 'px';
//         num = 0;
//     }
//     num++;
//     animate(ul, -num * boxWidth);
//     // 7.点击右侧按钮，小圆圈一起变化
//     circle++;
//     // if (circle == ol.children.length) {
//     //     circle = 0;
//     // }
//     circle = circle == ol.children.length ? 0 : circle;
//     circleChange();
// });

// // 8.左侧按钮
// btnL.addEventListener('click', function () {
//     if (num == 0) {
//         num = ul.children.length - 1;
//         ul.style.left = -num * boxWidth + 'px';
//     }
//     num--;
//     animate(ul, -num * boxWidth);
//     // 点击左侧按钮，小圆圈一起变化
//     circle--;
//     // if (circle < 0) {
//     //     circle = ol.children.length - 1;
//     // }
//     circle = circle < 0 ? ol.children.length - 1 : circle;
//     circleChange();
// });

// // 9.自动播放：类似于右侧按钮
// var timer = setInterval(function () {
//     // 手动调用
//     btnR.click();
// }, 2000);

// function circleChange() {
//     for (var i = 0; i < ol.children.length; i++) {
//         ol.children[i].className = '';
//     }
//     ol.children[circle].className = 'current';
// }