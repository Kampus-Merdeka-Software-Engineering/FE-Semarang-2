const navLink = document.getElementById("toggleButton");

navLink.addEventListener("click", () => {
    let responsiv = document.getElementById("navbarRight");
    let header = document.querySelector('.header');
    let navLinkScroll = document.querySelectorAll('.nav-link');
    let navLinkHover = document.querySelectorAll('.nav-link');

    if (responsiv.className === "navbar-right") {
        responsiv.className += " responsive";
        header.style.backdropFilter = 'blur(8px)';
        header.style.backgroundColor = 'rgba(252, 245, 235, 0.4)';
        header.style.boxShadow = '0px 5px 5px rgba(0, 0, 0, 0.3)';
        document.querySelector('.fa-bars').style.color = 'black';
        document.querySelector('.logo').style.color = 'black';
        document.querySelector('.logo').style.fontWeight = '600';
        document.querySelector('.logo').style.textShadow = 'none';
        document.querySelector('.nav-active').style.color = 'black';
        document.querySelector('.nav-active').style.textShadow = 'none';
        document.querySelector('.nav-active').style.borderColor = 'black';
        navLinkScroll.forEach(link => {
            link.style.color = 'black';
            link.style.textShadow = 'none';
        })
        navLinkHover.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.borderColor = 'black';
            })
            link.addEventListener('mouseleave', () => {
                link.style.borderColor = 'transparent';
            })
        })
    } else {
        responsiv.className = "navbar-right";
        document.querySelector('.logo').style.color = 'black';
        document.querySelector('.fa-bars').style.color = 'black';
    }
});

let navScroll = window.pageYOffset;
let screenWidth = window.innerWidth;

window.onscroll = function () {
    let currentNavScroll = window.pageYOffset;
    screenWidth = window.innerWidth;
    let navLinkScroll = document.querySelectorAll('.nav-link');
    let navLinkHover = document.querySelectorAll('.nav-link');
    

    if (currentNavScroll === 0) {
        document.querySelector('.header').style.backgroundColor = 'transparent';
        document.querySelector('.header').style.backdropFilter = 'none';
        document.querySelector('.header').style.boxShadow = 'none';
        document.querySelector('.nav-active').style.color = 'white';
        document.querySelector('.nav-active').style.borderColor = 'white';
        document.querySelector('.logo').style.color = 'white';
        document.querySelector('.fa-bars').style.color = 'white';
        navLinkScroll.forEach(link => {
            link.style.color = 'white';
        })
        navLinkHover.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.borderColor = 'white';
            })
            link.addEventListener('mouseleave', () => {
                link.style.borderColor = 'transparent';
            })
        })
        
    } else if (navScroll > currentNavScroll) {
        document.querySelector('.header').style.top = '0';
        document.querySelector('.header').style.backgroundColor = 'rgba(252, 245, 235, 0.4)';
        document.querySelector('.header').style.backdropFilter = 'blur(8px)';
        document.querySelector('.header').style.boxShadow = '0px 5px 5px rgba(0, 0, 0, 0.3)';
        document.querySelector('.nav-active').style.color = 'black';
        document.querySelector('.nav-active').style.textShadow = 'none';
        document.querySelector('.nav-active').style.borderColor = 'black';
        document.querySelector('.logo').style.color = 'black';
        document.querySelector('.logo').style.textShadow = 'none';
        document.querySelector('.fa-bars').style.color = 'black';
        navLinkScroll.forEach(link => {
            link.style.color = 'black';
            link.style.textShadow = 'none';
        })
        navLinkHover.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.borderColor = 'black';
            })
            link.addEventListener('mouseleave', () => {
                link.style.borderColor = 'transparent';
            })
        })
    } else {
        document.querySelector('.header').style.top = '-260px';
        document.querySelector('.header').style.backgroundColor = 'transparent';
    }
    navScroll = currentNavScroll;
}