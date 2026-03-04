# 📚 Study Planner Pro – PWA Productivity App

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![PWA](https://img.shields.io/badge/PWA-5A0FC8.svg?style=for-the-badge&logo=pwa&logoColor=white)

A fully functional Study Planner built with **Vanilla JavaScript, HTML5, and modern CSS**.

Designed to help students and productivity-focused users manage tasks, prioritize effectively, and stay focused using the Pomodoro technique.

Installable as a **Progressive Web App (PWA)** for both desktop and mobile with full offline support.

**[🌍 Live Demo](https://oluwafemi00.github.io/study-planner-pro/)**

---

## Core Features

### 📴 Offline-First Experience

- Built as a **Progressive Web App (PWA)**
- Service Worker enables offline access
- Installable via Web App Manifest

### 💾 Persistent Local Storage

- Saves tasks across sessions
- Remembers theme preference
- Stores user settings locally

### 🔄 Drag-and-Drop Reordering

- Powered by the HTML5 Drag-and-Drop API
- Smooth task rearrangement with intuitive UX

### ⚡ Smart Priority Sorting

- High-priority tasks automatically float to the top
- Overdue tasks are highlighted and prioritized

### 🍅 Built-in Pomodoro Timer

- 25-minute focus sessions
- Encourages structured deep work
- Sound notification when session completes

### 🔎 Search & Filter System

- Toggle between Pending and Completed tasks
- Quickly find specific tasks

### 🖨️ Print-Optimized Layout

- Custom CSS print rules
- Generate clean PDF study schedules

---

## Architecture & Decisions

This project was intentionally built **without frameworks** (like React or Vue) to strengthen my core JavaScript skills and DOM manipulation.

- **Single Source of Truth:** All tasks are stored in a central `tasks` array. Any changes (add, edit, complete, delete, reorder) trigger a DOM re-render with `renderTasks()`.
- **Event Handling:** Uses `event.stopPropagation()` for nested actions, preventing unintended state changes.
- **Theming with CSS Variables:** Dark and light modes are handled with CSS variables on `:root`, toggled using a single `.dark-mode` class on `<body>`.

<!-- ---

## Installation & Local Setup

No build tools or package managers are needed — it runs with just HTML, CSS, and JavaScript.

1. Clone the repository:

   ```bash
     git clone https://github.com/oluwafemi00/study-planner-pro.git
   ```

2. Navigate to the directory:

```bash
 cd study-planner-pro
``` -->
