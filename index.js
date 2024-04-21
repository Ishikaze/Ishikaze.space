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

    http.onload = update

    x = x + 1
    debugText = debugText + '\n> [refreshed ' + x + " times]"

};

function update() {
    updateInfo()
    setTimeout(updatePresence, 50)
    setTimeout(updateSpotify, 100)
}

function updatePfp() {
    try {
        document.getElementById('pfp').src = 'https://api.lanyard.rest/' + id + '.png'
        debugText = debugText + '\n> PFP update successful : https://api.lanyard.rest/' + id + '.png'
    } catch {
        debugText = debugText + '\n> PFP update failed'
    }

}

function updateUsername() {
    try {
        let obj = JSON.parse(http.responseText)
        document.getElementById('username').innerHTML = obj.data.discord_user.global_name
        debugText = debugText + '\n> global_name update successful : ' + obj.data.discord_user.global_name
    } catch {
        debugText = debugText + '\n> global_name update failed'
    }

}

function updateInfo() {
    try {
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
    } catch {
        debugText = debugText + 'status update failed'
    }

}

function updateSpotify() {
    let obj = JSON.parse(http.responseText)

    if (obj.data.spotify === null) {
        document.getElementById('spotifyPH').style.display = 'block'
        document.getElementById('spotifyContainer').style.display = 'none'
        debugText = debugText + '\n> spotify : listening to nothing!'
    } else {
        document.getElementById('spotifyTrack').innerHTML = truncate(obj.data.spotify.song, 16)
        document.getElementById('spotifyArtist').innerHTML = truncate(obj.data.spotify.artist, 16)
        document.getElementById('spotifyCover').src = obj.data.spotify.album_art_url

        document.getElementById('spotifyPH').style.display = 'none'
        document.getElementById('spotifyContainer').style.display = 'block'
        debugText = debugText + '\n> updated spotify status ' + obj.data.spotify.track_id
    };

};

function updatePresence() {
    let obj = JSON.parse(http.responseText)

    let resultPresence = 'currently doing sweet FA!'

    if (obj.data.spotify !== null) {
        resultPresence = 'Currently listening to Spotify'
    }

    document.getElementById('presence').innerHTML = resultPresence
    debugText = debugText + '\n> updated presence : ' + resultPresence
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function truncate(str, n) {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
};


function updateDebug() {
    debug.innerHTML = debugText
};

window.onload = function () {
    updatePfp()

    http.open("GET", url);
    http.send();
    http.onload = updateUsername
}
setTimeout(refresh, 100)
setInterval(refresh, 3000);
setInterval(updatePfp, 10000);
setInterval(updateUsername, 8000);
setInterval(updateDebug, 10);

var cursor = document.getElementById("cursor");
document.body.addEventListener("mousemove", function(e) {
  cursor.style.left = e.clientX + "px",
    cursor.style.top = e.clientY + "px";
});