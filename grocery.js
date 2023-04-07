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

//Clear form
clear.addEventListener('click', clearItems);

// Functions
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getDate().toString();
    //If statement to check if user is not editing the item.
    if(value !== '' && editFlag === false)
    {
        const element = document.createElement('article');
        //add class
        element.classList.add('grocery-item');
        //add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>`; 
        //append child
        list.appendChild(element);
        //display alert
        displayAlert('Item added to the list', 'success')
        //show container from css (.show-container line code 263)
        container.classList.add('show-container');
        //add to local storage
        addToLocalStorage(id,value);
        //set back to default
        setBackToDefault();
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

//clear items function
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach((item) => {
            list.removeChild(item);
        });
    }

    container.classList.remove("show-container");
    displayAlert("list has been removed", "success")
    setBackToDefault();
    //localStorage.removeItem('list');
}

//Set back to default
function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = "";
    submitBtn.textContent = 'submit';
}

// Local Storage
function addToLocalStorage(id, value){
    console.log('added to local storage');
}

// Setup items
