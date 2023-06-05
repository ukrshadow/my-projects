"use strict"
/* TODO:  adaptive */
const CLASS_NAMES = {
    container: 'container',
    header: {
        header: 'header',
        logo: 'header__logo',
        headerNav: 'header__nav',
        navMenu: 'nav-menu',
        navList: 'nav-menu__list',
        navItem: 'nav-menu__item',
        headerWrapper: 'header__wrapper',
        headerSocial: 'header__social-icons',
        socialIcons: 'social-icons'
    },
    secIntro: {
        secIntro: 'intro',
        secIntroWrapper: 'intro__wrapper',
        introSlider: 'intro-slider',
        introArrow: 'intro__arrow'
    },
    secProjects: {
        secProjects: 'projects',
        secProjectsTitle: 'projects__title',
        secProjectsList: 'projects__list',
        secProjectItem: 'projects__item',
        secProjectContent: 'projects__item-content',
        secProjectsImg: 'item-content__img',
        secProjectsBG: 'item-content__bg',
        secProjectsInfo: 'item-content__info',
        secProjectsItemTitle: 'item-content__title',
        secProjectsItemSubtitle: 'item-content__subtitle',
        secProjectsText: 'item-content__text',
        secProjectsGeolocation: 'item-content__geolocation',
        itemContent: 'item-content',
        itemContentWrapper: 'item-content__wrapper',
    },
    secNews: {
        secNews: 'news',
        secNewsTitle: 'news__title',
        secNewsSlider: 'post-slide',
        authorAvatar: 'post-slide__avatar'

    },
    secGallery: {
        secGallery: 'gallery',
        title: 'gallery__title',
        list: 'gallery__list',
        item: 'gallery__item',
        img: 'gallery__img',
    },
    secMap: {
        map: 'map',
    },
    button: 'btn',
    secContact: {
        contact: 'contact',
        content: 'contact__content',
        wrapper: 'contact__wrapper',
        title: 'contact__title',
        info: 'contact__info',
        form: 'contact__form',
        adress: 'contact__adress',
        location: 'contact__location',
        tel: 'contact__tel',
        mail: 'contact__mail',
        clock: 'contact__clock',

    },
    secFooter: {
        secFooter: 'footer',
        logo: 'footer__logo',
        social: 'footer__social',
        copyright: 'footer__copyright',
        wrapper: 'footer__wrapper',
        c: 'footer__wrapper',
    }
};
const CLASS_TAG = {
    div: 'div',
    img: 'img',
    p: 'p',
    ul: 'ul',
    li: 'li',
    a: 'a',
    svg: 'svg',
    section: 'section',
    button: 'button',
    span: 'span',
}

//intro start
const body = document.querySelector('body');
const main = document.createElement('main')
body.appendChild(main);
const secInro = document.createElement(CLASS_TAG.section);
main.appendChild(secInro).classList.add(CLASS_NAMES.secIntro.secIntro);
secInro.setAttribute('data-type', 'menu-item');
const secIntroWrapper = document.createElement(CLASS_TAG.div);
secInro.appendChild(secIntroWrapper).classList.add(CLASS_NAMES.secIntro.secIntroWrapper);

const containerIntro = document.createElement(CLASS_TAG.div);
secIntroWrapper.appendChild(containerIntro).classList.add(CLASS_NAMES.container)

//header start
const header = document.createElement(CLASS_NAMES.header.header);
const headerWrapper = document.createElement(CLASS_TAG.div);
containerIntro.appendChild(header).classList.add(CLASS_NAMES.header.header)
header.appendChild(headerWrapper).classList.add(CLASS_NAMES.header.headerWrapper);
const headerLogo = document.createElement(CLASS_TAG.img);
headerWrapper.appendChild(headerLogo).classList.add(CLASS_NAMES.header.logo)
headerLogo.setAttribute('src', './assets/img/logo.svg')

const headerNav = document.createElement(CLASS_TAG.div);
const navMenu = document.createElement(CLASS_TAG.div);
headerWrapper.appendChild(headerNav, navMenu).classList.add(CLASS_NAMES.header.headerNav, CLASS_NAMES.header.navMenu);
const headerSocial = document.createElement(CLASS_TAG.div);

