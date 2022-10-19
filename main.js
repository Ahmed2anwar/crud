let productNameInput = document.getElementById("productName");
let productCategoryInput = document.getElementById("productCategory");
let productPriceInput = document.getElementById("productPrice");
let productDescriptionInput = document.getElementById("productDescription");
let sellerInput = document.getElementById("Seller");
let myBtn = document.getElementById("myBtn");
let searchInput = document.getElementById("searchInput");
let alertName = document.getElementById("alertName");
let alertCategory = document.getElementById("alertCategory");
let alertPrice = document.getElementById("alertPrice");
let alertSeller = document.getElementById("alertSeller");
let currentIndex = 0;
let productContainer;

if (localStorage.getItem("products") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayData();
}

function add() {
  if (myBtn.innerHTML == "Add Product") {
    addProduct();
  } else {
    editData();
  }
}
function addProduct() {
  if (valName() && valPrice() && valSeller()) {
    product = {
      name: productNameInput.value,
      category: productCategoryInput.value,
      price: productPriceInput.value,
      description: productDescriptionInput.value,
      seller: sellerInput.value,
    };
    productContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayData();
    clearData();
  }
}

function displayData() {
  let temp = "";
  for (let i = 0; i < productContainer.length; i++) {
    temp += ` <tr>
    <td>${i + 1}</td>
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].seller}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].description}</td>
    <td>
        <button class="btn btn-success"onclick="updateData(${i})"> Update</button>
    </td>
    <td>
        <button class="btn btn-danger" onclick="deleteData(${i})"> Delete</button>
    </td>
              </tr>`;
  }

  document.getElementById("tableBody").innerHTML = temp;
}

function deleteData(index) {
  productContainer.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayData();
}

function updateData(index) {
  currentIndex = index;
  productNameInput.value = productContainer[index].name;
  productCategoryInput.value = productContainer[index].category;
  productPriceInput.value = productContainer[index].price;
  productDescriptionInput.value = productContainer[index].description;
  sellerInput.value = productContainer[index].seller;
  myBtn.innerHTML = "update Product";
}

function editData() {
  productContainer[currentIndex].name = productNameInput.value;
  productContainer[currentIndex].category = productCategoryInput.value;
  productContainer[currentIndex].price = productPriceInput.value;
  productContainer[currentIndex].description = productDescriptionInput.value;
  productContainer[currentIndex].seller = sellerInput.value;
  myBtn.innerHTML = "Add Product";
  displayData();
  clearData();
}

function clearData() {
  productNameInput.value = "";
  productCategoryInput.value = "";
  productPriceInput.value = "";
  productDescriptionInput.value = "";
  sellerInput.value = "";
}

function searchData() {
  let searchValue = searchInput.value.toLowerCase();
  let temp = "";
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(searchValue) ||
      productContainer[i].price.toLowerCase().includes(searchValue) ||
      productContainer[i].seller.toLowerCase().includes(searchValue) ||
      productContainer[i].category.toLowerCase().includes(searchValue) ||
      productContainer[i].description.toLowerCase().includes(searchValue) ==
        true
    ) {
      temp += ` <tr>
    <td>${i + 1}</td>
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].seller}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].description}</td>
    <td>
        <button class="btn btn-success"onclick="updateData(${i})"> Update</button>
    </td>
    <td>
        <button class="btn btn-danger" onclick="deleteData(${i})"> Delete</button>
    </td>
              </tr>`;
      document.getElementById("tableBody").innerHTML = temp;
    } else {
      document.getElementById("tableBody").innerHTML = temp;
    }
  }
}

function valName() {
  let regex = /^[A-Z][a-z]{3,10}[0,9]?$/;

  if (regex.test(productNameInput.value)) {
    alertName.style.display = "none";
    return true;
  } else {
    alertName.style.display = "block";
    return false;
  }
}
productNameInput.addEventListener("blur", valName);

function valPrice() {
  let regex = /[0-9]{4}/;

  if (regex.test(productPriceInput.value)) {
    alertPrice.style.display = "none";
    return true;
  } else {
    alertPrice.style.display = "block";
    return false;
  }
}
productPriceInput.addEventListener("blur", valPrice);

function valSeller() {
  let regex = /^[A-Z][a-z]{3,10}[0,9]?$/;

  if (regex.test(sellerInput.value)) {
    alertSeller.style.display = "none";
    return true;
  } else {
    alertSeller.style.display = "block";
    return false;
  }
}

sellerInput.addEventListener("blur", valSeller);
