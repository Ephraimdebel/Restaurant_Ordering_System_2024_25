type FoodItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc?: string; // Optional description
  amount?: number; // Optional amount
};

const foodList: HTMLElement = document.getElementById("food-list")!;
const cartItems: HTMLElement = document.getElementById("cart-items")!;
const placeOrderButton: HTMLElement = document.getElementById("place-order")!;
const cartLength: HTMLElement = document.getElementById("cart-length")!;
const cartButton = document.getElementById("cart-button") as HTMLImageElement;

let cart: FoodItem[] = [];
const products: FoodItem[] = [
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

// Display food items
function displayFoodItems(): void {
  foodList.innerHTML = "";
  products.forEach((food) => {
    const item = document.createElement("div");
    item.className = "food-item";
    item.innerHTML = `
      <img src="${food.image}" alt="${food.name}" />
      <h3>${food.name}</h3>
      <p>${food.desc}</p>
      <p><strong>$${food.price.toFixed(2)}</strong></p>
      <button class="add-to-cart" data-id="${food.id}">Add to Cart</button>
    `;
    foodList.appendChild(item);
  });

  // Attach event listeners for "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) =>
    button.addEventListener("click", () => {
      const foodId = parseInt((button as HTMLElement).getAttribute("data-id")!);
      addToCart(foodId);
      showsMessages("Item added to cart!");
    })
  );
}

function showsMessages(message: string): void {
  const messageDiv = document.getElementById("message")!;
  messageDiv.textContent = message;
  messageDiv.style.display = "block";
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 2000);
}

// Add to cart
function addToCart(foodId: number): void {
  const food = products.find((item) => item.id === foodId);
  if (!food) return;
  const existingItem = cart.find((item) => item.id === foodId);
  if (existingItem) {
    existingItem.amount += 1;
  } else {
    cart.push({ ...food, amount: 1 });
  }

  updateCart();
  saveCartToLocalStorage();
}

// Delete from cart
function deleteFromCart(foodId: number): void {
  cart = cart.filter((item) => item.id !== foodId);
  updateCart();
  saveCartToLocalStorage();
}

// Update cart UI
function updateCart(): void {
  cartLength.textContent = cart.length.toString();
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartButton.src = "../assets/img/empty.svg";
    return;
  }

  cartButton.src = "../assets/img/cart.svg";
  let totalCost = 0;

  const maxLength = Math.max(...cart.map((item) => item.name.length));
  const headerRow = document.createElement("li");
  headerRow.classList.add("cart-header");
  headerRow.innerHTML = `<span style="display: inline-block; font-weight:bold;width: ${maxLength}ch;">Item</span><span style="font-weight:bold;">Quantity</span><span style="font-weight:bold;">Price Each</span><span style="font-weight:bold;">Delete</span>`;
  cartItems.appendChild(headerRow);
  cart.forEach((item, index) => {
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
      = $${item.price.toFixed(2)} * ${item.amount.toFixed(0)}
      </span>`;
    const headerRow = document.createElement("li");

    totalCost += item.price * item.amount;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteFromCart(item.id));

    li.appendChild(deleteButton);
    cartItems.appendChild(li);
  });

  const totalCostElement = document.createElement("p");
  totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
  cartItems.appendChild(totalCostElement);

  // Attach event listeners for amount dropdowns
  const amountDropdowns = document.querySelectorAll(".item-amount");
  amountDropdowns.forEach((dropdown) => {
    const selectElement = dropdown as HTMLSelectElement;

    selectElement.addEventListener("change", (event) => {
      const foodId = parseInt(selectElement.getAttribute("data-id")!);
      const newAmount = parseInt(selectElement.value);
      updateItemAmount(foodId, newAmount);
    });
  });
}

// Update item amount in cart
function updateItemAmount(foodId: number, newAmount: number): void {
  const item = cart.find((item) => item.id === foodId);
  if (item) {
    item.amount = newAmount;
    updateCart();
    saveCartToLocalStorage();
  }
}

// Save cart to local storage
function saveCartToLocalStorage(): void {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from local storage
function loadCartFromLocalStorage(): void {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
}

// Place order
interface JwtPayload {
  phone: string;
  email: string;
  name: string;
  address: string;
}

function parseJWT(token: string): JwtPayload {
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

function placeOrder(): void {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items before placing an order!");
    return;
  }

  const authToken = sessionStorage.getItem("authToken");
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

  const userInfo = parseJWT(authToken);

  const orderData = {
    user: {
      phone: userInfo.phone,
      email: userInfo.email,
      name: userInfo.name,
      address: userInfo.address,
    },
    items: cart,
  };

  fetch("https://reqres.in/api/foods", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Order submission failed.");
      cart = [];
      updateCart();
      saveCartToLocalStorage();
      alert("Order placed successfully!");
    })
    .catch((error) => {
      alert("An error occurred while placing your order. Please try again.");
      console.error(error);
    });
}

// Load cart from local storage on page load
loadCartFromLocalStorage();

placeOrderButton.addEventListener("click", placeOrder);

// Initial display of food items
displayFoodItems();
