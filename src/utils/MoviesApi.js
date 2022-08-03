const baseUrl = 'https://api.nomoreparties.co';


class MoviesApi {
  constructor (baseUrl) {
    this._baseUrl = baseUrl;
  }

  getMovies () {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(this._checkResponse);
  }

  _checkResponse (response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

}

const moviesApi = new MoviesApi(baseUrl);


export default moviesApi;
