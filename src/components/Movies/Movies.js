import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';

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

  const currentUser = React.useContext(CurrentUserContext);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(true);
  const [searchRequest, setSearchRequest] = React.useState('');
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
    if (localStorage.getItem('searchRequest') !== null) {
      setSearchRequest(JSON.parse(localStorage.searchRequest).request);
      setIsChecked(JSON.parse(localStorage.searchRequest).checkBox);
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
    moviesApi.getMovies()
    .then(res => {
      if(res) {
        localStorage.setItem('searchRequest', JSON.stringify({
          checkBox: isChecked,
          request: searchRequest,
          movies: res,
        }));
        const movies = filterMovies(JSON.parse(localStorage.searchRequest).movies);
        setFilteredMovies(movies);
      }
    })
    .catch(err => {
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
          localStorage.getItem('searchRequest') !== null &&
          <MoviesCardList
            movies={renderedMovies}
            onLikeClick={handleLikeClick}
            urlPrefix={'https://api.nomoreparties.co'}
            savedMovies={savedMovies}
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
