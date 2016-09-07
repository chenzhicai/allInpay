initWatch();

function initWatch() {
    var theNow = new Date();
    $(".digit-seconds").text(theNow.getSeconds() > 9 ? theNow.getSeconds() : '0' + theNow.getSeconds());
    moveSenonds(theNow.getSeconds());
    $(".digit-minutes").text(theNow.getMinutes() > 9 ? theNow.getMinutes() : '0' + theNow.getMinutes());
    $(".digit-hours").text(theNow.getHours() > 9 ? theNow.getHours() : '0' + theNow.getHours());
}

function moveSenonds(theseconds) {
    setInterval(function() {
        if (theseconds == 59) {
            theseconds = 0;
            var newTime = new Date();
            $(".digit-minutes").text(newTime.getMinutes() > 9 ? newTime.getMinutes() : '0' + newTime.getMinutes());
            $(".digit-hours").text(newTime.getHours() > 9 ? newTime.getHours() : '0' + newTime.getHours());
        } else {
            theseconds++;
        }
        $(".digit-seconds").text(theseconds > 9 ? theseconds : '0' + theseconds);
    }, 1000);
}