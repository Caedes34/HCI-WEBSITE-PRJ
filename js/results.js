const urlParams = new URLSearchParams(window.location.search);
const workoutName = urlParams.get("query");

async function fetchWorkoutData(workoutName) {
  if (!workoutName) return [];

  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(
    workoutName
  )}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "87f5e59955mshdae3a211e701e93p1d5c76jsn6813f7326822",
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("Fetched data:", result);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function createThumbnail(workout) {
  const thumbnail = document.createElement("div");
  thumbnail.classList.add("thumbnail");

  const img = document.createElement("img");
  img.src = workout.gifUrl || "images/LOADING ANIM.gif";
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
    ...new Set([
      workout.bodyPart,
      workout.equipment,
      workout.target,
      ...(workout.secondaryMuscles || []),
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
  title.textContent = workout.name || "Workout Name";

  const metaDiv = document.createElement("div");
  metaDiv.classList.add("thumbnail-meta");

  const durationSpan = document.createElement("span");
  durationSpan.classList.add("thumbnail-duration");
  durationSpan.textContent = `DURATION: ${workout.duration || "15 min"}`;

  const difficultyLevels = ["Beginner", "Intermediate", "Average"];
  const difficultySpan = document.createElement("span");
  difficultySpan.classList.add("thumbnail-difficulty");
  difficultySpan.textContent =
    workout.difficulty ||
    difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];

  //   metaDiv.appendChild(durationSpan);
  metaDiv.appendChild(difficultySpan);

  infoDiv.appendChild(tagsDiv);
  infoDiv.appendChild(title);
  infoDiv.appendChild(metaDiv);

  thumbnail.appendChild(img);
  thumbnail.appendChild(pinDiv);
  thumbnail.appendChild(infoDiv);

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

// Attach event listeners to buttons
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", async function () {
    let workoutName = this.getAttribute("data-value"); // Get value from button
    console.log("Fetching workouts for:", workoutName);

    const workouts = await fetchWorkoutData(workoutName);
    loadThumbnails(workouts);
  });
});

if (workoutName) {
  fetchWorkoutData(workoutName).then(loadThumbnails);
}
