const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");
const mainContent = document.querySelector(".main-content");
console.log("clicked")
if (sidebar && hamburger && mainContent) {
  console.log("Elements found!");
  hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked!");
    sidebar.classList.toggle("hidden");
    hamburger.classList.toggle("yellow");
    mainContent.classList.toggle("shifted");
  });
} else {
  console.error("One or more elements are missing!");
}