const socialIcons = document.createElement(CLASS_TAG.div);
headerWrapper.appendChild(headerSocial, socialIcons).classList.add(CLASS_NAMES.header.headerSocial, CLASS_NAMES.header.socialIcons);

const navList = document.createElement(CLASS_TAG.ul);
headerNav.appendChild(navList).classList.add(CLASS_NAMES.header.navList);

const menuItems = ['ABOUT US', 'PROJECTS', 'NEWS', 'CONTACT'];

menuItemCreating()

function menuItemCreating() {
    menuItems.forEach((el, index) => {
        const navItem = document.createElement(CLASS_TAG.li);
        navList.appendChild(navItem).classList.add(CLASS_NAMES.header.navItem);
        const navItemLink = document.createElement(CLASS_TAG.a);
        navItem.appendChild(navItemLink).classList.add(`${CLASS_NAMES.header.navMenu}__link`)
    })
    return creatingLinkAndInner()
}

function creatingLinkAndInner() {
    const getNavItemLink = document.querySelectorAll('.nav-menu__link');
    getNavItemLink.forEach((element, index) => {
        element.setAttribute('href', '#');
        element.innerHTML = `${menuItems[index]}`
    });

}

const socialIconTitle = ['fb', 'twitter', 'instagram']
createSocialIconsHeader()

function createSocialIconsHeader() {
    socialIconTitle.forEach((el, i) => {
        const socIconItems = document.createElement(CLASS_TAG.div);
        const socIconimg = document.createElement(CLASS_TAG.img);
        headerSocial.appendChild(socIconItems).classList.add(`${CLASS_NAMES.header.socialIcons}__items`);
        const socialIconItemLink = document.createElement(CLASS_TAG.a);
        socIconItems.appendChild(socialIconItemLink).setAttribute('href', '#')
        socialIconItemLink.classList.add(`${CLASS_NAMES.header.socialIcons}__link`)
        socIconimg.classList.add(`${CLASS_NAMES.header.socialIcons}__item`);
        socialIconItemLink.appendChild(socIconimg).setAttribute('src', `./assets/img/${socialIconTitle[i]}.svg`)
    })
}

//header end
//intro slider start
const introSliderArr = [{
        title: "SIMPLE & MODERN",
        subtitle: "WE MAKE THE WORLD BEAUTIFUL EVERYDAY"
    },
    {
        title: "SIMPLE & MODERN1",
        subtitle: "WE MAKE THE WORLD BEAUTIFUL EVERYDAY"
    },
    {
        title: "SIMPLE & MODERN2",
        subtitle: "WE MAKE THE WORLD BEAUTIFUL EVERYDAY"
    },
    {
        title: "SIMPLE & MODERN3",
        subtitle: "WE MAKE THE WORLD BEAUTIFUL EVERYDAY"
    },
    {
        title: "SIMPLE & MODERN4",
        subtitle: "WE MAKE THE WORLD BEAUTIFUL EVERYDAY"
    },
]
createIntroSlider()

function createIntroSlider() {

    const secIntroSlider = document.createElement(CLASS_TAG.div)
    const introSlider = document.createElement(CLASS_TAG.div);
    secIntroWrapper.appendChild(secIntroSlider, introSlider).classList.add('swiper', 'intro-slider');
    const introSliderWrapper = document.createElement(CLASS_TAG.div);
    secIntroSlider.appendChild(introSliderWrapper).classList.add('swiper-wrapper');

    introSliderArr.forEach((el) => {
        const introSliderItem = document.createElement(CLASS_TAG.div)
        const SliderItem = document.createElement(CLASS_TAG.div)

        const introSliderTitle = document.createElement(CLASS_TAG.div)
        const introSliderSubTitle = document.createElement(CLASS_TAG.div)
        introSliderWrapper.appendChild(introSliderItem, SliderItem).classList.add('swiper-slide', 'intro-slide');
        introSliderItem.appendChild(introSliderTitle).classList.add(`${CLASS_NAMES.secIntro.introSlider}__item-title`);
        introSliderItem.appendChild(introSliderSubTitle).classList.add(`${CLASS_NAMES.secIntro.introSlider}__item-subtitle`);
        introSliderTitle.innerHTML = `${el.title}`
        introSliderSubTitle.innerHTML = `${el.subtitle}`
    })
    const sliderIntroPagination = document.createElement(CLASS_TAG.div);
    const sliderPagination = document.createElement(CLASS_TAG.div);

    secIntroSlider.appendChild(sliderIntroPagination, sliderPagination).classList.add('swiper-pagination', 'intro__slider-pagination');
}

