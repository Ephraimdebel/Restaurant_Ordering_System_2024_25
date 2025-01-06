interface OrderFormData {
  name: string;
  email: string;
  address: string;
  cakeType: string;
  cakeSize: string;

  orderDate: string;
}

const message = document.getElementById("message") as HTMLDivElement;

// Initialize form data
const formData: OrderFormData = {
  name: "",
  email: "",
  address: "",
  cakeType: "",
  cakeSize: "",
  orderDate: "",
};

// Handle input changes
function handleChange(event: Event): void {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  formData[target.name as keyof OrderFormData] = target.value;
}

// Handle form submission
async function handleSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  console.log("Current Form Data:", formData);

  const reorderedFormData = {
    name: formData.name,
    email: formData.email,
    address: formData.address,
    cake_type: formData.cakeType,
    cake_size: formData.cakeSize,
    order_date: formData.orderDate,
  };

  console.log("Order Data Submitted:", reorderedFormData);

  try {
    const response = await fetch("https://reqres.in/api/house", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reorderedFormData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    message.style.display = "block";
    message.innerHTML = "<p>Order placed successfully!</p>";
    message.style.color = "green";

    setTimeout(() => {
      message.style.display = "none";
    }, 5000);

    // Reset the form data
    (document.getElementById("order-form") as HTMLFormElement).reset();
    Object.keys(formData).forEach(
      (key) => (formData[key as keyof OrderFormData] = "")
    );
  } catch (error) {
    message.style.display = "block";
    message.innerHTML = "<p>Failed to place order. Please try again.</p>";
    message.style.color = "red";

    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  }
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("order-form") as HTMLFormElement;
  form.addEventListener("submit", handleSubmit);

  const inputs = form.querySelectorAll("input, select");
  inputs.forEach((input) => input.addEventListener("input", handleChange));
});
