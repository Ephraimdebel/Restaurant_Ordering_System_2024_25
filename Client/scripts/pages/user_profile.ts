interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: { id: number; date: string; items: string[]; total: number }[];
}

// Sample user data
let userProfile: UserProfile;
const authToken = sessionStorage.getItem("authToken");
if (!authToken) {
  alert("User is not authenticated. Redirecting to login.");
  window.location.href = "/pages/login.html";
  return;
}

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
    // Set avatar image source

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
  avatarElement.innerHTML = initials;
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
    (document.getElementById("password") as HTMLInputElement).value =
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
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Update userProfile with new data
    const userProfile = {
      name: (document.getElementById("name") as HTMLInputElement).value.trim(),
      email: (
        document.getElementById("email") as HTMLInputElement
      ).value.trim(),
      phone: (
        document.getElementById("phone") as HTMLInputElement
      ).value.trim(),
      address: (
        document.getElementById("address") as HTMLInputElement
      ).value.trim(),
    };

    // Validate inputs
    if (
      !userProfile.name ||
      !userProfile.email ||
      !userProfile.phone ||
      !userProfile.address
    ) {
      alert("All fields are required!");
      return;
    }

    // Get auth token
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) {
      alert("User is not authenticated. Redirecting to login.");
      window.location.href = "/pages/login.html";
      return;
    }

    // Parse user ID from JWT
    try {
      const parseJWT = (token: string) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(jsonPayload);
      };
      const userId = parseJWT(authToken).user_id;

      // Send PUT request to update user data
      const response = await fetch(`http://10.5.90.145:3333/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(userProfile),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Profile updated successfully!");
        console.log("Success:", data);

        // Optionally hide the form
        const editForm = document.getElementById("editForm")!;
        editForm.style.display = "none";
      } else {
        const error = await response.json();
        console.error("Error:", error);
        alert(`Failed to update profile: ${error.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error parsing JWT or making request:", err);
      alert("An error occurred. Please try again.");
    }
  });
});
