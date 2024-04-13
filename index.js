const http = new XMLHttpRequest;
const debug = document.getElementById('debug')
let x = 0

function refresh() {
    x = x + 1
    debug.innerHTML = '[refreshed ' + x + " times]"
};

setInterval(refresh, 1000)