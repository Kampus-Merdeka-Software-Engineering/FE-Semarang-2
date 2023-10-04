/* HEADER */
let navScroll = window.pageYOffset;
let screenWidth = window.innerWidth;

window.onscroll = function () {
    let currentNavScroll = window.pageYOffset;
    screenWidth = window.innerWidth;
    let navLinkScroll = document.querySelectorAll('.nav-link');

    if (currentNavScroll === 0) {
        document.querySelector('.header').style.backgroundColor = 'transparent';
        document.querySelector('.header').style.backdropFilter = 'blur(0)';
        document.querySelector('.header').style.boxShadow = 'none';
        document.querySelector('.nav-active').style.color = 'white';
        document.querySelector('.logo').style.color = 'white';
        navLinkScroll.forEach(link => {
            link.style.color = 'white';
        })
    } else if (navScroll > currentNavScroll) {
        document.querySelector('.header').style.top = '0';
        document.querySelector('.header').style.backgroundColor = 'rgba(252, 245, 235, 0.4)';
        document.querySelector('.header').style.backdropFilter = 'blur(8px)';
        document.querySelector('.header').style.boxShadow = '0px 5px 5px rgba(0, 0, 0, 0.3)';
        document.querySelector('.nav-active').style.color = 'black';
        document.querySelector('.nav-active').style.textShadow = 'none';
        document.querySelector('.logo').style.color = 'black';
        document.querySelector('.logo').style.textShadow = 'none';
        navLinkScroll.forEach(link => {
            link.style.color = 'black';
            link.style.textShadow = 'none';
        })
    } else {
        document.querySelector('.header').style.top = '-260px';
        document.querySelector('.header').style.backgroundColor = 'transparent';
    }
    navScroll = currentNavScroll;
}


const navLink = document.getElementById("toggleButton");

navLink.addEventListener("click", () => {
    let responsiv = document.getElementById("navbarRight");
    let header = document.querySelector('.header');

    header.style.backgroundColor = 'rgba(194, 167, 128, 0.5)';

    if (responsiv.className === "navbar-right") {
        responsiv.className += " responsive";
    } else {
        responsiv.className = "navbar-right";
        header.style.backgroundColor = 'transparent';
    }
});

/* FOOTER */
/* Define colors */
var colors = {
    validColorHex: "#00aaff",
    invalidColorHex: "#ff0000",
    defaultColorHex: "#333",
};

/* Define variable */
var formNewsLetter = document.getElementById('formNewsLetter');

/* Define email validation emailPattern */
var emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function resetInputNewsletter() {
    const emailInput = document.getElementById('emailNewsLetter');
    emailInput.value = '';
    formNewsLetter.style.borderColor = colors.defaultColorHex;
}

/* Function to validate email input in form newsletter */
function handleEmailInputNewsletter(event) {
    const value = event.target.value;

    /* email validation */
    if (value.length > 0) {
        /* Conditions for email input */
        if (value.match(emailPattern)) {
            formNewsLetter.classList.add("valid")
            formNewsLetter.classList.remove("invalid")
            formNewsLetter.style.borderColor = colors.validColorHex
            document.getElementById("btnNewsLetter").removeAttribute("disabled");
        } else {
            formNewsLetter.classList.remove("valid")
            formNewsLetter.classList.add("invalid")
            formNewsLetter.style.borderColor = colors.invalidColorHex
            document.getElementById("btnNewsLetter").setAttribute("disabled", "true");
        }
    } else {
        formNewsLetter.classList.remove("valid")
        formNewsLetter.classList.remove("invalid")
        formNewsLetter.style.borderColor = colors.defaultColorHex
        document.getElementById("btnNewsLetter").removeAttribute("disabled");
    }
}

async function postDataNewsletterToServer(email, token) {
    const url = 'https://back-end-semarang-group-2-production.up.railway.app/api/newsletters/';

    try {
        const response = await axios.post(url, { email, token });

        if (!response.data) {
            openPopupError('Failed to create Newsletter')
        }

        return response.data;
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 429) {
            const errorMessage = 'Terlalu banyak permintaan, coba lagi nanti.';
            console.error(errorMessage);
            handleErrorContact(errorMessage);
        } else if (error.response && error.response.data.error) {
            const errorMessage = error.response.data.error;
            console.error(errorMessage);
            handleErrorNewsletter(errorMessage);
        } else {
            console.error(error.message);
            handleErrorNewsletter(error.message);
        }
    }
}

/* Function to handle while success fetch in form newsletter */
function handleSuccessNewsletter() {
    openPopup()
    resetInputNewsletter()
}

/* Function to handle while error fetch in form newsletter */
function handleErrorNewsletter(desc) {
    openPopupError(desc)
    resetInputNewsletter()
}

/* `keydown` trigger for forms with id `formNewsLetter` */
formNewsLetter.addEventListener('keydown', () => {
    const emailInput = document.getElementById('emailNewsLetter');

    /* email validation */
    emailInput.addEventListener('input', handleEmailInputNewsletter)
})

async function onSubmit(token) {
    const emailNewsLetter = document.getElementById('emailNewsLetter').value;

    try {
        const response = await postDataNewsletterToServer(emailNewsLetter, token);
        handleSuccessNewsletter(response);
    } catch (error) {
        handleErrorNewsletter(error.message);
    }
}

async function onloadCallback() {
    grecaptcha.render('btnNewsLetter', {
        'sitekey' : '6LdZEzkoAAAAAD2jqYCvBJCOakjIo4qsStQlDAWd',
        'callback' : onSubmit
    });
};


document.getElementById('formNewsLetter').addEventListener('submit', async (event) => {
    event.preventDefault();

    // grecaptcha.execute(); // Trigger reCAPTCHA execution

    grecaptcha.ready(async () => {
        try {
            const token = await grecaptcha.execute();
            onSubmit(token);
        } catch (error) {
            console.error(error);
            handleErrorNewsletter(error.message);
        }
    });
});

// Popup
let popup = document.getElementById("popup");
const btnClose = document.getElementById("btnClose");

function openPopup() {
    popup.classList.add("open-popup");
}

function openPopupError(desc) {
    const imgPopup = document.getElementById('img-popup')
    const titlePopup = document.getElementById('title-popup')
    const descPopup = document.getElementById('desc-popup')
    const btnClose = document.getElementById('btnClose')
    imgPopup.src = 'img/tick-error.png'
    titlePopup.innerHTML = 'Failed'
    titlePopup.style.color = colors.invalidColorHex
    descPopup.innerHTML = desc
    btnClose.style.backgroundColor = colors.invalidColorHex
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup");
}

btnClose.addEventListener('click', () => {
    closePopup()
    location.reload(true); // Halaman akan direfresh dan memaksa pengambilan ulang sumber daya dari server
})