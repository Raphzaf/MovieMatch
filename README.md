# 🎥 MovieMatch

**MovieMatch** is a web application that allows users to discover movies based on their mood or favorite genre.  
The app uses the [TMDB API](https://developer.themoviedb.org/) to fetch movie data, displays movie details in a popup modal, and lets users save favorites via a backend server.

---

## 🚀 Features

- 🔍 Search bar to find movies by title
- 🎭 Browse movies by genre (Action, Comedy, Drama, etc.)
- 🪟 Click on a movie poster to open a detailed modal popup
- ❤️ Add movies to your favorites list
- 🗃️ Backend to store favorites (in-memory or database-ready)
- ✅ Responsive layout and clean design

---

## 🛠️ Tech Stack

### Frontend
- HTML, CSS, JavaScript
- DOM manipulation
- Responsive layout and modals

### Backend
- Node.js + Express.js
- RESTful API
- In-memory storage (or PostgreSQL-ready)

### External API
- [The Movie Database (TMDB)](https://developer.themoviedb.org/docs)

---

## 📁 Project Structure

MovieMatch/
├── frontend/
│ ├── index.html
│ ├── favorites.html
│ ├── script.js
│ ├── favorites.js
│ └── style.css
├── backend/
│ ├── server.js
│ └── routes/
│ └── favorites.js
├── README.md


---

## 🧪 How to Run Locally

### Backend (API server)

```bash
cd backend
npm install
node server.js
Server runs at: http://localhost:3000

Frontend
1. Open frontend/index.html in your browser
2. Or use Live Server in VS Code

🧑‍💻 Author
Raphael Zafran
This project was built during a Fullstack Hackathon in July 2025.



