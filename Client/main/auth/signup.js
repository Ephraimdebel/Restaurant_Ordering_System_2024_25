var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let signupForm = document.getElementById("signupForm");
if (signupForm) {
    // signupForm.addEventListener("submit", async (event) => {
    signupForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phoneNumber = document.getElementById("phone").value;
        const messageElement = document.getElementById("message");
        if (!name) {
            if (messageElement)
                messageElement.textContent = "Name is required.";
            return;
        }
        if (!email) {
            if (messageElement)
                messageElement.textContent = "Email is required.";
            return;
        }
        if (!password) {
            if (messageElement)
                messageElement.textContent = "Password is required.";
            return;
        }
        if (!phoneNumber) {
            if (messageElement)
                messageElement.textContent = "Phone number is required.";
            return;
        }
        if (phoneNumber.length !== 10 || isNaN(Number(phoneNumber))) {
            if (messageElement)
                messageElement.textContent = "Please enter a valid 10-digit phone number.";
            return;
        }
        // Mock signup logic
        const newUser = { name, email, password, phoneNumber };
        console.log("User signed up:", newUser);
        try {
            const endpoint = "http://localhost:3333/users/register";
            const response = yield fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });
            if (response.ok) {
                alert("Signup successful! You can now log in.");
                // Redirect to the login page after successful signup
                window.location.href = "login.html";
            }
            else {
                if (messageElement) {
                    const error = yield response.text();
                    messageElement.textContent = `Signup failed: ${error}`;
                }
            }
        }
        catch (error) {
            if (messageElement)
                messageElement.textContent = `An error occurred: ${error}`;
        }
    }));
    // });
}
