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
var gSwitching = false
function drawImgFromlocal() {
    var meme = getMeme()
    gCanvas = document.querySelector("canvas")
    var downloadStatus = getDownloadStatus()

    gCtx = gCanvas.getContext("2d")
    var img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        if (meme.lines.txt.length === 0) return
        gCtx.font = `${meme.lines.size}px ${meme.lines.font}`

        gCtx.fillStyle = meme.lines.color

        var i = 0
        meme.lines.txt.forEach((line) => {
            var centerPoint = gCanvas.width - gCtx.measureText(meme.lines.txt[i]).width
            centerPoint = centerPoint / 2
            var txtHeight = gTxtAreas[i].endY + gTxtAreas[i].startingY
            txtHeight = txtHeight / 2
            // txtHeight -= gTxtAreas[i].movedPixels
            console.log("elemnt:", txtHeight)
            gCtx.fillText(meme.lines.txt[i], centerPoint, txtHeight)
            gCtx.strokeText(meme.lines.txt[i], centerPoint, txtHeight)
            gCtx.beginPath()
            // console.log("object", i, gTxtAreas[i])
            if (!downloadStatus) gCtx.rect(gTxtAreas[i].startingX, gTxtAreas[i].startingY, gCanvas.width - 10, 100)

            // printFocus(gTxtAreas[0])
            gCtx.stroke()
            i++
        })
        if (gSwitching) printFocus(gTxtAreas[gFocusedIdx])
        gSwitching = false
    }
    if (downloadStatus) {
        downloadCanvas()
    }
}
function downloadCanvas() {
    var canvas = getCanvas()
    var imgContent = canvas.toDataURL("image/jpeg") // image/jpeg the default format
    canvas.href = imgContent
    gDownLoad = false
}

function addTextArea(idx = 1) {
    var meme = getMeme()
    var centerPoint = gCanvas.width - gCtx.measureText(meme.lines.txt[idx]).width

    centerPoint = centerPoint / 2
    // var idx = meme.lines.txt.length === 0 ? 0 : 1
    console.log(idx)
    gCtx.fillText(meme.lines.txt[idx], centerPoint, 450 - gTxtAreas[idx].movedPixels)
    gCtx.strokeText(meme.lines.txt[idx], centerPoint, 450 - gTxtAreas[idx].movedPixels)
    gCtx.beginPath()
    gCtx.rect(5, gCanvas.height - 105 - gTxtAreas[idx].movedPixels, gCanvas.width - 10, 100)
    gCtx.stroke()
}
function addMidTxt(idx) {
    var meme = getMeme()
    var centerPoint = gCanvas.width - gCtx.measureText(meme.lines.txt[idx]).width

    centerPoint = centerPoint / 2
    // var idx = meme.lines.txt.length === 0 ? 0 : 1
    console.log(idx)
    gCtx.fillText(meme.lines.txt[idx], centerPoint, gCanvas.height / 2 - gTxtAreas[idx].movedPixels)
    gCtx.strokeText(meme.lines.txt[idx], centerPoint, gCanvas.height / 2 - gTxtAreas[idx].movedPixels)
    gCtx.beginPath()
    var midHeight = gCanvas.height / 2
    midHeight -= 52
    midHeight -= gTxtAreas[idx].movedPixels
    console.log(midHeight)

    gCtx.rect(5, midHeight, gCanvas.width - 10, 100)
    gCtx.stroke()
}

function checkClickPos(pos) {
    resetInput()
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
function removeArea(idx) {
    gTxtAreas.splice(idx, 1)
}

function switchFocus() {
    var meme = getMeme()
    gFocusedIdx++
    if (gFocusedIdx === meme.lines.txt.length) gFocusedIdx = 0
    gSwitching = true
    drawImgFromlocal()
    resetInput()
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
