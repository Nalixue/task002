$.event.delegateEvent(nalixue("#time"), "button", 'click', function() {

    var inputTime = nalixue("#input-time").value.split("-"),
        endTime = new Date(inputTime[0], inputTime[1]-1, inputTime[2]),
        flag = true;
        
    everyCountdown();

    function everyCountdown() {
        flag = countdown(endTime);

        if(flag) {
            setTimeout(everyCountdown, 1000);
        } else {
            return;
        }      
    }
          
    function countdown(endTime) {
        var nowTime = new Date(),
            nowYear = nowTime.getFullYear(),
            nowMonth = nowTime.getMonth() + 1,
            nowDate = nowTime.getDate(),
            nowHours = nowTime.getHours(),
            nowMinutes = nowTime.getMinutes(),
            nowSeconds = nowTime.getSeconds(),

            endYear = endTime.getFullYear(),
            endMonth = endTime.getMonth() + 1,
            endDate = endTime.getDate(),

            interYear = interMonth = interDate = 
            interHours = interMinutes = interSeconds = 0;

        if(nowTime === endTime) {
            nalixue("#show-time").innerHTML += "时间到了";
            // flag = false;
            return false;
        }

        if(nowTime > endTime){
            nalixue("#show-time").innerHTML = "时间已经过去了";
            // flag = false;
            return false;
        }
        interYear = endYear - nowYear;

        if(nowMonth <= endMonth) {
            interMonth = endMonth - nowMonth;
            leaveDate();                
        } else {
            interYear = interYear - 1;
            interMonth = endMonth + 12 - nowMonth;
            leaveDate();
        }
        
        nalixue("#show-time").innerHTML = "距" + endYear + "年"
                + endMonth + "月" + endDate + "日，还有" + interYear + "年"
                + interMonth + "个月" + (interDate - 1) + "天"
                + (23 - nowHours) + "小时" + (59 - nowMinutes) + "分" 
                + (60 - nowSeconds) + "秒";

        function isLeapYear(year) {
            return ( ((year % 4) === 0 && (year % 100) !== 0) ||
                   year % 400 === 0) ? 29 : 28;
        }

        function isSmallMonth(month) {
            return (month == 4 || month == 6 || month == 9 ||
                   month == 10) ? 30 : 31;
        }

        function leaveDate() {
            
            if(nowDate < endDate) {
                interDate = endDate - nowDate;
            } else {
                interMonth = interMonth - 1;

                if(endMonth - 1 === 2) {
                    console.log(isLeapYear(endYear - 1));
                    console.log(endYear - 1);
                    interDate = endDate + isLeapYear(endYear - 1) - nowDate;
                } else {
                    interDate = endDate + isSmallMonth(endMonth - 1) - nowDate;
                }
            }
        }
        return true;
    }
});