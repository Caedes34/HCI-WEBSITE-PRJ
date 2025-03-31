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

function createThumbnail(workout) {
  const thumbnail = document.createElement("div");
  thumbnail.classList.add("thumbnail");

  const img = document.createElement("img");
  img.src = `http://127.0.0.1:5500/data/images/${workout.images[0]}`;
  img.alt = "Thumbnail";
  img.classList.add("thumbnail-image");

  const pinDiv = document.createElement("div");
  pinDiv.classList.add("PIN-ICON");

  const pinBtn = document.createElement("button");
  pinBtn.classList.add("pin-button");
  pinBtn.setAttribute("data-id", workout.id);

  const pinImg = document.createElement("img");
  pinImg.src = "images/PIN.png";
  pinImg.alt = "PIN ICON";

  pinBtn.appendChild(pinImg);
  pinDiv.appendChild(pinBtn);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("thumbnail-info");

  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("thumbnail-tags");

  const tags = [
    ...new Set([workout.primaryMuscles, workout.equipment, workout.category]),
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
  title.textContent = workout.name || "Workout Name";

  const metaDiv = document.createElement("div");
  metaDiv.classList.add("thumbnail-meta");

  const durationSpan = document.createElement("span");
  durationSpan.classList.add("thumbnail-duration");
  durationSpan.textContent = `DURATION: ${workout.duration || "15 min"}`;

  const difficultySpan = document.createElement("span");
  difficultySpan.classList.add("thumbnail-difficulty");
  difficultySpan.textContent = workout.level;

  metaDiv.appendChild(difficultySpan);

  infoDiv.appendChild(tagsDiv);
  infoDiv.appendChild(title);
  infoDiv.appendChild(metaDiv);

  thumbnail.appendChild(img);
  thumbnail.appendChild(pinDiv);
  thumbnail.appendChild(infoDiv);

  thumbnail.addEventListener("click", function () {
    localStorage.setItem("selectedWorkout", JSON.stringify(workout));
    window.location.href = "info-page.html";
  });

  return thumbnail;
}

function loadThumbnails(workouts) {
  const container = document.getElementById("thumbnail-container");
  container.innerHTML = "";

  const limitedWorkouts = workouts.slice(0, 10);

  limitedWorkouts.forEach((workout) => {
    const thumbnail = createThumbnail(workout);
    container.appendChild(thumbnail);
  });
}

// Attach event listeners to buttons
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

// Initial random fetch (optional, can be removed)
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const defaultWorkouts = await fetchWorkoutData("chest"); // Default category
    loadThumbnails(defaultWorkouts);
  } catch (error) {
    console.error("Error loading default workouts", error);
  }
});
