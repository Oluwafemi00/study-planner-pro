// --- 1. INITIAL STATE & SELECTORS ---

const form = document.getElementById("study-form");

const taskList = document.getElementById("task-list");

const themeBtn = document.getElementById("theme-btn");

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

let currentFilter = "all";

let draggedTaskId = null; // NEW: Tracks the task being dragged

// --- 2. THEME LOGIC ---

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");

  themeBtn.innerText = "☀️ Light Mode";
}

window.toggleDarkMode = () => {
  const isDark = document.body.classList.toggle("dark-mode");

  themeBtn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

  localStorage.setItem("theme", isDark ? "dark" : "light");
};

// --- 3. POMODORO TIMER LOGIC ---

let timer;

let timeLeft = 25 * 60;

let isRunning = false;

window.toggleTimer = () => {
  const btn = document.getElementById("start-btn");

  if (isRunning) {
    clearInterval(timer);

    btn.innerText = "Start";
  } else {
    timer = setInterval(updateTimer, 1000);

    btn.innerText = "Pause";
  }

  isRunning = !isRunning;
};

function updateTimer() {
  if (timeLeft <= 0) {
    clearInterval(timer);

    alert("Focus session complete! Take a break.");

    resetTimer();

    return;
  }

  timeLeft--;

  displayTime();
}

function displayTime() {
  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  document.getElementById("timer-display").innerText =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

window.resetTimer = () => {
  clearInterval(timer);

  timeLeft = 25 * 60;

  isRunning = false;

  displayTime();

  document.getElementById("start-btn").innerText = "Start";
};

// --- 4. TASK CRUD OPERATIONS ---

// Enter Edit Mode

window.editTask = (id) => {
  const task = tasks.find((t) => t.id === id);

  if (task) {
    task.isEditing = true;

    renderTasks();
  }
};

// Save Edited Text

window.saveEdit = (id) => {
  const task = tasks.find((t) => t.id === id);

  const editInput = document.getElementById(`edit-input-${id}`);

  if (task && editInput && editInput.value.trim() !== "") {
    task.text = editInput.value;

    task.isEditing = false;

    renderTasks();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask = {
    id: Date.now(),

    text: document.getElementById("task-input").value,

    date: document.getElementById("date-input").value,

    priority: document.getElementById("priority-input").value,

    completed: false,

    isEditing: false,
  };

  tasks.push(newTask);

  form.reset();

  renderTasks();
});

window.toggleTask = (id) => {
  const task = tasks.find((t) => t.id === id);

  if (task && !task.isEditing) {
    task.completed = !task.completed;

    // Check if all tasks are now completed

    const pendingCount = tasks.filter((t) => !t.completed).length;

    if (task.completed && pendingCount === 0 && tasks.length > 0) {
      triggerCelebration();
    }

    renderTasks();
  }
};

function triggerCelebration() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 150,

      spread: 70,

      origin: { y: 0.6 },

      colors: ["#5c67f2", "#818cf8", "#ffffff"],
    });
  }
}

window.deleteTask = (id) => {
  tasks = tasks.filter((t) => t.id !== id);

  renderTasks();
};

window.clearCompleted = () => {
  if (confirm("Delete all finished tasks?")) {
    tasks = tasks.filter((t) => !t.completed);

    renderTasks();
  }
};

// --- 5. SORTING & FILTERING ---

window.setFilter = (filter) => {
  currentFilter = filter;

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.innerText.toLowerCase() === filter);
  });

  renderTasks();
};

function sortTasks() {
  const priorityMap = { high: 1, medium: 2, low: 3 };

  tasks.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;

    if (priorityMap[a.priority] !== priorityMap[b.priority]) {
      return priorityMap[a.priority] - priorityMap[b.priority];
    }

    return new Date(a.date) - new Date(b.date);
  });
}

// NEW: Manual trigger for auto-sorting if you want to add a "Smart Sort" button later

