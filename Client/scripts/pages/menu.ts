type foodItem = {
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
function DisplayFoodItems(): void {
  foodList.innerHTML = "";
  products.forEach((food) => {
    const item = document.createElement("div");
    item.className = "food-item";
    item.innerHTML = `
      <img src="${food.image}" alt="${food.name}" />
      <h3>${food.name}</h3>
      <p>${food.desc}</p>
      <p><strong>$${food.price.toFixed(2)}</strong></p>
      <button class="add-to-cart" id="editBtn" data-id="${food.id}">Edit</button>
      <button class="add-to-cart" id="deleteBtn" data-id="${food.id}">Remove</button>
    `;
    foodList.appendChild(item);
  });
}
DisplayFoodItems()


document.querySelectorAll("#deleteBtn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const deleteIndex = (event.target as HTMLElement).getAttribute("data-id");
    fetch(`http://10.5.90.145:3333/menu/${deleteIndex}`, {
      method: "DELETE",
      
    })
      .then((response) => {
        if (response.ok) {
          const message = document.getElementById("message")!;

          message.textContent = "Item deleted successfully";
          console.log("Item deleted successfully");
          
          message.style.display = "block";
          message.style.color = "white";
          message.style.backgroundColor = "green"
          setTimeout(() => {
            message.style.display = "none";
          }, 2000);
          DisplayFoodItems();
        } else {
          const message = document.getElementById("message")!;
          message.style.display = "block";
          message.textContent = "An error occurred";
          message.style.color = "white";
              message.style.backgroundColor = "red"
          setTimeout(() => {
           message.style.display = "none";
          }, 2000);
          
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

document.querySelectorAll("#editBtn").forEach((button) => {
 
  button.addEventListener("click", (event) => {
    console.log("edit button clicked");

    const editIndex = (event.target as HTMLElement).getAttribute("data-id");
  console.log(editIndex);

    const editForm = document.getElementById("editmenu") as HTMLFormElement;
    const submit = document.getElementById("edit-submit-button") as HTMLFormElement;
    console.log(editForm);
    editForm.style.display = "block";
    submit.addEventListener("click", async (event: Event) => {
      event.preventDefault();
      const name = (document.getElementById("edit-menu-name") as HTMLInputElement).value;
      const price = (document.getElementById("edit-menu-price") as HTMLInputElement).value;
      const image = (document.getElementById("edit-image-preview") as HTMLInputElement).value;
      const desc = (document.getElementById("edit-menu-description") as HTMLInputElement).value;
      const catagory = (document.getElementById("edit-menu-category") as HTMLInputElement).value;
      const data = {
        name,
        price,
        image,
        desc,
      };
      console.log(data);
    

    fetch(`http://10.5.90.145:3333/menu/${editIndex}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          const message = document.getElementById("message")!;

          message.textContent = "Item Updated successfully";
          console.log("Item Updated successfully");
          
          message.style.display = "block";
          message.style.color = "white";
          message.style.backgroundColor = "green"
          setTimeout(() => {
            message.style.display = "none";
          }, 2000);
          DisplayFoodItems();
        } else {
          const message = document.getElementById("message")!;
          message.style.display = "block";
          message.textContent = "An error occurred";
          message.style.color = "white";
              message.style.backgroundColor = "red"
          setTimeout(() => {
           message.style.display = "none";
          }, 2000);
          
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  }
  )
  }
  );



    const editForm = document.getElementById("addMenu") as HTMLFormElement;
    const addSubmit = document.getElementById("add-submit-button") as HTMLButtonElement;
    console.log(editForm);
    addSubmit.addEventListener("click", async (event: Event) => {
      event.preventDefault();
      const name = (document.getElementById("add-menu-name") as HTMLInputElement).value;
      const price = (document.getElementById("add-menu-price") as HTMLInputElement).value;
      const image = (document.getElementById("add-image-preview") as HTMLInputElement).value;
      const description = (document.getElementById("add-menu-description") as HTMLInputElement).value;
      const catagoryId = 3;
      const data = {
        name,
        price,
        image,
        description,
        catagoryId
      };
      console.log(data);
    

    fetch(`http://10.5.90.145:3333/menu/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          const message = document.getElementById("message")!;

          message.textContent = "Item Added successfully";
          console.log("Item Added successfully");
          
          message.style.display = "block";
          message.style.color = "white";
          message.style.backgroundColor = "green"
          setTimeout(() => {
            message.style.display = "none";
          }, 2000);
          DisplayFoodItems();
        } else {
          const message = document.getElementById("message")!;
          message.style.display = "block";
          message.textContent = "An error occurred";
          message.style.color = "white";
              message.style.backgroundColor = "red"
          setTimeout(() => {
           message.style.display = "none";
          }, 2000);
          
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  

  