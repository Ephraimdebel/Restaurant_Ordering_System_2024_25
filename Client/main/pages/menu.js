var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to handle form submission
const handleFormSubmission = (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault(); // Prevent the default form submission behavior
    // Get form values
    const nameInput = document.getElementById("menu-name");
    const categoryInput = document.getElementById("menu-category");
    const priceInput = document.getElementById("menu-price");
    const imageInput = document.getElementById("menu-image");
    const descriptionInput = document.getElementById("menu-description");
    // Category mapping
    const categoryMapping = {
        "Cake": 1,
        "Drinks": 2,
        "Torta": 3,
        "Other": 4,
    };
    const categoryName = categoryInput.value;
    const categoryId = categoryMapping[categoryName] || 4; // Default to "Other" if the category is not recognized
    // Ensure image is selected
    if (!imageInput.files || imageInput.files.length === 0) {
        alert("Please upload an image!");
        return;
    }
    // Create a FormData object to send the data to the backend
    const formData = new FormData();
    // Append form values to FormData
    formData.append("name", nameInput.value);
    formData.append("categoryId", categoryId.toString()); // Convert to string
    formData.append("price", priceInput.value);
    formData.append("description", descriptionInput.value);
    // Append the image file
    formData.append("image", imageInput.files[0]);
    try {
        // Send the data to the backend using fetch
        const response = yield fetch(" http://localhost:3333/menu/create", {
            method: "POST",
            body: formData, // The FormData object is sent as the body
        });
        if (!response.ok) {
            throw new Error("Failed to add menu item");
        }
        // Parse response if needed
        const result = yield response.json();
        console.log("Response from backend:", result);
        // Success message
        alert("Menu item added successfully!");
        // Clear form fields and preview
        nameInput.value = "";
        categoryInput.value = "";
        priceInput.value = "";
        imageInput.value = "";
        descriptionInput.value = "";
        const previewContainer = document.getElementById("image-preview");
        previewContainer.innerHTML = "";
    }
    catch (error) {
        console.error("Error during form submission:", error);
        alert("There was an error adding the menu item.");
    }
});
// Attach event listeners
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", handleFormSubmission);
