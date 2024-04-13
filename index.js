const http = new XMLHttpRequest;
const debug = document.getElementById('debug')
let x = 0
let debugText = ''

function onReady(callback) {
    var intervalId = window.setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 1000);
}

function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function () {
    setVisible('.page', true);
    setVisible('.loading', false);
});


function refresh() {
    x = x + 1
    debugText = '[refreshed ' + x + " times]"
};

function updateDebug() {
    debug.innerHTML = debugText
};

setInterval(refresh, 1000);
setInterval(updateDebug, 1000);