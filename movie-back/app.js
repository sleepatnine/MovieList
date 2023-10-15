const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json(), cors());

const jsonData = fs.readFileSync('movies.json', 'utf-8');
const data = JSON.parse(jsonData);

const movies = data.movies;

let movieIdCounter = 3;

app.get("/movies", (req, res) => {
  const { filter} = req.query;
  let movieList = Object.values(movies);
  if (filter === "ratingAsc") {
    movieList = [...movieList].sort((a, b) => a.rating - b.rating);
  } else if (filter === "ratingDesc") {
    movieList = [...movieList].sort((a, b) => b.rating - a.rating);
  } else if (filter === "imdbRatingAsc") {
    movieList = [...movieList].sort((a, b) => a.ratingIDBM - b.ratingIDBM);
  } else if (filter === "imdbRatingDesc") {
    movieList = [...movieList].sort((a, b) => b.ratingIDBM - a.ratingIDBM);
  }else if (filter === "title") {
    movieList = [...movieList].sort((a, b) => a.title.localeCompare(b.title));
  }
  
  res.json(movieList);
});

app.post("/movies", (req, res) => {
  try {
    const newMovie = req.body;

    if (
      !newMovie.link ||
      !newMovie.rating === null ||
      newMovie.ratingIDBM === null ||
      newMovie.ratingIDBM === "" ||
      !newMovie.title
    ) {
      return res.status(400).json({ error: "Неверные данные о фильме" });
    }
    const movieId = movieIdCounter++;
    newMovie.id = movieId.toString();
    movies[movieId] = newMovie;
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Ошибка при обработке POST-запроса:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.put("/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const newRating = req.body.rating;

  const movieToUpdate = movies[movieId];
  if (!movieToUpdate) {
    return res.status(404).json({ error: "Фильм не найден" });
  }

  movieToUpdate.rating = newRating;
  res.json(movieToUpdate);
});

app.delete("/movies/:movieId", (req, res) => {

  const movieId = req.params.movieId.toString(); 
  
  if (!movies[movieId]) {
    return res.status(404).json({ error: "Фильм не найден" });
  }

  delete movies[movieId];
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
