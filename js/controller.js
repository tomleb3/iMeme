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

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
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