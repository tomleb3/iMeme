'use strict';

function onInit() {
    renderGallery();
    document.documentElement.scrollTop = 0;
}

function renderGallery() {
    const elGallery = document.querySelector('main .gallery');
    let strHTML = '';
    gImgs.forEach((img) => {
        strHTML += `<img src=${img.url} onclick="onImgClick('${img.id}')">`;
    });
    elGallery.innerHTML = strHTML;
}

function onImgClick(imgId) {
    const elSection = document.querySelector('section');
    let meme = getMeme();
    elSection.style.display = 'block';
    meme.selectedImgId = imgId;
    document.documentElement.scrollTop = 0;
    drawImg(imgId);
}

function renderCanvas() {
    clearCanvas();
    const elInput = document.querySelector('input[name="meme-txt"]');
    let meme = getMeme();
    drawImg(meme.selectedImgId);
    drawTxt(elInput.value);
    drawAllTxt();
}

function onMoveTxt(direction) {
    moveTxt(direction);
    renderCanvas();
}

function onAddTxt() {
    const elInput = document.querySelector('input[name="meme-txt"]');
    if (!elInput.value) return;
    addTxt(elInput.value);
    elInput.value = '';
}

function onRemoveTxt() {
    removeTxt();
    renderCanvas();
}

function onChangeSize(size) {
    changeSize(size);
    renderCanvas();
}

function onChangeAlign(align) {
    changeAlign(align);
    renderCanvas();
}

function onChangeFont(font) {
    changeFont(font);
    renderCanvas();
}

function downloadImg(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'iMeme.jpg';
}

function onCanvasClick(ev) {
    var { offsetY } = ev;
    let meme = getMeme();
    var clickedTxt = meme.lines.find((line, idx) => {
        meme.selectedLineIdx = idx;
        return offsetY <= line.pos.y && offsetY >= line.pos.y - line.size;
    })
    if (!clickedTxt) meme.selectedLineIdx = -1;
    renderCanvas();
}

function getCanvas() { return gCanvas; }

function getCtx() { return gCtx; }

function getTxtProp() { return gTxtProp; }

function getMeme() { return gMeme; }