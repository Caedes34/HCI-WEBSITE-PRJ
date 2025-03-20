// searching function
let API_URL = "";
let response = "";
let data = [];

document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let workoutname = document.getElementById("SearchInput").value.trim();

    if (!workoutname) return;

    window.location.href = `RESULTS PAGE.html?search=${encodeURIComponent(
      workoutname
    )}`;
  });

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const workoutname = urlParams.get("search");

  if (!workoutname) {
    console.error("No search term provided.");
    return;
  }
  console.log("Searching for...:", workoutname);
  console.log("API URL", API_URL);

  API_URL = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(
    workoutname
  )}`;

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "87f5e59955mshdae3a211e701e93p1d5c76jsn6813f7326822",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    });

    const data = await response.json();
    console.log("Fetch Data:", data);

    if (!data || data.length === 0) {
      alert("no results");
      return;
    }

    data.forEach((workout) => createThumbnail(workout));
  } catch (error) {
    console.error("Error fetching", error);
  }
});

function createThumbnail(workout) {
  const thumbnail = document.createElement("div");
  thumbnail.classList.add("thumbnail");

  // Create image element
  const img = document.createElement("img");
  img.src = workout.gifUrl || "ASSETS/LOADING ANIM.gif"; // Fallback image
  img.alt = "Thumbnail";
  img.classList.add("thumbnail-image");
  5;

  // Create PIN icon
  const pinDiv = document.createElement("div");
  pinDiv.classList.add("PIN-ICON");
  const pinBtn = document.createElement("button");
  const pinImg = document.createElement("img");
  pinImg.src = "ASSETS/PIN.png";
  pinImg.alt = "PIN ICON";
  pinBtn.appendChild(pinImg);
  pinDiv.appendChild(pinBtn);

  // Create info section
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("thumbnail-info");

  // Create tags
  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("thumbnail-tags");

  const tags = Array.isArray(workout.tags) ? workout.tags : [];
  tags.forEach((tagText) => {
    const tag = document.createElement("span");
    tag.textContent = tagText;
    tag.classList.add("tag");
    tagsDiv.appendChild(tag);
  });

  // Title
  const title = document.createElement("h3");
  title.classList.add("thumbnail-title");
  title.textContent = workout.name || "Workout Name";

  // Metadata (Duration & Difficulty)
  const metaDiv = document.createElement("div");
  metaDiv.classList.add("thumbnail-meta");

  const durationSpan = document.createElement("span");
  durationSpan.classList.add("thumbnail-duration");
  durationSpan.textContent = `DURATION: ${workout.duration || "15 min"}`;

  const difficultyLevels = ["Beginner", "Intermediate", "Expert"];

  const difficultySpan = document.createElement("span");
  difficultySpan.classList.add("thumbnail-difficulty");
  difficultySpan.textContent =
    workout.difficulty ||
    difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];

  // Append everything
  metaDiv.appendChild(durationSpan);
  metaDiv.appendChild(difficultySpan);

  infoDiv.appendChild(tagsDiv);
  infoDiv.appendChild(title);
  infoDiv.appendChild(metaDiv);

  thumbnail.appendChild(img);
  thumbnail.appendChild(pinDiv);
  thumbnail.appendChild(infoDiv);

  return thumbnail;
}

async function loadThumbnails() {
  let workout = await fetchWorkoutData();
  const container = document.getElementById("thumbnail-container");
  container.innerHTML = "";

  workout.forEach((workout) => {
    const thumbnail = createThumbnail(workout);
    container.appendChild(thumbnail);
  });
}