const introSliderSwapper = new Swiper('.intro-slider', {
    direction: "vertical",
    pagination: {
        el: ".intro__slider-pagination ",
        clickable: true,
        type: 'bullets',
    },
    autoplay: {
        delay: 4000,
    }
});
//intro slider end 

const introArrow = document.createElement(CLASS_TAG.div);
secIntroWrapper.appendChild(introArrow).classList.add(CLASS_NAMES.secIntro.introArrow);
const introArrowImg = document.createElement(CLASS_TAG.img);
introArrow.appendChild(introArrowImg).setAttribute('src', './assets/img/arrow-down.svg')

introArrow.addEventListener('click', (e) => {
    const projects = document.querySelector('.projects').getBoundingClientRect();

    window.scrollTo({
        top: projects.top
    })

})

//intro end

//section projects start

const secProjects = document.createElement(CLASS_TAG.section);
main.appendChild(secProjects).classList.add(CLASS_NAMES.secProjects.secProjects);
secProjects.setAttribute('data-type', 'menu-item')
const containerProjects = document.createElement(CLASS_TAG.div);
secProjects.appendChild(containerProjects).classList.add(CLASS_NAMES.container);
const secProjectsTitle = document.createElement('h2');
containerProjects.appendChild(secProjectsTitle).classList.add(CLASS_NAMES.secProjects.secProjectsTitle);
secProjectsTitle.innerHTML = 'WHAT WE DO';
const secProjectsList = document.createElement(CLASS_TAG.div);
containerProjects.appendChild(secProjectsList).classList.add(CLASS_NAMES.secProjects.secProjectsList);

const projectsCount = 2
const projects = [{
        subtitle: 'ONE WORLD',
        title: "TRADE CENTER",
        text: "Increasing prosperity in our lives can be accomplished by having the right frame of mind. The truth is, our thoughts are very powerful.",
        geolink: 'https://goo.gl/maps/iqeMzAVgSWth5H1N6',
        geoName: 'New York City, United States - 1776 feet',
        imgName: 'project1'
    },
    {
        subtitle: 'INTERNATIONAL',
        title: "COMMERCE CENTRE",
        text: "Successful businesses have many things in common, today we’ll look at the big ‘R’ of recognition and how a digital advertising network may help.",
        geolink: 'https://goo.gl/maps/b68jz1qs5XSq7teh7',
        geoName: 'Hong Kong - 1588 feet',
        imgName: 'project2'
    }
]
createProjectsList()

