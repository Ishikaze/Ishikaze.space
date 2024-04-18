let posX = 0
let posY = randomInt(100)
let face = 'L'
const ishikaze = document.getElementById('ishikaze')

setInterval(move, 100)

function move() {
    let int = randomInt(50)
    // debugText = debugText + '\n> ' + int

    switch (int) {
        case 0:
            left()
        break;
        case 1:
            right()
        break;
        default:

        break;
    }
}

function left() {
    face = 'L'
    posX = 30
    setTimeout(resetX, 100)
    posY = posY - 2
    setTimeout(updateY, 10)
    ishikaze.style.bottom = posX + 'px'

    updateFace()
}

function right() {
    face = 'R'
    posX = 30
    setTimeout(resetX, 100)
    posY = posY + 2
    setTimeout(updateY, 10)
    ishikaze.style.bottom = posX + 'px'

    updateFace()
}

function jump() {
    if (face == 'L') {
        posY = posY - 10
    } else {
        posY = posY + 10
    }
    setTimeout(updateY, 10)
    posX = 100
    setTimeout(resetX, 100)
    ishikaze.style.bottom = posX + 'px'
}

function updateY() {
    if (posY > 94) {
        posY = 95
    } else  if (posY < 1) {
        posY = 0
    }
    ishikaze.style.left = posY + '%'
}

function resetX() {
    posX = 0
    ishikaze.style.bottom = posX + 'px'
}

function updateFace() {
    if (face == 'L') {
        ishikaze.style.transform = "scaleX(1)"
    } else {
        ishikaze.style.transform = "scaleX(-1)"
    }
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
  }

updateY()

function updateDisplay() {
    document.getElementById('displayX').innerHTML = 'x = ' + posY
}

document.getElementById('remote').style.display = 'inline'
setInterval(updateDisplay, 10)