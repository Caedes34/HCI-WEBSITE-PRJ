const categories = document.querySelector(".categories");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0;
const itemsPerPage = 4;
const totalItems = document.querySelectorAll(".category-btn").length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

function updateSlider() {
  const offset = -currentIndex * 100;
  categories.style.transform = `translateX(${offset}%)`;
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < totalPages - 1) {
    currentIndex++;
    updateSlider();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});
