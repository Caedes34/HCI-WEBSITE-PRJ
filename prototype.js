const categories = document.querySelector(".categories");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0;
const itemsPerPage = 5;
const totalItems = document.querySelectorAll(".category-btn").length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

function updateSlider() {
  const offset = -currentIndex * 100; // Moves left/right
  categories.style.transform = `translateX(${offset}%)`;
}

// Next Button
nextBtn.addEventListener("click", () => {
  if (currentIndex < totalPages - 1) {
    currentIndex++;
    updateSlider();
  }
});

// Prev Button
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});
