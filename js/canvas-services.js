"use strict"

var gCanvas
var gCtx
var gTxtAreas = [
    {
        startingX: 5,
        endX: 490,
        startingY: 5,
        endY: 100,
        idx: 0,
        focused: false,
        movedPixels: 5,
    },
]
var gFocusedIdx = 0

function drawImgFromlocal() {
    var meme = getMeme()
    gCanvas = document.querySelector("canvas")

    gCtx = gCanvas.getContext("2d")
    var img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        gCtx.font = `${meme.lines.size} ${meme.lines.font}`

        gCtx.fillStyle = meme.lines.color
        var centerPoint = gCanvas.width - gCtx.measureText(meme.lines.txt[0]).width
        centerPoint = centerPoint / 2
        // checkClickPos({ x: centerPoint, y: 50 })
        if (meme.lines.txt.length === 0) return
        gCtx.fillText(meme.lines.txt[0], centerPoint, 50 - gTxtAreas[0].movedPixels)
        gCtx.strokeText(meme.lines.txt[0], centerPoint, 50 - gTxtAreas[0].movedPixels)
        gCtx.beginPath()
        gCtx.rect(5, 10 - gTxtAreas[0].movedPixels, gCanvas.width - 10, 100)

        gCtx.stroke()
        if (gTxtAreas.length === 2) addText()
        // if (meme.lines.txt.length === 2) {
        // addText(meme, centerPoint)
        // }
    }
}

function addText(idx) {
    var meme = getMeme()
    var centerPoint = gCanvas.width - gCtx.measureText(meme.lines.txt[idx]).width
    centerPoint = centerPoint / 2
    // var idx = meme.lines.txt.length === 0 ? 0 : 1
    gCtx.fillText(meme.lines.txt[idx], centerPoint, 450 - gTxtAreas[idx].movedPixels)
    gCtx.strokeText(meme.lines.txt[idx], centerPoint, 450 - gTxtAreas[idx].movedPixels)
    gCtx.beginPath()
    gCtx.rect(5, gCanvas.height - 105 - gTxtAreas[idx].movedPixels, gCanvas.width - 10, 100)
    gCtx.stroke()
}

function getAreas() {
    return gTxtAreas
}

function getCanvas() {
    return gCanvas
}
function getFocusedIdx() {
    return gFocusedIdx
}

function checkClickPos(pos) {
    gTxtAreas.forEach((area) => {
        if (area.focused) {
            area.focused = false
            // clearCanvas()
            drawImgFromlocal()
        }
        if (pos.x > area.startingX && pos.x < area.endX && pos.y > area.startingY && pos.y < area.endY) {
            area.focused = true
            printFocus(area)
            return
        }
    })
}
function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}
function printFocus(area) {
    gCtx.beginPath()
    gCtx.lineWidth = "6"
    gCtx.strokeStyle = "red"
    gCtx.rect(area.startingX, area.startingY, gCanvas.width - 10, 100)
    gCtx.stroke()
    gCtx.strokeStyle = "#000"
    gCtx.lineWidth = 1
    gCtx.setLineDash([])
    gFocusedIdx = area.idx
}
function updatePixelsMoved(num) {
    var idx = getFocusedIdx()
    gTxtAreas[idx].movedPixels += num
    drawImgFromlocal()
}
