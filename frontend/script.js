// ======================
// 🎬 MovieMatch Script
// ======================

const apiKey = '24dea4c38b340aa295fbb5c8f2ae1fdf';
const backendUrl = 'http://localhost:3000';
const resultsDiv = document.getElementById('results');

let currentGenre = null;
let currentPage = 1;

// 🎯 Quand on clique sur un bouton de genre
document.querySelectorAll('button[data-genre]').forEach(btn => {
  btn.addEventListener('click', () => {
    currentGenre = btn.getAttribute('data-genre');
    currentPage = 1;
    fetchMovies(currentGenre, currentPage);
  });
});

// 📦 Requête à l'API TMDB pour récupérer les films d'un genre donné
function fetchMovies(genreId, page = 1) {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`)
    .then(res => res.json())
    .then(data => {
      displayMovies(data.results);
      addPaginationControls();
    });
}

// 🎞️ Affichage des films dans le DOM
function displayMovies(movies) {
  resultsDiv.innerHTML = '';

  movies
    .filter(movie => movie.poster_path)
    .forEach(movie => {
      const div = document.createElement('div');
      div.className = 'movie';

      const poster = document.createElement('img');
      poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
      poster.alt = movie.title;
      poster.addEventListener('click', () => showMovieModal(movie));

      const title = document.createElement('p');
      title.innerHTML = `<strong>${movie.title}</strong>`;

      const btn = document.createElement('button');
      btn.innerHTML = '❤️ Add to Favorites';
      btn.addEventListener('click', () =>
        addToFavorites(movie.id, encodeURIComponent(movie.title), movie.poster_path)
      );

      div.appendChild(poster);
      div.appendChild(title);
      div.appendChild(btn);
      resultsDiv.appendChild(div);
    });
}

// ❤️ Ajout d’un film aux favoris
function addToFavorites(movie_id, titleEncoded, posterPath) {
  const title = decodeURIComponent(titleEncoded);
  const data = {
    title,
    movie_id,
    poster: `https://image.tmdb.org/t/p/w200${posterPath}`
  };

  fetch(`${backendUrl}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.ok) {
        alert(`${title} added to favorites!`);
      } else {
        alert('Error adding favorite');
      }
    });
}

// 🔁 Boutons de pagination
function addPaginationControls() {
  const nav = document.createElement('div');
  nav.className = 'pagination';
  nav.innerHTML = `
    <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)">⬅️ Previous</button>
    <span>Page ${currentPage}</span>
    <button onclick="changePage(1)">Next ➡️</button>
  `;
  resultsDiv.appendChild(nav);
}

function changePage(direction) {
  currentPage += direction;
  fetchMovies(currentGenre, currentPage);
}

// 🪟 Modal popup pour fiche film
function showMovieModal(movie) {
  const modal = document.getElementById('movieModal');
  const body = document.getElementById('modalBody');

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : '';

  body.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="${posterUrl}" />
    <p><em>${movie.overview || 'No description available.'}</em></p>
    <p>📅 Release: ${movie.release_date || 'N/A'}</p>
    <p>⭐ Rating: ${movie.vote_average || 'N/A'}/10</p>
    <button onclick="addToFavorites(${movie.id}, \`${encodeURIComponent(movie.title)}\`, '${movie.poster_path}')">
      ❤️ Add to Favorites
    </button>
  `;

  modal.style.display = 'flex';
}

// ❌ Fermer la modal
function closeModal() {
  document.getElementById('movieModal').style.display = 'none';
}
function handleSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`)
    .then(res => res.json())
    .then(data => {
      currentGenre = null; // on sort du mode "genre"
      currentPage = 1;
      displayMovies(data.results);
      // On peut aussi ne pas appeler addPaginationControls() ici pour garder le focus
    });
}
