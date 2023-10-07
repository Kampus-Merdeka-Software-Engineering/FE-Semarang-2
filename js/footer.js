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