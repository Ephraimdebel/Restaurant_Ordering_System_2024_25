type foodItem = {
  id: number;
  name: string;
  price: number;
  imageurl: string;
  description: string; // Optional description
  amount?: number; // Optional amount
};

const foodlist: HTMLElement = document.getElementById("food-list")!;
const cartitems: HTMLElement = document.getElementById("cart-items")!;
const placeorderbutton: HTMLElement = document.getElementById("place-order")!;
const cartlength: HTMLElement = document.getElementById("cart-length")!;
const cartbutton = document.getElementById("cart-button") as HTMLImageElement;

let Cart: foodItem[] = [];
let Products: foodItem[] = [];

async function fetchItems(): Promise<void> {
  try {
    const response = await fetch("http://192.168.0.100:3333/menu/2");
    if (!response.ok) throw new Error("Failed to fetch food items.");
    const data: foodItem[] = await response.json();
    Products = data.map((item) => ({ ...item, price: Number(item.price) }));

    console.log("Fetched food items:", Products);
    DisplayFoodItems();
  } catch (error) {
    console.error("Error fetching food items:", error);
  }
}

fetchItems();

function addMenu() {
  const editForm = document.getElementById("addMenu") as HTMLFormElement;
  const addSubmit = document.getElementById(
    "add-submit-button"
  ) as HTMLButtonElement;

  console.log(editForm);
  addSubmit.addEventListener("click", async (event: Event) => {
    event.preventDefault();
    const name = (document.getElementById("add-menu-name") as HTMLInputElement)
      .value;
    const price = (
      document.getElementById("add-menu-price") as HTMLInputElement
    ).value;
    const image = (
      document.getElementById("add-image-preview") as HTMLInputElement
    ).value;
    const description = (
      document.getElementById("add-menu-description") as HTMLInputElement
    ).value;
    const catagoryId = 3;
    const data = {
      name,
      price,
      image,
      description,
      catagoryId,
    };
    console.log(data);

    fetch(`http://192.168.0.100:3333/menu/create`, {
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
          message.style.backgroundColor = "green";
          setTimeout(() => {
            message.style.display = "none";
          }, 2000);
          DisplayFoodItems();
        } else {
          const message = document.getElementById("message")!;
          message.style.display = "block";
          message.textContent = "An error occurred";
          message.style.color = "white";
          message.style.backgroundColor = "red";
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
function deleteMenu() {
  document.querySelectorAll("#deleteBtn").forEach((button) => {
    console.log("delete button clicked");
    button.addEventListener("click", (event) => {
      const deleteIndex = (event.target as HTMLElement).getAttribute("data-id");
      console.log(deleteIndex);
      fetch(`http://192.168.0.100:3333/menu/${deleteIndex}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            const message = document.getElementById("message")!;

            message.textContent = "Item deleted successfully";
            console.log("Item deleted successfully");

            message.style.display = "block";
            message.style.color = "white";
            message.style.backgroundColor = "green";
            setTimeout(() => {
              message.style.display = "none";
            }, 2000);
            DisplayFoodItems();
          } else {
            const message = document.getElementById("message")!;
            message.style.display = "block";
            message.textContent = "An error occurred";
            message.style.color = "white";
            message.style.backgroundColor = "red";
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
}
function editMenu() {
  document.querySelectorAll("#editBtn").forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log("edit button clicked");

      const editIndex = (event.target as HTMLElement).getAttribute("data-id");
      console.log(editIndex);

      const editForm = document.getElementById("editmenu") as HTMLFormElement;
      const submit = document.getElementById(
        "edit-submit-button"
      ) as HTMLFormElement;
      console.log(editForm);
      editForm.style.display = "block";
      submit.addEventListener("click", async (event: Event) => {
        event.preventDefault();
        const name = (
          document.getElementById("edit-menu-name") as HTMLInputElement
        ).value;
        const price = (
          document.getElementById("edit-menu-price") as HTMLInputElement
        ).value;
        const image = (
          document.getElementById("edit-image-preview") as HTMLInputElement
        ).value;
        const desc = (
          document.getElementById("edit-menu-description") as HTMLInputElement
        ).value;
        const catagory = (
          document.getElementById("edit-menu-category") as HTMLInputElement
        ).value;
        const data = {
          name,
          price,
          image,
          desc,
        };
        console.log(data);

        fetch(`http://192.168.0.100:3333/menu/${editIndex}`, {
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
              message.style.backgroundColor = "green";
              setTimeout(() => {
                message.style.display = "none";
              }, 2000);
              DisplayFoodItems();
            } else {
              const message = document.getElementById("message")!;
              message.style.display = "block";
              message.textContent = "An error occurred";
              message.style.color = "white";
              message.style.backgroundColor = "red";
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
  });
}
function injectData() {
  foodlist.innerHTML = "";
  Products.forEach((food) => {
    const item = document.createElement("div");
    item.className = "food-item";
    item.innerHTML = `
      <img src="${food.imageurl}" alt="${food.name}" />
      <h3>${food.name}</h3>
      <p>${food.description}</p>
      <p><strong>$${food.price.toFixed(2)}</strong></p>
      <button class="add-to-cart" id="editBtn" data-id="${
        food.id
      }">Edit</button>
      <button class="add-to-cart" id="deleteBtn" data-id="${
        food.id
      }">Remove</button>
    `;
    foodlist.appendChild(item);
  });
}
// Display food items
function DisplayFoodItems(): void {
  injectData();
  addMenu();
  deleteMenu();
  editMenu();
}
DisplayFoodItems();
