
// This function fetches workout data from a JSON file
// and loads the thumbnails into the container
// It also handles the checkbox filtering logic
async function fetchWorkoutData() {
  try {
    const response = await fetch("../data/exercises.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data on json", error);
    return [];
  }
}
// Function to create a thumbnail element for each workout
// This function creates a thumbnail for each workout and adds event listeners for click and pin actions
function createThumbnail(workout) {
  const thumbnail = document.createElement("div");
  thumbnail.classList.add("thumbnail");

  const img = document.createElement("img");
  img.src = `http://127.0.0.1:5500/data/images/${workout.images[1]}`;
  img.alt = "Thumbnail";
  img.classList.add("thumbnail-image");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("thumbnail-info");

  const separator = document.createElement("hr");
  separator.classList.add("thumbnail-separator");

  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("thumbnail-tags");

  const pinDiv = document.createElement("div");
  pinDiv.classList.add("PIN-ICON");

  const pinBtn = document.createElement("button");
  pinBtn.classList.add("pin-button");

  const pinImg = document.createElement("img");
  pinImg.src = "images/deactivated-pin.png";
  pinImg.alt = "pin-icon";

  const deactivatedSrc = "images/deactivated-pin.png";
  const activatedSrc = "images/activated-pin.png";

  pinBtn.appendChild(pinImg);
  pinDiv.appendChild(pinBtn);

  const tags = [
    ...new Set([
      workout.primaryMuscles,
      workout.equipment,
      workout.category,
      workout.force,
    ]),
  ];
  tags.forEach((tagText) => {
    if (tagText) {
      const tag = document.createElement("span");
      tag.textContent = tagText;
      tag.classList.add("tag");
      tagsDiv.appendChild(tag);
    }
  });

  const title = document.createElement("h3");
  title.classList.add("thumbnail-title");
  title.textContent = workout.name || "\n Workout Name";

  const metaDiv = document.createElement("div");
  metaDiv.classList.add("thumbnail-meta");

  const difficultySpan = document.createElement("span");
  difficultySpan.classList.add("thumbnail-difficulty");
  difficultySpan.textContent = workout.level;

  infoDiv.appendChild(title);
  infoDiv.appendChild(difficultySpan);
  infoDiv.appendChild(separator);
  infoDiv.appendChild(tagsDiv);
  infoDiv.appendChild(metaDiv);
  thumbnail.appendChild(img);
  thumbnail.appendChild(infoDiv);
  thumbnail.appendChild(pinDiv);
  



  // Add event listeners for thumbnail click and pin button click
  // Handle click for detailed page navigation
  thumbnail.addEventListener("click", function () {
    localStorage.setItem("selectedWorkout", JSON.stringify(workout));
    window.location.href = "info-page.html";
  });

  pinBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    if (pinImg.src.includes(deactivatedSrc)) {
      pinImg.src = activatedSrc; // Change to activated pin
      addToPinnedWorkouts(workout); // Save to localStorage
    } else {
      pinImg.src = deactivatedSrc; // Change to deactivated pin
      removeFromPinnedWorkouts(workout.id); // Remove from localStorage
    }
  });

  return thumbnail;
}

// Function to add workout to pinned list in localStorage
function addToPinnedWorkouts(workout) {
  let pinnedWorkouts = JSON.parse(localStorage.getItem("pinnedWorkouts")) || [];

  // Add workout if it's not already in pinned workouts
  if (!pinnedWorkouts.some((pinned) => pinned.id === workout.id)) {
    pinnedWorkouts.push(workout);
    localStorage.setItem("pinnedWorkouts", JSON.stringify(pinnedWorkouts));
  }
}

// Function to remove workout from pinned list in localStorage
function removeFromPinnedWorkouts(workoutId) {
  let pinnedWorkouts = JSON.parse(localStorage.getItem("pinnedWorkouts")) || [];

  pinnedWorkouts = pinnedWorkouts.filter((workout) => workout.id !== workoutId);
  localStorage.setItem("pinnedWorkouts", JSON.stringify(pinnedWorkouts));
}

function loadThumbnails(workouts) {
  const container = document.getElementById("thumbnail-container");
  container.innerHTML = ""; // Clear previous thumbnails
  const limitedWorkouts = workouts.slice(0, 27);

  limitedWorkouts.forEach((workout) => {
    const thumbnail = createThumbnail(workout);
    container.appendChild(thumbnail);
  });
}

// Event listener for checkboxes
// This function will be called when any checkbox changes stateno-results-message
// It collects the selected values from all checkboxes and filters the workouts accordingly
// It then loads the filtered workouts into the thumbnail container
document
  .querySelectorAll(
    ".body-checkbox-primaryMuscle, .body-checkbox-level, .body-checkbox-equipment, .body-checkbox-category, .body-checkbox-force, .body-checkbox-mechanic"
  )
  .forEach((checkbox) => {
    checkbox.addEventListener("change", async () => {
      // Collect selected values for each checkbox (primaryMuscles, level, etc.)
      const selectedPrimaryMuscles = Array.from(
        document.querySelectorAll(".body-checkbox-primaryMuscle:checked")
      ).map((cb) => cb.value);

      const selectedLevels = Array.from(
        document.querySelectorAll(".body-checkbox-level:checked")
      ).map((cb) => cb.value);

      const selectedForce = Array.from(
        document.querySelectorAll(".body-checkbox-force:checked")
      ).map((cb) => cb.value);

      const selectedMechanic = Array.from(
        document.querySelectorAll(".body-checkbox-mechanic:checked")
      ).map((cb) => cb.value);

      const selectedEquipment = Array.from(
        document.querySelectorAll(".body-checkbox-equipment:checked")
      ).map((cb) => cb.value);

      const selectedCategories = Array.from(
        document.querySelectorAll(".body-checkbox-category:checked")
      ).map((cb) => cb.value);

      console.log("Selected values: ", {
        selectedPrimaryMuscles,
        selectedCategories,
        selectedLevels,
        selectedEquipment,
        selectedForce,
        selectedMechanic,
      });

      const workouts = await fetchWorkoutData();

      const filteredWorkouts = workouts.filter((workout) => {
        const matchesPrimaryMuscles =
          selectedPrimaryMuscles.length === 0 ||
          workout.primaryMuscles.some((muscle) =>
            selectedPrimaryMuscles.includes(muscle)
          );
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(workout.category);
        const matchesLevel =
          selectedLevels.length === 0 || selectedLevels.includes(workout.level);
        const matchesEquipment =
          selectedEquipment.length === 0 ||
          selectedEquipment.includes(workout.equipment);
        const matchesForce =
          selectedForce.length === 0 || selectedForce.includes(workout.force);
        const matchesMechanic =
          selectedMechanic.length === 0 ||
          selectedMechanic.includes(workout.mechanic);

        return (
          matchesPrimaryMuscles &&
          matchesLevel &&
          matchesEquipment &&
          matchesCategory &&
          matchesForce &&
          matchesMechanic
        );
      });
      loadThumbnails(filteredWorkouts);
    });
  });
