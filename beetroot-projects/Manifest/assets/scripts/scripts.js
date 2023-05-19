function burgerMenu() {
    const burger = document.getElementById('burger');
    burger.classList.toggle('is-active');
    const nav = document.getElementById('nav');
    nav.classList.toggle('is-open');
    const show = document.getElementById('show-overlay');
    show.classList.toggle('show-overlay');
}