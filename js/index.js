
const buttonSell = document.querySelector('.button-b-s-7-1');
const buttonBuy = document.querySelector('.button-b-s-7-2');

buttonSell.addEventListener('mouseover', () => {
    buttonSell.value = 'Start Selling';
    buttonSell.style.width = '200px';
    buttonSell.style.boxShadow = '-2px 2px 5px rgba(0, 0, 0, 0.8)';
});

buttonSell.addEventListener('mouseout', () => {
    buttonSell.value = 'Sell';
    buttonSell.style.width = '70px';
    buttonSell.style.boxShadow = 'none';
});

buttonBuy.addEventListener('mouseover', () => {
    buttonBuy.value = 'Start Buying';
    buttonBuy.style.width = '200px';
    buttonBuy.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.8)';
});

buttonBuy.addEventListener('mouseout', () => {
    buttonBuy.value = 'Buy';
    buttonBuy.style.width = '70px';
    buttonBuy.style.boxShadow = 'none';
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




// FETCH REVIEW

async function fetchReviewAndDisplay() {
    try {
        const response = await fetch('https://back-end-semarang-group-2-production.up.railway.app/api/reviews/analyze-reviews');
        const data = await response.json();

        const firstThreeReviews = data.slice(0, 3);

        const conElement = document.querySelector('.review1');
        const connElement = document.querySelector('.review2');
        const connnElement = document.querySelector('.review3');

        firstThreeReviews.forEach((review, index) => {
            if (index === 0) {
                conElement.innerHTML = `
                <p class="nama-review1">${review.name}</p>
                <p class="desc-review1">${review.message}</p>`;
            } else if (index === 1) {
                connElement.innerHTML = `
                <p class="nama-review2">${review.name}</p>
                <p class="desc-review2">${review.message}</p>`;
            } else if (index === 2) {
                connnElement.innerHTML = `
                <p class="nama-review3">${review.name}</p>
                <p class="desc-review3">${review.message}</p>
                <img class="petik-review" src="img/left 1.png" alt="">`;
            }
        });
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}

fetchReviewAndDisplay();

// FETCH MEDIA

async function fetchNewestMedia() {
    try {
        const response = await fetch('https://back-end-semarang-group-2-production.up.railway.app/api/media/latest');
        const data = await response.json();

        const firstThreeMedia = data.slice(0, 3);

        const media1Elements = document.querySelectorAll('.news-b-s-6-1');

        firstThreeMedia.forEach((media, index) => {
            if (index < media1Elements.length) {
                const media1Element = media1Elements[index];
                media1Element.innerHTML = `
                <img class="img-news-b-s-6" src="data:image/jpeg;base64,${media.mediaImage}" alt="">
                <p class="judul-news-b-s-6">${media.mediaTitle}</p>
                <a class="button-b-s-6-1" href="">Info Selengkapnya  ></a>
                `;
            }
        });
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}

fetchNewestMedia();