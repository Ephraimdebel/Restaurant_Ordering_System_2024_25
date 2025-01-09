var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the response is a JSON object with the token
    });
}
// Utility to display messages
// function showMessage(message: string, isError: boolean = false): void {
//   const messageDiv = document.getElementById("message")!;
//   messageDiv.textContent = message;
//   messageDiv.style.color = isError ? "red" : "green";
// }
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        // Get form values
        const email = document.getElementById("email").value;
        const password = document.getElementById("password")
            .value;
        try {
            // Send login request
            const response = yield postData("http://localhost:3333/auth/login", {
                email,
                password,
            });
            // Check if the response contains the token, and extract it
            const token = response.token; // Assuming the response object has a "token" property
            if (token) {
                // Store token securely (e.g., sessionStorage)
                sessionStorage.setItem("authToken", token);
                ShowMessage("Login successful!");
                // Optionally redirect to another page
                window.location.pathname = "/index.html"; // Adjust as necessary
            }
            else {
                ShowMessage("Token not found in the response!", true);
            }
        }
        catch (error) {
            /* showMessage(error.message); */
            console.log("error", error);
        }
    }));
});
