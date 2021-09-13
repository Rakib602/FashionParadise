// calling the API 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)

    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div id="div-id" class="single-product">
      <div>
      <img class="product-image" src=${image}></img>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Average Rating: ${product.rating.rate} <i class="fas fa-star"></i></p>
      <p>Total Member: <span class=text-danger> ${product.rating.count} <span> <i class="fas fa-users"></i></p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">
      Add to cart
      </button>
      <button onclick="details()" id="details-btn" class="btn btn-danger">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// my cart section 
let count = 0;
const addToCart = (_id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;

  // total price function calling to see total price 
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// buy now function 
const buyNow = () => {
  alert('Buy Now Option will be Update Soon !! Thank You');
}

