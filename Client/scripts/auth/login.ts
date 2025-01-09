// i used a session storage to store the token. that's because session storage is used in token.ts file to store the token.

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
  return response.json();
}

// Utility to display messages
function showMessages(message: string, isError: boolean = false): void {
  const messageDiv = document.getElementById("message")!;
  messageDiv.textContent = message;
  messageDiv.style.color = isError ? "red" : "green";
}
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm") as HTMLFormElement;

  loginForm.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    // Get form values
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    try {
      // Send login request
      const response = await postData("https://reqres.in/api/login", {
        email,
        password,
      });

      // Extract token
      const { token } = response;

      // Store token securely (e.g., sessionStorage)
      sessionStorage.setItem("authToken", token);

      showMessage("Login successful!");

      // Optionally redirect to another page
      window.location.href = "/index.html";
    } catch (error) {
      showMessages(error.message, true);
    }
  });
});
