const input = document.getElementById("taskInput");
console.log(input);
const add = document.getElementById("addBtn");
console.log(add);
const list = document.getElementById("taskList");

const searchItem = document.getElementById("searchInput");

// add task

add.addEventListener("click", (e) => {
  e.preventDefault();

  const val = input.value.trim();
  if (val === null || val === "") {
    window.alert("please enter task");
    return;
  }
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
    }

    // list.appendChild(li);
  });

  // delete functionality
  deleteBtn.addEventListener("click", () => {
    list.removeChild(li);
  });

  li.appendChild(span);
  li.appendChild(edit);
  li.appendChild(deleteBtn);
  list.appendChild(li);
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
