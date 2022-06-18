"use strict"
const gTouchEvs = ["touchstart", "touchmove", "touchend"]
var gLineCounter = 0
var gDownLoad = false
var gSearchKey
var gStartPos
function renderGallery() {
    var str = ""
    var elRender = document.querySelector(".renderable")
    var imgs = getImgs(gSearchKey)
    var elSearch = document.querySelector(".searches")
    elSearch.style.display = "flex"
    str = `
    
    <section class="photos">`
    imgs.forEach((img) => {
        str += `<img src="img/${img.id}.jpg" alt="meme no ${img.id}" class="meme" onclick="renderMemeEditor(${img.id})"/>`
    })

    str += `
    </section>
    `
    paintKeywords()
    elRender.innerHTML = str
}
function renderPhotos() {
    var elRender = document.querySelector(".photos")

    var imgs = getImgs()
    var str = ``
    imgs.forEach((img) => {
        str += `<img src="img/${img.id}.jpg" alt="meme no ${img.id}" class="meme" onclick="renderMemeEditor(${img.id})"/>`
    })
    elRender.innerHTML = str
}
function renderMemeEditor(imgId) {
    var elSearch = document.querySelector(".searches")
    elSearch.style.display = "none"
    // var elCanvas = document.querySelector(".search-canvas")
    // elCanvas.style.display = "none"
    setMeme(imgId)
    var str = ""
    var elRender = document.querySelector(".renderable")
    str = `            
    <section class="meme-editor flex">
    <canvas class="main-canvas" id="canvas" height="500" width="500" style="border: 1px solid black" >Your browser does not support Canvas.</canvas>
    <section class="edits flex">
        <input type="text" class="meme-text" name="meme-text" placeholder="text"
        onchange   = "setTxt(value,this.classList)"
        onkeypress = "this.onchange()"
        onpaste    = "this.onchange()"
        oninput    = "this.onchange()"/>
        <div class="move-between-lines border">
            <button class="switch" onclick="switchLines()">🔄</button>
            <button class="add" onclick="addLine()">➕</button>
            <button class="delete" onclick="deleteLine()">🚮</button>
        </div>
        <section class="text-edits flex space-between">
            <button class="font-size-up" onclick="sizeChange(1)">🗚</button>
            <button class="font-size-down" onclick="sizeChange(-1)">🗛</button>
            
            <select name="fonts" list="fonts" class="fonts" onchange="changeFont(this.value)">
                <option value="Impact">Impact</option>
                <option value="Arial">Arial</option>
                <option value="comics-sans">comics-sans</option>
            </select>
            <button class="under-line">_</button>
            <input class="color-choice"type="color" id="fontColor" name="fontColor" value="#ff0000" onchange   = "setColor(value)"/>
           
        </section>
        <section class="upload-download flex">
        <button class="btn" onclick="uploadImg()">
        Upload Image
      </button>
            <div class="share-container flex"></div>
            <a href="#" class="download flex" onclick="downloadImg(this)" download="my-img.jpg">Download</a>
        </section>
    </section>
</section>`
    elRender.innerHTML = str
    addListeners()
    drawImgFromlocal()
}
function generateRandomMeme() {
    var img = getImgs()
    var lines = getRanSentences()
    var randomInt = getRandomInt(1, lines.length)
    var randomMemeNum = getRandomInt(1, img.length)
    renderMemeEditor(randomMemeNum)
    var meme = getMeme()
    meme.lines[0].txt = lines[randomInt]
    console.log(meme.lines[0].txt)
    var lineCount = getRandomInt(1, 3)
    if (lineCount === 2) {
        addLine()
        randomInt = getRandomInt(1, lines.length)
        meme.lines[1].txt = lines[randomInt]
    }
}
function setTxt(value, elClass) {
    setMemeTxt(value, elClass.value)
}

function setColor(value) {
    setMemeColor(value)
}
function addLine() {
    gLineCounter++
    addTxt(gLineCounter)
}
function inlargeText(el) {
    console.log(el)
    var keywords = getKeywords()
    keywords[el.innerText]++
    renderGallery()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    // window.addEventListener("resize", () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
}

function addMouseListeners() {
    var elCanvas = document.querySelector(".main-canvas")
    elCanvas.addEventListener("mousemove", onMove)
    elCanvas.addEventListener("mousedown", onDown)
    elCanvas.addEventListener("mouseup", onUp)
}

function addTouchListeners() {
    var elCanvas = document.querySelector(".main-canvas")
    elCanvas.addEventListener("touchmove", onMove)
    elCanvas.addEventListener("touchstart", onDown)
    // for later use
    // window.addEventListener('click', function(e){
    //     if (document.getElementById('clickbox').contains(e.target)){
    //       // Clicked in box
    //     } else{
    //       // Clicked outside the box
    //     }
    //   })
    elCanvas.addEventListener("touchend", onUp)
}
function onDown(ev) {
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    checkClickPos(pos)
    // if (!isCircleClicked(pos)) return
    //Save the pos we start from
    gStartPos = pos

    // checkClick()
}
function onMove(ev) {
    const meme = getMeme()
    var drag = getDrag()
    console.log("checking darg", drag)
    if (drag) {
        const pos = getEvPos(ev)
        //Calc the delta , the diff we moved
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveFocused(dx, dy)
        //Save the last pos , we remember where we`ve been and move accordingly
        gStartPos = pos
        //The canvas is render again after every move
        drawImgFromlocal()
    }
}
function onUp() {
    setDrag(false)
    // document.body.style.cursor = "grab"
}

function getEvPos(ev) {
    //Gets the offset pos , the default pos
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (gTouchEvs.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function moveLine(idx) {
    updatePixelsMoved(idx)
}
function deleteLine() {
    removeLine()
}
function switchLines() {
    switchFocus()
}

function resetInput() {
    var elInput = document.querySelector(".meme-text")
    elInput.value = ""
}

function sizeChange(num) {
    changeFontSize(num)
}

function downloadImg(elLink) {
    gDownLoad = true

    drawImgFromlocal()
    var canvas = getCanvas()
    var imgContent = canvas.toDataURL("image/jpeg") // image/jpeg the default format
    elLink.href = imgContent
    setTimeout(() => {
        gDownLoad = false
    }, 5000)
}

function getDownloadStatus() {
    return gDownLoad
}
function changeFont(value) {
    changeFontFamily(value)
}

function setTextDirection(direction) {}

function setSearch(value) {
    // gSearchKey = value

    renderPhotos()
    setKeywords(value)
}
