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
      console.log('Отфильтрованные фильмы из LS')
      console.log(movies)
      return [...movies];
    } else {
      return [];
    }
  });
  const [renderedMovies, setRenderedMovies] = React.useState([]);
  const [arrIndex, setArrIndex] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  });

  React.useEffect(() => {
    // getMoviesFromLocalStorage();
    return () => {
      setFilteredMovies([]);
      setRenderedMovies([]);
      setArrIndex(0);
    }
  },[]);

  React.useEffect(() => {
    console.log('Вызван эффект renderMovies')
    renderMovies();
    console.log('Изменен стейт filteredMovies')
    console.log(filteredMovies);
  },[filteredMovies]);

  React.useEffect(() => {
    console.log('Изменен стейт renderedMovies')
    console.log(renderedMovies);
  },[renderedMovies]);

  React.useEffect(() => {
    console.log('Изменен стейт arrIndex')
    console.log(arrIndex);
  },[arrIndex]);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  }



  // const getMoviesFromLocalStorage = () => {
  //   if (localStorage.getItem('searchRequest') !== null) {
  //     const movies = filterMovies(JSON.parse(localStorage.searchRequest).movies);
  //     setFilteredMovies(movies);
  //   } else {
  //     return;
  //   }
  // }

  const handleSearchSubmit = (moviesFromApi) => {
    const movies = filterMovies(moviesFromApi);
    setRenderedMovies([]);
    setArrIndex(0);
    setFilteredMovies(movies);
  }

  const renderMovies = () => {
    console.log('Вызван renderMovies')
    if (windowWidth >= 1280) {
      const moviesToRender = filteredMovies.splice(0, 8);
      setRenderedMovies([...renderedMovies, ...moviesToRender]);
      // setArrIndex(prev => prev + 8);
      console.log(filteredMovies);
      // filteredMovies.splice(arrIndex,8)
    }
    if (windowWidth < 1280 && windowWidth >= 990) {
      const moviesToRender = filteredMovies.splice(arrIndex,6);
      setRenderedMovies([...renderedMovies, ...moviesToRender]);
      setArrIndex(prev => prev + 6);
    }
    if (windowWidth < 990 && windowWidth >= 580) {
      const moviesToRender = filteredMovies.splice(arrIndex,4);
      setRenderedMovies([...renderedMovies, ...moviesToRender]);
      setArrIndex(prev => prev + 4);
    }
    if (windowWidth < 580) {
      const moviesToRender = filteredMovies.splice(arrIndex,5);
      setRenderedMovies([...renderedMovies, ...moviesToRender]);
      setArrIndex(prev => prev + 5);
    }
  }

  // const handleMoreBtn = () => {
  //   setFilteredMovies(prev => {
  //     return [prev.splice(arrIndex,8)
  //   })
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
          movies={renderedMovies}
        />
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
