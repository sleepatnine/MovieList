import React, { useState , memo} from 'react';

import './style.css'

const MovieFilter = memo(({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setSelectedFilter(filter);
    onFilterChange(filter); 
  };
  
  return (
    <div className="form-control">
      <label  className="field-label" >Выберите фильтр</label>
      <select
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value="">Без фильтра</option>
        <option value="ratingAsc">Рейтинг по возрастанию</option>
        <option value="ratingDesc">Рейтинг по убыванию</option>
        <option value="imdbRatingAsc">Рейтинг IDBM по возрастанию</option>
        <option value="imdbRatingDesc">Рейтинг IDBM по убыванию</option>
        <option value="title">По названию</option>
      </select>
    </div>
  );
});

export default MovieFilter;