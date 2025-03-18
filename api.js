const apiKey = "YOUR_API_KEY"; // Replace this with your RapidAPI key

// This will fetch exercises for chest
fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest", {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
})
  .then((response) => response.json()) // Convert response to JSON
  .then((data) => {
    const exerciseList = document.getElementById("exercise-list");
    // Loop through the data and display it
    data.forEach((exercise) => {
      const exerciseDiv = document.createElement("div");
      exerciseDiv.classList.add("exercise");
      exerciseDiv.innerHTML = `
            <h3>${exercise.name}</h3>
            <p>Target: ${exercise.target}</p>
            <p>Equipment: ${exercise.equipment}</p>
        `;
      exerciseList.appendChild(exerciseDiv);
    });
  })
  .catch((error) => console.error("Error fetching exercises:", error));
