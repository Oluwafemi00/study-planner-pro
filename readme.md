# 📚 Study Planner Pro

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![PWA](https://img.shields.io/badge/PWA-5A0FC8.svg?style=for-the-badge&logo=pwa&logoColor=white)

A vanilla JavaScript productivity application designed to help users manage tasks, prioritize goals, and maintain focus using the Pomodoro technique. Fully installable as a Progressive Web App (PWA).

**[🌍 View Live Demo Here](https://oluwafemi00.github.io/study-planner-pro/)**

---

## Key Features

- **Offline-First Architecture:** Built as a Progressive Web App (PWA) with a custom Service Worker and Manifest, allowing native installation on desktop and mobile devices.
- **Persistent State Management:** Utilizes the browser's `localStorage` API to ensure tasks, theme preferences, and configurations survive browser refreshes.
- **Drag-and-Drop UI:** Implements the HTML5 Drag-and-Drop API for frictionless, manual task reordering.
- **Smart Sorting Engine:** An algorithmic sort feature that automatically bubbles high-priority and overdue tasks to the top of the queue.
- **Integrated Pomodoro Timer:** A built-in 25-minute focus timer to encourage structured study sessions without relying on third-party tools.
- **Real-Time Filtering & Search:** Instantly locate tasks using the dynamic search bar or toggle between Pending and Completed states.
- **Print/Export Ready:** Custom `@media print` CSS rules allow users to instantly generate clean, distraction-free PDF schedules.

## Architectural Decisions

This project was intentionally built without heavy frontend frameworks (like React or Vue) to solidify core JavaScript fundamentals and DOM manipulation techniques.

- **Data Flow:** The application follows a strictly unidirectional data flow. All user interactions (add, edit, toggle, delete, reorder) mutate a central `tasks` array acting as the single source of truth, which then triggers a DOM re-render (`renderTasks()`).
- **Event Delegation & Propagation:** Utilizes `event.stopPropagation()` to handle nested click events (e.g., clicking a 'Delete' button inside a 'Toggle Complete' container) without triggering unintended state changes.
- **CSS Variables (Custom Properties):** Theming is managed entirely via CSS variables mapped to the `:root` pseudo-class, allowing for a highly performant, single-class toggle (`.dark-mode`) on the `<body>` element.

## Installation & Local Development

Since this app relies purely on native web technologies, no build step or package manager is required.

1. Clone the repository:

   ```bash
   git clone [https://github.com/oluwafemi00/study-planner-pro.git](https://github.com/oluwafemi00/study-planner-pro.git)
   ```

2. Navigate to the directory:

```bash
 cd study-planner-pro
```
