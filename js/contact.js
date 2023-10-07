/* Define colors */
var colors = {
    validColorHex: "#00aaff",
    invalidColorHex: "#ff0000",
    defaultColorHex: "#333",
    validColorRGB: "rgb(255, 0, 0)",
    invalidColorRGB: "rgb(0, 170, 255)",
    defaultColorRGB: "rgb(51, 51, 51)",
};

/* Define variable */
const form = document.getElementById('formContact');
const noHPElement = document.getElementById("noHp");

/* Function to set border color of email input */
function setBorderColorEmail() {
    const emailInput = document.getElementById("email");
    const borderColor = window.getComputedStyle(emailInput).borderColor;

    document.getElementById("btnSubmit").disabled = borderColor === colors.validColorRGB ? true : false;
}

/* Function to reset form inputs and text */
function resetInputContact() {
    const form = document.getElementById('formContact');
    const inputs = form.querySelectorAll('input[type=text], input[type=number], textarea');
    let text = document.getElementById('text');
    inputs.forEach(input => {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = ''
            inputs[i].style.borderColor = colors.defaultColorHex
        }
        text.innerHTML = ""
    });
}

/* Function to validate email input in form contact */
function handleEmailInputContact(event) {
    const value = event.target.value;
    const text = document.getElementById('text');

    /* email validation */
    if (value.length > 0) {
        if (value.match(emailPattern)) {
            event.target.classList.add("valid");
            event.target.classList.remove("invalid");
            text.innerHTML = "";
            event.target.style.borderColor = colors.validColorHex;
        } else {
            event.target.classList.remove("valid");
            event.target.classList.add("invalid");
            text.innerHTML = "Please Enter Valid Email";
            text.style.color = colors.invalidColorHex;
            event.target.style.borderColor = colors.invalidColorHex;
        }
    } else {
        event.target.classList.remove("valid");
        event.target.classList.remove("invalid");
        text.innerHTML = "";
        text.style.color = colors.validColorHex;
        event.target.style.borderColor = colors.defaultColorHex;
    }
}

/* Function to set border color input in form contact */
function setBorderColorInputChange(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if (i === 2) {
            continue; /* Skip index 2, yaitu email */
        }

        inputs[i].style.borderColor = inputs[i].value.length > 0 ? colors.validColorHex : colors.defaultColorHex;
    }
}

/* Function to update submit button in form contact */
function updateSubmitButton(input) {
    const computedStyle = getComputedStyle(input);
    const borderColor = computedStyle.getPropertyValue('border-color');
    const btnSubmit = document.getElementById("btnSubmit");

    const isValid = borderColor === colors.invalidColorRGB;

    if (isValid) {
        btnSubmit.removeAttribute("disabled");
    } else {
        btnSubmit.disabled = true;
    }
}

/* Function to get border-color `noHp` in form contact */
function checkBorderColorNoHp(noHp) {
    const computedStyleNoHpInput = getComputedStyle(noHp);
    const borderNoHp = computedStyleNoHpInput.getPropertyValue('border-color');

    return borderNoHp === colors.defaultColorRGB;
}

/* Function to disabled button send in form contact */
function disableSubmitButton() {
    document.getElementById("btnSubmit").setAttribute("disabled", "true");
}

/* Function to enable button send in form contact */
function enableSubmitButton() {
    document.getElementById("btnSubmit").removeAttribute("disabled");
}

/* Function to get value input in form contact */
// function getFormContactValues(token) {
function getFormContactValues() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const noHp = noHPElement.value;
    const message = document.getElementById("message").value;
    const captchaResponse = grecaptcha.getResponse()

    // return { firstName, lastName, email, noHp, message, token };
    return { firstName, lastName, email, noHp, message, captchaResponse };
}

/* Function to post data contact to server in form contact */
async function postDataContactToServer(data) {
    try {
        const apiUrl = 'https://be-semarang-2-production.up.railway.app/api/contacts/';
        // const apiUrl = 'http://localhost:3000/api/contacts/';
        const response = await axios.post(apiUrl, data);

        if (!response.data) {
            handleErrorContact('Failed to create contact')
        }

        return response.data;
    } catch (error) {
        // throw new Error(error.message);
        if (error.response && error.response.status === 429) {
            const errorMessage = 'Terlalu banyak permintaan, coba lagi nanti.';
            console.error(errorMessage);
            handleErrorContact(errorMessage);
        } else if (error.response && error.response.data.error) {
            const errorMessage = error.response.data.error;
            console.error(errorMessage);
            handleErrorContact(errorMessage);
        } else {
            console.error(error.message);
            handleErrorContact(error.message);
        }
    }
}

/* Function to handle while success fetch in form contact */
function handleSuccessContact() {
    openPopup("btnSubmit")
    resetInputContact();
}

/* Function to handle while error fetch in form contact */
function handleErrorContact(desc) {
    openPopupError(desc, "btnSubmit");
}

/* `keydown` trigger for forms with id `formContact` */
form.addEventListener('keydown', () => {
    const emailInput = document.getElementById('email');
    const noHp = document.getElementById('noHp');
    const inputs = form.querySelectorAll('input[type=text], input[type=number], textarea');

    /* `input` trigger for forms with id `formContact` in email input */
    emailInput.addEventListener('input', handleEmailInputContact)

    /* Gives border-color to inputs that have value*/
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            setBorderColorInputChange(inputs)

            updateSubmitButton(input)

            setBorderColorEmail();
        });

        input.addEventListener('blur', () => {
            setBorderColorEmail();
        });
    });

    /* border-color check of the `noHp` input boxes to disable the button with id `btnSubmit` */
    if (checkBorderColorNoHp(noHp)) disableSubmitButton();
    else enableSubmitButton();
})

/* Submit a form with the id `formContact` for the process of saving new Contact data to the database */
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const captchaResponse = grecaptcha.getResponse()
    if (!captchaResponse.length > 0) {
        openPopupError('Captcha not complete')
    }

    // console.log(captchaResponse)

    const emailContact = document.getElementById('email').value;

    if (!emailPattern.test(emailContact)) {
        openPopupError('Email Invalid')
    } else {
        try {
            const formData = getFormContactValues();
            await postDataContactToServer(formData);
            handleSuccessContact();
        } catch (error) {
            handleErrorContact(error.message);
        }
    }
})

noHPElement.addEventListener('keydown', (event) => {
    const disallowedKeys = [69, 43, 101, 190];

    if (disallowedKeys.includes(event.keyCode)) {
        event.preventDefault();
    }
})

function setupFormEventListeners() {
    checkRecaptcha()
}

function enableSubmitButton() {
    setupFormEventListeners()
}

const checkRecaptcha = function () {
    const isRecaptchaChecked = grecaptcha.getResponse().length !== 0;

    if (isRecaptchaChecked) {
        document.getElementById("btnSubmit").removeAttribute("disabled");
    } else {
        document.getElementById("btnSubmit").disabled = true;
    }
}

/* event listener untuk elemen formulir */
form.addEventListener('click', checkRecaptcha);
form.addEventListener('keyup', checkRecaptcha);

/* TRANSITION */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show-section')
        } else {
            entry.target.classList.remove('show-section')
        }
    })
})

const hiddenSectionElements = document.querySelectorAll('.hidden-section');
hiddenSectionElements.forEach((el) => observer.observe(el))