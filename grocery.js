// Select Items
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clear = document.querySelector('.clear-btn');

// Edit Option
let editElement;
let editFlag = false;
let editID = '';

// Event Listeners


//Submit Form
form.addEventListener('submit', addItem)

// Functions
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getDate().toString();
    //If statement to check if user is not editing the item.
    if(value !== '' && editFlag === false)
    {
        console.log("add item to the list");
    }
    //If statement to check if user is editing the item.
    else if(value !== '' && editFlag === true){
        console.log("editiong");
    }
    ////If statement to check if user has added something to the list
    else{
        displayAlert('please enter a valid value', 'danger');
    }
}
//Display 
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    },1000);
}
// Local Storage

// Setup items
