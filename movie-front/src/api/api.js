
class API {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    async fetchMovies() {
      try {
        const timestamp = Date.now();
        const url = `${this.baseUrl}/movies?timestamp=${timestamp}`;
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
  
        return response.json();
      } catch (error) {
        console.error("Ошибка при получении списка фильмов:", error);
        throw error; 
      }
    }

    async fetchFiltredMovies(selectedFilter) {
        try {
          const timestamp = Date.now();
          const url = `${this.baseUrl}/movies?timestamp=${timestamp}&filter=${selectedFilter}`;
          const response = await fetch(url);
      
          if (!response.ok) {
            throw new Error("Ошибка при получении данных");
          }
      
          return response.json();
        } catch (error) {
          console.error("Ошибка при получении списка фильмов:", error);
          throw error;
        }
      }
  
    async deleteMovie(movieId) {
      try {
        const response = await fetch(`${this.baseUrl}/movies/${movieId}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Ошибка при удалении фильма");
        }
      } catch (error) {
        console.error("Ошибка при удалении фильма:", error);
        throw error; 
      }
    }
  
    async rateMovie(movieId, newRating) {
      try {
        const response = await fetch(`${this.baseUrl}/movies/${movieId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating: newRating }),
        });
  
        if (!response.ok) {
          throw new Error("Ошибка при обновлении рейтинга фильма");
        }
      } catch (error) {
        console.error("Ошибка при обновлении рейтинга фильма:", error);
        throw error; 
      }
    }
  }
  
  export default API;