// Import necessary methods
import { navigate } from "./navigate"; // Assume a navigate function is implemented here

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const homeContent = document.getElementById("homeContent");
  const exploreButton = document.getElementById("exploreButton");

  // Show content after 1 second
  setTimeout(() => {
    if (homeContent) homeContent.classList.add("show");
  }, 1000);

  // Navigate to the "About" page on button click
  if (exploreButton) {
    exploreButton.addEventListener("click", () => {
      setTimeout(() => navigate("/about"), 300);
    });
  }
});

// Mock navigate function (replace with actual implementation)
function navigate(path: string): void {
  console.log(`Navigating to ${path}`); // For demonstration, replace with real navigation
  window.location.href = path; // Example for redirection
}
