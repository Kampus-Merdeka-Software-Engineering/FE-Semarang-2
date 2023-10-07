/* HEADER */
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

async function postDataNewsletterToServer(email) {
    const url = 'https://be-semarang-2-production.up.railway.app/api/newsletters/';
    // const url = 'http://localhost:3000/api/newsletters/';

    try {
        const response = await axios.post(url, { email });

        if (!response.data) {
            openPopupError('Failed to create Newsletter', "btnNewsLetter")
        }

        return response.data;
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 429) {
            const errorMessage = 'Terlalu banyak permintaan, coba lagi nanti.';
            console.error(errorMessage);
            handleErrorContact(errorMessage);
        } 
        else if (error.response && error.response.data.error) {
            const errorMessage = error.response.data.error;
            console.error(errorMessage);
            // handleErrorNewsletter(errorMessage);
            handleSuccessNewsletter(); // agar tidak mengirimkan pesan error yang spesifik ke end user
        } 
        else {
            console.error(error.message);
            handleErrorNewsletter(error.message);
        }
    }
}

/* Function to handle while success fetch in form newsletter */
function handleSuccessNewsletter() {
    openPopup("btnNewsLetter")
    resetInputNewsletter()
}

/* Function to handle while error fetch in form newsletter */
function handleErrorNewsletter(desc) {
    openPopupError(desc, "btnNewsLetter")
    resetInputNewsletter()
}

/* `keydown` trigger for forms with id `formNewsLetter` */
formNewsLetter.addEventListener('keydown', () => {
    const emailInput = document.getElementById('emailNewsLetter');

    /* email validation */
    emailInput.addEventListener('input', handleEmailInputNewsletter)
})

/* Submit a form with the id `formNewsLetter` for the process of saving new NewsLetter data to the database */
formNewsLetter.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const emailNewsLetter = document.getElementById('emailNewsLetter').value;

    if (!emailPattern.test(emailNewsLetter)) {
        openPopupError('Email Invalid')
    } else {
        try {
            const response = await postDataNewsletterToServer(emailNewsLetter);
            // handleSuccessNewsletter(response);
            handleSuccessNewsletter();
        } catch (error) {
            console.error(error);
            handleErrorNewsletter(error.message);
        }
    }
})