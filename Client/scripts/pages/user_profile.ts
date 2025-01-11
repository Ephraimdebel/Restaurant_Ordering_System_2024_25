interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  user_id: number;
  orders: { id: number; date: string; items: string[]; total: number }[];
}

// Sample user data
let userProfile: UserProfile;
interface JwtPayload {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  roleId: number;
  user_id: number;
}

function parseJWT(token: string): JwtPayload {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const authToken = sessionStorage.getItem("authToken");
if (!authToken) {
  const message = "User is not authenticated. Please log in.";
  document.getElementById("message")!.textContent = message;
  document.getElementById("message")!.style.display = "block";
  setTimeout(() => {
    document.getElementById("message")!.style.display = "none";
  }, 2000);
  setTimeout(() => {
    window.location.pathname = "Client/pages/login.html";
  }, 2000);
}

const userInfo = parseJWT(authToken);
userProfile = {
  name: userInfo.name,
  email: userInfo.email,
  phone: userInfo.phoneNumber,
  address: userInfo.role,
  user_id: userInfo.user_id,
  orders: [],
};

// Populate user profile data
document.addEventListener("DOMContentLoaded", () => {
  const nameElement = document.getElementById("profile-name")!;
  const emailElement = document.getElementById("profile-email")!;
  const phoneElement = document.getElementById("profile-phone")!;
  const avatarElement = document.getElementById(
    "profile-avatar"
  ) as HTMLImageElement;
  const orderHistoryElement = document.getElementById("order-history")!;

  // Set user profile details
  nameElement.textContent = "Name: " + userProfile.name;
  emailElement.textContent = "Email: " + userProfile.email;
  phoneElement.textContent = "Phone: " + userProfile.phone;
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
    orderHistoryElement.appendChild(listItem);
  });

//   // Edit profile button
//   const editProfileBtn = document.getElementById("edit-profile-btn")!;
//   editProfileBtn.addEventListener("click", () => {
//     const editForm = document.getElementById("editForm")!;
//     editForm.style.display = "block";

    // Populate form fields with current user data
    (document.getElementById("name") as HTMLInputElement).value =
      userProfile.name;
    (document.getElementById("email") as HTMLInputElement).value =
      userProfile.email;
    (document.getElementById("phone") as HTMLInputElement).value =
      userProfile.phone;
    (document.getElementById("password") as HTMLInputElement).value = "";
  });

//   // Close form button
//   const closeFormButton = document.getElementById("closeForm")!;
//   closeFormButton.addEventListener("click", () => {
//     const editForm = document.getElementById("editForm")!;
//     editForm.style.display =
//       editForm.style.display === "none" ? "block" : "none";
//   });
//   // Handle form submission
//   const signupForm = document.getElementById("signupForm") as HTMLFormElement;
//   signupForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

    // Update userProfile with new data
    userProfile.name = (
      document.getElementById("name") as HTMLInputElement
    ).value.trim();
    userProfile.email = (
      document.getElementById("email") as HTMLInputElement
    ).value.trim();
    userProfile.phone = (
      document.getElementById("phone") as HTMLInputElement
    ).value.trim();
    const password = (
      document.getElementById("password") as HTMLInputElement
    ).value.trim();

    // Validate inputs
    if (!userProfile.name || !userProfile.email || !userProfile.phone) {
      alert("All fields are required!");
      return;
    }
    console.log(userProfile);
    try {
      // Send PUT request to update user data
      const userId = userInfo.user_id;
      console.log(userId);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }

    try {
      const response = await fetch(
        `http://10.5.90.145:3333/users/${userInfo.user_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(userProfile),
        }
      );
      console.log("response", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);

        // Optionally hide the form
        const editForm = document.getElementById("editForm")!;
        editForm.style.display = "none";
      } else {
        const error = await response.json();
        console.error("Error:", error);
        console.log(
          `Failed to update profile: ${error.message || "Unknown error"}`
        );
      }
    } catch (err) {
      console.error("Network error or server not responding:");
    }
//   });
// });
