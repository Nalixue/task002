var $ = function(id) {
    return document.getElementById(id);
};

var EventUtil = {

    addHandler: function(element, type, handler) {
        if (element.addEventListner) {
            element.addEventListner(type, handler);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    }
};

function glideImage() {
    var img = document.getElementsByTagName('img'),
        containt = $('containt'),
        imgall = $('images'),
        buttons = $('btn'),
        length = img.length,
        width = img[0].clientWidth,
        height = img[0].clientHeight;

    // 设置不同图片的样式
    containt.style.width = width + 'px';
    containt.style.height = height + 'px';
    imgall.style.width = width * length + 'px';
    buttons.style.width = 33 * length + 'px';
    buttons.style.marginLeft = -(33 * length) / 2 + 'px';
    animateImages(width, length);
}


function animateImages(width, length) {

    var images = $('images'),
        buttons = $('btn'),
        prev = $('prev'),
        next = $('next'),
        animated = false,
        index = 0,
        timer;

    play();

    function play() {
        timer = setInterval(function() {
            EventUtil.addHandler(next, "click", right);
        }, 2000);

        prev.style.display = 'none';
        next.style.display = 'none';
    }

    // 向后按钮
    var right = function() {

        if (index == length - 1) {
            index = 0;
            if (!animated) {
                animate(width * (length - 1));
            } else {
                return false;
            }
        } else {
            if (!animated) {
                animate(-width);
                index++;
            } else {
                return false;
            }
        }
        showButton(index);
    };

    //向前按钮
    var left = function() {

        if (index == 0) {
            index = length - 1;

            if (!animated) {
                animate(-width * (length - 1));
            } else {
                return false;
            }
        } else {

            if (!animated) {
                animate(width);
                index--;
            } else {
                return false;
            }
        }
        showButton(index);
    };

    var handler = function() {
        clearInterval(timer);
        prev.style.display = 'block';
        next.style.display = 'block';
    };
    
    EventUtil.addHandler(images, "mouseout", play);
    EventUtil.addHandler(next, "click", right);
    EventUtil.addHandler(prev, "click", left);
    EventUtil.addHandler(images, "mouseover", handler);
    EventUtil.addHandler(next, "mouseover", handler);
    EventUtil.addHandler(prev, "mouseover", handler);

    // 点击圆点时
    for (var i = 0; i < length; i++) {

        if (this.className == 'button') {
            return false;
        } else {

            (function(j) {
                EventUtil.addHandler(buttons.children[j], "click", function() {
                    var offset = -width * (j - index);
                    
                    if (!animated) {
                        animate(offset);
                    } else {
                        return false;
                    }
                    index = j;
                    showButton(index);
                });

                EventUtil.addHandler(buttons.children[j], "mouseover", function() {
                    clearInterval(timer);
                });
            }(i));
        }
    }

    // 显示原点，传入当前亮点的位置
    function showButton(index) {

        for (var i = 0; i < length; i++) {
            if (buttons.children[i].className == 'button') {
                buttons.children[i].className = '';
            }
        }
        buttons.children[index].className = 'button';
    }

    // 转动效果
    function animate(offset) {

        var newoffset = parseInt(images.style.left) + offset;
        var time = 600;
        var interval = 10;
        var speed = offset / (time / interval);
        animated = true;

        goImage();

        function goImage() {

            if ((speed < 0 && parseInt(images.style.left) > newoffset) ||
                (speed > 0 && parseInt(images.style.left) < newoffset)) {
                images.style.left = parseInt(images.style.left) + speed + 'px';
                setTimeout(goImage, interval);
            } else {
                animated = false;
                images.style.left = newoffset + 'px';

                if (newoffset < -width * (length - 1)) {
                    images.style.left = 0 + 'px';
                }

                if (newoffset > 0) {
                    images.style.left = -width * (length - 1) + 'px';
                }
            }
        }
    }
}