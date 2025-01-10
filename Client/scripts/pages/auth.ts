const formTitle = document.getElementById("form-title") as HTMLElement;
const toggleFormButton = document.getElementById("toggle-form-button") as HTMLButtonElement;
const authForm = document.getElementById("auth-form") as HTMLFormElement;
const signupFields = document.getElementById("signup-fields") as HTMLElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const togglePasswordButton = document.getElementById("toggle-password") as HTMLButtonElement;
// const submitButton = document.getElementById("submit-button") as HTMLButtonElement;

let isLogin = true; // Tracks current form state (Login or Signup)
let showPassword = false; // Tracks password visibility

// Toggle between Login and Signup forms
toggleFormButton.addEventListener("click", () => {
  isLogin = !isLogin;

  // Update UI based on form state
  formTitle.innerText = isLogin ? "Login to your account" : "Create a new account";
  signupFields.style.display = isLogin ? "none" : "block";
  submitButton.innerText = isLogin ? "Login" : "Agree and join";
});

// Toggle password visibility
togglePasswordButton.addEventListener("click", () => {
  showPassword = !showPassword;
  passwordInput.type = showPassword ? "text" : "password";
  togglePasswordButton.innerText = showPassword ? "Hide" : "Show";
});

// Handle form submission
authForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailInput = document.getElementById("email") as HTMLInputElement;
  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const firstNameInput = document.getElementById("first-name") as HTMLInputElement;
  const lastNameInput = document.getElementById("last-name") as HTMLInputElement;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const username = usernameInput ? usernameInput.value.trim() : "";
  const firstName = firstNameInput ? firstNameInput.value.trim() : "";
  const lastName = lastNameInput ? lastNameInput.value.trim() : "";

  // Frontend validation
  if (!email || !password) {
    alert("Email and password are required.");
    return;
  }

  if (!isLogin && (!username || !firstName || !lastName)) {
    alert("All fields are required for signup.");
    return;
  }

  submitButton.innerText = isLogin ? "Logging in..." : "Signing up...";
  submitButton.disabled = true;

  try {
    // API Request
    const endpoint = isLogin ? "http://localhost:3333/auth/login" : " http://localhost:3333/users/register";
    const body = isLogin
      ? { email, password }
      : { email, password, username, firstName, lastName };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert(isLogin ? "Login successful!" : "Signup successful! You can now log in.");
      if (!isLogin) {
        isLogin = true; // Reset to login form after successful signup
        toggleFormButton.click();
      }
    } else {
      alert("An error occurred. Please try again.");
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred. Please try again.");
  } finally {
    submitButton.innerText = isLogin ? "Login" : "Agree and join";
    submitButton.disabled = false;
  }
});
