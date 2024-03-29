const baseUrl = 'https://api.keerzy.nomoredomains.work';


class MainApi {
  constructor (baseUrl) {
    this._baseUrl = baseUrl;
  }

  signup (userEmail, userPassword, userName) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        name: userName,
      }),
    })
    .then(this._checkResponse);
  }

  signin (userPassword, userEmail) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
    .then(this._checkResponse);
  }

  getCurrentUser (jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`,
      },
    })
    .then(this._checkResponse);
  }

  updateUserProfile (jwt, userEmail, userName) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        email: userEmail,
        name: userName,
      }),
    })
    .then(this._checkResponse);
  }

  deleteMovie (jwt, movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`,
      },
    })
    .then(this._checkResponse);
  }

  getSavedMovies (jwt) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`,
      },
    })
    .then(this._checkResponse);
  }

  saveMovie (jwt, movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        country: movieData.country === null ?
          'Значение отсутствует' : movieData.country,
        director: movieData.director === null ?
          'Значение отсутствует' : movieData.director,
        duration: movieData.duration === null ?
          'Значение отсутствует' : movieData.duration.toString(),
        year: movieData.year === null ?
          'Значение отсутствует' : movieData.year,
        description: movieData.description === null ?
          'Значение отсутствует' : movieData.description,
        image: `https://api.nomoreparties.co${movieData.image.url}`,
        trailerLink: movieData.trailerLink === null || typeof movieData.trailerLink !== 'string' ?
          'https://www.youtube.com' : movieData.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movieData.image.url}`,
        movieId: movieData.id.toString(),
        nameRU: movieData.nameRU === null ?
          'Значение отсутствует' : movieData.nameRU,
        nameEN: movieData.nameEN === null ?
          'Значение отсутствует' : movieData.nameEN,
      }),
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

const mainApi = new MainApi(baseUrl);


export default mainApi;
