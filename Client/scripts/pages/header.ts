document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggle = document.querySelector(".menuButton") as HTMLElement;
  const dropdownMenu = document.querySelector(".dropdown-menu") as HTMLElement;

  dropdownToggle.addEventListener("click", () => {
    const isExpanded = dropdownMenu.classList.contains("show");
    if (isExpanded) {
      dropdownMenu.classList.remove("show");
    } else {
      dropdownMenu.classList.add("show");
    }
  });
});

