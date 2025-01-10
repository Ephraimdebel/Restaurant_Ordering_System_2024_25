var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
// Mock Orders Data
const orders = [
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
const API_URL = "https://example.com/api/orders"; // Replace with your backend API URL
// Function to send edit request to backend
const updateOrderInBackend = (order) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${API_URL}/${order.orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
        if (!response.ok) {
            throw new Error(`Failed to update order: ${response.statusText}`);
        }
        console.log(`Order ${order.orderId} updated successfully`);
    }
    catch (error) {
        console.error("Error updating order:", error);
    }
});
// Function to send delete request to backend
const deleteOrderFromBackend = (orderId) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${API_URL}/${orderId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Failed to delete order: ${response.statusText}`);
        }
        console.log(`Order ${orderId} deleted successfully`);
    }
    catch (error) {
        console.error("Error deleting order:", error);
    }
});
// Function to handle delete button click
const handleDeleteOrder = (orderId) => {
    const orderIndex = orders.findIndex((order) => order.orderId === orderId);
    if (orderIndex > -1) {
        orders.splice(orderIndex, 1);
        renderOrders();
    }
    deleteOrderFromBackend(orderId);
};
// Function to handle edit button click
const handleEditOrder = (orderId) => {
    const order = orders.find((o) => o.orderId === orderId);
    if (!order)
        return;
    const editCard = document.querySelector("#edit-card");
    const orderIdInput = document.querySelector("#edit-order-id");
    const customerNameInput = document.querySelector("#edit-customer-name");
    const itemsInput = document.querySelector("#edit-items");
    const totalPriceInput = document.querySelector("#edit-total-price");
    const statusSelect = document.querySelector("#edit-status");
    orderIdInput.value = order.orderId.toString();
    customerNameInput.value = order.customerName;
    itemsInput.value = order.items;
    totalPriceInput.value = order.totalPrice.toString();
    statusSelect.value = order.status;
    editCard.style.display = "block";
};
// Function to save edited order
const saveEditedOrder = () => {
    const orderIdInput = document.querySelector("#edit-order-id");
    const customerNameInput = document.querySelector("#edit-customer-name");
    const itemsInput = document.querySelector("#edit-items");
    const totalPriceInput = document.querySelector("#edit-total-price");
    const statusSelect = document.querySelector("#edit-status");
    const orderId = parseInt(orderIdInput.value, 10);
    const orderIndex = orders.findIndex((order) => order.orderId === orderId);
    if (orderIndex === -1)
        return;
    const updatedOrder = {
        orderId,
        customerName: customerNameInput.value,
        items: itemsInput.value,
        totalPrice: parseFloat(totalPriceInput.value),
        status: statusSelect.value,
    };
    orders[orderIndex] = updatedOrder;
    renderOrders();
    updateOrderInBackend(updatedOrder);
    const editCard = document.querySelector("#edit-card");
    editCard.style.display = "none";
};
// Render orders
const renderOrders = () => {
    const tableBody = document.querySelector("#orders-table tbody");
    tableBody.innerHTML = "";
    orders.forEach((order) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${order.orderId}</td>
          <td>${order.customerName}</td>
          <td>${order.items}</td>
          <td>$${order.totalPrice.toFixed(2)}</td>
          <td>${order.status}</td>
          <td>
              <button class="edit-btn" data-order-id="${order.orderId}">Edit</button>
              <button class="delete-btn" data-order-id="${order.orderId}">Delete</button>
          </td>
      `;
        tableBody.appendChild(row);
    });
    document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target;
            const orderId = parseInt(target.dataset.orderId || "0", 10);
            handleEditOrder(orderId);
        });
    });
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target;
            const orderId = parseInt(target.dataset.orderId || "0", 10);
            handleDeleteOrder(orderId);
        });
    });
};
// Close the edit card
(_a = document.querySelector("#close-edit-card")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const editCard = document.querySelector("#edit-card");
    editCard.style.display = "none";
});
// Save the edited order
(_b = document.querySelector("#save-edit")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", saveEditedOrder);
// Initial rendering
document.addEventListener("DOMContentLoaded", renderOrders);
