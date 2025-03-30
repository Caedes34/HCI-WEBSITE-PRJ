document.addEventListener("DOMContentLoaded", function () {
  const workoutData = localStorage.getItem("selectedWorkout");

  if (workoutData) {
    const workout = JSON.parse(workoutData);

    document.getElementById("workout-title").textContent = workout.name;
    document.getElementById("workout-image").src =
      workout.gifUrl || "images/default.png";
    document.getElementById("workout-bodyPart").textContent = workout.bodyPart;
    document.getElementById("workout-equipment").textContent =
      workout.equipment;
    document.getElementById("workout-target").textContent = workout.target;
    document.getElementById("workout-secondary").textContent =
      workout.secondaryMuscles.join(", ") || "None";

    const difficultyLevels = ["🏅 Beginner", "🏅 Intermediate", "🏅 Average"];

    const difficultyElement = document.getElementById("Difficulty");

    if (difficultyElement) {
      const randomDifficulty =
        difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];

      difficultyElement.textContent = randomDifficulty;
    }

    const workoutDescription = `${workout.name} is a ${
      isCompound(workout.target) ? "compound" : "isolation"
    } exercise that primarily targets the ${workout.target}, engaging the ${
      workout.bodyPart
    }. This exercise is performed using a ${
      workout.equipment
    }, making it effective for developing strength and endurance in this area.`;

    document.getElementById("workout-description").textContent =
      workoutDescription;

    function isCompound(targetMuscle) {
      const compoundMuscles = ["chest", "back", "legs", "shoulders"];
      return compoundMuscles.includes(targetMuscle.toLowerCase());
    }

    const instructionsList = document.getElementById("instructions-list");
    instructionsList.innerHTML = "";

    if (workout.instructions && workout.instructions.length > 0) {
      workout.instructions.forEach((step) => {
        const li = document.createElement("li");
        li.textContent = step;
        instructionsList.appendChild(li);
      });
    } else {
      instructionsList.innerHTML = "<li>No instructions available.</li>";
    }
  } else {
    document.getElementById("workout-info").innerHTML =
      "<p>No workout data available.</p>";
  }
});
