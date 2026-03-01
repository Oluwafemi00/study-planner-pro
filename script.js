const form = document.getElementById("study-form");
const taskList = document.getElementById("task-list");

// 1. Load tasks from LocalStorage on startup
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}" onclick="toggleTask(${index})">
                <strong>${task.text}</strong> <br> <small>Due: ${task.date}</small>
            </span>
            <span class="delete-btn" onclick="deleteTask(${index})">✕</span>
        `;
    taskList.appendChild(li);
  });
  save();
}

// 2. Add Task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = {
    text: document.getElementById("task-input").value,
    date: document.getElementById("date-input").value,
    completed: false,
  };
  tasks.push(newTask);
  form.reset();
  renderTasks();
});

// 3. Toggle Complete
window.toggleTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
};

// 4. Delete Task
window.deleteTask = (index) => {
  tasks.splice(index, 1);
  renderTasks();
};

// 5. Sync with LocalStorage
function save() {
  localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

renderTasks(); // Initial render
