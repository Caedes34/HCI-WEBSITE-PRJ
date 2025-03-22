let search = "back";
async function fetchWorkoutData() {
  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${search}`;
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

    console.log("fetched data:", result);
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function createThumbnail(workout) {
  const thumbnail = document.createElement("div");
  thumbnail.classList.add("thumbnail");

  const img = document.createElement("img");
  img.src = workout.gifUrl || "ASSETS/LOADING ANIM.gif";
  img.alt = "Thumbnail";
  img.classList.add("thumbnail-image");
  5;

  const pinDiv = document.createElement("div");
  pinDiv.classList.add("PIN-ICON");
  const pinBtn = document.createElement("button");
  const pinImg = document.createElement("img");
  pinImg.src = "ASSETS/PIN.png";
  pinImg.alt = "PIN ICON";
  pinBtn.appendChild(pinImg);
  pinDiv.appendChild(pinBtn);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("thumbnail-info");

  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("thumbnail-tags");

  const tags = Array.isArray(workout.tags) ? workout.tags : [];
  tags.forEach((tagText) => {
    const tag = document.createElement("span");
    tag.textContent = tagText;
    tag.classList.add("tag");
    tagsDiv.appendChild(tag);
  });

  const title = document.createElement("h3");
  title.classList.add("thumbnail-title");
  title.textContent = workout.name || "Workout Name";

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

document.addEventListener("DOMContentLoaded", loadThumbnails);
