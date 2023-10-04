function tampilkanKategori(kategori) {
  // Menyembunyikan semua tab-content
  var tabContents = document.querySelectorAll(".list-produk");
  tabContents.forEach(function (tab) {
    tab.classList.remove("active"); // Hilangkan kelas 'active'
  });

  // Menampilkan tab-content yang sesuai dengan kategori yang dipilih
  var selectedTab = document.getElementById(kategori);
  if (selectedTab) {
    selectedTab.classList.add("active"); // Tambahkan kelas 'active'
  }

  // view
  var scrollView = document.getElementById("isi-produk-s-4");
  scrollView.scrollIntoView({ behavior: "smooth" });
}

// scroll
window.onscroll = function () {
  scrollTampilkanButton();
};

function scrollTampilkanButton() {
  var buttonBackToCategory = document.getElementById("buttonToCategory");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 1000) {
      buttonBackToCategory.style.display = "block";
    } else {
      buttonBackToCategory.style.display = "none";
    }
  });
}

// function untuk kembali lagi ke atas
function keSectionCategory() {
  var sectionCategory = document.getElementById("container-produk-s-3");
  sectionCategory.scrollIntoView({ behavior: "smooth" });
}

// for button active list category
function buttonActiveCategory() {
  const categories = document.querySelectorAll(".category");

  categories.forEach((category) => {
    category.addEventListener("click", () => {
      // Hilangkan kelas "active" dari semua elemen
      categories.forEach((c) => c.classList.remove("active"));

      // Tambahkan kelas "active" hanya ke elemen yang diklik
      category.classList.add("active");
    });
  });
}

buttonActiveCategory();
