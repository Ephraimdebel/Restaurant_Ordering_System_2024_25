let signupForm = document.getElementById("signupForm") as HTMLFormElement;

if (signupForm) {
  // signupForm.addEventListener("submit", async (event) => {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const phoneNumber = (document.getElementById("phone") as HTMLInputElement).value;

    const messageElement = document.getElementById("message");

    if (!name) {
      if (messageElement) messageElement.textContent = "Name is required.";
      return;
    }

    if (!email) {
      if (messageElement) messageElement.textContent = "Email is required.";
      return;
    }

    if (!password) {
      if (messageElement) messageElement.textContent = "Password is required.";
      return;
    }

    if (!phoneNumber) {
      if (messageElement) messageElement.textContent = "Phone number is required.";
      return;
    }

    if (phoneNumber.length !== 10 || isNaN(Number(phoneNumber))) {
      if (messageElement) messageElement.textContent = "Please enter a valid 10-digit phone number.";
      return;
    }

    // Mock signup logic
    const newUser = { name, email, password, phoneNumber };
    console.log("User signed up:", newUser);

    try {
      const endpoint = "http://localhost:3333/users/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert("Signup successful! You can now log in.");
        // Redirect to the login page after successful signup
        window.location.href = "login.html";
      } else {
        if (messageElement) {
          const error = await response.text();
          messageElement.textContent = `Signup failed: ${error}`;
        }
      }
    } catch (error) {
      if (messageElement) messageElement.textContent = `An error occurred: ${error}`;
    }

  });
  // });
}

