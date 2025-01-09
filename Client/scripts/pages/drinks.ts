type DrinkItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc?: string; // Optional description
  amount?: number; // Optional amount
};

const drinkList: HTMLElement = document.getElementById("drink-list")!;
const drinkCartItems: HTMLElement = document.getElementById("cart-items")!;
const drinkPlaceOrderButton: HTMLElement =
  document.getElementById("place-order")!;
const drinkCartLength: HTMLElement = document.getElementById("cart-length")!;
const drinkCartButton = document.getElementById(
  "cart-button"
) as HTMLImageElement;

let drinkCart: DrinkItem[] = [];

const drinkProducts: DrinkItem[] = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 5.99,
    image:
      "https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-superJumbo.jpg",
    desc: `A rich and moist chocolate cake made with high-quality cocoa powder and layered with creamy chocolate frosting.`,
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    price: 6.99,
    image:
      "https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg",
    desc: `A classic red velvet cake with a hint of cocoa, layered with cream cheese frosting and topped with red crumbs.`,
  },
  {
    id: 3,
    name: "Carrot Cake",
    price: 4.99,
    image:
      "https://www.errenskitchen.com/wp-content/uploads/2018/06/Vanilla-Sponge-Cake-1-recipe-card-500x375.jpg",
    desc: `A moist and flavorful carrot cake made with grated carrots, walnuts, and a rich cream cheese frosting.`,
  },
  {
    id: 4,
    name: "Lemon Drizzle Cake",
    price: 7.99,
    image:
      "https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-superJumbo.jpg",
    desc: `A light and zesty lemon drizzle cake, perfect for a refreshing dessert, topped with a sweet lemon glaze.`,
  },
  {
    id: 1,
    name: "Chocolate Cake",
    price: 5.99,
    image:
      "https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-superJumbo.jpg",
    desc: `A rich and moist chocolate cake made with high-quality cocoa powder and layered with creamy chocolate frosting.`,
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    price: 6.99,
    image:
      "https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg",
    desc: `A classic red velvet cake with a hint of cocoa, layered with cream cheese frosting and topped with red crumbs.`,
  },
  {
    id: 3,
    name: "Carrot Cake",
    price: 4.99,
    image:
      "https://www.errenskitchen.com/wp-content/uploads/2018/06/Vanilla-Sponge-Cake-1-recipe-card-500x375.jpg",
    desc: `A moist and flavorful carrot cake made with grated carrots, walnuts, and a rich cream cheese frosting.`,
  },
  {
    id: 4,
    name: "Lemon Drizzle Cake",
    price: 7.99,
    image:
      "https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-superJumbo.jpg",
    desc: `A light and zesty lemon drizzle cake, perfect for a refreshing dessert, topped with a sweet lemon glaze.`,
  },
  {
    id: 1,
    name: "Chocolate Cake",
    price: 5.99,
    image:
      "https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-superJumbo.jpg",
    desc: `A rich and moist chocolate cake made with high-quality cocoa powder and layered with creamy chocolate frosting.`,
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    price: 6.99,
    image:
      "https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg",
    desc: `A classic red velvet cake with a hint of cocoa, layered with cream cheese frosting and topped with red crumbs.`,
  },
  {
    id: 3,
    name: "Carrot Cake",
    price: 4.99,
    image:
      "https://www.errenskitchen.com/wp-content/uploads/2018/06/Vanilla-Sponge-Cake-1-recipe-card-500x375.jpg",
    desc: `A moist and flavorful carrot cake made with grated carrots, walnuts, and a rich cream cheese frosting.`,
  },
  {
    id: 4,
    name: "Lemon Drizzle Cake",
    price: 7.99,
    image:
      "https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-superJumbo.jpg",
    desc: `A light and zesty lemon drizzle cake, perfect for a refreshing dessert, topped with a sweet lemon glaze.`,
  },
];

// Display drink items
function displayDrinkItems(): void {
  drinkList.innerHTML = "";
  drinkProducts.forEach((drink) => {
    const item = document.createElement("div");
    item.className = "drink-item";
    item.innerHTML = `
            <img src="${drink.image}" alt="${drink.name}" />
            <h3>${drink.name}</h3>
            <p>${drink.desc}</p>
            <p><strong>$${drink.price.toFixed(2)}</strong></p>
            <button class="add-to-cart" data-id="${
              drink.id
            }">Add to Cart</button>
        `;
    drinkList.appendChild(item);
  });
  // Attach event listeners for "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) =>
    button.addEventListener("click", () => {
      const drinkId = parseInt(
        (button as HTMLElement).getAttribute("data-id")!
      );
      addDrinkToCart(drinkId);
      showDrinkMessage("Item added to cart!");
    })
  );
}

function showDrinkMessage(message: string): void {
  const messageDiv = document.getElementById("message")!;
  messageDiv.textContent = message;
  messageDiv.style.display = "block";
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 2000);
}

// Add to cart
function addDrinkToCart(drinkId: number): void {
  const drink = drinkProducts.find((item) => item.id === drinkId);
  if (!drink) return;
  const existingItem = drinkCart.find((item) => item.id === drinkId);
  if (existingItem) {
    existingItem.amount = (existingItem.amount || 0) + 1;
  } else {
    drinkCart.push({ ...drink, amount: 1 });
  }

  updateDrinkCart();
  saveDrinkCartToLocalStorage();
}

