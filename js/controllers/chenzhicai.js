var browserInfo = require("../componests/browserInfo.js");

$(window).ready(function init() {

});

function setAvatarBackground () {
    var theBrowserInfo = browserInfo.getBrowserInfo();
    console.log(theBrowserInfo);
}