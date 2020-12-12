'use strict';

function onInit() {
    renderGallery();
    document.documentElement.scrollTop = 0;
}

function renderGallery(searchVal) {
    const elGallery = document.querySelector('main .gallery');
    let imgs = getImgs();
    let strHTML = '';
    imgs.forEach(img => {
        let keywordsSTR = img.keywords.toString();
        if (!searchVal || keywordsSTR.includes(searchVal.toLowerCase()))
            strHTML += `<img src=${img.url} onclick="onImgClick('${img.url}')">`;
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

function onSwitchLines() {
    switchLines();
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

function onChangeColor(color) {
    changeColor(color);
    renderCanvas();
}

function downloadImg(elLink) {
    let meme = getMeme();
    meme.selectedLineIdx = -1;
    renderCanvas();

    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'iMeme.jpg';
}

function sideNavSearch() {
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

function bgDimToggle() {
    document.querySelector('header').classList.toggle('bg-dim');
    document.querySelector('main').classList.toggle('bg-dim');
    document.querySelector('footer').classList.toggle('bg-dim');
    document.body.classList.toggle('hide-overflow');
}

function toggleMenu(ev) {
    ev.preventDefault();
    var elMenu = document.querySelector('aside.sidenav');
    if (!elMenu.style.display || elMenu.style.display === 'none')
        elMenu.style.display = 'block';
    else
        elMenu.style.display = 'none';
    bgDimToggle();
}

function onSetLang(lang) {
    // if (lang === 'he') document.body.classList.add('rtl');
    // else document.body.classList.remove('rtl');
    setLang(lang);
    doTrans();
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = '';
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img);
        img.src = event.target.result;

        onImgClick(img.src);
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function getCanvas() { return gCanvas; }

function getCtx() { return gCtx; }

function getTxtProp() { return gTxtProp; }

function getMeme() { return gMeme; }

function getImgs() { return gImgs; }