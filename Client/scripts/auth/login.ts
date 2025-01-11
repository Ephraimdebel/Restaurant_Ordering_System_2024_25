async function postData(url: string, data: object): Promise<any> {
  console.log(data);
  const response = await fetch(url, {
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
}

// Utility to display messages
function ShowMessagess(message: string, isError: boolean = false): void {
  const messageDiv = document.getElementById("message")!;
  messageDiv.textContent = message;
  messageDiv.style.color = isError ? "red" : "green";
}
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm") as HTMLFormElement;

  loginForm.addEventListener("click", async (event: Event) => {
    event.preventDefault();

    // Get form values
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    try {
      // Send login request
      const response = await postData("http://10.5.205.111:3333/auth/login", {
        email,
        password,
      });

      // Check if the response contains the token, and extract it
      const token = response.token; // Assuming the response object has a "token" property

      if (token) {
        // Store token securely (e.g., sessionStorage)
        sessionStorage.setItem("authToken", token);

        ShowMessagess("Login successful!");

        // Optionally redirect to another page
        window.location.pathname = "/Client/index.html"; // Adjust as necessary
      } else {
        ShowMessagess("Token not found in the response!");
      }
    } catch (error) {
      showMessages(error.message, true);
    }
  });
});
