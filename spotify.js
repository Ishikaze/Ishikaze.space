
function spotifyPull() {
    http.open("GET", url);
    http.send();
    debugText = debugText + '\n> pulling spotify status...';

    http.onload = updateSpotify;
};

function updateSpotify() {
    let spotify = JSON.parse(http.responseText);
    debugText = debugText + '\n' + spotify.data.spotify.track_id

    if (spotify === null) {
        document.getElementById('spotifyPH').style.display = 'inline'
    } else {
        document.getElementById('spotifyPH').style.display = 'none'
    };

};

setInterval(spotifyPull, 3500);

