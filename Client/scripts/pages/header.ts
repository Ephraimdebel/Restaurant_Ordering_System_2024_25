document.addEventListener("DOMContentLoaded", () => {
  // Type assertion for elements, ensuring they're HTMLElement types
  const dropdownToggle = document.querySelector(".menuButton") as HTMLElement;
  const dropdownMenu = document.querySelector(".dropdown-menu") as HTMLElement;

  // Ensure both elements exist before adding event listeners
  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", () => {
      // Adding a timeout to delay the toggling
      setTimeout(() => {
        const isExpanded = dropdownMenu.classList.contains("show");
        if (isExpanded) {
          dropdownMenu.classList.remove("show");
        } else {
          dropdownMenu.classList.add("show");
        }
      }, 2000); // Delay of 2 seconds
    });
  } else {
    console.error("Dropdown toggle or menu not found");
  }
});
