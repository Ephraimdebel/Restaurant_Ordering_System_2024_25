var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const formTitle = document.getElementById("form-title");
const toggleFormButton = document.getElementById("toggle-form-button");
const authForm = document.getElementById("auth-form");
const signupFields = document.getElementById("signup-fields");
const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("toggle-password");
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
authForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const usernameInput = document.getElementById("username");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
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
        const response = yield fetch(endpoint, {
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
        }
        else {
            alert("An error occurred. Please try again.");
        }
    }
    catch (err) {
        console.error(err);
        alert("An error occurred. Please try again.");
    }
    finally {
        submitButton.innerText = isLogin ? "Login" : "Agree and join";
        submitButton.disabled = false;
    }
}));
