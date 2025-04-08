//SEARCH FUNCTION
document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("query");

  if (searchQuery) {
    const workouts = await fetchWorkoutData(searchQuery);
    loadThumbnails(workouts);
  }

  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  //search button functionality and add for when user press enter on keyboard
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.search = `?query=${encodeURIComponent(query)}`;
      }
    }
  });
  searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (query) {
      window.location.search = `?query=${encodeURIComponent(query)}`;
    }
  });

  async function fetchWorkoutData(searchQuery) {
    try {
      const response = await fetch("../data/exercises.json");
      const data = await response.json();

      // Filter workouts based on multiple fields (name, category, level, etc.)
      return data.filter((workout) => {
        return (
          workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          workout.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          workout.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
          workout.primaryMuscles.some((muscle) =>
            muscle.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          workout.secondaryMuscles.some((muscle) =>
            muscle.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          (workout.equipment &&
            workout.equipment
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (workout.force &&
            workout.force.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (workout.mechanic &&
            workout.mechanic.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
    } catch (error) {
      console.error("Error fetching data from JSON", error);
      return [];
    }
  }

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

    // Handle click for detailed page navigation

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
  // Load thumbnails into the container
  function loadThumbnails(workouts) {
    const container = document.getElementById("thumbnail-container");
    container.innerHTML = "";

    const limitedWorkouts = workouts.slice(0, 9);

    limitedWorkouts.forEach((workout) => {
      const thumbnail = createThumbnail(workout);
      container.appendChild(thumbnail);
    });
  }
});
