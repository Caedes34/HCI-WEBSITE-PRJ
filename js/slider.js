document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  let startPage = 1; // Start at page 1
  const totalPages = 30; // Total number of pages
  const pageJump = 8; // Jump 8 pages when "..." is clicked
  const visiblePages = 8; // Number of pages visible before "..."

  function renderPages() {
    slider.innerHTML = ""; // Clear previous numbers

    // Generate number buttons
    for (
      let i = startPage;
      i < startPage + visiblePages && i <= totalPages;
      i++
    ) {
      const pageButton = document.createElement("div");
      pageButton.classList.add("slide");
      pageButton.textContent = i;
      if (i === startPage) pageButton.classList.add("active"); // Highlight active page

      pageButton.addEventListener("click", function () {
        document
          .querySelectorAll(".slide")
          .forEach((slide) => slide.classList.remove("active"));
        pageButton.classList.add("active");
      });

      slider.appendChild(pageButton);
    }

    // Add "..." button only if more pages exist
    if (startPage + visiblePages <= totalPages) {
      const dotsButton = document.createElement("div");
      dotsButton.classList.add("slide");
      dotsButton.textContent = "...";
      dotsButton.addEventListener("click", function () {
        startPage += pageJump; // Jump 8 pages
        if (startPage > totalPages - visiblePages) {
          startPage = totalPages - visiblePages + 1; // Ensure last pages are shown
        }
        renderPages();
      });

      slider.appendChild(dotsButton);
    }
  }

  prevBtn.addEventListener("click", function () {
    if (startPage > 1) {
      startPage -= pageJump;
      if (startPage < 1) startPage = 1; // Ensure it doesn’t go below 1
      renderPages();
    }
  });

  nextBtn.addEventListener("click", function () {
    if (startPage + visiblePages <= totalPages) {
      startPage += pageJump;
      renderPages();
    }
  });

  renderPages(); // Initial render
});
