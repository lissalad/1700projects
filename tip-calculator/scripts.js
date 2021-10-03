const tipOutput = document.querySelector('#show-tip');
const totalOutput = document.querySelector('#show-total');
const perPersonOutput = document.querySelector('#show-per-person');

const tipInput = document.querySelector('#tip')
const peopleInput = document.querySelector('#people')
const billInput = document.querySelector('#bill')

// ----------- yes a number ----------------------------- //
tipInput.value = 0;
peopleInput.value = 0;
billInput.value = 0;

// ----------- output setup ----------------------------- //

tipOutput.innerHTML = "Tip: ";
totalOutput.innerHTML = "Total: ";  
perPersonOutput.innerHTML = "Per Person: ";  

// ----------- EVENT LISTENERS --------------------------- //
tipInput.addEventListener('input', calculateTip);
peopleInput.addEventListener('input', calculateTip);
billInput.addEventListener('input', calculateTip);

// ------------------------------------------------------- //
function calculateTip() {
    const tip = parseFloat(tipInput.value);
    const people = parseFloat(peopleInput.value);
    const bill = parseFloat(billInput.value);
    console.log(bill, tip, people);

    const total = (bill * (tip/100) + bill);
    const totalTip = bill * (tip/100);
   
    updateCalculations(totalTip, total, people);
}

// ------------------------------------------------------- //
function updateCalculations(totalTip, total, people) {
    tipOutput.innerHTML = "Tip: $" + totalTip.toFixed(2);
    totalOutput.innerHTML = "Total: $" + total.toFixed(2);  
    perPersonOutput.innerHTML = "Per Person: $" + (total / people).toFixed(2); 
}