//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//even-listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

//functions

function addTodo(e) {
  e.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // add todo to storage
  saveLocalTodo(todoInput.value);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa fa-check"><i/>';
  completedButton.classList.add("completed-button");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa fa-trash"><i/>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      removeLocalTodo(todo);
      todo.remove();
    });
  }
  if (item.classList[0] === "completed-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  console.log(e.target);
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(e.target.value);
  todos.forEach((node) => {
    if (node.nodeName == "DIV") {
      switch (e.target.value) {
        case "all":
          node.style.display = "flex";
          break;
        case "completed":
          if (node.classList.contains("completed")) {
            node.style.display = "flex";
          } else {
            node.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!node.classList.contains("completed")) {
            node.style.display = "flex";
          } else {
            node.style.display = "none";
          }
          break;
      }
    }
  });
}

function getTodoFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function saveLocalTodo(todo) {
  let todos = getTodoFromStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodo(todo) {
  let todos = getTodoFromStorage();
  const index = todos.indexOf(todo.childNodes[0].innerText);
  if (index >= 0) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

//can be optimized if moved to common function
function getTodos() {
  let todos = getTodoFromStorage();
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo to storage

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa fa-check"><i/>';
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-trash"><i/>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}
