const express = require('express');
const router = express.Router();

let favorites = []; // stockage temporaire en mémoire

// GET /favorites → retourner tous les favoris
router.get('/', (req, res) => {
  res.json(favorites);
});

// POST /favorites → ajouter un favori
router.post('/', (req, res) => {
  const { title, poster, movie_id } = req.body;
  const newFavorite = {
    id: Date.now(),
    title,
    poster,
    movie_id
  };
  favorites.push(newFavorite);
  res.status(201).json(newFavorite);
});

// DELETE /favorites/:id → supprimer un favori
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  favorites = favorites.filter(fav => fav.id !== id);
  res.sendStatus(204);
});

module.exports = router;
