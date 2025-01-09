const signupForm = document.getElementById("signupForm") as HTMLFormElement;

if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement)
      .value;
    const favoriteCuisine = (
      document.getElementById("favoriteCuisine") as HTMLSelectElement
    ).value;
    const messageElement = document.getElementById("message");

    if (!name) {
      messageElement.textContent = "Name is required.";
      return;
    }

    if (!email) {
      messageElement.textContent = "Email is required.";
      return;
    }

    if (!password) {
      messageElement.textContent = "Password is required.";
      return;
    }

    if (!phone) {
      messageElement.textContent = "Phone number is required.";
      return;
    }

    if (!address) {
      messageElement.textContent = "Address is required.";
      return;
    }

    if (!favoriteCuisine) {
      messageElement.textContent = "Please select your favorite cuisine.";
      return;
    }

    if (phone.length !== 10 || isNaN(Number(phone))) {
      messageElement.textContent = "Please enter a valid 10-digit phone number.";
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          address,
          favoriteCuisine,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("User signed up:", result);

      // Redirect to the login page after successful signup
      alert(`Welcome, ${name}! Your account has been created successfully.`);
      window.location.href = "login.html";
    } catch (error) {
      messageElement.textContent = `Signup failed: ${error.message}`;
    }
  });
}
