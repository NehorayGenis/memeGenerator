var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gImgs = []
setImgs()
function setImgs() {
    for (var i = 1; i < 18; i++) {
        gImgs.push({ id: i, url: `img/${i}.jpg`, keywords: ["funny", "cat"] })
    }
}
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: {
        txt: ["I sometimes eat Falafel"],
        // focusedIdx:-1,
        size: 20,
        align: "left",
        color: "red",
        font: "Impact",
    },
}
function setMeme(id) {
    gMeme.selectedImgId = id
}
function setMemeTxt(value, el) {
    var idx = getFocusedIdx()
    gMeme.lines.txt[idx] = value
    drawImgFromlocal()
}
function setMemeColor(value) {
    gMeme.lines.color = value
    drawImgFromlocal()
}
function addTxt(idx = gMeme.lines.txt.length === 0 ? 0 : 1) {
    // console.log(gMeme.lines.txt.length === 0 ? 0 : 1)
    // var idx = gMeme.lines.txt.length === 0 ? 0 : 1
    gMeme.lines.txt.push("and sometimes i dont")
    var areas = getAreas()
    var area = {
        startingX: 5,
        endX: gCanvas.width - 10,
        startingY: gCanvas.height - 110,
        endY: gCanvas.height - 10,
        idx: 1,
        focused: false,
        movedPixels: 5,
    }
    console.log()
    if (idx > 1) {
        area = {
            startingX: 5,
            endX: gCanvas.width - 10,
            startingY: gCanvas.height / 2 - 55,
            endY: gCanvas.height / 2 + 55,
            idx,
            focused: false,
            movedPixels: 5,
        }
        console.log(area)
        areas.push(area)
        addMidTxt(idx)
    } else {
        areas.push(area)
        addTextArea(idx)
    }
}

function getMeme() {
    return gMeme
}
function getImgs() {
    return gImgs
}

function removeLine() {
    var idx = getFocusedIdx()
    gMeme.lines.txt.splice(idx, 1)
    removeArea(idx)
    drawImgFromlocal()
}

function changeFontSize(num) {
    gMeme.lines.size += num
    drawImgFromlocal()
}
