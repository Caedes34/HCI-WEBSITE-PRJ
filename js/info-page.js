// Description: This script handles the display of workout information on the info page.
// It retrieves workout data from local storage, generates a description, and populates the page with relevant details.
document.addEventListener("DOMContentLoaded", function () {
  const workoutData = localStorage.getItem("selectedWorkout");

  if (workoutData) {
    try {
      const workout = JSON.parse(workoutData);

      // Basic info loading
      document.getElementById(
        "workout-image"
      ).src = `http://127.0.0.1:5500/data/images/${
        workout.images?.[1] || "default.jpg"
      }`;
      document.getElementById("workout-title").textContent =
        workout.name || "Unnamed Workout";
      document.getElementById("workout-bodyPart").textContent =
        workout.primaryMuscles || "Not specified";
      document.getElementById("workout-equipment").textContent =
        " ⚙️Equipment:  " + (workout.equipment || "None");
      document.getElementById("workout-target").textContent =
        workout.mechanic || "none";
      document.getElementById("workout-secondary").textContent =
        workout.secondaryMuscles?.join(", ") || "None";
      document.getElementById("Difficulty").textContent =
        " 🏅Level: " + (workout.level || "Not specified");

      // Robust description generation with error handling
      let workoutDescription;

      if (!workout.name) {
        workoutDescription = "An effective exercise";
      } else {
        workoutDescription = `${workout.name} is`;
      }

      // Add compound/isolation classification
      const primaryMuscle = workout.primaryMuscles;
      if (primaryMuscle) {
        workoutDescription += ` a ${
          isCompound(primaryMuscle) ? "compound" : "isolation"
        }`;
      } else {
        workoutDescription += " an";
      }

      // Add primary target
      workoutDescription += ` exercise that primarily targets the ${
        workout.primaryMuscles || "various muscles"
      }`;

      // Add secondary muscles if available
      if (workout.secondaryMuscles?.length) {
        workoutDescription += `, engaging the ${workout.secondaryMuscles.join(
          ", "
        )}`;
      }

      // Add equipment info
      if (workout.equipment && workout.equipment !== "none") {
        workoutDescription += `. This exercise is performed using ${workout.equipment}`;
      }

      // Final effectiveness statement
      workoutDescription +=
        ", making it effective for developing strength and endurance in this area.";

      //
      function isCompound(targetMuscle) {
        if (!targetMuscle) return false;
        const compoundMuscles = [
          "chest",
          "back",
          "legs",
          "shoulders",
          "abdominals",
          "glutes",
          "quadriceps",
          "hamstrings",
          "calves",
        ];
        return compoundMuscles.includes(targetMuscle);
      }

      // Corrected selector (fixed typo)
      document.getElementById("workout-description").textContent =
        workoutDescription;
      // Generate YouTube SEARCH
      function generateYouTubeLink(workoutName) {
        let query = encodeURIComponent(workoutName + " tutorial");
        let youtubeSearchURL = `https://www.youtube.com/results?search_query=${query}`;

        let linkElement = document.getElementById("youtube-video");
        linkElement.href = youtubeSearchURL;
        linkElement.innerText = `Watch ${workoutName} Tutorial`;
      }

      let workoutName = workout.name;
      generateYouTubeLink(workoutName);

      // Instructions list
      const instructionsList = document.getElementById("instructions-list");
      instructionsList.innerHTML = "";
      if (workout.instructions?.length > 0) {
        workout.instructions.forEach((step, index) => {
          const li = document.createElement("li");
          li.textContent = `${step}`;
          instructionsList.appendChild(li);
        });
      } else {
        instructionsList.innerHTML = "<li>No instructions available.</li>";
      }
    } catch (error) {
      console.error("Error processing workout data:", error);
      document.getElementById("workout-info").innerHTML =
        "<p>Error loading workout data.</p>";
    }
  } else {
    document.getElementById("workout-info").innerHTML =
      "<p>No workout data available. Please select a workout from the main page.</p>";
  }
});
