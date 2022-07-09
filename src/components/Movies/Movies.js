import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies () {

  React.useEffect(() => {
    getMovies();
  },[]);

  const [movies, setMovies] = React.useState([]);

  const filterMovies = (unfilteredMovies) => {
    const searchRequestData = JSON.parse(localStorage.searchRequset);
    const checkBoxState = searchRequestData.checkBox;
    const request = searchRequestData.request;
    console.log(request);
    console.log(checkBoxState);
    return unfilteredMovies.filter(movie => {
      if (checkBoxState === true) {
        return movie.duration < 40 && movie.nameRU.includes(request);
      } else {
        return movie.nameRU.includes(request);
      }
    });
  }

  const getMovies = () => {
    const searchRequestData = JSON.parse(localStorage.searchRequset);
    console.log(searchRequestData);
    const filteredMovies = filterMovies(searchRequestData.movies);
    setMovies(filteredMovies);
    console.log(filteredMovies);
  }

  return(
    <main className="movies">
      <section className="movies__search-form">
        <SearchForm onSearchRequest={getMovies}/>
      </section>
      <section className="movies__items">
        <MoviesCardList movies={movies}/>
      </section>
      <section className="movies__btn-section">
        <button className="movies__load-btn">Ещё</button>
      </section>
    </main>
  );
}

export default Movies;
