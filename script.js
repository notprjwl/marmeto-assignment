// fetching the data
async function fetchData() {
  try {
    const response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json");
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const data = await response.json();
    // console.log(data);
    return data.categories;
  } catch (error) {
    console.error("error fetching the data: ", error);
  }
}

//displaying data based on category (men, women, kids)
function displayData(categories) {
  const categoryList = document.querySelectorAll(".category-list");
  categoryList.forEach((category) => {
    category.addEventListener("click", () => {
      categoryList.forEach((category) => category.classList.remove("active"));
      category.classList.add("active");
      const categoryName = category.textContent.trim();
      const selectedCategory = categories.find((cat) => cat.category_name === categoryName);
      if (selectedCategory) {
        updateClothesGrid(selectedCategory.category_products);
      }
    });
  });
  const menCategory = document.getElementById("men");
  if (menCategory) {
    menCategory.click();
  }
}

function updateClothesGrid(clothes) {
  const clothesGrid = document.querySelector(".clothes-grid");
  clothesGrid.innerHTML = "";
  clothes.forEach((cloth) => {
    const clothElement = document.createElement("div");
    clothElement.classList.add("single-div");

    // badge-container
    const badgeContainer = document.createElement("div");
    badgeContainer.classList.add("badge-container");

    const badgeText = document.createElement("h1");
    badgeText.classList.add("badge-text");
    badgeText.textContent = cloth.badge_text;

    if (!cloth.badge_text) {
      badgeContainer.classList.add("hidden");
    }

    //image
    const imgElement = document.createElement("img");
    imgElement.src = cloth.image;
    imgElement.alt = cloth.title;

    //vendor
    const vendor = document.createElement("h1");
    vendor.classList.add("vendor-name");
    vendor.textContent = cloth.vendor;

    //title
    const title = document.createElement("h1");
    title.classList.add("title-name");
    title.textContent = cloth.title;

    //price-div
    const priceDiv = document.createElement("div");
    priceDiv.classList.add("price-div");

    const price = document.createElement("h1");
    price.textContent = `Rs. ${cloth.price}`;

    const comparePrice = document.createElement("h1");
    comparePrice.textContent = `Rs. ${cloth.compare_at_price}`;

    //discount
    const discountPercentage = Math.round(calculateDiscountPercentage(cloth.compare_at_price, cloth.price));

    const discountText = document.createElement("p");
    discountText.textContent = `${discountPercentage}% Off`;

    //button
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";

    badgeContainer.appendChild(badgeText);
    
    clothElement.appendChild(imgElement);
    clothElement.appendChild(badgeContainer);
    clothElement.appendChild(vendor);
    clothElement.appendChild(title);

    priceDiv.appendChild(price);
    priceDiv.appendChild(comparePrice);
    priceDiv.appendChild(discountText);

    clothElement.appendChild(priceDiv);
    clothElement.appendChild(addButton);
    clothesGrid.appendChild(clothElement);
  });
}

//discount-percentage
function calculateDiscountPercentage(originalPrice, discountedPrice) {
  return ((originalPrice - discountedPrice) / originalPrice) * 100;
}

window.onload = function () {
  fetchData().then((categories) => {
    displayData(categories);
  });
};
