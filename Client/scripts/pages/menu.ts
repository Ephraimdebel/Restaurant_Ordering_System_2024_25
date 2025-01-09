// Interface for Menu Item
interface MenuItem {
    name: string;
    category: string;
    price: number;
    image: string; // URL or Base64 string
  }
  
  // Array to store menu items
  const menuItems: MenuItem[] = [];
  
  // Function to handle image preview
  const handleImagePreview = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    const previewContainer = document.getElementById("image-preview") as HTMLElement;
  
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        previewContainer.innerHTML = `<img src="${e.target?.result}" alt="Image Preview">`;
      };
  
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      previewContainer.innerHTML = "";
    }
  };
  
  // Function to handle form submission
  const handleFormSubmission = (event: Event) => {
    event.preventDefault();
  
    // Get form values
    const nameInput = document.getElementById("menu-name") as HTMLInputElement;
    const categoryInput = document.getElementById("menu-category") as HTMLSelectElement;
    const priceInput = document.getElementById("menu-price") as HTMLInputElement;
    const imageInput = document.getElementById("menu-image") as HTMLInputElement;
  
    if (!imageInput.files || imageInput.files.length === 0) {
      alert("Please upload an image!");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const menuItem: MenuItem = {
        name: nameInput.value,
        category: categoryInput.value,
        price: parseFloat(priceInput.value),
        image: e.target?.result as string,
      };
  
      // Add menu item to the list
      menuItems.push(menuItem);
  
      // Log the menu item (replace with backend API call if needed)
      console.log("New Menu Item Added:", menuItem);
      console.log("All Menu Items:", menuItems);
  
      // Clear form fields and preview
      nameInput.value = "";
      categoryInput.value = "";
      priceInput.value = "";
      imageInput.value = "";
      const previewContainer = document.getElementById("image-preview") as HTMLElement;
      previewContainer.innerHTML = "";
  
      // Show success message
      alert("Menu item added successfully!");
    };
  
    reader.readAsDataURL(imageInput.files[0]);
  };
  
  // Attach event listeners
  const addMenuForm = document.getElementById("add-menu-form") as HTMLFormElement;
  const imageInput = document.getElementById("menu-image") as HTMLInputElement;
  
  addMenuForm.addEventListener("submit", handleFormSubmission);
  imageInput.addEventListener("change", handleImagePreview);
  