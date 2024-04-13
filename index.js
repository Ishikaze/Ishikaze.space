const http = new XMLHttpRequest;
const debug = document.getElementById('debug')
const id = '570470307748380673'
const url = "https://api.lanyard.rest/v1/users/" + id
let x = 0
let debugText = '> initializing...'

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
    http.open("GET", url);
    http.send();
    debugText = '' + '\n> refreshing status...'

    http.onload = updateInfo

    x = x + 1
    debugText = debugText + '\n> [refreshed ' + x + " times]"

};

function updatePfp() {
    document.getElementById('pfp').src = 'https://api.lanyard.rest/' + id + '.png'
    debugText = debugText + '\n> PFP update successful : https://api.lanyard.rest/' + id + '.png'
}

function updateUsername() {

    let obj = JSON.parse(http.responseText)
    document.getElementById('username').innerHTML = obj.data.discord_user.global_name
    debugText = debugText + '\n> global_name update successful : ' + obj.data.discord_user.global_name
}

function updateInfo() {
    let obj = JSON.parse(http.responseText)
    const discordStatus = obj.data.discord_status
    let simpleStatus = ''

    if (discordStatus !== 'offline') {
        simpleStatus = 'Online'
        document.getElementById('statusIndicator').style.backgroundColor = "#ffffff"
        document.getElementById('statusText').innerHTML = simpleStatus
    } else {
        simpleStatus = 'Offline'
        document.getElementById('statusIndicator').style.backgroundColor = "#000000"
        document.getElementById('statusText').innerHTML = simpleStatus
    }

    debugText = debugText + '\n> status update successful : ' + discordStatus + ' [' + simpleStatus + ']'
}

function updateDebug() {
    debug.innerHTML = debugText
};

window.onload = function () {
    updatePfp()

    http.open("GET", url);
    http.send();
    http.onload = updateUsername
}

setInterval(refresh, 3000);
setInterval(updatePfp, 10000);
setInterval(updateUsername, 8000);
setInterval(updateDebug, 10);