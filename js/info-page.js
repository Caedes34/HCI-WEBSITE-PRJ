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
