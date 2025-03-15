let durationSlider = document.getElementById("duration");
let durationValue = document.getElementById("durationValue");

durationSlider.addEventListener("input", function () {
  durationValue.textContent = this.value + " mins";
});
