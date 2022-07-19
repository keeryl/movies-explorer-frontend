import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies () {

  React.useEffect(() => {
    getMoviesFromLocalStorage();
  },[]);

  React.useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  });

  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [renderedMovies, setRenderedMovies] = React.useState([]);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
    console.log(windowWidth);
  }

  const filterMovies = (unfilteredMovies) => {
    const searchRequestData = JSON.parse(localStorage.searchRequest);
    const checkBoxState = searchRequestData.checkBox;
    const request = searchRequestData.request;
    return unfilteredMovies.filter(movie => {
      if (checkBoxState === true) {
        return movie.duration <= 40 && movie.nameRU.includes(request);
      } else {
        return movie.nameRU.includes(request);
      }
    });
  }

  const getMoviesFromLocalStorage = () => {
    if (localStorage.getItem('searchRequest') !== null) {
      const searchRequestData = JSON.parse(localStorage.searchRequest);
      const filteredMovies = filterMovies(searchRequestData.movies);
      setFilteredMovies(filteredMovies);
    } else {
      return;
    }
  }

  const handleSearchSubmit = (moviesFromApi) => {
    const filteredMovies = filterMovies(moviesFromApi);
    setFilteredMovies(filteredMovies);
  }

  // const renderMovies = () => {
  //   if (windowWidth >= 1280) {
  //     setRenderedMovies(filteredMovies.slice(0,4));
  //     setFilteredMovies();
  //   }
  //   if (windowWidth < 1280 && windowWidth >= 990) {
  //     setRenderedMovies(filteredMovies.slice(0,3));
  //   }
  //   if (windowWidth < 990 && windowWidth >= 580) {
  //     setRenderedMovies(filteredMovies.slice(0,2));
  //   }
  //   if (windowWidth < 580) {
  //     setRenderedMovies(filteredMovies.slice(0,5));
  //   }
  // }

  return(
    <main className="movies">
      <section className="movies__search-form">
        <SearchForm
          onSearchRequest={handleSearchSubmit}
        />
      </section>
      <section className="movies__items">
        <MoviesCardList
          movies={filteredMovies}
        />
      </section>
      <section className="movies__btn-section">
        <button className="movies__load-btn">Ещё</button>
      </section>
    </main>
  );
}

export default Movies;
