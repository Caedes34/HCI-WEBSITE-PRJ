// API URL for exercises (example: waist exercises)
const API_URL = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/waist";

// API Headers (Replace with your API key)
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "API_KEY_HERE", // Replace with your actual API key
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

// Function to fetch and update GIFs for all thumbnails
async function fetchExerciseGifs() {
  try {
    const response = await fetch(API_URL, options);
    const data = await response.json(); // Convert response to JSON

    // Get all images with class "thumbnail-image"
    const images = document.querySelectorAll(".thumbnail-image");

    if (data.length === 0) {
      console.error("No exercises found in the API response.");
      return;
    }

    // Loop through images and assign GIFs
    images.forEach((img, index) => {
      const thumbnail = img.closest(".thumbnail"); // Get the closest thumbnail container
      const titleElement = thumbnail.querySelector(".thumbnail-title"); // Get the title element

      if (data[index] && data[index].gifUrl) {
        img.src = data[index].gifUrl; // Assign a GIF to each image
        titleElement.textContent = data[index].name;
      } else {
        console.warn(`No GIF found for index ${index}, skipping...`);
      }
    });
  } catch (error) {
    console.error("Error fetching exercise GIFs:", error);
  }
}

// Run the function after page loads
document.addEventListener("DOMContentLoaded", fetchExerciseGifs);
