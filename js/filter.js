function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.classList.toggle("active");
}

//search through checkbox
function searchCheckbox() {
  let selectedcheckbox = Array.from(
    document.querySelectorAll(".checkbox:checked")
  ).map((checkbox) => checkbox.value);

  // Filter exercises matching selected primary muscles
  let filteredExercises = exercises.filter((exercise) =>
    exercise.primaryMuscles.some((muscle) => selectedMuscles.includes(muscle))
  );

  displayExercises(filteredExercises);


  
}






      