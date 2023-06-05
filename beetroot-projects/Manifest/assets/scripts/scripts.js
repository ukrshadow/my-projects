    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const show = document.getElementById('show-overlay');
    const navUl = document.getElementById('navUl');

    burger.addEventListener('click', () => {
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-open');
        navUl.classList.toggle('is-ul');
        show.classList.toggle('show-overlay');
    })