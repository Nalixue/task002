$.event.addEvent(nalixue('#submit'), 'click', function() {

    var prompt = nalixue("#prompt"),
        fondCon = nalixue("#fond-con").value,
        fondArr = fondCon.split(/\s+|\n+|,+|，+|、+|；+/g),
        len = fondArr.length;
        
    nalixue("#prompt").innerHTML = "";

    if (len > 10 || len === 0) {
        $.addClass(prompt, "error");
        prompt.innerHTML = "不能超过10个爱好并且不能为空";
        nalixue("#fond-con").focus();
    } else {
        $.removeClass(prompt, "error");

        for (var i = 0; i < len; i++) {
            prompt.innerHTML +=
                '<input type="checkbox"><label>' + fondArr[i] + '</label>'
        }
    }
});