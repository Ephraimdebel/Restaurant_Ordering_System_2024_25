var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const message = document.getElementById("message");
// Initialize form data
const formData = {
    name: "",
    email: "",
    address: "",
    cakeType: "",
    cakeSize: "",
    orderDate: "",
};
// Handle input changes
function handleChange(event) {
    const target = event.target;
    formData[target.name] = target.value;
}
// Handle form submission
function handleSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield fetch("https://reqres.in/api/house", {
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
            document.getElementById("order-form").reset();
            Object.keys(formData).forEach((key) => (formData[key] = ""));
        }
        catch (error) {
            message.style.display = "block";
            message.innerHTML = "<p>Failed to place order. Please try again.</p>";
            message.style.color = "red";
            setTimeout(() => {
                message.style.display = "none";
            }, 2000);
        }
    });
}
// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("order-form");
    form.addEventListener("submit", handleSubmit);
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => input.addEventListener("input", handleChange));
});
