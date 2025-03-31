// document.addEventListener("DOMContentLoaded", function () {
//   const workoutData = localStorage.getItem("selectedWorkout");

//   if (workoutData) {
//     const workout = JSON.parse(workoutData);
//     document.getElementById(
//       "workout-image"
//     ).src = `http://127.0.0.1:5500/data/images/${workout.images[0]}`;
//     document.getElementById("workout-title").textContent = workout.name;
//     document.getElementById("workout-bodyPart").textContent =
//       workout.primaryMuscles;
//     document.getElementById("workout-equipment").textContent =
//       workout.equipment;
//     document.getElementById("workout-secondary").textContent =
//       workout.secondaryMuscles.join(", ") || "None";
//     document.getElementById("Difficulty").textContent = workout.level;

//     const workoutDescription = `${workout.name} is a ${
//       isCompound(workout.target) ? "compound" : "isolation"
//     } exercise that primarily targets the ${workout.target}, engaging the ${
//       workout.bodyPart
//     }. This exercise is performed using a ${
//       workout.equipment
//     }, making it effective for developing strength and endurance in this area.`;

//     document.getElementById("workout-description").textContent =
//       workoutDescription;

//     function isCompound(targetMuscle) {
//       const compoundMuscles = [
//         "chest",
//         "back",
//         "legs",
//         "shoulders",
//         "abdominals",
//         "abductors",
//         "adductors",
//         "biceps",
//         "calves",
//         "chest",
//         "forearms",
//         "glutes",
//         "hamstrings",
//         "lats",
//         "lower back",
//         "middle back",
//         "neck",
//         "quadriceps",
//         "shoulders",
//         "traps",
//         "triceps",
//       ];
//       return compoundMuscles.includes(targetMuscle.toLowerCase());
//     }

//     const instructionsList = document.getElementById("instructions-list");
//     instructionsList.innerHTML = "";

//     if (workout.instructions && workout.instructions.length > 0) {
//       workout.instructions.forEach((step) => {
//         const li = document.createElement("li");
//         li.textContent = step;
//         instructionsList.appendChild(li);
//       });
//     } else {
//       instructionsList.innerHTML = "<li>No instructions available.</li>";
//     }
//   } else {
//     document.getElementById("workout-info").innerHTML =
//       "<p>No workout data available.</p>";
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const workoutData = localStorage.getItem("selectedWorkout");

  if (workoutData) {
    try {
      const workout = JSON.parse(workoutData);

      // Basic info loading
      document.getElementById(
        "workout-image"
      ).src = `http://127.0.0.1:5500/data/images/${
        workout.images?.[0] || "default.jpg"
      }`;
      document.getElementById("workout-title").textContent =
        workout.name || "Unnamed Workout";
      document.getElementById("workout-bodyPart").textContent =
        workout.primaryMuscles || "Not specified";
      document.getElementById("workout-equipment").textContent =
        " ⚙️ " + (workout.equipment || "None");
      document.getElementById("workout-target").textContent =
        workout.mechanic || "none";
      document.getElementById("workout-secondary").textContent =
        workout.secondaryMuscles?.join(", ") || "None";
      document.getElementById("Difficulty").textContent =
        " 🏅 " + (workout.level || "Not specified");

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

      // Corrected function
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
