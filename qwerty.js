let todoItemsContainer = document.getElementById('todoItemsContainer');
let saveTodoButton = document.getElementById('saveTodoButton');
let addTodobutton = document.getElementById('addTodobutton');

//localStorage.removeItem("todoList");

/*let todo1 = [{
        text: "Learn HTML",
        uniqueNo: 1
    },
    {
        text: "Learn CSS",
        uniqueNo: 2
    },
    {
        text: "Learn JS",
        uniqueNo: 3
    }
];*/


function getTodoListfromLocalStorage() {
    let stringifiedtodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedtodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let todoList = getTodoListfromLocalStorage();

let todocount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputvalue = userInputElement.value;
    if (userInputElement.value.trim() === "") {
        alert("Enter Valid Text");
        return;
    }
    todocount = todocount + 1;
    let newTodo = {
        text: userInputvalue,
        uniqueNo: todocount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppend(newTodo);
    userInputElement.value = "";
}

addTodobutton.onclick = function() {
    onAddTodo();
};

function onToDoStatuschange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    /*if (checkboxElement.checked === true) {
         labelElement.classList.add("strike-text");
     } else {
         labelElement.classList.remove("strike-text");
     }*/
    labelElement.classList.toggle("strike-text");

    let todoobjectIndex = todoList.findIndex(function(eachtodo) {
        let eachtodoId = "todo" + eachtodo.uniqueNo;
        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoobjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function ondeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deletedtodoitemindex = todoList.findIndex(function(eachtodo) {
        let eachtodoId = 'todo' + eachtodo.uniqueNo;
        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletedtodoitemindex, 1);
}

function createAndAppend(todo) {
    let checkboxId = 'checkbox' + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement('li');
    todoElement.classList.add('todo-item-container', 'd-flex', 'flex-container', 'flex-row');
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElememnt = document.createElement('input');
    inputElememnt.type = "checkbox";
    inputElememnt.id = checkboxId;
    inputElememnt.checked = todo.isChecked;

    inputElememnt.onclick = function() {
        onToDoStatuschange(checkboxId, labelId, todoId);
    };
    inputElememnt.classList.add('checkbox-input');
    todoElement.appendChild(inputElememnt);

    let labelcontainer = document.createElement('div');
    labelcontainer.classList.add('label-container', 'd-flex', 'flex-row');
    todoElement.appendChild(labelcontainer);

    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', checkboxId);
    labelElement.classList.add('checkbox-label');
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelcontainer.appendChild(labelElement);

    let deleteIconconatiner = document.createElement("div");
    deleteIconconatiner.classList.add('delete-icon-container');
    labelcontainer.appendChild(deleteIconconatiner);

    let deleteicon = document.createElement('i');
    deleteicon.classList.add('far', 'fa-trash-alt', 'delete-icon');
    deleteicon.onclick = function() {
        ondeleteTodo(todoId);
    };
    deleteIconconatiner.appendChild(deleteicon);
}

for (let todo of todoList) {
    createAndAppend(todo);
}
