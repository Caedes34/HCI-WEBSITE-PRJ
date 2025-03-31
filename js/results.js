document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const workoutName = urlParams.get("query");

  if (workoutName) {
    const workouts = await fetchWorkoutData(workoutName);
    loadThumbnails(workouts);
  }

  async function fetchWorkoutData(workoutName) {
    if (!workoutName) return [];

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

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("thumbnail-info");

    const tagsDiv = document.createElement("div");
    tagsDiv.classList.add("thumbnail-tags");

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
    infoDiv.appendChild(tagsDiv);
    infoDiv.appendChild(metaDiv);
    thumbnail.appendChild(img);
    thumbnail.appendChild(infoDiv);
    thumbnail.appendChild(pinDiv);

    thumbnail.addEventListener("click", function () {
      localStorage.setItem("selectedWorkout", JSON.stringify(workout));
      window.location.href = "info-page.html";
    });

    return thumbnail;
  }
  function loadThumbnails(workouts) {
    const container = document.getElementById("thumbnail-container");
    container.innerHTML = "";

    workouts.forEach((workout) => {
      const thumbnail = createThumbnail(workout);
      container.appendChild(thumbnail);
    });
  }

  if (workoutName) {
    fetchWorkoutData(workoutName).then(loadThumbnails);
  }
});