// Delete from cart
function deleteDrinkFromCart(drinkId: number): void {
  drinkCart = drinkCart.filter((item) => item.id !== drinkId);
  updateDrinkCart();
  saveDrinkCartToLocalStorage();
}

// Update cart UI
function updateDrinkCart(): void {
  drinkCartLength.textContent = drinkCart.length.toString();
  drinkCartItems.innerHTML = "";

  if (drinkCart.length === 0) {
    drinkCartButton.src = "../assets/img/empty.svg";
    return;
  }

  drinkCartButton.src = "../assets/img/cart.svg";
  let totalCost = 0;

  const maxLength = Math.max(...drinkCart.map((item) => item.name.length));
  const headerRow = document.createElement("li");
  headerRow.classList.add("cart-header");
  headerRow.innerHTML = `<span style="display: inline-block; font-weight:bold;width: ${maxLength}ch;">Item</span><span style="font-weight:bold;">Quantity</span><span style="font-weight:bold;">Price Each</span><span style="font-weight:bold;">Delete</span>`;
  drinkCartItems.appendChild(headerRow);
  drinkCart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span style="display: inline-block; width: ${maxLength}ch;"> ${
      index + 1
    }.
                ${item.name}</span>
                <select class="item-amount" data-id="${item.id}">
                
                        ${Array.from({ length: 10 }, (_, i) => i + 1)
                          .map(
                            (i) => `
                                <option value="${i}" ${
                              i === item.amount ? "selected" : ""
                            }>${i}</option>
                        `
                          )
                          .join("")}
                </select>
                <span>
                = $${item.price.toFixed(2)} * ${item.amount?.toFixed(0)}
                </span>`;
    const headerRow = document.createElement("li");

    totalCost += item.price * (item.amount || 0);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteDrinkFromCart(item.id));

    li.appendChild(deleteButton);
    drinkCartItems.appendChild(li);
  });

  const totalCostElement = document.createElement("p");
  totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
  drinkCartItems.appendChild(totalCostElement);

  // Attach event listeners for amount dropdowns
  const amountDropdowns = document.querySelectorAll(".item-amount");
  amountDropdowns.forEach((dropdown) => {
    const selectElement = dropdown as HTMLSelectElement;

    selectElement.addEventListener("change", (event) => {
      const drinkId = parseInt(selectElement.getAttribute("data-id")!);
      const newAmount = parseInt(selectElement.value);
      updateDrinkItemAmount(drinkId, newAmount);
    });
  });
}

// Update item amount in cart
function updateDrinkItemAmount(drinkId: number, newAmount: number): void {
  const item = drinkCart.find((item) => item.id === drinkId);
  if (item) {
    item.amount = newAmount;
    updateDrinkCart();
    saveDrinkCartToLocalStorage();
  }
}

// Save cart to local storage
function saveDrinkCartToLocalStorage(): void {
  localStorage.setItem("drinkCart", JSON.stringify(drinkCart));
}

// Load cart from local storage
function loadDrinkCartFromLocalStorage(): void {
  const storedCart = localStorage.getItem("drinkCart");
  if (storedCart) {
    drinkCart = JSON.parse(storedCart);
    updateDrinkCart();
  }
}

// Place order
// Function to decode a JWT token
interface JwtPayload {
  phone: string;
  email: string;
  name: string;
  address: string;
}

function parseJwt(token: string): JwtPayload {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// Function to place an order
function placeDrinkOrder() {
  if (drinkCart.length === 0) {
    alert("Your cart is empty. Add items before placing an order!");
    return;
  }

  // Retrieve the token from sessionStorage
  const authToken = sessionStorage.getItem("authToken");
  console.log(authToken);
  if (!authToken) {
    const message = "User is not authenticated. Please log in.";
    document.getElementById("message")!.textContent = message;
    document.getElementById("message")!.style.display = "block";
    setTimeout(() => {
      document.getElementById("message")!.style.display = "none";
    }, 2000);
    setTimeout(() => {
      window.location.href = "/pages/login.html";
    }, 2000);

    return;
  }

  // Decode the token to get user information
  const userInfo = parseJwt(authToken);
  console.log(userInfo);

  // Construct the order data including user information
  const orderData = {
    user: {
      phone: userInfo.phone,
      email: userInfo.email,
      name: userInfo.name,
      address: userInfo.address,
    },
    items: drinkCart,
  };
  console.log(orderData);
  fetch("https://reqres.in/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Order submission failed.");
      drinkCart = [];
      updateDrinkCart();
      saveDrinkCartToLocalStorage();
      alert("Order placed successfully!");
    })
    .catch((error) => {
      alert("An error occurred while placing your order. Please try again.");
      console.error(error);
    });
}

// Load cart from local storage on page load
loadDrinkCartFromLocalStorage();

drinkPlaceOrderButton.addEventListener("click", placeDrinkOrder);

// Initial display of drink items
displayDrinkItems();
