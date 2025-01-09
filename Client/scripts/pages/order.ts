// Mock Orders Data
interface Order {
    orderId: number;
    customerName: string;
    items: string;
    totalPrice: number;
    status: string;
  }
  
  const orders: Order[] = [
    {
      orderId: 101,
      customerName: "Alice Johnson",
      items: "Burger, Fries",
      totalPrice: 15.99,
      status: "Pending",
    },
    {
      orderId: 102,
      customerName: "Bob Smith",
      items: "Pizza, Soda",
      totalPrice: 18.5,
      status: "Completed",
    },
    {
      orderId: 103,
      customerName: "Charlie Brown",
      items: "Salad, Water",
      totalPrice: 12.75,
      status: "In Progress",
    },
  ];
  
  // Function to render orders in the table
  const renderOrders = () => {
    const tableBody = document.querySelector("#orders-table tbody") as HTMLTableSectionElement;
  
    // Clear existing rows
    tableBody.innerHTML = "";
  
    // Populate rows
    orders.forEach((order) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${order.orderId}</td>
        <td>${order.customerName}</td>
        <td>${order.items}</td>
        <td>$${order.totalPrice.toFixed(2)}</td>
        <td>${order.status}</td>
      `;
  
      tableBody.appendChild(row);
    });
  };
  
  // Call renderOrders on page load
  document.addEventListener("DOMContentLoaded", renderOrders);
  