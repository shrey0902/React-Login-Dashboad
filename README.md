# 🧩 React Internship Assignment – Login + Dashboard

## 📌 Overview

This is a simple React application created as part of an internship assignment. The app has two main pages:

- **Login Page**: Accepts any non-empty email/password, stores login state in `localStorage`, and redirects to the dashboard.
- **Dashboard Page**: Protected route that fetches a list of 10 Pokémon from the [PokeAPI](https://pokeapi.co/), displays them in a 2-column card layout with images and hover effects. Includes a logout button that clears login state.

---

## 🚀 How to Run

1. Clone or download this repository.
2. Install dependencies:

   ```bash
   npm install

Start the app: 
  npm run dev

Open the browser at: http://localhost:5173/

🔧 Features
✅ React functional components with hooks (useState, useEffect)

✅ react-router-dom for routing and route protection

✅ LocalStorage used to manage login state

✅ PokeAPI integration to fetch dynamic Pokémon data

✅ Responsive layout with 2 Pokémon per row

✅ Hover effect and styled logout button

✅ Centered login form with clean design

📁 Folder Structure
src/
├── pages/
│   ├── Login.jsx          # Login form component
│   └── Dashboard.jsx      # Protected dashboard with Pokémon cards
├── App.jsx                # Routing logic
├── main.jsx               # Entry point
├── global.css             # Optional global styles
├── README.md              # Project documentation

💡 What I Learned
As a beginner in React, this project helped me learn:

React app setup using Vite

JSX and component-based structure

State and effect hooks (useState, useEffect)

Routing using react-router-dom

Fetching data from external APIs

Using localStorage for client-side persistence

Basic inline and CSS styling in React

Conditional rendering and route protection

🙋‍♂️ Notes
This was my first complete app using React.

The code is kept simple and beginner-friendly.

The Pokémon displayed are fetched live from the PokeAPI.

🛠️ Tech Stack
Frontend: React + Vite

Styling: Inline CSS + Flex/Grid layout

API: https://pokeapi.co

📬 Contact
Feel free to ask me anything during the evaluation — I’m still learning and open to feedback!


