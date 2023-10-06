// Popup
let popup = document.getElementById("popup");
const btnClose = document.getElementById("btnClose");

function openPopup(button) {
    popup.classList.add("open-popup");
    document.getElementById(button).disabled = true;
}

function openPopupError(desc, button) {
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
    document.getElementById(button).disabled = true;
}

function closePopup() {
    popup.classList.remove("open-popup");
}

btnClose.addEventListener('click', () => {
    closePopup()
    location.reload(true); // Halaman akan direfresh dan memaksa pengambilan ulang sumber daya dari server
})

// window.addEventListener("load", (event) => {
//     openPopup()
// });