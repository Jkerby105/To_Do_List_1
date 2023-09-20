const form = document.querySelector("#task-form");
const clear = document.querySelector(".btnC");
const item = document.querySelector(".item");
const input = document.querySelector(".field");
const wrapper = document.querySelector(".wrapper_inner");
const modal_container = document.querySelector(".modal-container ");
const btn3 = document.querySelector(".btn3");
const btn4 = document.querySelector(".btn4");

//-----------------------\\
const getTasks = () => {
  modal_container.classList.add("visble");
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((value) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const i = document.createElement("i");

    li.className = "item";
    div.className = "it";
    div.appendChild(document.createTextNode(value));
    i.className = "fa-solid fa-x";
    li.appendChild(div);
    li.appendChild(i);
    document.querySelector(".wrapper_inner").appendChild(li);
  });
};

// - - - -  - - - - - - - \\
const createDiv = (value) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const i = document.createElement("i");

  li.className = "item";
  div.className = "it";
  div.appendChild(document.createTextNode(value));
  i.className = "fa-solid fa-x";
  li.appendChild(div);
  li.appendChild(i);
  document.querySelector(".wrapper_inner").appendChild(li);
  storeInLocalStorage(value);
};

const storeInLocalStorage = (task) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addToList = (e) => {
  if (input.value === "") {
    alert("Add a task");
  } else {
    createDiv(input.value);
  }

  // Clear Input
  input.value = "";

  e.preventDefault();
};
// - - - -  - - - - - - - \\

const clearAllHelper = () => {
  if (wrapper.children.length > 0) {
    modal_container.classList.remove("visble");
  }
};

const clearAll = () => {
  modal_container.classList.add("visble");

  while (wrapper.children.length > 0) {
    wrapper.removeChild(wrapper.firstChild);
  }

  clearStorage();
};

const clearStorage = () => {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  if (tasks.length > 0) {
    tasks = tasks.slice(0, 0);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// - - - -  - - - - - - - \\

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("item")) {
    e.target.parentElement.remove();
    removeItemFromStorage(e.target.parentElement);
  }
};

// - - - -  - - - - - - - \\

function cancel(){
  console.log("hello");
  modal_container.classList.add("visble");
}


const removeItemFromStorage = (taskItem) => {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((item, index) => {
    if (taskItem.textContent === item) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};
// - - - -  - - - - - - - \\

// - - - -  - - - - - - - \\

eventLoader();

function eventLoader() {
  document.addEventListener("DOMContentLoaded", getTasks);

  form.addEventListener("submit", addToList);

  clear.addEventListener("click", clearAllHelper);

  wrapper.addEventListener("click", removeItem);

  btn3.addEventListener("click", clearAll);
  btn4.addEventListener("click", cancel);
}
// - - - -  - - - - - - - \\
