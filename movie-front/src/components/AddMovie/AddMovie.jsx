import { useState, memo, useCallback } from "react";

import MovieList from "../MovieList/MovieList";
import MovieFilter from "../MovieFilter/MovieFilter";

import './style.css'

const AddMovie = memo(() => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    rating: null,
    ratingIDBM: "",
  });
  const [isModified, setIsModified] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

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

    if (!isNaN(ratingIDBM) && ratingIDBM >= 0 && ratingIDBM <= 10) {
      try {
        const response = await fetch("http://localhost:3001/movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Ошибка при создании фильма");
        }

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
          <label  className="field-label" for="name" id="link" name="link">
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
          <label  className="field-label" for="name" id="ratingIDBM" name="ratingIDBM">
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
        <button className="add-movie" type="submit" >Добавить фильм</button>
      </form>
      <MovieFilter onFilterChange={handleFilterChange} />
      <MovieList isModified={isModified} selectedFilter={selectedFilter} />
    </>
  );
});

export default AddMovie;