function createProjectsList() {
    projects.forEach(el => {
        const itemContent = document.createElement(CLASS_TAG.div);
        const secProjectItem = document.createElement(CLASS_TAG.div);
        secProjectsList.appendChild(secProjectItem, itemContent).classList.add(CLASS_NAMES.secProjects.secProjectItem, CLASS_NAMES.secProjects.itemContent)

        const secProjectsBG = document.createElement(CLASS_TAG.div);
        secProjectItem.appendChild(secProjectsBG).classList.add(CLASS_NAMES.secProjects.secProjectsBG);

        const secProjectContentWrapper = document.createElement(CLASS_TAG.div);
        secProjectItem.appendChild(secProjectContentWrapper).classList.add(CLASS_NAMES.secProjects.itemContentWrapper);

        const itemContentImg = document.createElement(CLASS_TAG.img);
        secProjectContentWrapper.appendChild(itemContentImg).classList.add(CLASS_NAMES.secProjects.secProjectsImg);
        itemContentImg.setAttribute('src', `./assets/img/${el.imgName}.jpg`)

        const itemContentInfo = document.createElement(CLASS_TAG.div);
        secProjectContentWrapper.appendChild(itemContentInfo).classList.add(CLASS_NAMES.secProjects.secProjectsInfo);

        const itemContentInfoSubtitle = document.createElement(CLASS_TAG.div);
        itemContentInfo.appendChild(itemContentInfoSubtitle).classList.add(CLASS_NAMES.secProjects.secProjectsItemSubtitle);
        itemContentInfoSubtitle.innerHTML = `${el.subtitle}`
        const itemContentInfoTitle = document.createElement(CLASS_TAG.div);
        itemContentInfo.appendChild(itemContentInfoTitle).classList.add(CLASS_NAMES.secProjects.secProjectsItemTitle);
        itemContentInfoTitle.innerHTML = `${el.title}`

        const itemContentInfoText = document.createElement(CLASS_TAG.p);
        itemContentInfo.appendChild(itemContentInfoText).classList.add(CLASS_NAMES.secProjects.secProjectsText);
        itemContentInfoText.innerHTML = `${el.text}`

        const itemContentButton = document.createElement(CLASS_TAG.button);
        itemContentInfo.appendChild(itemContentButton).classList.add(CLASS_NAMES.button, 'item-content__btn');
        itemContentButton.innerHTML = "MORE DETAILS";

        const itemContentGeolocationLink = document.createElement(CLASS_TAG.a)
        const itemContentGeolocation = document.createElement(CLASS_TAG.span)
        itemContentInfo.appendChild(itemContentGeolocationLink).classList.add(`${CLASS_NAMES.secProjects.itemContent}__geolink`);
        itemContentGeolocationLink.setAttribute('href', `${el.geolink}`)
        itemContentGeolocationLink.appendChild(itemContentGeolocation).classList.add(CLASS_NAMES.secProjects.secProjectsGeolocation);
        itemContentGeolocation.innerHTML = `${el.geoName}`;
    })
}
//section projects end

//section news start
const secNews = document.createElement(CLASS_TAG.section);
main.appendChild(secNews).classList.add(CLASS_NAMES.secNews.secNews);
secNews.setAttribute('data-type', 'menu-item')

const secNewsContainer = document.createElement(CLASS_TAG.div);
secNews.appendChild(secNewsContainer).classList.add(CLASS_NAMES.container)



const secNewsTitle = document.createElement('h2');
secNewsContainer.appendChild(secNewsTitle).classList.add(CLASS_NAMES.secNews.secNewsTitle);
secNewsTitle.innerHTML = 'LATEST NEWS';


const secNewsSlider = document.createElement(CLASS_TAG.div)
secNewsContainer.appendChild(secNewsSlider).classList.add('news__slider', 'swiper');
const newsSliderWrapper = document.createElement(CLASS_TAG.div);
secNewsSlider.appendChild(newsSliderWrapper).classList.add('swiper-wrapper', 'news__swiper-wrapper');


const newsData = [{
        img: 'news1',
        title: 'SEE THE UNMATCHED BEAUTY OF THE GREAT',
        text: 'Free directories: directories are perfect for customers that are searching for...',
        avatar: 'ava1',
        authorFName: 'ALJA BRUN',
        postDate: '20 Jan 2020'
    },
    {
        img: 'news2',
        title: 'EFFECTIVE ADVERTISING POINTERS.',
        text: 'Having a home based business is a wonderful asset to your life...',
        avatar: 'ava2',
        authorFName: 'DOMINIC FREEMAN',
        postDate: '13 Dec 2019'
    },
    {
        img: 'news3',
        title: 'HYPNOTIZE YOURSELF INTO THE GHOST.',
        text: 'There are many things that are important to catalog design...',
        avatar: 'ava3',
        authorFName: 'ALICE WARD',
        postDate: '30 Nov 2019'
    },
    {
        img: 'news1',
        title: 'SEE THE UNMATCHED BEAUTY OF THE GREAT',
        text: 'Free directories: directories are perfect for customers that are searching for...',
        avatar: 'ava1',
        authorFName: 'ALJA BRUN',
        postDate: '20 Jan 2020'
    },
    {
        img: 'news2',
        title: 'EFFECTIVE ADVERTISING POINTERS.',
        text: 'Having a home based business is a wonderful asset to your life...',
        avatar: 'ava2',
        authorFName: 'DOMINIC FREEMAN',
        postDate: '13 Dec 2019'
    },
    {
        img: 'news3',
        title: 'HYPNOTIZE YOURSELF INTO THE GHOST.',
        text: 'There are many things that are important to catalog design...',
        avatar: 'ava3',
        authorFName: 'ALICE WARD',
        postDate: '30 Nov 2019'
    },
    {
        img: 'news1',
        title: 'SEE THE UNMATCHED BEAUTY OF THE GREAT',
        text: 'Free directories: directories are perfect for customers that are searching for...',
        avatar: 'ava1',
        authorFName: 'ALJA BRUN',
        postDate: '20 Jan 2020'
    },
    {
        img: 'news2',
        title: 'EFFECTIVE ADVERTISING POINTERS.',
        text: 'Having a home based business is a wonderful asset to your life...',
        avatar: 'ava2',
        authorFName: 'DOMINIC FREEMAN',
        postDate: '13 Dec 2019'
    },
]
createNewsSlider()

