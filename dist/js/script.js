'use strict';

const burger = document.querySelector('.burger'),
      header = document.querySelector('.header');
burger.addEventListener('click', () => {
    header.classList.toggle('header_active');
});