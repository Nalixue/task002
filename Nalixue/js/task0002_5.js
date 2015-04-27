var params = {
    moveX: 0,
    moveY: 0,
    flag: false
};

var position = nalixue("#main"),
    conHeight = position.clientHeight,
    conWidth = position.clientWidth;

$.event.delegateEvent(nalixue("#main"), "li", 'mousedown', function() {
    var target = $.event.getTarget(event);

    params.moveX = event.pageX - target.offsetLeft;
    params.moveY = event.pageY - target.offsetTop;

    $.addClass(target, "dg-transparent");
    target.style.position = "absolute";
    params.flag = true;
});

$.event.addEvent(document, 'mousemove', function(event) {

    if (params.flag) {
        var target = $.event.getTarget(event),
            eleHeight = target.offsetHeight,
            eleWidth = target.offsetWidth,
            maxX = conWidth - eleWidth,
            maxY = conHeight - eleHeight,
            moveY = event.pageY - params.moveY,
            moveX = event.pageX - params.moveX;
        moveX = Math.min(maxX, Math.max(0, moveX));
        moveY = Math.min(maxY, Math.max(0, moveY));
        target.style.top = moveY + 'px';
        target.style.left = moveX + 'px';
    }
});
$.event.addEvent(document, 'mouseup', function() {

    var target = $.event.getTarget(event),
        eleHeight = target.offsetHeight,
        eleWidth = target.offsetWidth,
        top = event.pageY,
        left = event.pageX,
        times = Math.round(top / eleHeight);
        target.style.top = eleHeight * times + 'px';

    if (left >= Math.floor(conWidth / 2)) {
        target.style.left = (conWidth - eleWidth) + 'px';
    } else {
        target.style.left = '0px';
    }
    params.flag = false;
    $.removeClass(target, "dg-transparent");
});