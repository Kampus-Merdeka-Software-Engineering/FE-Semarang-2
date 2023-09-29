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
const form = document.getElementById('formReview');

/* Function to set border color of email input */
function setBorderColorEmail() {
    const emailInput = document.getElementById("email");
    const borderColor = window.getComputedStyle(emailInput).borderColor;

    document.getElementById("btnSubmit").disabled = borderColor === colors.validColorRGB ? true : false;
}

/* Function to reset form inputs and text */
function resetInputReview() {
    const form = document.getElementById('formReview');
    const inputs = form.querySelectorAll('input[type=text], textarea');
    let text = document.getElementById('text');
    inputs.forEach(input => {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = ''
            inputs[i].style.borderColor = colors.defaultColorHex
        }
        text.innerHTML = ""
    });
}

/* Function to validate email input in form review */
function handleEmailInputReview(event) {
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

/* Function to set border color input in form review */
function setBorderColorInputChange(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if (i === 0) {
            continue; /* Skip index 0, yaitu email */
        }

        inputs[i].style.borderColor = inputs[i].value.length > 0 ? colors.validColorHex : colors.defaultColorHex;
    }
}

/* Function to update submit button in form review */
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

/* Function to disabled button send in form review */
function disableSubmitButton() {
    document.getElementById("btnSubmit").setAttribute("disabled", "true");
}

/* Function to enable button send in form review */
function enableSubmitButton() {
    document.getElementById("btnSubmit").removeAttribute("disabled");
}

/* Function to get value input in form review */
function getFormReviewValues() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    return { name, email, message };
}

/* Function to post data review to server in form review */
async function postDataReviewToServer(data) {
    try {
        const apiUrl = 'https://express-back-end-production.up.railway.app/api/reviews/';
        const response = await axios.post(apiUrl, data, {
        });

        if (!response.data) {
            throw new Error('Failed to create Review');
        }

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

/* Function to handle while success fetch in form Review */
function handleSuccessReview() {
    openPopup()
    resetInputReview();
}

/* Function to handle while error fetch in form Review */
function handleErrorReview() {
    openPopup()
    resetInputReview();
}

/* `keydown` trigger for forms with id `formReview` */
form.addEventListener('keydown', () => {
    const emailInput = document.getElementById('email');
    const inputs = form.querySelectorAll('input[type=text], textarea');

    /* `input` trigger for forms with id `formReview` in email input */
    emailInput.addEventListener('input', handleEmailInputReview)

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
})

/* Submit a form with the id `formReview` for the process of saving new Review data to the database */
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // const captchaResponse = grecaptcha.getResponse()
    // if (!captchaResponse.length > 0) {
    //     throw new Error("Captcha not complete")
    // }

    try {
        const formData = getFormReviewValues();
        await postDataReviewToServer(formData);
        handleSuccessReview();
    } catch (error) {
        // console.log('error: ', error)
        handleErrorReview();
    }

    // resetInputReview()
    // window.location.href = 'kontak.html';
})