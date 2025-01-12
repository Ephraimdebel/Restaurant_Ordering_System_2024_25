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
    const response = await fetch("http://localhost:3333/menu/2");
    if (!response.ok) throw new Error("Failed to fetch food items.");
    const data: foodItem[] = await response.json();
    Products = data.map((item) => ({ ...item, price: Number(item.price) }));
    injectData();
    console.log("Fetched food items:", Products);
  } catch (error) {
    console.error("Error fetching food items:", error);
  }
}
const addbtn = document.getElementById("addmenubtn") as HTMLButtonElement;
addbtn.addEventListener("click", () => {
  const addMenu = document.getElementById("addMenu") as HTMLFormElement;
  addMenu.style.display != "none"
    ? (addMenu.style.display = "none")
    : (addMenu.style.display = "block");
});
const doneEditing = document.getElementById("doneEditing") as HTMLButtonElement;
doneEditing.addEventListener("click", () => {
  const addMenu = document.getElementById("addMenu") as HTMLFormElement;
  addMenu.style.display = "none";
});

async function addMenu(): Promise<void> {
  const editForm = document.getElementById("addMenu") as HTMLFormElement;
  const addSubmit = document.getElementById(
    "add-submit-button"
  ) as HTMLButtonElement;

  addSubmit.addEventListener("click", async (event: Event) => {
    event.preventDefault();
    const menuTable = document.getElementById("addMenu") as HTMLFormElement;
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
    const data = { name, price, image, description, catagoryId };

    try {
      const response = await fetch(`http://localhost:3333/menu/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const message = document.getElementById("message")!;
      if (response.ok) {
        message.textContent = "Item Added successfully";
        message.style.color = "white";
        message.style.backgroundColor = "green";
        menuTable.style.display = "none";
        update();
      } else {
        message.textContent = "An error occurred";
        message.style.color = "white";
        message.style.backgroundColor = "red";
      }
      message.style.display = "block";
      setTimeout(() => {
        message.style.display = "none";
      }, 2000);
      injectData();
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

async function deleteMenu(): Promise<void> {
  document.querySelectorAll("#deleteBtn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const deleteIndex = (event.target as HTMLElement).getAttribute("data-id");

      try {
        const response = await fetch(
          `http://localhost:3333/menu/${deleteIndex}`,
          { method: "DELETE" }
        );

        const message = document.getElementById("message")!;
        if (response.ok) {
          message.textContent = "Item deleted successfully";
          message.style.color = "white";
          message.style.backgroundColor = "green";
          update();
        } else {
          message.textContent = "An error occurred";
          message.style.color = "white";
          message.style.backgroundColor = "red";
        }
        message.style.display = "block";
        setTimeout(() => {
          message.style.display = "none";
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
}

async function editMenu(): Promise<void> {
  document.querySelectorAll("#editBtn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const editIndex = (event.target as HTMLElement).getAttribute("data-id");

      const editForm = document.getElementById("editmenu") as HTMLFormElement;
      const submit = document.getElementById(
        "edit-submit-button"
      ) as HTMLFormElement;
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
        const description = (
          document.getElementById("edit-menu-description") as HTMLInputElement
        ).value;
        const data = { name, price, image, description };

        try {
          const response = await fetch(
            `http://localhost:3333/menu/${editIndex}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }
          );

          const message = document.getElementById("message")!;
          if (response.ok) {
            editForm.style.display = "none";
            message.textContent = "Item Updated successfully";
            message.style.color = "white";
            message.style.backgroundColor = "green";
            update();
          } else {
            message.textContent = "An error occurred";
            message.style.color = "white";
            message.style.backgroundColor = "red";
          }

          message.style.display = "block";
          setTimeout(() => {
            message.style.display = "none";
          }, 2000);
        } catch (error) {
          console.error("Error:", error);
        }
      });
    });
  });
}

function injectData(): void {
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
  editDelete();
}
function editDelete() {
  addMenu();
  deleteMenu();
  editMenu();
}

fetchItems();
function update() {
  fetchItems();
  setTimeout(update, 5000);
}
