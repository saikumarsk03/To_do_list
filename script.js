const todolist = document.getElementById("todolist");
const addlist = document.getElementById("addbtn");
const searchInput = document.getElementById("textinput");
const count =document.getElementById('count');

const arr = [];
//Initial setting coutt to 0
c = 0;
// Initial display of all items
displayFilteredItems(arr);

// Event listener for the search bar
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  displayFilteredItems(arr.filter(item => item.toLowerCase().includes(searchTerm)));
});

// Display filtered items
function displayFilteredItems(filteredItems) {
  todolist.innerHTML = "";

  if (filteredItems.length === 0) {
    const noSuggestionsDiv = document.createElement("div");
    noSuggestionsDiv.innerHTML = "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;No suggestions found";
    todolist.appendChild(noSuggestionsDiv);
  } else {
    filteredItems.forEach(element => {
      const div = document.createElement("div");
      div.innerHTML = ` <i class="fa-solid oicon fa-circle-check" style="color: #A0153E;"></i>&nbsp; <div>${element}</div> &nbsp;<i  class="fa-solid editButton fa-pen-to-square" style="margin-left:250px;"></i> <i class="fa-solid saveButton fa-check" style="display: none;margin-left:250px;"></i>`;
      div.classList.add("todocontent","fadeinn");
      
      
      todolist.appendChild(div);
      
    });
  }
}

// Add item 
addlist.addEventListener('click', () => {
  const value = document.getElementById("textinput").value;
  
  arr.push(value);
  displayFilteredItems(arr);
  
  count.innerHTML=`Count : ${++c}`;
});


// Event listener for moving completed items and editing items
todolist.addEventListener('click', (event) => {
  // If the clicked element is an oicon
  if (event.target.classList.contains('oicon')) {
      const completedItem = event.target.parentElement; // Get the parent div of the icon
      const container2 = document.getElementById("container2");

      // Apply fadeout class to the completed item
      completedItem.classList.add("fadeout");

      // Delay the removal of the completed item after the animation has finished
      setTimeout(() => {
          const itemText = completedItem.textContent.trim();
          const itemIndex = arr.indexOf(itemText);
          count.innerHTML = `Count : ${--c}`;
          if (itemIndex !== -1) {
              arr.splice(itemIndex, 1);
          }

          completedItem.innerHTML = `<i class="fa-solid fa-circle-check oicon" style="color: #006647;"></i>&nbsp;<P style="margin-left:30px"> ${itemText} </P>&nbsp;<i class="fa-solid trashh fa-sm fa-trash fa-2xs"></i>`;

          container2.appendChild(completedItem);
      }, 800); // Adjust the delay time as needed to match the duration of the fadeout animation
  }

  // If the clicked element is an edit button
  const clickedElement = event.target;

  // If the clicked element is an edit button
  if (clickedElement.classList.contains('editButton')) {
      const contentDiv = clickedElement.parentElement.querySelector('div'); // Get the content div
      const saveButton = clickedElement.nextElementSibling; // Get the save button

      // Enable editing mode for the current content
      contentDiv.contentEditable = true;
      contentDiv.style.border = "0.5px solid black";

      // Show save button and hide edit button
      clickedElement.style.display = "none";
      saveButton.style.display = "inline-block";
  }

  
  // If the clicked element is the save button
if (clickedElement.classList.contains('saveButton')) {
  const contentDiv = clickedElement.parentElement.querySelector('div'); 
  const editButton = clickedElement.previousElementSibling; 

  // Disable editing mode for the current content
  contentDiv.contentEditable = false;
  contentDiv.style.border = "none";

  // Hide save button and show edit button
  clickedElement.style.display = "none";
  editButton.style.display = "inline-block";

  // Update the content in the array
  const newContent = contentDiv.innerText.trim(); 
  const filteredChildren = [...todolist.children].filter(child => child.classList.contains("todocontent"));
  const divIndex = filteredChildren.indexOf(contentDiv.parentElement);
  if (divIndex !== -1) {
      arr[divIndex] = newContent;
  }

  console.log(arr); 
}
});


// Event Listener to remove all completed Items
const deleteitems = document.getElementById("container2");
deleteitems.addEventListener('click', (event) => {
    if (event.target.classList.contains('trashh')) {
        const itemToDelete = event.target.parentElement; 
        itemToDelete.remove();
    }
});


const deleteall=document.getElementById( "deleteall" );
const completeall=document.getElementById( 'completeall' ) ;
function hideShow() {
  var todolistDiv = document.getElementById("todolist");
  var container2Div = document.getElementById("container2");
  const com = document.getElementById("completed");
  const uncomp = document.getElementById("uncompleted");
  deleteall.classList.toggle('hidden');
            completeall.classList.toggle('hidden');
  if (todolistDiv.classList.contains("hidden")) {
      todolistDiv.classList.remove("hidden");
      container2Div.classList.add("hidden");
      com.classList.add("hidden");
      uncomp.classList.remove("hidden");
      
  } else {
      todolistDiv.classList.add("hidden");
      container2Div.classList.remove("hidden");
      com.classList.remove("hidden");
      uncomp.classList.add("hidden");    
  }
}

//Handling deleteall button
const container2 = document.getElementById("container2");
deleteall.addEventListener('click',()=>{
container2.innerHTML= "";
})

//Handling complete  all button
completeall.addEventListener('click', () => {
 
  todolist.innerHTML="";
  arr.length = 0;
  c = 0;
  count.innerHTML = `Count : ${c}`;
});
