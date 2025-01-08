interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  orders: { id: number; date: string; items: string[]; total: number }[];
}

// Sample user data
let userProfile: UserProfile;

fetch("/api/getUserProfile")
  .then((response) => response.json())
  .then((data) => {
    userProfile = data;

    // Populate user profile data
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
    avatarElement.src = userProfile.avatar; // Set avatar image source

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
  })
  .catch((error) => {
    console.error("Error fetching user profile:", error);
  });

userProfile = {
  name: "Systemd Admin",
  email: "systemd@linux.com",
  phone: "0978556748",
  avatar: "https://via.placeholder.com/150",
  address: "Addis Ababa, Ethiopia",
  orders: [
    // { id: 1, date: "2025-01-01", items: ["Pizza", "Soda"], total: 25.99 },
    // { id: 2, date: "2025-01-03", items: ["Burger", "Fries"], total: 18.5 },
    // { id: 3, date: "2025-01-05", items: ["Pasta", "Wine"], total: 32.75 },
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
  avatarElement.src = userProfile.avatar; // Set avatar image source

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
    const editForm = document.getElementById("editForm")!;
    editForm.style.display = "block";

    // Populate form fields with current user data
    (document.getElementById("name") as HTMLInputElement).value =
      userProfile.name;
    (document.getElementById("email") as HTMLInputElement).value =
      userProfile.email;
    (document.getElementById("phone") as HTMLInputElement).value =
      userProfile.phone;
    (document.getElementById("address") as HTMLInputElement).value =
      userProfile.address;
  });

  // Close form button
  const closeFormButton = document.getElementById("closeForm")!;
  closeFormButton.addEventListener("click", () => {
    const editForm = document.getElementById("editForm")!;
    editForm.style.display =
      editForm.style.display === "none" ? "block" : "none";
  });

  // Handle form submission
  const signupForm = document.getElementById("signupForm") as HTMLFormElement;
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Update userProfile with new data
    userProfile.name = (
      document.getElementById("name") as HTMLInputElement
    ).value;
    userProfile.email = (
      document.getElementById("email") as HTMLInputElement
    ).value;
    userProfile.phone = (
      document.getElementById("phone") as HTMLInputElement
    ).value;
    userProfile.address = (
      document.getElementById("address") as HTMLInputElement
    ).value;

    // Update displayed profile info
    nameElement.textContent = "Name: " + userProfile.name;
    emailElement.textContent = "Email: " + userProfile.email;
    phoneElement.textContent = "Phone: " + userProfile.phone;
    addressElement.textContent = "Address: " + userProfile.address;
    console.log(userProfile);
    // Post updated profile to the database

    fetch("/api/updateUserProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userProfile),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Optionally hide the form after saving
    const editForm = document.getElementById("editForm")!;
    editForm.style.display = "none";
  });
});
