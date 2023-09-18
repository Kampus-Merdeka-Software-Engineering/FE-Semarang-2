let navScroll = window.pageYOffset;
let screenWidth = window.innerWidth;

window.onscroll = function() {
    let currentNavScroll = window.pageYOffset;
    screenWidth = window.innerWidth;
    if (navScroll > currentNavScroll) {
        document.querySelector('.header').style.top = '0';
    } else {
        document.querySelector('.header').style.top = '-260px';
    }
    navScroll = currentNavScroll;
}

function myFunction() {
    var x = document.getElementById("navbarRight");
    if (x.className === "navbar-right") {
        x.className += " responsive";
    } else {
        x.className = "navbar-right";
    }
}

const button1 = document.querySelector('.button-b-s-7-1');
const button2 = document.querySelector('.button-b-s-7-2');

button1.addEventListener('mouseover', () => {
    button1.value = 'Start Selling';
    button1.style.width = '200px';
    button1.style.boxShadow = '-2px 2px 5px rgba(0, 0, 0, 0.8)';
    button1.style.background = 'linear-gradient(90deg, #f9e9de 0, #e7c5ae 100%)';
});

button1.addEventListener('mouseout', () => {
    button1.value = 'Sell';
    button1.style.width = '70px';
    button1.style.boxShadow = 'none';
    button1.style.background = '#f9e9de';
});

button2.addEventListener('mouseover', () => {
    button2.value = 'Start Buying';
    button2.style.width = '200px';
    button2.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.8)';
    button2.style.background = 'linear-gradient(270deg, #f9e9de 0, #e7c5ae 100%)';
});

button2.addEventListener('mouseout', () => {
    button2.value = 'Buy';
    button2.style.width = '70px';
    button2.style.boxShadow = 'none';
    button2.style.background = '#f9e9de';
});

  
const pop = document.querySelectorAll('.dampak-b-s-4-1, .dampak-b-s-4-2, .dampak-b-s-4-3, .dampak-b-s-4-4');

pop.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.05)';
        element.style.transitionDuration = '0.3s';
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
        element.style.transitionDuration = '0.3s';
    });
});


const image1 = document.querySelector('.gambar-beranda-s-1-1');
const image2 = document.querySelector('.gambar-beranda-s-1-2');

let showImage1 = true;

function toggleImages() {
  if (showImage1) {
    image1.style.opacity = '1';
    image2.style.opacity = '0';
  } else {
    image1.style.opacity = '0';
    image2.style.opacity = '1';
  }

  showImage1 = !showImage1;
}

setInterval(toggleImages, 8000);

