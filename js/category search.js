// Function to fetch workout data from JSON file

// Initial random fetch (optional, can be removed)
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const defaultWorkouts = await fetchWorkoutData(category); // Default category
    loadThumbnails(defaultWorkouts);
  } catch (error) {
    console.error("Error loading default workouts", error);
  }
});

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
  // Add event listeners for thumbnail and pin button
  thumbnail.addEventListener("click", function () {
    localStorage.setItem("selectedWorkout", JSON.stringify(workout));
    window.location.href = "info-page.html";
  });
  // Add event listener for pin button
  pinBtn.addEventListener("click", function (event) {
    // Added event parameter to prevent propagation
    // to prevent the thumbnail click event from firing
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
  //
  let pinnedWorkouts = JSON.parse(localStorage.getItem("pinnedWorkouts")) || [];

  // Add workout if it's not already in pinned workouts
  // Check if the workout is already pinned
  if (!pinnedWorkouts.some((pinned) => pinned.id === workout.id)) {
    pinnedWorkouts.push(workout);
    localStorage.setItem("pinnedWorkouts", JSON.stringify(pinnedWorkouts));
  }
}

// Function to remove workout from pinned list in localStorage
function removeFromPinnedWorkouts(workoutId) {
  let pinnedWorkouts = JSON.parse(localStorage.getItem("pinnedWorkouts")) || [];

  // Remove workout from pinned workouts
  pinnedWorkouts = pinnedWorkouts.filter((workout) => workout.id !== workoutId);
  localStorage.setItem("pinnedWorkouts", JSON.stringify(pinnedWorkouts));
}
// Function to load thumbnails into the container
function loadThumbnails(workouts) {
  const container = document.getElementById("thumbnail-container");
  container.innerHTML = "";

  const limitedWorkouts = workouts.slice(0, 30);

  limitedWorkouts.forEach((workout) => {
    const thumbnail = createThumbnail(workout);
    container.appendChild(thumbnail);
  });
}
// Category Slider Functionality
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", async function () {
    let category = this.getAttribute("data-value");
    console.log("Fetching workouts for:", category);

    try {
      const workouts = await fetchWorkoutData();
      const filteredWorkouts = workouts.filter(
        (workout) => workout.category === category
      );
      loadThumbnails(filteredWorkouts);
    } catch (error) {
      console.error("Error loading workouts", error);
    }
  });
});
