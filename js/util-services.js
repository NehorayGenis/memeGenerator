"use strict"
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}
function getFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}
