document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("SearchInput");

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", handlesearch);
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        handlesearch();
      }
    });
  }
});

async function handlesearch() {
  const searchInput = document.getElementById("SearchInput").value.trim();
  if (!searchInput) return alert("Please enter a valid search term!");

  window.location.href = `index.html?query=${encodeURIComponent(searchInput)}`;
}
