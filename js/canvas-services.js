'use strict'
// q: how to make the grid strech till the end if there isnt enough space for another img?
// q:delay the download?
// q:edit data list style?
// q:adding an emoji to datalist?
// q: changing the color input style?
// q:underline text in canvas?
// q:why i have the scroll of shame?
// q: why saved renders diffrenet?
var gElCanvas
var gCtx
var gDrag = false
var gFocusedIdx = 0
var gSwitching = false
function drawImgFromlocal() {
  var meme = getMeme()
  paintImg(meme)
}
function setCanvasSize() {
  var meme = getMeme()
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')
  var img = new Image()
  img.src = `img/${meme.selectedImgId}.jpg`
  gElCanvas.width = img.naturalWidth
  gElCanvas.height = img.naturalHeight
}

function drawImgFromSaved(meme) {
  paintImg(meme)
}
function paintImg(meme) {
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')
  // var elImg = document.querySelector(`.meme-${meme.selectedImgId}`)
  var img = new Image()
  img.src = `img/${meme.selectedImgId}.jpg`
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    if (meme.lines.length === 0) return

    meme.lines.forEach((line) => {
      // renderlines()
      gCtx.font = `${line.size}px ${line.font}`
      gCtx.fillStyle = line.color
      gCtx.lineWidth = 1
      gCtx.strokeStyle = '#000'
      gCtx.fillText(
        line.txt,
        line.x - gCtx.measureText(line.txt).width / 2,
        line.y - line.movedPixels
      )
      gCtx.strokeText(
        line.txt,
        line.x - gCtx.measureText(line.txt).width / 2,
        line.y - line.movedPixels
      )
      gCtx.beginPath()
    })
    if (!(gFocusedIdx >= meme.lines.length)) printFocus(meme.lines[gFocusedIdx])
  }
}

function renderlines() {
  // gCtx.font = `${line.size}px ${line.font}`
  // gCtx.fillStyle = line.color
  // gCtx.lineWidth = 1
  // gCtx.strokeStyle = "#000"
  // gCtx.fillText(line.txt, line.x - gCtx.measureText(line.txt).width / 2, line.y - line.movedPixels)
  // gCtx.strokeText(line.txt, line.x - gCtx.measureText(line.txt).width / 2, line.y - line.movedPixels)
  // gCtx.beginPath()
}
function downloadCanvas() {
  var canvas = getCanvas()
  var imgContent = canvas.toDataURL('image/jpeg') // image/jpeg the default format
  canvas.href = imgContent
}

function checkClickPos(pos) {
  resetInput()
  var meme = getMeme()

  for (var i = 0; i < meme.lines.length; i++) {
    if (
      meme.lines[i].x - 5 - gCtx.measureText(meme.lines[i].txt).width / 2 <
        pos.x &&
      pos.x < meme.lines[i].x + gCtx.measureText(meme.lines[i].txt).width / 2 &&
      meme.lines[i].y - meme.lines[i].size < pos.y &&
      pos.y < meme.lines[i].y + meme.lines[i].size + 5
    ) {
      gFocusedIdx = i
      setDrag(true)
      document.querySelector('canvas').style.cursor = 'grabbing'

      break
    } else {
      document.querySelector('canvas').style.cursor = 'pointer'
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
  gCtx.lineWidth = '6'
  gCtx.strokeStyle = 'red'
  if (gFocusedIdx >= meme.lines.length) return
  gCtx.rect(
    line.x - 5 - gCtx.measureText(line.txt).width / 2,
    line.y - line.size - line.movedPixels,
    gCtx.measureText(line.txt).width + 10,
    line.size + 5
  )
  gCtx.stroke()
  gCtx.lineWidth = 1
  gCtx.strokeStyle = '#000'
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

function getCanvas() {
  return gElCanvas
}
function getFocusedIdx() {
  return gFocusedIdx
}
function paintKeywords() {
  var keywords = getKeywords()
  var keys = Object.keys(keywords)
  var displayWords = []
  var elWords = document.querySelector('.spans')
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
  gDrag = bool
}

function getDrag() {
  return gDrag
}

function moveFocused(dx, dy) {
  var meme = getMeme()
  meme.lines[gFocusedIdx].x += dx
  meme.lines[gFocusedIdx].y += dy
  drawImgFromlocal()
}
