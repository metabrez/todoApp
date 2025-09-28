const input = document.getElementById("taskInput");
console.log(input);
const add = document.getElementById("addBtn");
console.log(add);
const taskList = document.getElementById("taskList");
const taskContainer = document.getElementById("task");

const searchItem = document.getElementById("searchInput");

// load task from LocalStorage on page load.
document.addEventListener("DOMContentLoaded", loadTasks);

function saveTasksToLocalStorage() {
  const taskItems = document.querySelectorAll("#taskList, li");
  const taskValues = [];
  console.log(taskItems);
  const task = taskItems.forEach((item) => {
    const span = item.querySelector("span");
    if (span) {
      taskValues.push(span.textContent.trim());
    }
  });

  localStorage.setItem("tasks", JSON.stringify(taskValues));

  console.log(taskValues);
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToList(task));
}

function addTaskToList(val) {
  const li = document.createElement("li");
  const span = document.createElement("span");

  span.textContent = val;

  // create edit button
  const edit = document.createElement("button");
  edit.textContent = "edit";
  edit.style.marginLeft = "10px";

  // create a delete button
  const del = document.createElement("button");
  del.textContent = "delete";
  del.style.marginLeft = "10px";

  // edit functionality

  edit.addEventListener("click", () => {
    const listVal = prompt("edit task:", span.textContent);
    if (listVal !== null && listVal !== "") {
      span.textContent = listVal;
    }
    saveTasksToLocalStorage();
  });

  // delete functionality
  del.addEventListener("click", () => {
    taskList.removeChild(li);
    saveTasksToLocalStorage();
  });

  li.appendChild(span);

  li.appendChild(edit);

  li.appendChild(del);

  taskList.appendChild(li);

  taskContainer.appendChild(taskList);
}

add.addEventListener("click", (e) => {
  e.preventDefault();
  val = input.value.trim();
  if (!val) {
    window.alert("Please enter task");
    return;
  }

  addTaskToList(val);
  saveTasksToLocalStorage();

  input.value = "";
});

searchItem.addEventListener("input", () => {
  const search = searchItem.value.trim().toLowerCase();

  const taskListItem = document.querySelectorAll("#taskList li");
  console.log(taskListItem);
  taskListItem.forEach((item) => {
    const text = item.querySelector("span").textContent.toLowerCase();
    console.log(text);
    item.style.display = text.includes(search) ? "" : "none";
  });
});
