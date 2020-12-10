'use strict';

// var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gCanvas = document.querySelector('canvas');
var gCtx = gCanvas.getContext('2d');;

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: -1,
    lines: []
}

var gTxtProp = {
    font: 'impact',
    size: 30,
    align: 'center',
    pos: { x: gCanvas.width / 2, y: gCanvas.height / 6 }
}

var gImgs = [
    { id: 1, url: './imgs/memes_square/1.jpg', keywords: ['happy'] },
    { id: 2, url: './imgs/memes_square/2.jpg', keywords: ['happy'] },
    { id: 3, url: './imgs/memes_square/3.jpg', keywords: ['happy'] },
    { id: 4, url: './imgs/memes_square/4.jpg', keywords: ['happy'] },
    { id: 5, url: './imgs/memes_square/5.jpg', keywords: ['happy'] },
    { id: 6, url: './imgs/memes_square/6.jpg', keywords: ['happy'] },
    { id: 7, url: './imgs/memes_square/7.jpg', keywords: ['happy'] },
    { id: 8, url: './imgs/memes_square/8.jpg', keywords: ['happy'] },
    { id: 9, url: './imgs/memes_square/9.jpg', keywords: ['happy'] },
    { id: 10, url: './imgs/memes_square/10.jpg', keywords: ['happy'] },
    { id: 11, url: './imgs/memes_square/11.jpg', keywords: ['happy'] },
    { id: 12, url: './imgs/memes_square/12.jpg', keywords: ['happy'] },
    { id: 13, url: './imgs/memes_square/13.jpg', keywords: ['happy'] },
    { id: 14, url: './imgs/memes_square/14.jpg', keywords: ['happy'] },
    { id: 15, url: './imgs/memes_square/15.jpg', keywords: ['happy'] },
    { id: 16, url: './imgs/memes_square/16.jpg', keywords: ['happy'] },
    { id: 17, url: './imgs/memes_square/17.jpg', keywords: ['happy'] },
    { id: 18, url: './imgs/memes_square/18.jpg', keywords: ['happy'] },
];


function drawImg(imgId) {
    const img = new Image();
    img.src = `./imgs/memes_square/${imgId}.jpg`;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function drawLine(x, y) {
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(gCanvas.width, y);
    gCtx.closePath();
    gCtx.lineWidth = 1;
    gCtx.stroke();
}

function drawTxt(txt, x = gTxtProp.pos.x, y = gTxtProp.pos.y) {
    txt = txt.toUpperCase();
    gCtx.lineWidth = 5;
    gCtx.font = `${gTxtProp.size}pt ${gTxtProp.font}`;
    gCtx.textAlign = gTxtProp.align;
    gCtx.fillStyle = 'white';
    gCtx.lineJoin = 'round';
    gCtx.strokeText(txt, x, y);
    gCtx.fillText(txt, x, y);
}

function drawAllTxt() {
    gMeme.lines.forEach((line, idx) => {
        drawTxt(line.txt, line.pos.x, line.pos.y);
        if (gMeme.selectedLineIdx === idx) {
            drawLine(0, line.pos.y - (line.size + 10));
            drawLine(0, line.pos.y + 10);
        }
        if (!idx) gTxtProp.pos.y = gCanvas.height / 1.1;
        else gTxtProp.pos.y = gCanvas.height / (idx + 1);
    })
}

function addTxt(txt) {
    drawTxt(txt);
    gMeme.lines.push({
        txt: txt,
        size: gTxtProp.size,
        align: txt.align,
        isHighlighted: false,
        pos: { x: gTxtProp.pos.x, y: gTxtProp.pos.y }
    });
}

function removeTxt() {
    if (gMeme.selectedLineIdx !== -1)
        gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function moveTxt(direction) {
    if (gMeme.selectedLineIdx !== -1)
        direction === 'up' ? gMeme.lines[gMeme.selectedLineIdx].pos.y-- : gMeme.lines[gMeme.selectedLineIdx].pos.y++;
}

function changeSize(size) {
    if (gMeme.selectedLineIdx !== -1)
        size === 'plus' ? gTxtProp.size++ : gTxtProp.size--;
}

function changeAlign(){
    txtProp.align = align;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}