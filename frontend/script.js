// ======================
// 🎬 MovieMatch Script
// ======================

const apiKey = '24dea4c38b340aa295fbb5c8f2ae1fdf';
const backendUrl = 'http://localhost:3000';
const resultsDiv = document.getElementById('results');
const searchInput = document.getElementById('searchInput');

let currentGenre = null;
let currentPage = 1;
let isSearchMode = false;

// 🎯 Boutons de genre
document.querySelectorAll('button[data-genre]').forEach(btn => {
  btn.addEventListener('click', () => {
    currentGenre = btn.getAttribute('data-genre');
    currentPage = 1;
    isSearchMode = false;
    fetchMoviesByGenre(currentGenre, currentPage);
  });
});

// 🔍 Recherche par Enter
searchInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

// 📦 Récupération des films par genre
function fetchMoviesByGenre(genreId, page = 1) {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`)
    .then(res => res.json())
    .then(data => {
      displayMovies(data.results.slice(0, 10));
    });
}

// 🔍 Recherche par titre
function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`)
    .then(res => res.json())
    .then(data => {
      currentGenre = null;
      currentPage = 1;
      isSearchMode = true;
      displayMovies(data.results.slice(0, 10));
    });
}

// 🎞️ Affichage des films
function displayMovies(movies) {
  resultsDiv.classList.add('fade-in');
  setTimeout(() => resultsDiv.classList.remove('fade-in'), 400);

  resultsDiv.innerHTML = '';

  if (movies.length === 0) {
    resultsDiv.innerHTML = `<p>No results found.</p>`;
    return;
  }

  movies
    .filter(movie => movie.poster_path)
    .forEach(movie => {
      const div = document.createElement('div');
      div.className = 'movie';

      const poster = document.createElement('img');
      poster.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
      poster.alt = movie.title;
      poster.addEventListener('click', () => showMovieModal(movie));

      const title = document.createElement('p');
      title.innerHTML = `<strong>${movie.title}</strong>`;

      const btn = document.createElement('button');
      btn.textContent = '❤️ Add to Favorites';
      btn.addEventListener('click', () =>
        addToFavorites(movie.id, encodeURIComponent(movie.title), movie.poster_path)
      );

      div.appendChild(poster);
      div.appendChild(title);
      div.appendChild(btn);
      resultsDiv.appendChild(div);
    });
}

// ❤️ Ajout aux favoris
function addToFavorites(movie_id, titleEncoded, posterPath) {
  const title = decodeURIComponent(titleEncoded);
  const data = {
    title,
    movie_id,
    poster: `https://image.tmdb.org/t/p/w200${posterPath}`
  };

  console.log('📦 Sending to backend:', data);

  fetch(`${backendUrl}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) throw new Error('Server error');
      return res.json();
    })
    .then(() => {
      alert(`✅ ${title} added to favorites!`);
      // 👉 Tu pourras ici remplacer par showToast(`${title} added!`)
    })
    .catch(err => {
      console.error('❌ Error sending favorite:', err);
      alert('Error adding favorite.');
    });
}

// 🔁 Changement de page
function changePage(direction) {
  currentPage += direction;
  if (isSearchMode) {
    handleSearch();
  } else if (currentGenre) {
    fetchMoviesByGenre(currentGenre, currentPage);
  }
}

// 🪟 Modal d’infos sur le film
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
    <button id="modalFavBtn">❤️ Add to Favorites</button>
  `;

  const favBtn = document.getElementById('modalFavBtn');
  favBtn.addEventListener('click', () =>
    addToFavorites(movie.id, encodeURIComponent(movie.title), movie.poster_path)
  );

  modal.style.display = 'flex';
}

// ❌ Fermer la modal
function closeModal() {
  document.getElementById('movieModal').style.display = 'none';
}
