/*
 * This script handles user authentication in a web application.
 * It is executed once the DOM is fully loaded.
 *
 * Key functionalities:
 * 1. Retrieves the authentication token ('authToken') from sessionStorage.
 * 2. Checks if the token exists:
 *    - If not, alerts the user and redirects them to the login page.
 * 3. If the token is present:
 *    - Decodes the token to extract user information (e.g., email).
 *    - Displays a personalized welcome message.
 * 4. Validates the token with the backend server:
 *    - Sends a request to the '/validate-token' endpoint.
 *    - If the token is invalid or expired, alerts the user, removes the token from sessionStorage,
 *      and redirects them to the login page.
 *
 * This logic ensures that only authenticated users can access protected content
 * while providing a seamless user experience.
 *
 * Author: Jiren
 */
document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    alert("You are not authorized! Redirecting to login...");
    window.location.href = "/pages/login.html";
    return;
  }

  // Optional: Decode the token to show user info
  const payload = JSON.parse(atob(token.split(".")[1]));
  const contentDiv = document.getElementById("content")!;
  contentDiv.textContent = `Welcome, ${payload.email}!`;

  // Validate token with the server (optional)
  fetch("http://192.168.0.100:3333/auth/status", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Token is invalid");
      }
      console.log("Token is valid");
      return response.json();
    })
    .catch((error) => {
      console.error("Token validation failed:", error);
      alert("Token validation failed. Redirecting to login...");
      sessionStorage.removeItem("authToken");
      let pathname = window.location.pathname;
      if (pathname.endsWith("/index.html")){

        window.location.pathname = "./pages/login.html";
      }
      else{
        window.location.pathname = "../pages/login.html";
      }

    });
});
