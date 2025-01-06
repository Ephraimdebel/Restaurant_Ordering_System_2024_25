document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("authToken");
  setTimeout(() => {
    window.location.href = "/pages/login.html";
  }, 5000);
  console.log("Logged out successfully!");
});
