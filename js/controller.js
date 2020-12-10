'use strict';

function onInit() {
    renderGallery();
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
    drawImg(imgId);
}

function renderCanvas() {
    clearCanvas();
    const elInput = document.querySelector('input[name="meme-txt"]');
    const meme = getMeme();
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
    changeAlign();
    renderCanvas();
}

function onChangeFont(font) {
    let txtProp = getTxtProp();
    txtProp.font = font;
    renderCanvas();
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