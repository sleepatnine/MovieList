import React, { useState, useEffect, memo, useCallback } from "react";

import "./style.css";

import { List, ListItem, ListItemText, Rating } from "@mui/material";
import API from "./../../api/api";

const api = new API("http://localhost:3001");

const MovieList = memo(({ isModified, selectedFilter }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.fetchMovies();
      setMovies(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFiltredMovies = async () => {
    try {
      setLoading(true);
      const data = await api.fetchFiltredMovies(selectedFilter);
      setMovies(data);
    } catch (error) {
      console.error("Ошибка при получении списка фильмов:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    await api.deleteMovie(movieId);
    fetchMovies();
  };

  const handleRateMovie = async (movieId, newRating) => {
    await api.rateMovie(movieId, newRating);
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, [isModified]);

  useEffect(() => {
    fetchFiltredMovies();
  }, [selectedFilter]);

  console.log(movies);

  return (
    <div>
      {loading ? (
        <div class="loader-container">
          <div class="loader"></div>
        </div>
      ) : (
        <List>
          {movies.map((movie) => (
            <ListItem key={movie.id}>
              <ListItemText
                primary={movie.title}
                secondary={`Рейтинг IDBM: ${movie.ratingIDBM}`}
              />
              <a href={movie.link} target="_blank" rel="noopener noreferrer">
                {movie.link.length > 20
                  ? `${movie.link.slice(0, 20)}...`
                  : movie.link}
              </a>
              <Rating
                name="simple-controlled"
                value={movie.rating}
                onChange={(event, newRating) => {
                  handleRateMovie(movie.id, newRating);
                }}
                sx={{ marginX: 2 }}
              />
              <button onClick={() => handleDeleteMovie(movie.id)}>
                Удалить
              </button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
});

export default MovieList;
