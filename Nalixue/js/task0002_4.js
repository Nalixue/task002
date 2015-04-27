$.event.addEvent(nalixue('#sear-con'), 'focus', function() {
    var len = 0,
        index = 0,
        flag = false;

    $.event.delegateEvent(nalixue('#content'), 'input', 'keydown', function() {

        if ($.event.getEvent(event).keyCode === 40) {
            flag = true;
            index++;
            findIndex(index, len, 40);
        }

        if ($.event.getEvent(event).keyCode === 38) {
            flag = true;
            index--;
            findIndex(index, len, 38);
        }

        if ($.event.getEvent(event).keyCode === 13) {
            $.event.getTarget(event).value = document.getElementsByTagName('li')[index - 1].innerHTML;
        }
    });

    $.event.addEvent(nalixue('#sear-con'), 'keyup', function() {
        if (!flag) {
            ajax(
                'server.php', {
                    type: 'get',
                    data: {
                        searCon: nalixue('#sear-con').value
                    },
                    onsuccess: function(responseText, xhr) {
                        var _content = nalixue('#content'),
                            _searchCon = nalixue('#sear-con'),
                            _show = nalixue('#sear-show'),
                            i;
                        var text = JSON.parse(xhr.responseText);
                        len = text.length;
                        _show.innerHTML = "";

                        if (len != 0) {
                            $.removeClass(_show, 'hide');
                            $.addClass(_show, 'show');

                            for (i = 0; i < len; i++) {
                                _show.innerHTML += '<li>' + text[i] + '</li>';
                            }
                        }

                        $.event.delegateEvent(_content, 'li', 'mouseover', function() {
                            $.event.getTarget(event).style.backgroundColor = '#ddd';
                        });

                        $.event.delegateEvent(_content, 'li', 'mouseout', function() {
                            $.event.getTarget(event).style.backgroundColor = '#fff';
                        });
                    }
                });
        }
    });

    function findIndex(index, len, keyCode) {
        var limit = len,
            previous = index - 2;
            index = Math.min(index, len);
        if (keyCode == 38) {
            index = Math.max(0, index);
            limit = 1;
            previous = index;
        }

        if (index !== 1 ) {
            document.getElementsByTagName('li')[previous].style.backgroundColor = '#fff';
        }
        console.log(index);
        if (index === limit) {
            index = 0;
        } else{
            document.getElementsByTagName('li')[index - 1].style.backgroundColor = '#ddd';
        }
    }
});