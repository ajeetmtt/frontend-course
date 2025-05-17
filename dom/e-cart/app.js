const productContainer = document.querySelector("#productContainer");
const searchInput = document.querySelector("#searchInput");
const notFound = document.querySelector("#notFound");

const topProductBtn = document.createElement("button");
topProductBtn.textContent = "Top Rated Product";
document.body.appendChild(topProductBtn);

const allProductBtn = document.createElement("button");
allProductBtn.textContent = "Show All Products";
document.body.appendChild(allProductBtn);

let allProductData = [];

const fetchAllData = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    allProductData = data.products;

    // Check localStorage to determine which view to show
    const view = localStorage.getItem("view");
    if (view === "top") {
      const topRated = allProductData.filter((product) => product.rating > 4);
      displayedProducts(topRated);
    } else {
      displayedProducts(allProductData);
    }
  } catch (error) {
    productContainer.innerHTML = "<p>Failed To Load Product</p>";
    console.log(`Error while fetching data: ${error}`);
  }
};

const displayedProducts = (products) => {
  productContainer.innerHTML = "";
  if (products.length <= 0) {
    notFound.style.display = "block";
  } else {
    notFound.style.display = "none";
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description.substring(0, 60)}...</p>
      <span class="price">$${product.price}</span>
      <span class="rating">${product.rating}*</span>
    `;
    productContainer.appendChild(card);
  });
};

// Search filter
searchInput.addEventListener("input", () => {
  const searchTerms = searchInput.value.toLowerCase();
  const filteredData = allProductData.filter((product) =>
    product.title.toLowerCase().includes(searchTerms)
  );
  displayedProducts(filteredData);
});

// Top Rated button logic
topProductBtn.addEventListener("click", () => {
  const topRated = allProductData.filter((product) => product.rating > 4);
  displayedProducts(topRated);
  localStorage.setItem("view", "top");
});

// Show All Products button logic
allProductBtn.addEventListener("click", () => {
  displayedProducts(allProductData);
  localStorage.removeItem("view");
});

fetchAllData();
