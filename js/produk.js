async function fetchDataByCategory(category) {
  try {
      const response = await axios.get(`https://be-semarang-2-production.up.railway.app/api/products/category/${category}`);
      const products = response.data.slice(0, 6);

      const productContainer = document.getElementById("product-container");
      productContainer.innerHTML = '';

      products.forEach(product => {
          const productBox = document.createElement("div");
          productBox.className = "product-box";

          const productImage = document.createElement("img");
          productImage.className = "product-image";
          productImage.src = `data:image/jpeg;base64,${product.image}`;
          productImage.alt = product.productName;

          const productName = document.createElement("p");
          productName.className = "product-name";
          productName.textContent = product.productName;

          const formatRupiah = (price) => {
            const formatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            });
            return formatter.format(price).replace(/,00$/, '');
          };
          const productPrice = document.createElement("p");
          productPrice.className = "product-price";
          productPrice.textContent = formatRupiah(product.productPrice);

          productBox.appendChild(productImage);
          productBox.appendChild(productName);
          productBox.appendChild(productPrice);

          productContainer.appendChild(productBox);
      });
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}

const categories = document.querySelectorAll(".list-categories li");

categories.forEach(category => {
    category.addEventListener("click", () => {
        categories.forEach(c => {
            c.classList.remove("active");
        });

        category.classList.add("active");

        categories.forEach(c => {
            if (c.classList.contains("active")) {
                c.style.backgroundColor = "#50362A";
                c.style.color = "white";
            } else {
                c.style.backgroundColor = "";
                c.style.color = "black";
            }
        });

        const categoryValue = category.id;
        fetchDataByCategory(categoryValue);
    });
    category.addEventListener("mouseenter", () => {
      if (!category.classList.contains("active")) {
          category.style.color = "white";
      }
    });

    category.addEventListener("mouseleave", () => {
        if (!category.classList.contains("active")) {
            category.style.color = "";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const homeAndLivingCategory = document.getElementById("homeandliving");
  const toysCategory = document.getElementById("toys");
  const craftCategory = document.getElementById("craft");
  const clothingCategory = document.getElementById("clothing");
  const jewelryCategory = document.getElementById("jewelry");
  const vintageCategory = document.getElementById("vintage");
  
  const defaultCategory = document.getElementById("homeandliving");
  defaultCategory.classList.add("active");
  defaultCategory.style.backgroundColor = "#50362A";
  defaultCategory.style.color = "white";

  fetchDataByCategory('homeandliving');

  homeAndLivingCategory.addEventListener("click", () => {
      fetchDataByCategory("homeandliving");
  });

  toysCategory.addEventListener("click", () => {
      fetchDataByCategory("toys");
  });

  craftCategory.addEventListener("click", () => {
      fetchDataByCategory("craft");
  });

  clothingCategory.addEventListener("click", () => {
      fetchDataByCategory("clothing");
  });

  jewelryCategory.addEventListener("click", () => {
      fetchDataByCategory("jewelry");
  });

  vintageCategory.addEventListener("click", () => {
      fetchDataByCategory("vintage");
  });

});

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