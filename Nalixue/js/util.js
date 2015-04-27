var $ = $ || {};
$ = {
    on: function(element, event, listener) {
        $.event.addEvent(element, event, listener);
    },

    un: function(element, event, listener) {
        $.event.removeEvent(element, event, listener);
    },

    click: function(element, listener) {
        $.event.addEvent(element, "click", listener);
    },

    enter: function(element, listener) {
        $.event.addEvent(element, "keyup", function(event) {
            if ($.event.getEvent(event).keyCode === 13) {
                listener();
            }
        });
    },

    isArray: function(arr) {
        return arr instanceof Array;
    },

    isFunction: function(fn) {
        return fn instanceof Function;
    },

    cloneObject: function(srcobj) {
        var str, newobj = srcobj.constructor === Array ? [] : {};

        if (typeof srcobj !== 'object') {
            return;
        } else if (window.JSON) {
            str = JSON.stringify(srcobj);
            newobj = JSON.parse(str);
        } else {

            for (var i in srcobj) {
                newobj[i] = typeof srcobj[i] === 'object' ? clonrObject(obj[i]) : obj[i];
            }
        }
        return newobj;
    },

    uniqArray: function(arr) {
        var newarr = [];
        var a = [];

        for (var i = 0; i < arr.length; i++) {
            var key = arr[i];

            if (!a[key]) {
                a[key] = true;
                newarr.push(key);
            }
        }
        return newarr;
    },

    trim: function(str) {
        var b = "";
        for (var i = 0; i < str.length; i++) {

            if ((str.charCodeAt(i) != 9) && (str.charCodeAt(i) != 32) && (str.charCodeAt(i) != 12288)) {
                b += str[i];
            }
        }
        return b;
    },
    // 正则写法 匹配文章中的正则
    // /\s/g,  
    // /(^\s+)|(\s+$)/g  前后空格

    each: function(arr, fn) {
        for (var i = 0; i < arr.length; i++) {
            fn(arr[i], i);
        }
    },

    getObjectLength: function(obj) {
        var index = 0;

        for (var i in obj) {
            index++;

        }
        return index;
    },

    isEmail: function(emailStr) {
        var mail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        return mail.test(emailStr);
    },

    isMobilePhone: function(phone) {
        var tel = /^1[3|4|5|8][0-9]\d{4,8}$/;
        return tel.test(phone);
    },

    hasClass: function(elem, cName) {

        if (elem.className) {
            return !!elem.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
        }
        return false;
    },

    addClass: function(elem, cName) {

        if (!$.hasClass(elem, cName)) {
            elem.className += " " + cName;
        }
    },

    removeClass: function(elem, cName) {

        if ($.hasClass(elem, cName)) {
            elem.className = elem.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), "");
        }
    },

    isSiblingNode: function(element, siblingNode) {
        return element.parentNode === siblingNode.parentNode ? true : false;
    },

    isIE: function() {

        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            var app_version = navigator.appVersion;
            var start_index = app_version.indexOf('M');
            var end_index = app_version.indexOf(';', start_index);
            var version = app_version.substring(start_index, end_index);

            switch (version) {
                case 'MSIE 10.0':
                    return 'ie10';
                case 'MSIE 9.0':
                    return 'ie9';
                case 'MSIE 8.0':
                    return 'ie8';
                case 'MSIE 7.0':
                    return 'ie7';
                case 'MSIE 6.0':
                    return 'ie6';
                case '5.0 (Windows NT 6.1':
                    return 'ie11';
                default:
                    return 'others ie';
            }
        } else {
            return -1;
        }
    }
};

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var a = {
        x: getLeft(element),
        y: getTop(element)
    };
    return a;
}

function getTop(e) {
    var offset = e.offsetTop;

    if (e.offsetParent != null) {
        offset += getTop(e.offsetParent);
    }
    return offset;
}

function getLeft(e) {
    var offset = e.offsetLeft;

    if (e.offsetParent != null) {
        offset += getLeft(e.offsetParent);
    }
    return offset;
}

// 实现一个简单的Query
function nalixue(selector) {
    var first;
    var arr = selector.trim().replace(" ", ",").split(",");

    if (arr.length === 1) {
        str = arr.toString();
        first = str.substr(0, 1);

        switch (first) {
            case '#':
                var idName = str.substring(1);
                return document.getElementById(idName);
                break;
            case '.':
                var className = str.substr(1);
                return document.getElementsByClassName(className).item[0];
                break;
            case '[':
            default:
                return document.getElementsByTagName(str).item[0];
        }
    }
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
$.event = {
    addEvent: function(element, event, listener) {

        if (element.addEventListner) {
            element.addEventListner(event, listener, false);
        } else if (element.attachElement) {
            element.attachElement(event, listener);
        } else {
            element["on" + event] = listener;
        }
    },

    removeEvent: function(element, event, listener) {

        if (element.removeEventListner) {
            element.removeEventListner(event, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + event, handler);
        } else {
            element["on" + event] = null;
        }
    },

    getEvent: function(event) {
        return event ? event : window.event;
    },

    getTarget: function(event) {
        return event.target || event.srcElement;
    },

    delegateEvent: function(element, tag, eventName, listener) {

        $.event.addEvent(element, eventName, function() {

            if ($.event.getTarget(event).tagName.toLowerCase() === tag) {
                listener();
            }
        });
    }
};

// 设置cookie
$.cookie = {
    get: function(name) {
        var cookieName = encodeURIComponent(neme) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;

        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length), cookieEnd);
        }
        return cookieValue;
    },

    set: function(name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },

    unset: function(name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
}

function createXHR() {
    if (typeof XMLHttpRequest != 'undefined') {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != 'undefined') {
        if (typeof arguments.callee.activeXString != 'string') {
            var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0',
                    'MSXML2.XMLHttp'
                ],
                i, len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(version[i]);
                    arguments.callee.activeXString = version[i];
                    break;
                } catch (ex) {

                }
            }
        }
        return new ActiveXObject();
    } else {
        throw new Error("no XHR Object available");
    }

}

function ajax(url, options) {
    var xhr = createXHR(),
        optionsdata = "",
        index = 0,
        i;
    if (options.type === 'post') {
        for (i in options.data) {

            if (index == Object.keys(options.data).length - 1) {
                optionsdata += i + "=" + options.data[i].trim();
            } else {
                optionsdata += i + "=" + options.data[i].trim() + "&";
            }
            index++;
        }
        xhr.open("post", url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(optionsdata);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

                    if (options.onsuccess) {
                        options.onsuccess(xhr.responseText, xhr);
                    } else {
                        return console.error("can't find onsuccess");
                    }

                } else {
                    if (options.onfail) {
                        options.onfail(xhr.responseText, xhr);
                    } else {
                        return console.error("can't find onfail");
                    }
                }
            }
        }
    }
    if (options.type === 'get') {

        for (var i in options.data) {
            url += (url.indexOf('?') === -1) ? '?' : '&';
            url += encodeURIComponent(i) + "=" + encodeURIComponent(options.data[i]);
        }
        xhr.open("get", url);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

                    if (options.onsuccess) {
                        options.onsuccess(xhr.responseText, xhr);
                    } else {
                        return console.error("can't find onsuccess");

                    }
                } else {
                    if (options.onfail) {
                        options.onfail(JSON.parse(xhr.responseText), xhr);
                    } else {
                        return console.error("can't find onfail");
                    }
                }
            }
        }
    }
}