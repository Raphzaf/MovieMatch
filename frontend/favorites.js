// frontend/favorites.js
const backendUrl = 'http://localhost:3000';
const container = document.getElementById('favorites');

// Récupérer les favoris
fetch(`${backendUrl}/favorites`)
  .then(res => res.json())
  .then(data => {
    displayFavorites(data);
  });

function displayFavorites(favorites) {
  container.innerHTML = '';
  favorites.forEach(movie => {
    const div = document.createElement('div');
    div.className = 'movie';
    div.innerHTML = `
      <img src="${movie.poster}" />
      <p>${movie.title}</p>
      <button onclick="deleteFavorite(${movie.id})">❌ Remove</button>
    `;
    container.appendChild(div);
  });
}

// Supprimer un favori
function deleteFavorite(id) {
  fetch(`${backendUrl}/favorites/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      alert('Removed from favorites');
      location.reload(); // recharge la page
    });
}
