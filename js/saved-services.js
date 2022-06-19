'use strict'
var savedMemes

function loadSavedMemes() {
  savedMemes = getFromStorage('savedMemes')
  console.log(savedMemes)
  var str = ''
  var elRender = document.querySelector('.renderable')
  if (savedMemes === null) {
    str += `<h1>No saved memes</h1>`
    elRender.innerHTML = str
    return
  }
  str = `
    
    <section class="photos">`
  var i = 0
  savedMemes.forEach((img) => {
    str += `<img src="img/${img.selectedImgId}.jpg" alt="meme no 
        ${img.selectedImgId}" class="meme" 
        onclick="renderSavedMemeEditor(${i})"/>`
    i++
  })

  str += `
    </section>
    `
  elRender.innerHTML = str
}

function renderSavedMemeEditor(i) {
  setEditorHtml()
  savedMemes = getFromStorage('savedMemes')
  console.log(savedMemes[i])
  drawImgFromSaved(savedMemes[i])
}
