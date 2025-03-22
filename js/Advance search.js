function toggleFilters() {
  let filterContainer = document.getElementById("filterContainer");
  filterContainer.style.display =
    filterContainer.style.display === "block" ? "none" : "block";
}

function selectTag(tag) {
  tag.classList.toggle("selected");
}
