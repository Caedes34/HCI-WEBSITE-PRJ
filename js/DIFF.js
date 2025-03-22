const diffculty = ["beginner", "medium", "intermediate"];
const diffcultyElements = document.querySelectorAll(".thumbnail-difficulty");

diffcultyElements.forEach((element) => {
  const randomIndex = Math.floor(Math.random() * diffculty.length);
  element.textContent = `Difficulty: ${diffculty[randomIndex]}`;
});
