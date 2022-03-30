//individual field declarations
let moneyField = document.getElementById("money");
let customTipField = document.getElementById("tip-custom");
let numberOfPeople = document.getElementById("number-of-people");
let tipText = document.getElementById("tip-amount");
let totalText = document.getElementById("total");
//logic functions
function getTipAmount(bill, percentage, people) {
  if (people != 0) {
    return (bill * (percentage / 100)) / people;
  } else {
    alert("Attempted to divide by 0");
    return 0;
  }
}
function getTotalPerPerson(people, n) {
  if (people != 0) {
    return n / people;
  } else {
    alert("Attempted to divide by 0");
    return 0;
  }
}
//inputs
//event handler to check whether input is either NaN, undefined or negative
function validateInput(event) {
  let obj = event.target;
  if (isNaN(obj.value) || obj.value <= 0 || obj === undefined) {
    obj.value = 1;
    obj.style.outlineColor = "red"
  } else {
    obj.style.outlineColor = "hsl(172, 67%, 45%)"
  }
}
//pulls element(s) out of focus when using scroll wheel
function stopScrollWheel(obj) {
  obj.addEventListener("wheel", function () {
    this.blur();
  });
}
const inputs = document.getElementsByClassName("input");
//basic input code

//input validation
for (let index = 0; index < inputs.length; index++) {
  let inputField = inputs[index];
  stopScrollWheel(inputField);
  inputField.addEventListener("input", validateInput); 
}
//event listeners for total
moneyField.addEventListener("change", updateTipAmount)
customTipField.addEventListener("change", updateTipAmount)
numberOfPeople.addEventListener("change", updateTipAmount)
//event listeners for total
moneyField.addEventListener("change", updateTotal)
customTipField.addEventListener("change", updateTotal)
numberOfPeople.addEventListener("change", updateTotal)
//update texts
function updateTotal(){
  let people = numberOfPeople.value
  let bill = moneyField.value
  let totalPerPerson = parseFloat(getTotalPerPerson(people, bill)).toFixed(2) //transform into a float then show 2 decimal digits(no rounding occurs)
  totalText.innerText = totalPerPerson + '$'
}
function updateTipAmount(){
  let percent = customTipField.value
  let people = numberOfPeople.value
  let bill = moneyField.value
  let tipPerPerson = parseFloat(getTipAmount(bill, percent, people)).toFixed(2) //transform into a float then show 2 decimal digits(no rounding occurs)
  tipText.innerText = tipPerPerson + '$'
}
//code for button tip percentages
let percentButtons = document.getElementsByClassName("tip-percent")
for (let index = 0; index < percentButtons.length; index++) {
  let percentButton = percentButtons[index];
  percentButton.addEventListener("click", updateTipAmountFromButton);
  percentButton.addEventListener("click", updateTotal);
}
function updateTipAmountFromButton(event){
  let percentFromButton = event.target.innerText
  percentFromButton = percentFromButton.replace('%','')
  console.log(percentFromButton)
  let people = numberOfPeople.value
  let bill = moneyField.value
  let tipPerPerson = parseFloat(getTipAmount(bill, percentFromButton, people)).toFixed(2) //transform into a float then show 2 decimal digits(no rounding occurs)
  tipText.innerText = tipPerPerson + '$'
}