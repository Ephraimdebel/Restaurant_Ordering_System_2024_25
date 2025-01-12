type DrinkItem = {
  id: number;
  name: string;
  price: number;
  description?: string; // Optional description
  imageUrl?: string; // Optional amount
  amount: number;
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

let drinkProducts: DrinkItem[] = [];
async function fetchDrinkProducts(): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3333/menu/1`);
    console.log(response);
    if (!response.ok) throw new Error("Failed to fetch food items.");
    const data: FoodItem[] = await response.json();
    drinkProducts = data.map((item) => ({
      ...item,
      price: Number(item.price),
    }));

    console.log("Fetched food items:", drinkProducts);
    displayDrinkItems();
  } catch (error) {
    console.error("Error fetching food items:", error);
  }
}

fetchDrinkProducts();

// Display food items
function displayDrinkItems(): void {
  drinkList.innerHTML = "";
  drinkProducts.forEach((drink) => {
    const trimmedName = drink.name.replace(/^"|"$/g, "");
    const trimmedDescription = drink.description?.replace(/^"|"$/g, "") || "";
    const item = document.createElement("div");
    item.className = "drink-item";
    item.innerHTML = `
      <img src="${drink.imageUrl}" alt="${trimmedName}" />
      <h3>${trimmedName}</h3>
      <p>${trimmedDescription}</p>
      <p><strong>$${drink.price}</strong></p>
      <button class="add-to-cart" data-id="${drink.id}">Add to Cart</button>
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
      window.location.pathname = "Client/pages/login.html";
    }, 2000);

    return;
  }

  // Decode the token to get user information
  const userInfo = parseJwt(authToken);
  console.log(userInfo);

  const orderData = {
    user: {
      user_id: userInfo.user_id,
    },
    catagory: "drink",
    status: "Pending",
    items: drinkCart,
    payment: {
      amount: 30.5,
      payment_method: "Credit Card",
      status: "Paid",
    },
  };

  console.log(drinkCart);
  console.log(typeof drinkCart);
  console.log(orderData);
  fetch("http://localhost:3333/order/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Order submission failed.");
      drinkCart = [];
      updateDrinkCart();
      saveDrinkCartToLocalStorage();
      console.log("Order placed successfully!");
    })
    .catch((error) => {
      console.log(
        "An error occurred while placing your order. Please try again."
      );
      console.error(error);
    });
}

// Load cart from local storage on page load
loadDrinkCartFromLocalStorage();

drinkPlaceOrderButton.addEventListener("click", placeDrinkOrder);

// Initial display of drink items
displayDrinkItems();
