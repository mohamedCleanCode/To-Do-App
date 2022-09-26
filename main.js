//                        [1]
let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let info = document.querySelector(".info");

//                        [3]
// Array Of Tasks
let arrayOfTasks = [];

//                        [8]
// Check If There Are Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Get Data From Local Storage
getDataToLocalStorageFrom();

//                        [2]
add.onclick = function () {
  if (input.value !== "") {
    info.innerHTML = `Your Task Is " ${input.value} "`;
    addTaskToArray(input.value);
    input.value = "";
  } else {
    info.innerHTML = "Please Type Your Task!";
  }
};

//                        [9]
// Click On Task
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del") === true) {
    //Remove Task From LocalStorage
    deletTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    // Remove Task From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task") === true) {
    updateComleated(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

//                        [4]
// Add Task To Array
function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    compleated: false,
  };
  arrayOfTasks.push(task);

  // Add Tasks To Page
  addTasksToPageFrom(arrayOfTasks);

  //Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

//                        [5]
// Add Tasks To Page
function addTasksToPageFrom(arrayOfTasks) {
  // Empty Tasks Container Before Put Tasks
  tasks.innerHTML = "";
  // Loop On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.compleated === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.append(span);
    tasks.appendChild(div);
  });
}

//                        [6]
//Add Tasks To Local Storage
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

//                        [7]
function getDataToLocalStorageFrom() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPageFrom(tasks);
  }
}

//                        [10]
function deletTaskFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

//                        [11]
function updateComleated(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].compleated == false
        ? (arrayOfTasks[i].compleated = true)
        : (arrayOfTasks[i].compleated = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
