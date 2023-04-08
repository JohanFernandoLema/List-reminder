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

//load items
window.addEventListener('DOMContentLoaded', setupItems);

// Functions
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    //If statement to check if user is not editing the item.
    if(value !== '' && editFlag === false)
    {
        createListItem(id, value);
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
        editElement.innerHTML = value;
        displayAlert('Item modified', 'success')

        //editLocalStorage
        editLocalStorage(editID, value);
        setBackToDefault();
         
    }
    ////If statement to check if user has added something to the list
    else{
        displayAlert('please enter a valid value', 'danger');
    }
}
//Display 
// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // remove alert
    setTimeout(function () {
      alert.textContent = "";
      alert.classList.remove(`alert-${action}`);
    }, 1000);
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
//delete function
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger')
    setBackToDefault();
    //remove from local storage
    removeFromLocalStorage(id);

}


//edit function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}
//Set back to default
function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = "";
    submitBtn.textContent = 'Add';
}

// Local Storage
function addToLocalStorage(id, value) {
    const grocery = { id, value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
  }
  
  function getLocalStorage() {
    return localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list"))
      : [];
  }
  
  function removeFromLocalStorage(id) {
    let items = getLocalStorage();
  
    items = items.filter(function (item) {
      if (item.id !== id) {
        return item;
      }
    });
  
    localStorage.setItem("list", JSON.stringify(items));
  }

// Setup items
function editLocalStorage(id, value) {
    let items = getLocalStorage();
  
    items = items.map(function (item) {
      if (item.id === id) {
        item.value = value;
      }
      return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
  }
  
  // SETUP LOCALSTORAGE.REMOVEITEM('LIST');
  
  // ****** setup items **********
  
  function setupItems() {
    let items = getLocalStorage();
  
    if (items.length > 0) {
      items.forEach(function (item) {
        createListItem(item.id, item.value);
      });
      container.classList.add("show-container");
    }
  }
  
  function createListItem(id, value) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
              <div class="btn-container">
                <!-- edit btn -->
                <button type="button" class="edit-btn">
                  <i class="fas fa-edit"></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="delete-btn">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            `;
    // add event listeners to both buttons;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
  
    // append child
    list.appendChild(element);
  }