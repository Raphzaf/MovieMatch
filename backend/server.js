const express = require('express');
const cors = require('cors');
const app = express();

const favoritesRouter = require('./routes/favorites');

app.use(cors());
app.use(express.json());

app.use('/favorites', favoritesRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
