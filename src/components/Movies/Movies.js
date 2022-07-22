import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies () {

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

  const [filteredMovies, setFilteredMovies] = React.useState(() => {
    if (localStorage.getItem('searchRequest') !== null) {
      const movies = filterMovies(JSON.parse(localStorage.searchRequest).movies);
      return [...movies];
    } else {
      return [];
    }
  });
  const [renderedMovies, setRenderedMovies] = React.useState([]);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [numToRender, setNumToRender] = React.useState(() => {
    if (windowWidth >= 1280) {
      return 12;
    }
    if (windowWidth < 1280 && windowWidth >= 990) {
      return 9;
    }
    if (windowWidth < 990 && windowWidth >= 580) {
      return 6;
    }
    if (windowWidth < 580) {
      return 5;
    }
  });

  React.useEffect(() => {
    countCardsToRender();
  }, [windowWidth]);

  React.useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  });

  React.useEffect(() => {
    renderMovies();
  },[filteredMovies]);

  const countCardsToRender = () => {
    if (windowWidth >= 1280) {
      setNumToRender(12);
    }
    if (windowWidth < 1280 && windowWidth >= 990) {
      setNumToRender(9);
    }
    if (windowWidth < 990 && windowWidth >= 580) {
      setNumToRender(6);
    }
    if (windowWidth < 580) {
      setNumToRender(5);
    }
  }

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  }

  const handleSearchSubmit = (moviesFromApi) => {
    const movies = filterMovies(moviesFromApi);
    setRenderedMovies([]);
    countCardsToRender();
    setFilteredMovies(movies);
  }

  const renderMovies = () => {
    if (windowWidth >= 1280) {
      const moviesToRender = filteredMovies.splice(0, numToRender);
      setRenderedMovies([...renderedMovies, ...moviesToRender]);
      setNumToRender(4);
    }
    if (windowWidth < 1280 && windowWidth >= 990) {
      const moviesToRender = filteredMovies.splice(0,numToRender);
      setRenderedMovies([...renderedMovies, ...moviesToRender]);
      setNumToRender(3);
    }
    if (windowWidth < 990 && windowWidth >= 580) {
      const moviesToRender = filteredMovies.splice(0,numToRender);
      setRenderedMovies([...renderedMovies, ...moviesToRender]);
      setNumToRender(2);
    }
    if (windowWidth < 580) {
      const moviesToRender = filteredMovies.splice(0,numToRender);
      setRenderedMovies([...renderedMovies, ...moviesToRender]);
      setNumToRender(2);
    }
  }

  return(
    <main className="movies">
      <section className="movies__search-form">
        <SearchForm
          onSearchRequest={handleSearchSubmit}
        />
      </section>
      <section className="movies__items">
        {
          localStorage.getItem('searchRequest') !== null &&
          <MoviesCardList
          movies={renderedMovies}
        />
        }
      </section>
      {
      filteredMovies.length !== 0 &&
        <section className="movies__btn-section">
          <button onClick={renderMovies} className="movies__load-btn">Ещё</button>
        </section>
      }
    </main>
  );
}

export default Movies;
