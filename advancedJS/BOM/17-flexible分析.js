(function flexible(window, document) {
    // 获取html的根元素
    var docEl = document.documentElement;
    // dpr物理像素比
    var dpr = window.devicePixelRatio || 1;

    // 设置body的字体大小
    function setBodyFontSize() {
        // 页面中有body元素，设置body的字体大小
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px';
        } else {
            // 页面中没有body元素，在页面主要的DOM元素加载完毕后再设置
            document.addEventListener('DOMContentLoaded', setBodyFontSize);
        }
    }
    setBodyFontSize();

    // 设置html元素的文字大小
    function setRemUnit() {
        var rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px';
    }
    setRemUnit();

    // 页面尺寸大小发生变化时，重新设置rem的大小
    window.addEventListener('resize', setRemUnit);

    // pageshow，重回加载页面触发的事件
    window.addEventListener('pageshow', function (e) {
        // e.persisted返回的是true，即使页面是从缓存取来的，也需要重新计算rem的大小
        if (e.persisted) {
            setRemUnit();
        }
    })

    // 不支持0.5像素的移动端浏览器的解决方法
    if (dpr >= 2) {
        var fakeBody = document.createElement('body');
        var testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight == 1) {
            docEl.classList.add('hairlines');
        }
        docEl.removeChild(fakeBody);
    }
}(window, document))