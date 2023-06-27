

(console.log('1.Смена изображений в секции portfolio +25\n 2.Перевод страницы на два языка +25\n 3.Переключение светлой и тёмной темы +25\n 4.Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5\n   Оценка: 75 баллов'));

// бургер-меню
(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header-nav');
    const menuCloseItem = document.querySelector('.header-nav-close');
    burgerItem.addEventListener('click', () => {
        menu.classList.add('header-nav-active');
    });
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header-nav-active');
    });
}());



//изменение изображений в папке портфолио по временам года

const portfolioBtn = document.querySelector('.button-portfolio');

const portfolioBtns = document.querySelector('.buttons-portfolio');

const portfolioImages = document.querySelectorAll('.portfolio-img');


function changeImage(event) {

    const season = event.target.dataset.season;

    if (event.target.classList.contains('button-portfolio')) {
        // здесь код функции, меняющей src изображений

        portfolioImages.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
    }

};

portfolioBtns.addEventListener('click', changeImage);



//функция кэширования



function preloadImages() {

    const seasons = ['winter', 'spring', 'summer', 'autumn'];

    for (let i = 1; i <= 6; i++) {
        const img = new Image();
        seasons.forEach((el) => img.src = `./assets/img/${el}/${i}.jpg`);
    }
};

preloadImages();


// изменение стиля кнопки при наведении 


function changeClassActive(event) {

    const portfolioBtns = document.querySelectorAll('.button-portfolio');

    portfolioBtns.forEach((el) => el.classList.remove('active'));

    event.target.classList.add('active');

};


portfolioBtns.addEventListener('click', changeClassActive);


//функция перевода 

import i18Obj from './translate.js';

const ru = document.querySelector('.ru');
const en = document.querySelector('.en');

function getTranslate(language) {
    lang = language;
    const textTranslate = document.querySelectorAll('[data-i18n]');
    textTranslate.forEach((el) => {

        if (el.placeholder) {
            el.placeholder = i18Obj[lang][el.dataset.i18n];
            el.textContent = '';
        }
        el.textContent = i18Obj[lang][el.dataset.i18n];
    })

}

en.addEventListener('click', () => getTranslate('en'));
ru.addEventListener('click', () => getTranslate('ru'));


//переключение темы

const sun = document.querySelector('.sun'); //кнопка, в которой лежит изображение солнца
const white = document.querySelectorAll('.white'); // ищу все элементы, для которых необходима светлая тема по классу в html

function changeTheme() {

    if (theme === 'dark-theme') {

        theme = 'light-theme';

    } else {

        theme = 'dark-theme';
    }

    white.forEach((el) => {

        el.classList.toggle('light-theme');
    })
}
sun.addEventListener('click', () => changeTheme());


// переключение во wrapper-section-title белого фона (линия градиент)



//переключение языка

const langSwitch = document.querySelector('.switch');

function changeClassActiveLang(event) {
    const lang = document.querySelectorAll('.lang');

    lang.forEach((el) => el.classList.remove('active'));

    event.target.classList.add('active');
};

langSwitch.addEventListener('click', changeClassActiveLang);


//local storage

let lang = 'en';
let theme = 'dark-theme';

function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        getTranslate(lang);
    }
    if (localStorage.getItem('theme') === 'light-theme') {
        const theme = localStorage.getItem('theme');
        changeTheme();
    }
}
window.addEventListener('load', getLocalStorage);