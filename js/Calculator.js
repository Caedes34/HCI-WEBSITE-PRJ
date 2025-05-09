// CALCULATOR LOGICS
document.addEventListener("DOMContentLoaded", function () {
  // Get the elements from the DOM
  //
  var age = document.getElementById("age");
  var height = document.getElementById("height");
  var weight = document.getElementById("weight");
  var male = document.getElementById("m");
  var female = document.getElementById("f");
  var submitButton = document.getElementById("submit");
  let resultArea = document.querySelector(".comment");


  //
  let modalText = document.querySelector("#modalText");
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  // Add event listeners to the element SUBMIT BUTTON
  submitButton.addEventListener("click", function () {
    calculate();
  });


  //function to calculate 
  function calculate() {



    // Check if the input fields are empty or not
    //if it is empty show the modal with the message
    //if its not empty call the countBmi function
    if (
      age.value.trim() === "" ||
      height.value.trim() === "" ||
      weight.value.trim() === "" ||
      (!male.checked && !female.checked)
    ) {
      modal.style.display = "block";
      modalText.innerHTML = `All fields are required!`;
    } else {
      countBmi();
    }
  }
  //function to calculate the BMI
  //and show the result in the result area
  //and also show the result in the modal
  function countBmi() {
    var bmi = Number(weight.value) / (Number(height.value) / 100) ** 2;
    var result = "";

    //if else statement to check the BMI value
    //and show the result in the result area
    if (bmi < 18.5) {
      result = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      result = "Healthy";
    } else if (bmi >= 25 && bmi <= 29.9) {
      result = "Overweight";
    } else if (bmi >= 30 && bmi <= 34.9) {
      result = "Obese";
    } else if (bmi >= 35 && bmi <= 39.9) {
      result = "Severely obese";
    } else if (bmi >= 40) {
      result = "Morbidly obese";
    }
    //show the result in the modal
    //show the result in the result area
    resultArea.style.display = "block";
    resultArea.innerHTML = `You are <span id="comment">${result}</span>`;
    document.querySelector("#result").innerHTML = bmi.toFixed(2);
  }

  span.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});
