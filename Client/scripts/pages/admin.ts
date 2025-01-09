// // Interface for Admin
// interface Admin {
//     name: string;
//     email: string;
//     phone: string;
//   }
  
//   // Array to store admins
//   const admins: Admin[] = [];
  
//   // Function to handle form submission
//   const handleFormSubmit = (event: Event) => {
//     event.preventDefault();
  
//     // Get form values
//     const nameInput = document.getElementById("admin-name") as HTMLInputElement;
//     const emailInput = document.getElementById("admin-email") as HTMLInputElement;
//     const phoneInput = document.getElementById("admin-phone") as HTMLInputElement;
  
//     // Validate phone number
//     const phonePattern = /^[0-9]{10}$/;
//     if (!phonePattern.test(phoneInput.value)) {
//       alert("Please enter a valid 10-digit phone number.");
//       return;
//     }
  
//     const admin: Admin = {
//       name: nameInput.value,
//       email: emailInput.value,
//       phone: phoneInput.value,
//     };
  
//     // Add admin to the list
//     admins.push(admin);
  
//     // Log the admin (replace with backend API call if needed)
//     console.log("New Admin Added:", admin);
//     console.log("All Admins:", admins);
  
//     // Clear form fields
//     nameInput.value = "";
//     emailInput.value = "";
//     phoneInput.value = "";
  
//     // Show success message
//     alert("Admin added successfully!");
//   };
  
//   // Attach event listener
//   const form = document.getElementById("add-admin-form") as HTMLFormElement;
//   form.addEventListener("submit", handleFormSubmit);
  