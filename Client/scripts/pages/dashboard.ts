// Mock data for orders
let orders = [
    { id: 1, customerName: "John Doe", items: "Pizza, Soda", totalPrice: 20, status: "Pending" },
    { id: 2, customerName: "Jane Smith", items: "Burger, Fries", totalPrice: 15, status: "Completed" },
  ];
  
  // Add Menu Item
  document.getElementById("menu-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLInputElement).value;
    const price = parseFloat((document.getElementById("price") as HTMLInputElement).value);
    const category = (document.getElementById("category") as HTMLInputElement).value;
  
    console.log(`Menu Item Added: ${name}, ${description}, ${price}, ${category}`);
    alert("Menu item added successfully!");
  });
  
  // Load Orders into Table
  function loadOrders() {
    const tableBody = document.querySelector("#orders-table tbody");
    if (!tableBody) return;
  
    tableBody.innerHTML = "";
    orders.forEach(order => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${order.id}</td>
        <td>${order.customerName}</td>
        <td>${order.items}</td>
        <td>${order.totalPrice}</td>
        <td>${order.status}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Add Admin
  document.getElementById("admin-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
  
    console.log(`Admin Added: ${username}, ${email}`);
    alert("Admin added successfully!");
  });
  
  // Initial Load
  loadOrders();
  