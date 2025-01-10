// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select the navbar toggler and the collapsible menu
  const navbarToggler = document.querySelector(
    ".navbar-toggler"
  ) as HTMLButtonElement;
  const navbarCollapse = document.getElementById("navbarNav");
  const cart = document.getElementById("cart") as HTMLButtonElement;

  if (navbarToggler && navbarCollapse) {
    // Add click event listener to the navbar toggler
    navbarToggler.addEventListener("click", () => {
      const isExpanded = navbarToggler.getAttribute("aria-expanded") === "true";

      // Toggle the collapse class to show/hide the menu
      if (isExpanded) {
        navbarCollapse.classList.remove("show");
        navbarToggler.setAttribute("aria-expanded", "false");
      } else {
        navbarCollapse.classList.add("show");
        navbarToggler.setAttribute("aria-expanded", "true");
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Select the navbar toggler and the collapsible menu
  const navbarToggler = document.querySelector(
    "#navbarDropdown"
  ) as HTMLButtonElement;
  const navbarCollapse = document.getElementById("dropdown-menu");

  if (navbarToggler && navbarCollapse) {
    // Add click event listener to the navbar toggler
    navbarToggler.addEventListener("click", () => {
      const isExpanded = navbarToggler.getAttribute("aria-expanded") === "true";

      // Toggle the collapse class to show/hide the menu
      if (isExpanded) {
        navbarCollapse.classList.remove("show");
        navbarToggler.setAttribute("aria-expanded", "false");
      } else {
        navbarCollapse.classList.add("show");
        navbarToggler.setAttribute("aria-expanded", "true");
      }
    });
  }
});

