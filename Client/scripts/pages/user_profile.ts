interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  orders: { id: number; date: string; items: string[]; total: number }[];
}

// Sample user data
const userProfile: UserProfile = {
  name: "Systemd Admin",
  email: "systemd@linux.com",
  phone: "0978556748",
  avatar: "https://via.placeholder.com/150",
  address: "addis ababa, Ethiopia",
  orders: [
    { id: 1, date: "2025-01-01", items: ["Pizza", "Soda"], total: 25.99 },
    { id: 2, date: "2025-01-03", items: ["Burger", "Fries"], total: 18.5 },
    { id: 3, date: "2025-01-05", items: ["Pasta", "Wine"], total: 32.75 },
  ],
};

// Populate user profile data
document.addEventListener("DOMContentLoaded", () => {
  const nameElement = document.getElementById("profile-name")!;
  const emailElement = document.getElementById("profile-email")!;
  const phoneElement = document.getElementById("profile-phone")!;
  const addressElement = document.getElementById("profile-address")!;
  const avatarElement = document.getElementById(
    "profile-avatar"
  ) as HTMLImageElement;
  const orderHistoryElement = document.getElementById("order-history")!;

  // Set user profile details
  nameElement.textContent = "Name: " + userProfile.name;
  emailElement.textContent = "Email: " + userProfile.email;
  phoneElement.textContent = "Phone: " + userProfile.phone;
  addressElement.textContent = "Address: " + userProfile.address;
  const initials = userProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  avatarElement.alt = initials;
  avatarElement.textContent = `${initials}`;

  // Add order history
  userProfile.orders.forEach((order) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `
      <strong>Order #${order.id}</strong><br>
      Date: ${order.date}<br>
      Items: ${order.items.join(", ")}<br>
      Total: $${order.total.toFixed(2)}
    `;
    orderHistoryElement.appendChild(listItem);
  });

  // Edit profile button
  const editProfileBtn = document.getElementById("edit-profile-btn")!;
  editProfileBtn.addEventListener("click", () => {
    // alert("Edit profile feature coming soon!");
  });
});
