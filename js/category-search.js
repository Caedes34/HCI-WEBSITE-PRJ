let API_URL = "";
let data = "";

document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", async function () {
    let workoutname = this.getAttribute("data-value"); // Get value from button

    if (!workoutname) return;
    window.location.href = `?search=${encodeURIComponent(workoutname)}`;
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const workoutname = urlParams.get("search");

  if (!workoutname) {
    console.error("No search term provided.");
    return;
  }
  console.log("Searching for...:", workoutname);
  console.log("API URL", API_URL);
  API_URL = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(
    workoutname
  )}`;

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "87f5e59955mshdae3a211e701e93p1d5c76jsn6813f7326822",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    });

    const data = await response.json();
    console.log("Fetch Data:", data);

    if (!data || data.length === 0) {
      alert("no results");
      return;
    }

    fetchExerciseGifs(data);
  } catch (error) {
    console.error("Error fetching", error);
  }
});
// get the string value from the user

//the api fetching logic and showing the result
function fetchExerciseGifs(data) {
  try {
    // Get all thumbnail containers
    const thumbnails = document.querySelectorAll(".thumbnail");

    if (data.length === 0) {
      console.error("No exercises found in the API response.");
      return;
    }

    thumbnails.forEach(async (thumbnail, index) => {
      if (!data[index]) return;

      const img = thumbnail.querySelector(".thumbnail-image");
      const titleElement = thumbnail.querySelector(".thumbnail-title");

      // Set title and GIF from ExerciseDB API
      img.src = data[index].gifUrl;
      titleElement.textContent = data[index].name;

      // Fetch difficulty and instructions from API-Ninjas API
    });
  } catch (error) {
    console.error("Error fetching exercise GIFs:", error);
  }
}
