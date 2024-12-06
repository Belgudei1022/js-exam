let savedProducts = JSON.parse(localStorage.getItem("savedProducts")) || [];

// Dynamically render products from localStorage
const productContainer = document.querySelector(".grid");
const products = JSON.parse(localStorage.getItem("products")) || [];

// Function to render products
function renderProducts() {
  productContainer.innerHTML = ""; // Clear existing products
  products.forEach((product) => {
    const productCard = `
        <div class="bg-white rounded-lg shadow-md p-4">
              <img 
                src="${product.image}" 
                alt="Product" 
                class="w-full h-40 object-cover rounded-t-md"
              >
              <div class="p-4">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${
                  product.title
                }</h3>
                <p class="text-sm text-gray-600 mb-4">
                  ${product.introduction || "No description available."}
                </p>
                <p class="text-lg font-semibold text-gray-800 mb-4">${
                  product.price
                }₮</p>
                <div class="flex justify-between">
                  <button 
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 save-btn">
                    Save
                  </button>
                  <button 
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button 
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            </div>
      `;
    productContainer.insertAdjacentHTML("beforeend", productCard);
  });
}

// Render initial products
renderProducts();

// Save Button Event Delegation
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("save-btn")) {
    const card = event.target.closest(".bg-white");
    const title = card.querySelector("h3").textContent.trim();
    const price = card.querySelector("p.text-lg").textContent.trim();
    const imgSrc = card.querySelector("img").src;

    const product = { title, price, imgSrc };

    // Avoid duplicates in savedProducts
    if (!savedProducts.some((item) => item.title === title)) {
      savedProducts.push(product);
      localStorage.setItem("savedProducts", JSON.stringify(savedProducts));
      alert(`${title} has been saved!`);
    } else {
      alert(`${title} is already saved.`);
    }
  }
});

// Delete Button Event Delegation
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const card = event.target.closest(".bg-white");
    const title = card.querySelector("h3").textContent.trim();

    // Remove product from localStorage
    const updatedProducts = products.filter(
      (product) => product.title !== title
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Remove the card from the DOM
    if (card) card.remove();

    alert(`${title} has been deleted.`);
  }
});

// Adding a New Product (Example)
document.querySelector("#add-product-btn").addEventListener("click", () => {
  const newProduct = {
    title: "New Product",
    price: "$49.99",
    image: "https://via.placeholder.com/150",
    introduction: "A dynamically added product",
  };

  // Add new product to the local storage and render it
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
});
