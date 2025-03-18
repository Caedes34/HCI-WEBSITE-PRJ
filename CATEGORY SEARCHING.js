// API URL for exercises (example: waist exercises)
const API_URL = "https://exercisedb.p.rapidapi.com/exercises/target/quads";

// API Headers
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "87f5e59955mshdae3a211e701e93p1d5c76jsn6813f7326822", // Replace with your actual API key
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

// Function to fetch and update GIFs for all thumbnails
async function fetchExerciseGifs() {
  try {
    const response = await fetch(API_URL, options);
    const data = await response.json();

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

// Function to fetch difficulty & instructions from API-Ninjas

// Run the function after the page loads
document.addEventListener("DOMContentLoaded", fetchExerciseGifs);
