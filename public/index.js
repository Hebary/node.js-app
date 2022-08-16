//Nav Menu
const openBottom = document.querySelector('.nav__menu');
const menu = document.querySelector('.nav__ul');
const closeMenu = document.querySelector('.nav__close');
openBottom.addEventListener('click', () => {
    menu.classList.add('nav__link--show');
})

closeMenu.addEventListener('click', () => {
    menu.classList.remove('nav__link--show');
})



//show cart 
const cart = document.querySelector('.svg-image')
cart.addEventListener('click', () => {
    const cart = document.querySelector('.products-container')
    cart.classList.toggle('show')
})