function createNewsSlider() {

    newsData.forEach(el => {

        const newsSlider = document.createElement(CLASS_TAG.div)
        const newsSliderItem = document.createElement(CLASS_TAG.div)
        newsSliderWrapper.appendChild(newsSliderItem, newsSlider).classList.add('swiper-slide', 'post-slide');

        const newsSliderImg = document.createElement(CLASS_TAG.img);
        newsSliderItem.appendChild(newsSliderImg).classList.add(`${CLASS_NAMES.secNews.secNewsSlider}__img`);
        newsSliderImg.setAttribute('src', `./assets/img/${el.img}.jpg`);

        const newsSliderTitle = document.createElement(CLASS_TAG.div);
        newsSliderItem.appendChild(newsSliderTitle).classList.add(`${CLASS_NAMES.secNews.secNewsSlider}__title`);
        newsSliderTitle.innerHTML = `${el.title}`;

        const newsSliderText = document.createElement(CLASS_TAG.div)
        newsSliderItem.appendChild(newsSliderText).classList.add(`${CLASS_NAMES.secNews.secNewsSlider}__text`);
        newsSliderText.innerHTML = `${el.text}`;

        const newsAuthorInfo = document.createElement(CLASS_TAG.div);
        newsSliderItem.appendChild(newsAuthorInfo).classList.add(`${CLASS_NAMES.secNews.secNewsSlider}__author`);

        const authorInfoAvatar = document.createElement(CLASS_TAG.img);
        newsAuthorInfo.appendChild(authorInfoAvatar).classList.add(CLASS_NAMES.secNews.authorAvatar);
        authorInfoAvatar.setAttribute('src', `./assets/img/${el.avatar}.jpg`)
        const authorNameDate = document.createElement(CLASS_TAG.div);
        newsAuthorInfo.appendChild(authorNameDate).classList.add(`${CLASS_NAMES.secNews.secNewsSlider}__date-name`);

        const authorName = document.createElement(CLASS_TAG.div);
        authorNameDate.appendChild(authorName).classList.add(`${CLASS_NAMES.secNews.secNewsSlider}__name`);
        authorName.innerHTML = `${el.authorFName}`;
        const authorDate = document.createElement(CLASS_TAG.div);
        authorNameDate.appendChild(authorDate).classList.add(`${CLASS_NAMES.secNews.secNewsSlider}__date`);
        authorDate.innerHTML = `${el.postDate}`
    });

    const newsSliderPagination = document.createElement(CLASS_TAG.div);
    secNewsSlider.appendChild(newsSliderPagination).classList.add('swiper-pagination', 'news__swiper-pagination');
}

const newsSlider = new Swiper(".news__slider", {

    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        direction: "horizontal",
        el: ".news__swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 4000,
    }
});
//section news end

//section gallery start
const secGallery = document.createElement(CLASS_TAG.section);
main.appendChild(secGallery).classList.add(CLASS_NAMES.secGallery.secGallery);

const secGalleryContainer = document.createElement(CLASS_TAG.div);
secGallery.appendChild(secGalleryContainer).classList.add(CLASS_NAMES.container)


