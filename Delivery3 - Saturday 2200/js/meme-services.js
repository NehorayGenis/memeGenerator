var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2, politics: 4, crazy: 3, weird: 1, movie: 6, cute: 3, shows: 7, gestures: 8, point: 7 }
var gImgs = []
setImgs()
function setImgs() {
    gImgs.push({ id: 1, url: `img/1.jpg`, keywords: ["funny", "politics"] })
    gImgs.push({ id: 2, url: `img/2.jpg`, keywords: ["cute", "dog"] })
    gImgs.push({ id: 3, url: `img/3.jpg`, keywords: ["baby", "cute"] })
    gImgs.push({ id: 4, url: `img/4.jpg`, keywords: ["funny", "cat"] })
    gImgs.push({ id: 5, url: `img/5.jpg`, keywords: ["awesome", "baby"] })
    gImgs.push({ id: 6, url: `img/6.jpg`, keywords: ["history", "crazy"] })
    gImgs.push({ id: 7, url: `img/7.jpg`, keywords: ["baby", "funny"] })
    gImgs.push({ id: 8, url: `img/8.jpg`, keywords: ["curios", "crazy"] })
    gImgs.push({ id: 9, url: `img/9.jpg`, keywords: ["funny", "baby"] })
    gImgs.push({ id: 10, url: `img/10.jpg`, keywords: ["funny", "politics"] })
    gImgs.push({ id: 11, url: `img/11.jpg`, keywords: ["funny", "weird"] })
    gImgs.push({ id: 12, url: `img/12.jpg`, keywords: ["funny", "point"] })
    gImgs.push({ id: 13, url: `img/13.jpg`, keywords: ["gestures", "movie"] })
    gImgs.push({ id: 14, url: `img/14.jpg`, keywords: ["weird", "movie"] })
    gImgs.push({ id: 15, url: `img/15.jpg`, keywords: ["gestures", "shows"] })
    gImgs.push({ id: 16, url: `img/16.jpg`, keywords: ["movie", "gestures"] })
    gImgs.push({ id: 17, url: `img/17.jpg`, keywords: ["politics", "funny"] })
    gImgs.push({ id: 18, url: `img/18.jpg`, keywords: ["movie", "cute"] })
}
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: "I sometimes eat Falafel",
            // focusedIdx:-1,
            size: 20,
            align: "left",
            color: "red",
            font: "Impact",
            x: 250,
            y: 60,
            movedPixels: 0,
        },
    ],
}
function setMeme(id) {
    gMeme.selectedImgId = id
}
function setMemeTxt(value, el) {
    var idx = getFocusedIdx()
    gMeme.lines[idx].txt = value
    drawImgFromlocal()
}
function setMemeColor(value) {
    var focused = getFocusedIdx()
    gMeme.lines[focused].color = value
    drawImgFromlocal()
}
function addTxt(idx = gMeme.lines[0].txt.length === 0 ? 0 : 1) {
    if (gMeme.lines.length >= 2) {
        gMeme.lines.push({
            txt: "and sometimes i dont",
            size: 20,
            align: "left",
            color: "red",
            font: "Impact",
            x: 250,
            y: gElCanvas.height / 2,
            movedPixels: 0,
        })
    }
    if (gMeme.lines.length === 1) {
        gMeme.lines.push({
            txt: "and sometimes i dont",
            size: 20,
            align: "left",
            color: "red",
            font: "Impact",
            x: 250,
            y: gElCanvas.height - 50,
            movedPixels: 0,
        })
    }
    // var focusedIdx = getFocusedIdx()
    // focusedIdx++
    drawImgFromlocal()
}
function setKeywords(value) {
    gKeywordSearchCountMap[value]++
    paintKeywords()
}
function getKeywords() {
    return gKeywordSearchCountMap
}

function getMeme() {
    return gMeme
}
function getImgs(value) {
    var sortKey = document.querySelector(".search-word")
    var elCanvas = document.querySelector(".main-canvas")
    if (elCanvas) {
        return gImgs
    }
    var sortedImgs = gImgs.filter((img) => {
        return img.keywords.includes(sortKey.value)
    })
    if (sortedImgs.length === 0) return gImgs
    paintKeywords()
    return sortedImgs
}

function removeLine() {
    var idx = getFocusedIdx()
    gMeme.lines.splice(idx, 1)
    // removeArea(idx)
    drawImgFromlocal()
}

function changeFontSize(num) {
    var focusIdx = getFocusedIdx()
    gMeme.lines[focusIdx].size += num
    drawImgFromlocal()
}
function changeFontFamily(value) {
    var focusIdx = getFocusedIdx()
    gMeme.lines[focusIdx].font += value
    drawImgFromlocal()
}
