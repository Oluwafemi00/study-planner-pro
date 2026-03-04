# 📚 Study Planner Pro

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![PWA](https://img.shields.io/badge/PWA-5A0FC8.svg?style=for-the-badge&logo=pwa&logoColor=white)

A vanilla JavaScript web application to help users manage tasks, organize priorities, and stay focused using the Pomodoro technique. Installable as a Progressive Web App (PWA) on desktop and mobile.

**[🌍 Live Demo](https://oluwafemi00.github.io/study-planner-pro/)**

---

## Key Features

- **Offline Support:** Built as a PWA with a Service Worker and Manifest for native installation and offline use.
- **Persistent Data:** Uses the browser’s `localStorage` to save tasks, theme, and settings across sessions.
- **Drag-and-Drop Tasks:** HTML5 Drag-and-Drop API lets users reorder tasks easily.
- **Priority Sorting:** High-priority and overdue tasks automatically move to the top.
- **Pomodoro Timer:** Built-in 25-minute focus timer to encourage structured study sessions.
- **Search & Filter:** Quickly Toggle between Pending and Completed tasks.
- **Notification:** Sound notification for completed session.
- **Print-Friendly:** CSS rules for printing allow users to create clean PDF schedules.

---

## Architecture & Decisions

This project was intentionally built **without frameworks** (like React or Vue) to strengthen core JavaScript skills and DOM manipulation.

- **Single Source of Truth:** All tasks are stored in a central `tasks` array. Any changes (add, edit, complete, delete, reorder) trigger a DOM re-render with `renderTasks()`.
- **Event Handling:** Uses `event.stopPropagation()` for nested actions, preventing unintended state changes.
- **Theming with CSS Variables:** Dark and light modes are handled with CSS variables on `:root`, toggled using a single `.dark-mode` class on `<body>`.

---

## Installation & Local Setup

No build tools or package managers are needed — it runs with just HTML, CSS, and JavaScript.

1. Clone the repository:

   ```bash
     git clone https://github.com/oluwafemi00/study-planner-pro.git
   ```

2. Navigate to the directory:

```bash
 cd study-planner-pro
```
