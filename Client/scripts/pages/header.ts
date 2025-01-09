document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggle = document.querySelector(".menuButton") as HTMLElement;
  const dropdownMenu = document.querySelector(".dropdown-menu") as HTMLElement;

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isExpanded = dropdownMenu.classList.contains("show");
      if (isExpanded) {
        dropdownMenu.classList.remove("show");
      } else {
        dropdownMenu.classList.add("show");
      }
    });

    document.addEventListener("click", (event) => {
      if (
        !dropdownMenu.contains(event.target as Node) ||
        dropdownMenu === event.target
      ) {
        dropdownMenu.classList.remove("show");
      }
    });
  } else {
    console.error("Dropdown toggle or menu not found");
  }

  const navbarNav = document.getElementById("navbarNav");
  const toggler = document.querySelector(".navbar-toggler-icon") as HTMLElement;

  if (navbarNav && toggler) {
    toggler.addEventListener("click", (event) => {
      event.stopPropagation();
      const isExpanded = navbarNav.classList.contains("show");
      if (isExpanded) {
        navbarNav.classList.remove("show");
      } else {
        navbarNav.classList.add("show");
      }
    });

    document.addEventListener("click", (event) => {
      if (
        !navbarNav.contains(event.target as Node) ||
        navbarNav === event.target
      ) {
        navbarNav.classList.remove("show");
      }
    });
  } else {
    console.error("Navbar toggle or menu not found");
  }
  if (navbarNav) {
    const navItems = navbarNav.querySelectorAll("li");
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (navbarNav.classList.contains("show")) {
          item.style.display = "none";
        }
      });
    });
  }
  }
});
