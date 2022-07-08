import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies () {

  const [movies, setMovies] = React.useState([]);

  const filterMovies = () => {

  }

  const handleSearchRequest = () => {
    const searchRequestData = JSON.parse(localStorage.searchRequset);
    console.log(searchRequestData);
    setMovies([ ...searchRequestData.movies ]);
    console.log(movies);
  }

  return(
    <main className="movies">
      <section className="movies__search-form">
        <SearchForm onSearchRequest={handleSearchRequest}/>
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
