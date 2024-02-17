let todoItemsContainer = document.getElementById('todoItemsContainer');
let saveTodoButton = document.getElementById('saveTodoButton');



saveTodoButton.onclick = function(){
	localStorage.setItem("todoList",JSON.stringify(items));
}

function getItemsFromLocalStorage(){
	let strinfiedList = localStorage.getItem("todoList");
	let parsedList = JSON.parse(strinfiedList);
	if (parsedList === null) {
		return [];
	}else{
		return parsedList;
	}
}

let items = getItemsFromLocalStorage();

let itemsCount = items.length;

function checkStatus(checkBoxID,labelId,listId){
	let checkElement = document.getElementById(checkBoxID);
	let labelIdElement = document.getElementById(labelId);
	labelIdElement.classList.toggle("checked");

	let todoItemIndex = items.findIndex(function(item){
		let todoItemId = "list" +item.id;
		if (todoItemId === listId){
			return true;
		}else{
			return false;
		}
	});
	let todoObject = items[todoItemIndex];
	//console.log(todoObject);
	if(todoObject.isChecked === true){
		todoObject.isChecked = false;
	}else{
		todoObject.isChecked = true;
	}
}

function deleteListItem(listId){
	let listElement = document.getElementById(listId);
	todoItemsContainer.removeChild(listElement);
	let deletedItemIndex = items.findIndex(function(item){
		let eachTodoId = "list" + item.id;
		if (eachTodoId === listId){
			return true;
		}else{
			return false;
		}
	});  
	items.splice(deletedItemIndex,1);
}

function addingItems(items){
	let checkBoxID = "checkbox" + items.id;
	let labelId = "label" + items.id;
	let listId = "list" + items.id;

	let listElement = document.createElement('li');
	listElement.classList.add('todo-item-container','d-flex','flex-row');
	listElement.id = listId;
	todoItemsContainer.appendChild(listElement);

	let inputElemnt = document.createElement('input');
	inputElemnt.type = "checkbox";
	inputElemnt.id = checkBoxID;
	inputElemnt.classList.add('checkbox-input');
	inputElemnt.checked = items.isChecked;
	inputElemnt.onclick = function(){
		checkStatus(checkBoxID,labelId,listId);
	}

	listElement.appendChild(inputElemnt);

	let labelContainer = document.createElement('div');
	labelContainer.classList.add('d-flex','flex-row','label-container');
	listElement.appendChild(labelContainer);

	let labelElement = document.createElement('label');
	labelElement.setAttribute('for',checkBoxID);
	labelElement.classList.add('checkbox-label');
	labelElement.textContent = items.text;
	if(items.isChecked === true){
		labelElement.classList.add("checked");
	}
	labelElement.id = labelId;
	labelContainer.appendChild(labelElement);

	let deleteContainer = document.createElement('div');
	deleteContainer.classList.add('delete-icon-container');
	labelContainer.appendChild(deleteContainer);

	let deleteIcon = document.createElement('i');
	deleteIcon.classList.add('far','fa-trash-alt','delete-icon');
	deleteContainer.appendChild(deleteIcon);
	deleteIcon.onclick = function(){
		deleteListItem(listId);
	}
}


for (let item of items){
	addingItems(item);
}

function addList(){
	let userInput = document.getElementById('todoUserInput')
	let userInputElement = userInput.value;
	itemsCount = itemsCount + 1;
	let newItem = {
		text : userInputElement,
		id : itemsCount,
		isChecked : false
	}

	items.push(newItem);
	

	if (userInputElement === '') {
		alert('Enter Valid input');
	}
	else{
		addingItems(newItem);
		userInput.value = '';
	}
}

let addTodoButton = document.getElementById('addItemToList');
addTodoButton.onclick = function(){
	addList();
}



