# 🧩 React Internship Assignment – Login + Dashboard

## 🌐 Introduction

**PokéWorld Dashboard** is a modern, responsive web application built using **React** and **Recharts**, designed to explore, analyze, and interact with Pokémon data. Developed as part of an internship assignment, the project showcases essential front-end development skills including:

- API data handling
- Protected routing
- Search, sort, and pagination
- Data visualization with charts
- Clean UI/UX principles

The goal was to create a functional, interactive dashboard using real-time Pokémon data from the PokéAPI, with a focus on usability, performance, and code clarity.
---
## 🌟 Features

- 🔐 Login authentication with localStorage check
- 📋 Pokémon table view with:
  - 300 Pokémon
  - Search by name or type
  - Sortable columns (Name, Type, Height)
  - Pagination (50 per page)
  - “View” button to show detailed stats in a modal
- 📊 Pie chart showing Pokémon type distribution (with multi-type handling)
- ⚡ Protected routes with navigation bar
- 🎨 Styled layout with responsive design and theme

---
## 🔐 Login Credentials

You can enter **any email and password** to login — this demo uses client-side validation only.

---

## 🚀 How to Run

1. Clone or download this repository.
2. Install dependencies:

   ```bash
   npm install

Start the app: 
  npm run dev

Open the browser at: http://localhost:5173/

📁 Folder Structure
src/
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── TableView.jsx
│   └── PieChartPage.jsx
├── components/
│   └── ProtectedRoute.jsx
├── App.jsx
└── main.jsx


🙋‍♂️ Notes
This was my first complete app using React.

The code is kept simple and beginner-friendly.

The Pokémon displayed are fetched live from the PokeAPI.

🛠️ Tech Stack
React + Vite

React Router

Recharts

Vanilla CSS + Inline styling

API: https://pokeapi.co

📬 Contact
Feel free to ask me anything during the evaluation — I’m still learning and open to feedback!


