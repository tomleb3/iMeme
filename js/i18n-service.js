'use strict';

var gTrans = {
    gallery: {
        en: 'Gallery',
        he: 'גלריה',
    },
    about: {
        en: 'About',
        he: 'אודות',
    },
    share: {
        en: 'Share',
        he: 'שתף',
    },
    download: {
        en: 'Download',
        he: 'הורד',
    },
    search: {
        en: 'Search..',
        he: '..חפש',
    },
    font: {
        en: 'FONT',
        he: 'גופן',
    },
    'enter-line': {
        en: 'Enter line..',
        he: 'הכנס שורה..',
    },
    'section-p':
    {
        en: 'Select/click on an added line to change it individually',
        he: 'ניתן לשנות שורה בנפרד בלחיצה עליה/בחירתה',
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        el.nodeName === 'INPUT' ? el.placeholder = txt : el.innerText = txt
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };
    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}