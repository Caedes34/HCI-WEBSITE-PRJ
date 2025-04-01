document.addEventListener("DOMContentLoaded", async () => {
  const pinnedWorkouts =
    JSON.parse(localStorage.getItem("pinnedWorkouts")) || [];

  loadPinnedThumbnails(pinnedWorkouts);
});

function loadPinnedThumbnails(workouts) {
  const container = document.getElementById("pinned-thumbnail-container");
  container.innerHTML = "";

  workouts.forEach((workout) => {
    const thumbnail = createThumbnail(workout);
    container.appendChild(thumbnail);
  });
}
