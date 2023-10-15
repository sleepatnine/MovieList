class API {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async makeRequest(url, method = "GET", data = null) {
    try {
      const options = {
        method,
      };

      if (data) {
        options.headers = {
          "Content-Type": "application/json",
        };
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Ошибка при выполнении запроса");
      }

      return response.json();
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      throw error;
    }
  }

  async createMovie(newMovie) {
    const timestamp = Date.now();
    const url = `${this.baseUrl}/movies?timestamp=${timestamp}`;
    return this.makeRequest(url, "POST", newMovie);
  }

  async fetchMovies() {
    const timestamp = Date.now();
    const url = `${this.baseUrl}/movies?timestamp=${timestamp}`;
    return this.makeRequest(url);
  }

  async fetchFiltredMovies(selectedFilter) {
    const timestamp = Date.now();
    const url = `${this.baseUrl}/movies?timestamp=${timestamp}&filter=${selectedFilter}`;
    return this.makeRequest(url);
  }

  async deleteMovie(movieId) {
    const url = `${this.baseUrl}/movies/${movieId}`;
    return this.makeRequest(url, "DELETE");
  }

  async rateMovie(movieId, newRating) {
    const url = `${this.baseUrl}/movies/${movieId}`;
    return this.makeRequest(url, "PUT", { rating: newRating });
  }
}

export default API;
