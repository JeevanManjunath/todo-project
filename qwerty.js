let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

// Retrieve todos from local storage
function getTodoListFromLocalStorage() {
    let savedTodos = localStorage.getItem("todoList");
    return savedTodos ? JSON.parse(savedTodos) : [];
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

// Save todos to local storage
saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

// Add new todo item
function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value.trim();

    if (userInputValue === "") {
        alert("Enter a valid task!");
        return;
    }

    todosCount++;
    let newTodo = { text: userInputValue, uniqueNo: todosCount, isChecked: false };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

// Handle add button click
addTodoButton.onclick = function() {
    onAddTodo();
};

// Mark todo as completed
function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoIndex = todoList.findIndex(todo => "todo" + todo.uniqueNo === todoId);
    todoList[todoIndex].isChecked = !todoList[todoIndex].isChecked;
}

// Delete a todo
function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteIndex = todoList.findIndex(todo => "todo" + todo.uniqueNo === todoId);
    todoList.splice(deleteIndex, 1);
}

// Create and append todo item
function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container");
    todoElement.id = todoId;

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked) labelElement.classList.add("checked");

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");  // Correct classes
    deleteIcon.onclick = function() {
    onDeleteTodo(todoId);
};


    todoElement.appendChild(inputElement);
    todoElement.appendChild(labelElement);
    todoElement.appendChild(deleteIcon);
    todoItemsContainer.appendChild(todoElement);
}

// Load existing todos
todoList.forEach(createAndAppendTodo);
