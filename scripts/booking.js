/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?
const costPerDayFull = 35;
const costPerDayHalf = 20;
let selectedDays = [];
let isFullDay = true;

const dayElements = document.querySelectorAll('.day-selector li');
const fullButton = document.getElementById('full');
const halfButton = document.getElementById('half');
const clearButton = document.getElementById('clear-button');
const calculatedCost = document.getElementById('calculated-cost');



/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

function updateSelectedDays(day) {
    const index = selectedDays.indexOf(day);
    if (index === -1) {
      selectedDays.push(day);
    } else {
      selectedDays.splice(index, 1);
    }
    recalculateCost();
  }
  function toggleDayClass(day) {
    day.classList.toggle('clicked');
  }
  
  function handleClick(event) {
    const day = event.target;
    updateSelectedDays(day.id);
    toggleDayClass(day);
  }
  
  dayElements.forEach(day => {
    day.addEventListener('click', handleClick);
  });





/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.
function clearSelectedDays() {
    selectedDays = [];
    dayElements.forEach(day => day.classList.remove('clicked'));
    recalculateCost();
  }
  
  clearButton.addEventListener('click', clearSelectedDays);





/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
function setFullDay() {
    isFullDay = true;
    fullButton.classList.add('clicked');
    halfButton.classList.remove('clicked');
    recalculateCost();
  }
  
  function setHalfDay() {
    isFullDay = false;
    halfButton.classList.add('clicked');
    fullButton.classList.remove('clicked');
    recalculateCost();
  }
  
  fullButton.addEventListener('click', setFullDay);
  halfButton.addEventListener('click', setHalfDay);

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function recalculateCost() {
    const numDays = selectedDays.length;
    let cost = isFullDay ? costPerDayFull : costPerDayHalf;
    const totalCost = numDays * cost;
    calculatedCost.textContent = totalCost;
  }
