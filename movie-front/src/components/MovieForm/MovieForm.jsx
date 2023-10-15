import { useState, memo, useCallback } from "react";

import MovieList from "../MovieList/MovieList";
import MovieFilter from "../MovieFilter/MovieFilter";

import API from "./../../api/api";

import "./style.css";

const MovieForm = memo(() => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    rating: null,
    ratingIDBM: "",
  });

  const [isModified, setIsModified] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const MIN_IDBM_RATING = 0;
  const MAX_IDBM_RATING = 10;

  const handleFilterChange = useCallback((filter) => {
    setSelectedFilter(filter);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsModified(false);
    const ratingIDBM = parseFloat(formData.ratingIDBM);

    if (
      !isNaN(ratingIDBM) &&
      ratingIDBM >= MIN_IDBM_RATING &&
      ratingIDBM <= MAX_IDBM_RATING
    ) {
      try {
        const newMovie = {
          title: formData.title,
          link: formData.link,
          rating: formData.rating,
          ratingIDBM: formData.ratingIDBM,
        };
        
        const api = new API("http://localhost:3001");
        await api.createMovie(newMovie);

        setIsModified(true);

        setFormData({
          title: "",
          link: "",
          rating: null,
          ratingIDBM: "",
        });
      } catch (error) {
        console.error("Ошибка при отправке фильма на сервер:", error);
      }
    } else {
      alert("Рейтинг IDBM должен быть числом от 0 до 10");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="text-field">
          <label className="field-label" for="name" id="title" name="title">
            Название фильма
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="text-field">
          <label className="field-label" for="name" id="link" name="link">
            Ссылка на фильм
          </label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="text-field">
          <label
            className="field-label"
            for="name"
            id="ratingIDBM"
            name="ratingIDBM"
          >
            Рейтинг IDBM
          </label>
          <input
            type="text"
            name="ratingIDBM"
            value={formData.ratingIDBM}
            onChange={handleInputChange}
            min="0"
            max="10"
            required
          />
        </div>
        <button className="add-movie" type="submit">
          Добавить фильм
        </button>
      </form>
      <MovieFilter onFilterChange={handleFilterChange} />
      <MovieList isModified={isModified} selectedFilter={selectedFilter} />
    </>
  );
});

export default MovieForm;

