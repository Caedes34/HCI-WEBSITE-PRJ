document.addEventListener("DOMContentLoaded", async () => {
  // Retrieve pinned workouts from localStorage
  const pinnedWorkouts =
    JSON.parse(localStorage.getItem("pinnedWorkouts")) || [];

  // Load thumbnails for pinned workouts
  loadPinnedThumbnails(pinnedWorkouts);
});

function loadPinnedThumbnails(workouts) {
  const container = document.getElementById("pinned-thumbnail-container");
  container.innerHTML = ""; // Clear the container before adding new thumbnails

  workouts.forEach((workout) => {
    const thumbnail = createThumbnail(workout);
    container.appendChild(thumbnail);
  });
}
