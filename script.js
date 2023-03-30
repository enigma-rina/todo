(() => {
  let toDoListArray = [];

  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList");
  const dateElement = document.querySelector(".date");

  function displayDate() {
    const today = new Date();
    const dateString = today.toLocaleDateString();
    dateElement.textContent = dateString;
  }

  function saveData() {
    localStorage.setItem("toDoListArray", JSON.stringify(toDoListArray));
  }

  function loadData() {
    const savedData = localStorage.getItem("toDoListArray");
    if (savedData) {
      toDoListArray = JSON.parse(savedData);
      toDoListArray.forEach((item) => addItemToDOM(item.itemId, item.toDoItem, item.completed));
      updateProgressBar();
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let itemId = String(Date.now());
    let toDoItem = input.value;
    addItemToDOM(itemId, toDoItem);
    addItemToArray(itemId, toDoItem);
    input.value = "";
    saveData();
    updateProgressBar();
  });

  ul.addEventListener("click", (e) => {
    let id = e.target.getAttribute("data-id");
    if (!id) return;
    let item = toDoListArray.find((item) => item.itemId === id);
    if (item.completed) {
      removeItemFromDOM(id);
      removeItemFromArray(id);
    } else {
      item.completed = true;
      const li = document.querySelector('[data-id="' + id + '"]');
      li.style.textDecoration = "line-through";
    }
    saveData();
    updateProgressBar();
  });

  function addItemToDOM(itemId, toDoItem, completed = false) {
    const li = document.createElement("li");
    li.setAttribute("data-id", itemId);
    li.innerText = toDoItem;
    if (completed) {
      li.style.textDecoration = "line-through";
    }
    ul.appendChild(li);
  }

  function addItemToArray(itemId, toDoItem) {
    toDoListArray.push({ itemId, toDoItem, completed: false });
  }

  function removeItemFromDOM(id) {
    var li = document.querySelector('[data-id="' + id + '"]');
    ul.removeChild(li);
  }

  function removeItemFromArray(id) {
    toDoListArray = toDoListArray.filter((item) => item.itemId !== id);
  }

  function updateProgressBar() {
    const progressBar = document.querySelector(".progress-bar");
    const completedTasks = toDoListArray.filter((item) => item.completed).length;
    const totalTasks = toDoListArray.length;
    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = progressPercentage + "%";
  }

  displayDate();
  loadData();
})();