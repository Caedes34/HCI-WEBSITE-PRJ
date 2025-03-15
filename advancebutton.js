function openModal() {
  document.getElementById("modal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function resetFilters() {
  let checkboxes = document.querySelectorAll('.modal input[type= "checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}
