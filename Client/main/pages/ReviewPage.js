// // Ensure the DOM is fully loaded before executing the script
// document.addEventListener("DOMContentLoaded", () => {
//     // Select all elements with the class 'slider'
//     const sliders = document.querySelectorAll<HTMLElement>(".slider");
//     // Loop through each slider element
//     sliders.forEach(slider => {
//       let scrollInterval: number; // Type the scrollInterval as a number for the interval ID
//       const scrollSpeed: number = 3000; // 3 seconds for auto-scroll speed
//       const slideWidth: number = slider.scrollWidth / slider.children.length;
//       // Function to start auto-scrolling the slider
//       const startAutoScroll = (): void => {
//         scrollInterval = window.setInterval(() => {
//           const maxScrollLeft: number = slider.scrollWidth - slider.clientWidth;
//           if (slider.scrollLeft < maxScrollLeft) {
//             slider.scrollLeft += slideWidth;
//           } else {
//             slider.scrollLeft = 0; // Loop back to the start
//           }
//         }, scrollSpeed);
//       };
//       // Function to stop auto-scrolling
//       const stopAutoScroll = (): void => window.clearInterval(scrollInterval);
//       // Start the auto-scroll when the page loads
//       startAutoScroll();
//       // Pause scrolling when mouse enters the slider area
//       slider.addEventListener("mouseenter", stopAutoScroll);
//       // Resume scrolling when mouse leaves the slider area
//       slider.addEventListener("mouseleave", startAutoScroll);
//     });
//   });
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    if (slider) {
        let scrollInterval;
        const scrollSpeed = 3000;
        const slideWidth = slider.scrollWidth / slider.children.length;
        const startAutoScroll = () => {
            scrollInterval = window.setInterval(() => {
                const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
                if (slider.scrollLeft < maxScrollLeft) {
                    slider.scrollLeft += slideWidth;
                }
                else {
                    slider.scrollLeft = 0;
                }
            }, scrollSpeed);
        };
        const stopAutoScroll = () => window.clearInterval(scrollInterval);
        startAutoScroll();
        slider.addEventListener("mouseenter", stopAutoScroll);
        slider.addEventListener("mouseleave", startAutoScroll);
    }
});
