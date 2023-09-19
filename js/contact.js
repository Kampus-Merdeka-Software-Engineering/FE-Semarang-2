const colors = {
    validColor: "#00aaff",
    invalidColor: "#ff0000",
    default: "#333"
};

function validateForm() {
    const emailInput = document.getElementById("email");
    const borderColor = window.getComputedStyle(emailInput).borderColor;

    document.getElementById("btnSubmit").disabled = borderColor === 'rgb(255, 0, 0)' ? true : false;
}

function resetInputContact() {
    const form = document.getElementById('formContact');
    const inputs = form.querySelectorAll('input[type=text], input[type=number], textarea');
    let text = document.getElementById('text')
    inputs.forEach(input => {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = ''
            inputs[i].style.borderColor = colors.default
        }
        text.innerHTML = ""
    });
}

/* `keydown` trigger for forms with id `formContact` */
let form = document.getElementById('formContact')
form.addEventListener('keydown', () => {
    let emailInput = document.getElementById('email');
    let noHp = document.getElementById('noHp');
    const form = document.getElementById('formContact');
    let inputs = form.querySelectorAll('input[type=text], input[type=number], textarea');
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let text = document.getElementById('text')

    /* email validation */
    emailInput.addEventListener('input', function () {
        const value = this.value;

        if (value.length > 0) {
            /* Conditions for email input */
            if (value.match(pattern)) {
                this.classList.add("valid")
                this.classList.remove("invalid")
                text.innerHTML = ""
                emailInput.style.borderColor = colors.validColor
            } else {
                this.classList.remove("valid")
                this.classList.add("invalid")
                text.innerHTML = "Please Enter Valid Email"
                text.style.color = colors.invalidColor
                emailInput.style.borderColor = colors.invalidColor
            }
        } else {
            this.classList.remove("valid")
            this.classList.remove("invalid")
            text.innerHTML = ""
            text.style.color = colors.validColor
            emailInput.style.borderColor = colors.default
        }
    })

    /* Gives border-color to inputs that have value*/
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            for (let i = 0; i < inputs.length; i++) {
                if (i === 2) {
                    continue; // Skip index 2
                }

                if (inputs[i].value.length > 0) {
                    inputs[i].style.borderColor = colors.validColor
                } else {
                    inputs[i].style.borderColor = colors.default
                }
            }

            const computedStyle = getComputedStyle(this);
            const borderColor = computedStyle.getPropertyValue('border-color');

            const isValid = borderColor === "rgb(0, 170, 255)";

            if (isValid) {
                document.getElementById("btnSubmit").removeAttribute("disabled");
            } else {
                document.getElementById("btnSubmit").disabled = true
            }

            validateForm();
        });

        input.addEventListener('blur', function() {
            validateForm();
        });
    });

    /* border-color check of the `email` and `noHp` input boxes to disable the button with id `btnSubmit` */
    const computedStyleEmailInput = getComputedStyle(emailInput);
    let borderEmailInput = computedStyleEmailInput.getPropertyValue('border-color');
    const computedStyleNoHpInput = getComputedStyle(noHp);
    let borderNoHp = computedStyleNoHpInput.getPropertyValue('border-color');

    if (borderNoHp === 'rgb(51, 51, 51)') {
        document.getElementById("btnSubmit").setAttribute("disabled", "true");
        if (borderEmailInput === 'rgb(0, 170, 255)') {
            document.getElementById("btnSubmit").setAttribute("disabled", "true");
        }
    } else {
        if (borderEmailInput === 'rgb(0, 170, 255)') {
            document.getElementById("btnSubmit").disabled = true
        }
    }
})

const noHP = document.getElementById("noHp");
/* Submit a form with the id `formContact` for the process of saving new Contact data to the database */
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const noHPValue = noHP.value;
    const message = document.getElementById("message").value;
    const url = '/postContact';

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, noHPValue, message }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                resetInput()
                throw new Error("Failed to create contact");
            }
        })
        .then((data) => {
            // alert(data.message);
            window.location.href = '/contact'; /* Navigate to the contact page */
        })
        .catch((error) => {
            // resetInput()
            const inputs = form.querySelectorAll('input[type=text], input[type=number], textarea');
            let text = document.getElementById('text')
            inputs.forEach(input => {
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].value = ''
                    inputs[i].style.borderColor = colors.default
                }
                text.innerHTML = ""
            });
        });
})

noHP.addEventListener('keydown', (event) => {
    const disallowedKeys = [69, 43, 101, 190];

    if (disallowedKeys.includes(event.keyCode)) {
        event.preventDefault();
    }
})

/* `keydown` trigger for forms with id `formNewsLetter` */
let formNewsLetter = document.getElementById('formNewsLetter')
formNewsLetter.addEventListener('keydown', () => {
    let emailInput = document.getElementById('emailNewsLetter');
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    /* email validation */
    emailInput.addEventListener('input', function () {
        const value = this.value;

        if (value.length > 0) {
            /* Conditions for email input */
            if (value.match(pattern)) {
                formNewsLetter.classList.add("valid")
                formNewsLetter.classList.remove("invalid")
                formNewsLetter.style.borderColor = colors.validColor
                document.getElementById("btnNewsLetter").removeAttribute("disabled");
            } else {
                formNewsLetter.classList.remove("valid")
                formNewsLetter.classList.add("invalid")
                formNewsLetter.style.borderColor = colors.invalidColor
                document.getElementById("btnNewsLetter").setAttribute("disabled", "true");
            }
        } else {
            formNewsLetter.classList.remove("valid")
            formNewsLetter.classList.remove("invalid")
            formNewsLetter.style.borderColor = colors.default
        }
    })
})

/* Submit a form with the id `formNewsLetter` for the process of saving new NewsLetter data to the database */
formNewsLetter.addEventListener('submit', (event) => {
    event.preventDefault();

    let emailNewsLetter = document.getElementById('emailNewsLetter').value;
    const url = '/newsLetter';

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailNewsLetter }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                document.getElementById('emailNewsLetter').value = ''
                formNewsLetter.style.borderColor = colors.default
                throw new Error("Failed to create NewsLetter");
            }
        })
        .then((data) => {
            window.location.href = '/contact'; /* Navigate to the contact page */
        })
        .catch((error) => {
            document.getElementById('emailNewsLetter').value = ''
            formNewsLetter.style.borderColor = colors.default
        });
})
