const http = new XMLHttpRequest;
const debug = document.getElementById('debug')
const id = '570470307748380673'
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
    document.getElementById('loading').style.opacity = '0'
});


function refresh() {
    x = x + 1
    debugText = '[refreshed ' + x + " times]"

    document.getElementById('pfp').style.backgroundImage = 'url(https://api.lanyard.rest/' + id + '.webp)'
    debugText = debugText + '\n url(https://api.lanyard.rest/' + id + '.webp)'

};

function updateDebug() {
    debug.innerHTML = debugText
};

setInterval(refresh, 1000);
setInterval(updateDebug, 5000);