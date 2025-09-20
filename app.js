const input = document.getElementById("taskInput");
console.log(input);
const add = document.getElementById("addBtn");
console.log(add);
const list = document.getElementById("taskList");

const searchItem = document.getElementById("searchInput");

document.addEventListener("DOMContentLoaded", loadTasks);

function saveTasks() {
  const tasks = [];
  const items = list.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    const span = items[i].getElementsByTagName("span")[0];
    tasks.push(span.textContent);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  //localStorage.setItem("tasks", tasks);
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToList(task));
}

// add task

function addTaskToList(val) {
  const li = document.createElement("li");
  //li.textContent = val;

  // create a span
  const span = document.createElement("span");
  span.textContent = val;
  //span.style.marginLeft = 10;
  span.style.marginLeft = 15;

  // create edit button
  const edit = document.createElement("button");
  edit.textContent = "edit";
  edit.style.color = "blue";
  edit.style.marginLeft = "10px";

  // create a delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.style.marginLeft = "10px";

  // edit functionality
  edit.addEventListener("click", () => {
    const newVal = prompt("Edit Task: ", span.textContent);
    if (newVal !== null && newVal.trim() !== "") {
      span.textContent = newVal.trim();
      saveTasks();
    }

    // list.appendChild(li);
  });

  // delete functionality
  deleteBtn.addEventListener("click", () => {
    list.removeChild(li);
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(edit);
  li.appendChild(deleteBtn);
  list.appendChild(li);
  input.value = "";
}

add.addEventListener("click", (e) => {
  e.preventDefault();

  const val = input.value.trim();
  if (val === null || val === "") {
    window.alert("please enter task");
    return;
  }

  addTaskToList(val);
  saveTasks(); // update localstorage
  input.value = "";
});

// search functionality
searchItem.addEventListener("keyup", () => {
  const filter = searchItem.value.toLowerCase();
  const items = list.getElementsByTagName("li");
  console.log(items);

  for (let i = 0; i < items.length; i++) {
    const span = items[i].getElementsByTagName("span")[0];
    console.log(span);
    const text = span.textContent.toLowerCase();
    console.log(text);

    if (text.includes(filter)) {
      items[i].style.display = "";
    } else {
      items[i].style.display = "none";
    }
  }
});
