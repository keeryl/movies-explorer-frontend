import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader  from '../Preloader/Preloader';

function Movies () {

  const filterMovies = (unfilteredMovies) => {
    const localStorageItem = localStorage.getItem(currentUser._id);
    const checkBoxState = JSON.parse(localStorageItem).checkBox;
    const request = JSON.parse(localStorageItem).request;
    return unfilteredMovies.filter(movie => {
      if (checkBoxState === true) {
        return movie.duration <= 40 && movie.nameRU.includes(request);
      } else {
        return movie.nameRU.includes(request);
      }
    });
  }

  const currentUser = React.useContext(CurrentUserContext);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(true);
  const [searchRequest, setSearchRequest] = React.useState('');
  const [filteredMovies, setFilteredMovies] = React.useState(() => {
    if (localStorage.getItem(currentUser._id) !== null) {
      const localStorageItem = localStorage.getItem(currentUser._id);
      const localStorageMovies = JSON.parse(localStorageItem).movies;
      const movies = filterMovies(localStorageMovies);
      return [...movies];
    } else {
      return [];
    }
  });
  const [isLoading, setIsLoading] = React.useState(false);
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
    const localStorageItem = localStorage.getItem(currentUser._id);
    if (localStorage.getItem(currentUser._id) !== null) {
      setSearchRequest(JSON.parse(localStorageItem).request);
      setIsChecked(JSON.parse(localStorageItem).checkBox);
    }
  },[]);

  React.useEffect(() => {
    window.addEventListener("resize",
      function () {setTimeout(updateWindowWidth, 1000)}
    );
    return () => window.removeEventListener("resize",
      function () {setTimeout(updateWindowWidth, 1000)}
    );
  });

  React.useEffect(() => {
    renderMovies();
  },[filteredMovies]);

  React.useEffect(() => {
    getSavedMovies();
  },[]);

  const countCardsToRender = () => {
    if (windowWidth >= 1280) {
      renderedMovies.length === 0 ? setNumToRender(12) : setNumToRender(4)
    }
    if (windowWidth < 1280 && windowWidth >= 990) {
      renderedMovies.length === 0 ? setNumToRender(9) : setNumToRender(3)
    }
    if (windowWidth < 990 && windowWidth >= 580) {
      renderedMovies.length === 0 ? setNumToRender(6) : setNumToRender(2)
    }
    if (windowWidth < 580) {
      renderedMovies.length === 0 ? setNumToRender(5) : setNumToRender(2)
    }
  }

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  }

  const getSavedMovies = () => {
    const token = localStorage.getItem('token');
    mainApi.getSavedMovies(token)
      .then(res => {
        if (res) {
          setSavedMovies(() => res.filter(m => m.owner === currentUser._id));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleSearchSubmit = () => {
    setRenderedMovies([]);
    setIsLoading(true);
    moviesApi.getMovies()
    .then(res => {
      if(res) {
        localStorage.setItem(currentUser._id, JSON.stringify({
          checkBox: isChecked,
          request: searchRequest,
          movies: res,
        }));
        const movies = filterMovies(JSON.parse(localStorage.getItem(currentUser._id)).movies);
        setFilteredMovies(movies);
        setIsLoading(false);
      }
    })
    .catch(err => {
      setIsLoading(false);
      console.log(err);
    });
  }

  const handleLikeClick = (movie) => {
    const isLiked = savedMovies.some(m => m.movieId === movie.id);
    const movieToDelete = savedMovies.find(m => m.movieId === movie.id)
    const token = localStorage.getItem('token');
    if (!isLiked) {
      mainApi.saveMovie(token, movie)
      .then(res => {
        if (res) {
          getSavedMovies();
        }
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      mainApi.deleteMovie(token, movieToDelete._id)
      .then(res => {
        if (res) {
          getSavedMovies();
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  const renderMovies = () => {
      countCardsToRender();
      const moviesToRender = filteredMovies.splice(0, numToRender);
      setRenderedMovies([...renderedMovies, ...moviesToRender]);
  }

  React.useEffect(() => {
    countCardsToRender();
  }, [windowWidth, renderedMovies]);

  return(
    <main className="movies">
      <section className="movies__search-form">
        <SearchForm
          onSearchRequest={handleSearchSubmit}
          isChecked={isChecked}
          searchRequest={searchRequest}
          setIsChecked={setIsChecked}
          setSearchRequest={setSearchRequest}
        />
      </section>
      <section className="movies__items">
        {
          isLoading &&
          <Preloader />
        }
        {
          localStorage.getItem(currentUser._id) !== null && !isLoading &&
          <MoviesCardList
            movies={renderedMovies}
            onLikeClick={handleLikeClick}
            urlPrefix={'https://api.nomoreparties.co'}
            savedMovies={savedMovies}
          />
        }
      </section>
      {
      filteredMovies.length !== 0 && !isLoading &&
        <section className="movies__btn-section">
          <button onClick={renderMovies} className="movies__load-btn">Ещё</button>
        </section>
      }
    </main>
  );
}

export default Movies;
