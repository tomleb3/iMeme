'use strict';

// var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gCanvas = document.querySelector('canvas');
var gCtx = gCanvas.getContext('2d');

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: -1,
    lines: []
}

var gTxtProp = {
    font: 'impact',
    size: 30,
    align: 'center',
    color: '#FFFFFF',
    pos: { x: gCanvas.width / 2, y: gCanvas.height / 6 }
}

var gImgs = [
    { id: 1, url: './imgs/memes_square/1.jpg', keywords: ['donald', 'trump', 'president'] },
    { id: 2, url: './imgs/memes_square/2.jpg', keywords: ['dogs', 'puppies', 'puppy'] },
    { id: 3, url: './imgs/memes_square/3.jpg', keywords: ['baby', 'babies', 'dogs', 'sleep'] },
    { id: 4, url: './imgs/memes_square/4.jpg', keywords: ['cat', 'computer', 'sleep'] },
    { id: 5, url: './imgs/memes_square/5.jpg', keywords: ['success', 'kid', 'boy'] },
    { id: 6, url: './imgs/memes_square/6.jpg', keywords: ['aliens', 'history', 'channel'] },
    { id: 7, url: './imgs/memes_square/7.jpg', keywords: ['surprised', 'kid', 'boy'] },
    { id: 8, url: './imgs/memes_square/8.jpg', keywords: ['wonka', 'chocolate', 'factory'] },
    { id: 9, url: './imgs/memes_square/9.jpg', keywords: ['kid', 'boy'] },
    { id: 10, url: './imgs/memes_square/10.jpg', keywords: ['barack', 'obama', 'success'] },
    { id: 11, url: './imgs/memes_square/11.jpg', keywords: ['wrestlers', 'kissing'] },
    { id: 12, url: './imgs/memes_square/12.jpg', keywords: ['chaim', 'haim', 'hecht'] },
    { id: 13, url: './imgs/memes_square/13.jpg', keywords: ['leonardo', 'dicaprio', 'great', 'gatsby'] },
    { id: 14, url: './imgs/memes_square/14.jpg', keywords: ['morpheus', 'matrix'] },
    { id: 15, url: './imgs/memes_square/15.jpg', keywords: ['lord', 'rings', 'simply'] },
    { id: 16, url: './imgs/memes_square/16.jpg', keywords: ['patrick', 'stewart'] },
    { id: 17, url: './imgs/memes_square/17.jpg', keywords: ['vladimir', 'putin'] },
    { id: 18, url: './imgs/memes_square/18.jpg', keywords: ['buzz', 'lightyear', 'everywhere'] },
];


function drawImg(url) {
    const img = new Image();
    img.src = url;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function drawLine(x, y) {
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(gCanvas.width, y);
    gCtx.closePath();
    gCtx.lineWidth = 3;
    gCtx.stroke();
}

function drawTxt(txt, size = gTxtProp.size, font = gTxtProp.font, align = gTxtProp.align, color = gTxtProp.color, x = gTxtProp.pos.x, y = gTxtProp.pos.y) {
    txt = txt.toUpperCase();
    gCtx.lineWidth = 5;
    gCtx.font = `${size}pt ${font}`;
    gCtx.textAlign = align;
    gCtx.fillStyle = color;
    gCtx.lineJoin = 'round';
    gCtx.strokeText(txt, x, y);
    gCtx.fillText(txt, x, y);
}

function drawAllTxt() {
    gMeme.lines.forEach((line, idx) => {
        drawTxt(line.txt, line.size, line.font, line.align, line.color, line.pos.x, line.pos.y);
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
        font: gTxtProp.font,
        align: gTxtProp.align,
        color: gTxtProp.color,
        pos: { x: gTxtProp.pos.x, y: gTxtProp.pos.y }
    });
}

function removeTxt() {
    if (gMeme.selectedLineIdx !== -1)
        gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    else gMeme.lines = [];
}

function switchLines() {
    if (gMeme.lines <= 0) return
    else
        gMeme.selectedLineIdx === gMeme.lines.length - 1 ? gMeme.selectedLineIdx = -1 : gMeme.selectedLineIdx++;
}

function moveTxt(direction) {
    if (gMeme.selectedLineIdx !== -1)
        direction === 'up' ? gMeme.lines[gMeme.selectedLineIdx].pos.y -= 5 : gMeme.lines[gMeme.selectedLineIdx].pos.y += 5;
    else
        direction === 'up' ? gMeme.lines.forEach(line => { line.pos.y -= 5 }) : gMeme.lines.forEach(line => { line.pos.y += 5 });
}

function changeSize(size) {
    if (size === 'plus') {
        gTxtProp.size++;
        if (gMeme.selectedLineIdx !== -1)
            gMeme.lines[gMeme.selectedLineIdx].size += 2;
        else
            gMeme.lines.forEach(line => { line.size += 2 });
    }
    else {
        gTxtProp.size--;
        if (gMeme.selectedLineIdx !== -1)
            gMeme.lines[gMeme.selectedLineIdx].size -= 2;
        else
            gMeme.lines.forEach(line => { line.size -= 2 });
    }
}

function changeAlign(align) {
    if (gMeme.selectedLineIdx !== -1)
        gMeme.lines[gMeme.selectedLineIdx].align = align;
    else
        gMeme.lines.forEach(line => { line.align = align });
    gTxtProp.align = align;
}

function changeFont(font) {
    if (gMeme.selectedLineIdx !== -1)
        gMeme.lines[gMeme.selectedLineIdx].font = font;
    else
        gMeme.lines.forEach(line => { line.font = font });
    gTxtProp.font = font;
}

function changeColor(color) {
    if (gMeme.selectedLineIdx !== -1)
        gMeme.lines[gMeme.selectedLineIdx].color = color;
    else
        gMeme.lines.forEach(line => { line.color = color });
    gTxtProp.color = color;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}