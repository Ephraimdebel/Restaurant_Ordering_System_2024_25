// Fetch orders from the API
interface Order {
    id: number;
    status: string;
    items: any[];
    user: {
      name: string;
    };
    payment?: {
      amount: number;
    };
  }
  
  async function fetchOrders(): Promise<Order[]> {
    try {
      const response = await fetch('http://localhost:3333/order/orders');
  
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }
  
  // Format and display the order data in the table
  function formatOrder(order: Order): string {
    // Safely access user and handle null/undefined
    const userName = order.user ? order.user.name : 'Unknown User';
  
    // Format items and ensure it's an array (it may not be if there's no items)
    const items = order.items && Array.isArray(order.items)
      ? order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')
      : 'No items';
  
    return `
      <tr id="order-${order.id}">
        <td>${order.id}</td>
        <td class="customer-name">${userName}</td>
        <td class="order-items">${items}</td>
        <td class="total-price">$${order.payment ? order.payment.amount.toFixed(2) : '0.00'}</td>
        <td>${order.status}</td>
        <td>
          <button class="btn btn-warning" onclick="editOrder(${order.id})">Edit</button>
          <button class="btn btn-danger" onclick="deleteOrder(${order.id})">Delete</button>
        </td>
      </tr>
    `;
  }
  
  // Render orders to the front-end
  async function renderOrders() {
    const ordersTableBody = document.querySelector('#orders-table tbody') as HTMLTableSectionElement;
    const orders = await fetchOrders();
  
    if (orders.length === 0) {
      ordersTableBody.innerHTML = '<tr><td colspan="6">No orders available.</td></tr>';
    } else {
      ordersTableBody.innerHTML = orders.map(order => formatOrder(order)).join('');
    }
  }
  
  // Handle editing an order
  function editOrder(orderId: number) {
    const order = document.querySelector(`#order-${orderId}`) as HTMLTableRowElement;
    if (!order) return;
  
    // Extract the data you want to edit from the row
    const customerName = order.querySelector('.customer-name')?.textContent || '';
    const items = order.querySelector('.order-items')?.textContent || '';
    const totalPrice = order.querySelector('.total-price')?.textContent || '0.00';
  
    // Populate the edit form with the current data
    (document.getElementById('edit-order-id') as HTMLInputElement).value = orderId.toString();
    (document.getElementById('edit-customer-name') as HTMLInputElement).value = customerName;
    (document.getElementById('edit-items') as HTMLInputElement).value = items;
    (document.getElementById('edit-total-price') as HTMLInputElement).value = totalPrice;
  
    // Open the edit modal (or show the edit form)
    // Assuming you have a modal, you can show it here
    const editModal = document.getElementById('edit-modal') as HTMLElement;
    if (editModal) {
      editModal.style.display = 'block'; // Example, make the modal visible
    }
  }
  
  // Handle updating an order
  async function updateOrder(orderId: number) {
    const status = (document.getElementById('edit-status') as HTMLSelectElement).value;
    const customerName = (document.getElementById('edit-customer-name') as HTMLInputElement).value;
    const items = (document.getElementById('edit-items') as HTMLInputElement).value.split(','); // You can split the string or transform as needed
    const totalPrice = parseFloat((document.getElementById('edit-total-price') as HTMLInputElement).value);
  
    const updatedOrder = {
      status,
      items: items.map(item => ({ name: item.trim(), quantity: 1, total_price: totalPrice })), // Adjust according to your schema
      payment: { amount: totalPrice, status: 'Paid', payment_method: 'Credit Card' }, // Example, adjust based on your actual data
    };
  
    const response = await fetch(`http://localhost:3333/order/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedOrder),
    });
  
    if (response.ok) {
      alert('Order updated successfully');
      renderOrders(); // Refresh the order list
    } else {
      alert('Failed to update order');
    }
  }
  
  // Handle deleting an order
  async function deleteOrder(orderId: number) {
    const confirmation = confirm('Are you sure you want to delete this order?');
    if (confirmation) {
      const response = await fetch(`http://localhost:3333/order/${orderId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Order deleted successfully');
        renderOrders(); // Refresh the order list
      } else {
        alert('Failed to delete order');
      }
    }
  }
  
  // Render orders when the page is loaded
  window.onload = renderOrders;
  