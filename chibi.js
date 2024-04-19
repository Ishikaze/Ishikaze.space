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
    setTimeout(squishAnim, 100)
}

function right() {
    document.getElementById('ishikaze').style.transform = 'scaleX(1.2)'
    face = 'R'
    posX = 30
    setTimeout(resetX, 100)
    posY = posY + 2
    setTimeout(updateY, 10)
    ishikaze.style.bottom = posX + 'px'

    updateFace()
    setTimeout(squishAnim, 100)
}

function jump() {
    eek()
    if (face == 'L') {
        posY = posY - 10
    } else {
        posY = posY + 10
    }
    setTimeout(updateY, 10)
    posX = 100
    setTimeout(resetX, 250)
    ishikaze.style.bottom = posX + 'px'
}

function updateY() {
    if (posY > 94) {
        posY = 95
    } else if (posY < 1) {
        posY = 0
    }
    ishikaze.style.left = posY + '%'
}

function resetX() {
    posX = 0
    ishikaze.style.bottom = posX + 'px'
}

function updateFace() {
    document.getElementById('ishikaze').style.transitionProperty = 'bottom, left'
    document.getElementById('ishikaze').style.transitionDuration = '0.25s'
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
plink()

function updateDisplay() {
    document.getElementById('displayX').innerHTML = 'x = ' + posY
}

function eek() {
    document.getElementById('ishikazeOverlay').style.backgroundImage = 'url(./assets/images/ishi_eek!.png)'
    setTimeout(eekReset, 500)
}

function eekReset() {
    document.getElementById('ishikazeOverlay').style.backgroundImage = 'url(./assets/images/ishi.png)'
}

function plink() {
    document.getElementById('ishikazeOverlay').style.backgroundImage = 'url(./assets/images/ishi_plink.png)'

    let blinkTwice = randomInt(4)
    if (blinkTwice == 0) {
        setTimeout(plinkAgain, 100)
    } else {
        setTimeout(plinkReset, 100)
    }
}

function plinkAgain() {
    document.getElementById('ishikazeOverlay').style.backgroundImage = 'url(./assets/images/ishi.png)'
    setTimeout(plink, 100)
}

function plinkReset() {
    document.getElementById('ishikazeOverlay').style.backgroundImage = 'url(./assets/images/ishi.png)'

    let interval = randomInt(10000)
    plinkDelay(interval)
}

function plinkDelay(delay) {
    setTimeout(plink, delay)
}

document.getElementById('remote').style.display = 'inline'
setInterval(updateDisplay, 10)

function squishAnim() {
    if (face == 'L') {
        document.getElementById('ishikaze').style.transitionProperty = 'bottom, left, transform'
        document.getElementById('ishikaze').style.transitionDuration = '0.1s'
        document.getElementById('ishikaze').style.transform = 'scaleX(1.2) scaleY(0.8)'
        document.getElementById('ishikaze').style.bottom = '-6px'
        setTimeout(() => {
            document.getElementById('ishikaze').style.transform = 'scaleX(1) scaleY(1)'
            document.getElementById('ishikaze').style.bottom = '0px'
        }, 100)
    } else {
        document.getElementById('ishikaze').style.transitionProperty = 'bottom, left, transform'
        document.getElementById('ishikaze').style.transitionDuration = '0.1s'
        document.getElementById('ishikaze').style.transform = 'scaleX(-1.2) scaleY(0.8)'
        document.getElementById('ishikaze').style.bottom = '-6px'
        setTimeout(() => {
            document.getElementById('ishikaze').style.transform = 'scaleX(-1) scaleY(1)'
            document.getElementById('ishikaze').style.bottom = '0px'
        }, 100)
    }

}