window.autoSortTasks = () => {
  sortTasks();

  renderTasks();
};

// --- 6. THE RENDER ENGINE ---

function renderTasks() {
  // sortTasks(); <-- REMOVED so manual drag-and-drop order persists

  taskList.innerHTML = "";

  // Get local date instead of UTC to prevent timezone offset bugs
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const filtered = tasks.filter((task) => {
    if (currentFilter === "pending") return !task.completed;

    if (currentFilter === "completed") return task.completed;

    return true;
  });

  filtered.forEach((task) => {
    const isOverdue = task.date < today && !task.completed;

    const li = document.createElement("li");

    // NEW: Enable dragging

    li.setAttribute("draggable", "true");

    if (isOverdue) li.classList.add("overdue");

    if (task.completed) li.classList.add("completed-task");

    // Dynamic markup for edit mode vs display mode

    const taskContentMarkup = task.isEditing
      ? `<div class="edit-wrapper">

           <input type="text" id="edit-input-${task.id}" value="${task.text}" class="edit-field" onclick="event.stopPropagation()">

           <button onclick="event.stopPropagation(); saveEdit(${task.id})" class="save-btn">Save</button>

         </div>`
      : `<span class="task-text">${task.text}</span>`;

    li.innerHTML = `
    <div class="drag-handle" title="Drag to reorder">⠿</div>

      <div class="task-content" onclick="toggleTask(${task.id})">

        <input type="checkbox" ${task.completed ? "checked" : ""} ${task.isEditing ? "disabled" : ""}>

        <div class="task-details">

          ${taskContentMarkup}

          <span class="priority-badge priority-${task.priority}">${task.priority}</span>

          <br>

          <small>${isOverdue ? "⚠️ OVERDUE: " : "Due: "}${task.date}</small>

        </div>

      </div>

      <div class="actions">

        ${!task.isEditing ? `<span class="edit-btn" onclick="event.stopPropagation(); editTask(${task.id})">✎</span>` : ""}

        <span class="delete-btn" onclick="event.stopPropagation(); deleteTask(${task.id})">✕</span>

      </div>

    `;

    // --- DRAG AND DROP EVENT LISTENERS ---

    li.addEventListener("dragstart", () => {
      draggedTaskId = task.id;

      setTimeout(() => li.classList.add("dragging"), 0);
    });

    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");

      draggedTaskId = null;
    });

    li.addEventListener("dragover", (e) => {
      e.preventDefault(); // Required to allow dropping

      li.classList.add("drag-over");
    });

    li.addEventListener("dragleave", () => {
      li.classList.remove("drag-over");
    });

    li.addEventListener("drop", (e) => {
      e.preventDefault();

      li.classList.remove("drag-over");

      if (draggedTaskId && draggedTaskId !== task.id) {
        // Find positions in the main tasks array

        const fromIndex = tasks.findIndex((t) => t.id === draggedTaskId);

        const toIndex = tasks.findIndex((t) => t.id === task.id);

        // Swap the items in the array

        const [movedTask] = tasks.splice(fromIndex, 1);

        tasks.splice(toIndex, 0, movedTask);

        renderTasks(); // Instantly update UI and save to LocalStorage
      }
    });

    // --- END DRAG AND DROP ---

    taskList.appendChild(li);

    // Handle focus and Enter key for edit mode

    if (task.isEditing) {
      const editInput = document.getElementById(`edit-input-${task.id}`);

      if (editInput) {
        editInput.focus();

        editInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") saveEdit(task.id);
        });
      }
    }
  });

  if (filtered.length === 0) {
    taskList.innerHTML = `

        <div class="empty-state">

            <p>🎉 All caught up!</p>

            <small>Time to start a Pomodoro or add new goals.</small>

        </div>

    `;
  }

  localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

window.exportToPDF = () => {
  window.print();
};

// Initial Run

renderTasks();
