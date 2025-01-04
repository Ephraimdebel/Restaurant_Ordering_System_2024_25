const signupForm = document.getElementById("signupForm") as HTMLFormElement;

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
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
    if (!name) {
      document.getElementById("message").textContent = "Name is required.";
      return;
    }

    if (!email) {
      document.getElementById("message").textContent = "Email is required.";
      return;
    }

    if (!password) {
      document.getElementById("message").textContent = "Password is required.";
      return;
    }

    if (!phone) {
      document.getElementById("message").textContent = "Phone number is required.";
      return;
    }

    if (!address) {
      document.getElementById("message").textContent = "Address is required.";
      return;
    }

    if (!favoriteCuisine) {
      document.getElementById("message").textContent = "Please select your favorite cuisine.";
      return;
    }

    if (phone.length !== 10 || isNaN(Number(phone))) {
      document.getElementById("message").textContent = "Please enter a valid 10-digit phone number.";
      return;
    }

    // Mock signup logic
    const newUser = { name, email, password, phone, address, favoriteCuisine };
    console.log("User signed up:", newUser);

    // Redirect to the login page after successful signup
    alert(`Welcome, ${name}! Your account has been created successfully.`);
    window.location.href = "login.html";
  });
}