const secGalleryTitle = document.createElement('h2');
secGalleryContainer.appendChild(secGalleryTitle).classList.add(CLASS_NAMES.secGallery.title);
secGalleryTitle.innerHTML = 'GALLERY';
const galleryList = document.createElement(CLASS_TAG.div);
secGalleryContainer.appendChild(galleryList).classList.add(CLASS_NAMES.secGallery.list);

const galleryImg = ['gallery1', 'gallery2', 'gallery3', 'gallery4', 'gallery5'] // index 0 is big 
createGallery()

function createGallery() {
    galleryImg.forEach(el => {

        const galleryItem = document.createElement(CLASS_TAG.div)
        galleryList.appendChild(galleryItem).classList.add(CLASS_NAMES.secGallery.item);

        const galleryItemImg = document.createElement(CLASS_TAG.img);
        galleryItem.appendChild(galleryItemImg).classList.add(CLASS_NAMES.secGallery.img);
        galleryItemImg.setAttribute('src', `./assets/img/${el}.jpg`)

        const lupa = document.createElement(CLASS_TAG.span);
        galleryItem.appendChild(lupa).classList.add('gallery__item-zoom')
    })
}

zoomIn()

function zoomIn() {
    const img = document.querySelectorAll(".gallery__img");
    const zoomIn = document.querySelectorAll(".gallery__item-zoom")

    zoomIn.forEach((el, i) => {
        img[i].classList.remove('--zoom-in');

        el.addEventListener('click', (e) => {
            if (img[i]) {
                img[i].classList.add('--zoom-in')
            }
        })

        document.addEventListener('click', resetImg());

        function resetImg() {
            img[i].addEventListener('click', (e) => {
                img[i].classList.remove('--zoom-in')
                console.log('else');
            })
        }
    })
}
//section gallery end

//section map start
const secMap = document.createElement(CLASS_TAG.section);
main.appendChild(secMap).classList.add(CLASS_NAMES.secMap.map)
secMap.setAttribute('data-type', 'menu-item')
const map = document.createElement(CLASS_TAG.div);
secMap.appendChild(map).setAttribute('id', 'map')

function initMap() {
    let centerPosition = {
        lat: 40.6576,
        lng: -73.8855
    }
    if (document.documentElement.clientWidth < 768) centerPosition = {
        lat: 40.682119,
        lng: -73.899277
    }
    const map = new google.maps.Map(document.getElementById("map"), {
        mapId: '14d9cd3d0e8a65c',
        zoom: 13,
        center: centerPosition,
        disableDefaultUI: true,
    })
    let markerImage = {
        url: './assets/img/marker-map.png',
        anchor: new google.maps.Point(54, 54),
    }
    let marker = new google.maps.Marker({
        position: {
            lat: 40.682119,
            lng: -73.899277
        },
        map: map,
        icon: markerImage,
    })
}
//section map end

//section contact start

const secContact = document.createElement(CLASS_TAG.section);
main.appendChild(secContact).classList.add(CLASS_NAMES.secContact.contact);

const secContactWrapper = document.createElement(CLASS_TAG.div);
secContact.appendChild(secContactWrapper).classList.add(CLASS_NAMES.secContact.wrapper);
const secContactContent = document.createElement(CLASS_TAG.div);
secContactWrapper.appendChild(secContactContent).classList.add(CLASS_NAMES.secContact.content)
const secContactTitle = document.createElement('h2');
secContactContent.appendChild(secContactTitle).classList.add(CLASS_NAMES.secContact.title);
secContactTitle.innerHTML = 'GET IN TOUCH';

const secContactInfo = document.createElement(CLASS_TAG.div);
secContactContent.appendChild(secContactInfo).classList.add(CLASS_NAMES.secContact.info);

const secContactAdress = document.createElement(CLASS_TAG.div)
secContactInfo.appendChild(secContactAdress).classList.add(CLASS_NAMES.secContact.adress);
const secContactForm = document.createElement('form')
secContactInfo.appendChild(secContactForm).classList.add(CLASS_NAMES.secContact.form);

