"use strict"
const gTouchEvs = ["touchstart", "touchmove", "touchend"]

function renderGallery() {
    var str = ""
    var elRender = document.querySelector(".renderable")
    var imgs = getImgs()
    str = `
    
    <section class="photos">`
    imgs.forEach((img) => {
        str += `<img src="img/${img.id}.jpg" alt="meme no ${img.id}" class="meme" onclick="renderMemeEditor(${img.id})"/>`
    })

    str += `
    </section>
    `
    elRender.innerHTML = str
}
function renderMemeEditor(imgId) {
    setMeme(imgId)
    var str = ""
    var elRender = document.querySelector(".renderable")
    str = `            
    <section class="meme-editor flex">
    <canvas id="canvas" height="500" width="500" style="border: 1px solid black" ></canvas>
    <section class="edits flex">
        <input type="text" class="meme-first-text" name="meme-text" placeholder="text"
        onchange   = "setTxt(value,this.classList)"
        onkeypress = "this.onchange()"
        onpaste    = "this.onchange()"
        oninput    = "this.onchange()"/>
        <div class="move-between-lines border">
            <button class="move-up" onclick="moveUp()">⬆</button>
            <button class="move-down" onclick="moveDown()">⬇</button>
            <button class="add" onclick="addLine()">➕</button>
            <button class="delete" onclick="deleteLine()">🚮</button>
        </div>
        <section class="text-edits border">
            <button class="font-size-up">🗚</button>
            <button class="font-size-down">🗛</button>
            <button class="ltl">ltl</button>
            <button class="center-text">☰</button>
            <button class="rtl">rtl</button>
            <select name="fonts" list="fonts">
                <option value="Arial">Arial</option>
                <option value="comics-sans">comics-sans</option>
            </select>
            <button class="under-line">underline</button>
            <input type="color" id="fontColor" name="fontColor" value="#fdffff" onchange   = "setColor(value)"/>
        </section>
    </section>
</section>`
    elRender.innerHTML = str
    addListeners()
    drawImgFromlocal()
}
function setTxt(value, elClass) {
    setMemeTxt(value, elClass.value)
}

function setColor(value) {
    setMemeColor(value)
}
function addLine() {
    // var elEdits = document.querySelector(".edits")
    // var str
    // str =
    //     `<input type="text" class="meme-second-text" name="meme-text" placeholder="text"
    // onchange   = "setTxt(value,this.classList)"
    // onkeypress = "this.onchange()"
    // onpaste    = "this.onchange()"
    // oninput    = "this.onchange()"/>` + elEdits.innerHTML
    // elEdits.innerHTML = str

    addTxt()
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
    // elCanvas.addEventListener("mousemove", onMove)
    var elCanvas = document.querySelector("canvas")
    elCanvas.addEventListener("mousedown", onDown)
    // elCanvas.addEventListener("mouseup", onUp)
}

function addTouchListeners() {
    // elCanvas.addEventListener("touchmove", onMove)
    var elCanvas = document.querySelector("canvas")
    elCanvas.addEventListener("touchstart", onDown)
    // elCanvas.addEventListener("touchend", onUp)
}
function onDown(ev) {
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    checkClickPos(pos)
    // if (!isCircleClicked(pos)) return
    // setCircleDrag(true)
    //Save the pos we start from
    // gStartPos = pos
    // document.body.style.cursor = "grabbing"
    // checkClick()
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

function moveUp() {
    updatePixelsMoved(+1)
}
function moveDown() {
    updatePixelsMoved(-1)
}
function deleteLine() {
    removeLine()
}
