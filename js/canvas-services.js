"use strict"

var gElCanvas
var gCtx
var gDrag = false
var gFocusedIdx = 0
var gSwitching = false
function drawImgFromlocal() {
    var meme = getMeme()
    gElCanvas = document.querySelector(".main-canvas")
    var downloadStatus = getDownloadStatus()

    gCtx = gElCanvas.getContext("2d")
    var img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        if (meme.lines.length === 0) return

        meme.lines.forEach((line) => {
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color
            var centerPoint = gElCanvas.width - gCtx.measureText(line.txt).width
            gCtx.lineWidth = 1
            gCtx.strokeStyle = "#000"
            centerPoint = centerPoint / 2
            // line.x = gCtx.measureText(line.txt).width
            gCtx.fillText(line.txt, line.x - gCtx.measureText(line.txt).width / 2, line.y - line.movedPixels)
            gCtx.strokeText(line.txt, line.x - gCtx.measureText(line.txt).width / 2, line.y - line.movedPixels)
            gCtx.beginPath()
        })
        printFocus(meme.lines[gFocusedIdx])
    }
}
function downloadCanvas() {
    var canvas = getCanvas()
    var imgContent = canvas.toDataURL("image/jpeg") // image/jpeg the default format
    canvas.href = imgContent
    gDownLoad = false
}

function checkClickPos(pos) {
    resetInput()
    var meme = getMeme()

    for (var i = 0; i < meme.lines.length; i++) {
        if (
            meme.lines[i].x - 5 - gCtx.measureText(meme.lines[i].txt).width / 2 < pos.x &&
            pos.x < meme.lines[i].x + gCtx.measureText(meme.lines[i].txt).width / 2 &&
            meme.lines[i].y - meme.lines[i].size < pos.y &&
            pos.y < meme.lines[i].y + meme.lines[i].size + 5
        ) {
            // printFocus(line)
            gFocusedIdx = i
            setDrag(true)
            document.querySelector("canvas").style.cursor = "grabbing"

            break
        } else {
            document.querySelector("canvas").style.cursor = "pointer"
            // if th user clicks outside the text i gonna set the gfocus to be bigger the the zamount of lines in the array and will check on
            //print img if its the case
            // if not the ill print the focus area
            // i tried printing it here but the load time just deleted the highlite
            gFocusedIdx = meme.lines.length
        }
    }

    drawImgFromlocal()
}
function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}
function printFocus(line) {
    var meme = getMeme()
    var idx = gFocusedIdx === 0 ? 0 : 1
    line = meme.lines[gFocusedIdx]
    gCtx.beginPath()
    gCtx.lineWidth = "6"
    gCtx.strokeStyle = "red"
    if (gFocusedIdx >= meme.lines.length) return
    gCtx.rect(line.x - 5 - gCtx.measureText(line.txt).width / 2, line.y - line.size - line.movedPixels, gCtx.measureText(line.txt).width + 10, line.size + 5)
    gCtx.stroke()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = "#000"
    gCtx.setLineDash([])
}
function updatePixelsMoved(num) {
    var meme = getMeme()
    meme.lines[gFocusedIdx].movedPixels += num
    drawImgFromlocal()
}
function removeArea(idx) {
    gTxtAreas.splice(idx, 1)
}

function switchFocus() {
    var meme = getMeme()
    gFocusedIdx++
    if (gFocusedIdx >= meme.lines.length) gFocusedIdx = 0
    gSwitching = true
    drawImgFromlocal()
    resetInput()
}

function getAreas() {
    return gTxtAreas
}

function getCanvas() {
    return gElCanvas
}
function getFocusedIdx() {
    return gFocusedIdx
}
// i know in the original q we needed to do it so it'll grow on click
// but i wanted to do it that
// takes the keywords and paint them on a canvas
// sort the most common ones by running on the object and sorting only the count of the words
// and then takes the 5 most searched words by taking the first 5 elements of the sorted count arr
// decided it looks better just unsorted
//decided to deleted it all because it wasnt the q
function paintKeywords() {
    var keywords = getKeywords()
    var keys = Object.keys(keywords)
    // console.log(sortedKeywordsCount)
    var displayWords = []
    var elWords = document.querySelector(".spans")
    var str = ``
    for (var i = 0; i <= 11; i++) {
        str += `<span class="word-${i}" onclick="inlargeText(this) ">${keys[i]}</span>`
    }
    str += ``
    elWords.innerHTML += str
    for (var i = 0; i <= 11; i++) {
        var word = document.querySelector(`.word-${i}`)
        word.style.fontSize = ` ${keywords[keys[i]]}em`
        displayWords.push(word)
    }
}

function setDrag(bool) {
    console.log(bool)
    gDrag = bool
}

function getDrag() {
    return gDrag
}

function moveFocused(dx, dy) {
    var meme = getMeme()
    console.log(meme.lines[gFocusedIdx].x)
    meme.lines[gFocusedIdx].x += dx
    meme.lines[gFocusedIdx].y += dy
    drawImgFromlocal()
}