const secContactinfoAdres = document.createElement(CLASS_TAG.span);
secContactAdress.appendChild(secContactinfoAdres).classList.add(CLASS_NAMES.secContact.location)
const secContactinfoTel = document.createElement(CLASS_TAG.span);
secContactAdress.appendChild(secContactinfoTel).classList.add(CLASS_NAMES.secContact.tel)
const secContactinfoMail = document.createElement(CLASS_TAG.span);
secContactAdress.appendChild(secContactinfoMail).classList.add(CLASS_NAMES.secContact.mail)
const secContactinfoClock = document.createElement(CLASS_TAG.span);
secContactAdress.appendChild(secContactinfoClock).classList.add(CLASS_NAMES.secContact.clock)
secContactinfoAdres.innerHTML = '91 Nolan Extensions Suite 670'
secContactinfoTel.innerHTML = '+001 356-868-2454'
secContactinfoMail.innerHTML = 'montichello@service.com'
secContactinfoClock.innerHTML = 'From 07:05AM to 19:30PM'

const secContactInputFName = document.createElement('input')
secContactForm.appendChild(secContactInputFName).classList.add('contact__fname');
secContactInputFName.setAttribute('type', 'text');
secContactInputFName.setAttribute('placeholder', 'Full Name');
const secContactInputEmail = document.createElement('input')
secContactForm.appendChild(secContactInputEmail).classList.add('contact__email');
secContactInputEmail.setAttribute('type', 'email');
secContactInputEmail.setAttribute('placeholder', 'Email');

const secContactButton = document.createElement(CLASS_TAG.button);
secContactForm.appendChild(secContactButton).classList.add(CLASS_NAMES.button, 'contact__btn');
secContactButton.setAttribute('type', 'submit');
secContactButton.innerHTML = "SUBMIT";

//section contact end
//section footer srart
const secFooter = document.createElement(CLASS_TAG.section);
main.appendChild(secFooter).classList.add(CLASS_NAMES.secFooter.secFooter);
const secFooterContainer = document.createElement(CLASS_TAG.div);
secFooter.appendChild(secFooterContainer).classList.add(CLASS_NAMES.container);
const secFooterWrapper = document.createElement(CLASS_TAG.div);
secFooterContainer.appendChild(secFooterWrapper).classList.add(CLASS_NAMES.secFooter.wrapper);

const secFooterLogoCopyr = document.createElement(CLASS_TAG.div);
secFooterWrapper.appendChild(secFooterLogoCopyr).classList.add('footer__logo-copyright');


const secFooterLogo = document.createElement(CLASS_TAG.img);
secFooterLogoCopyr.appendChild(secFooterLogo).classList.add(CLASS_NAMES.secFooter.logo);
secFooterLogo.setAttribute('src', './assets/img/logo.svg')
const copyright = document.createElement(CLASS_TAG.div);
secFooterLogoCopyr.appendChild(copyright).classList.add(CLASS_NAMES.secFooter.copyright);
copyright.innerHTML = "Copyrights © 2020 Montichello"


const secFooterSocial = document.createElement(CLASS_TAG.div);

secFooterWrapper.appendChild(secFooterSocial).classList.add('footer_social', 'social-icons')

createSocialIconsFooter()

function createSocialIconsFooter() {
    socialIconTitle.forEach((el, i) => {
        const socIconItems = document.createElement(CLASS_TAG.div);
        const socIconimg = document.createElement(CLASS_TAG.img);
        secFooterSocial.appendChild(socIconItems).classList.add(`${CLASS_NAMES.header.socialIcons}__items`);
        const socialIconItemLink = document.createElement(CLASS_TAG.a);
        socIconItems.appendChild(socialIconItemLink).setAttribute('href', '#')
        socialIconItemLink.classList.add(`${CLASS_NAMES.header.socialIcons}__link`)
        socIconimg.classList.add(`${CLASS_NAMES.header.socialIcons}__item`);
        socialIconItemLink.appendChild(socIconimg).setAttribute('src', `./assets/img/${socialIconTitle[i]}.svg`)
    })
}

//section footer end
const menuscroll = document.querySelectorAll('.nav-menu__item');

menuscroll.forEach((el, index) => {
    el.addEventListener('click', (e) => {
        const getTag = document.querySelectorAll('[data-type=menu-item]');
        const scrollTo = getTag[index].getBoundingClientRect();
        window.scrollTo({
            top: scrollTo.top
        })
    })
})