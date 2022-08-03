import { useEffect, useState, useContext } from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader  from '../Preloader/Preloader';
import SEARCH_REQUEST_ERROR from '../../utils/constants';

function Movies (props) {

  const currentUser = useContext(CurrentUserContext);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [searchRequest, setSearchRequest] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [lsMovies, setLsMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [error, setError] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [numToRender, setNumToRender] = useState(() => {
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

  useEffect(() => {
    countCardsToRender();
  }, [windowWidth, renderedMovies]);

  useEffect(() => {
    setInputValue(searchRequest);
  },[searchRequest]);

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  useEffect(() => {
    getLocalStorageContent();
    getSavedMovies();
  },[currentUser]);

  useEffect(() => {
    getFilteredMovies();
  }, [isChecked, searchRequest, lsMovies]);

  useEffect(() => {
    checkFormValidity();
  },[searchRequest, inputValue]);

  useEffect(() => {
    console.log(filteredMovies)
    renderMovies();
  },[filteredMovies]);

   const handleCheckBoxClick = () => {
    setIsChecked(!isChecked);
    setRenderedMovies([]);
  }
  const getLocalStorageContent = () => {
    if (localStorage.getItem(currentUser._id) !== null) {
      setSearchRequest(JSON.parse(localStorage.getItem(currentUser._id)).request);
      setLsMovies(JSON.parse(localStorage.getItem(currentUser._id)).movies);
    }
  }

  const filterMovies = (unfilteredMovies) => {
    return unfilteredMovies.filter(movie => {
      if (isChecked) {
        return movie.duration <= 40 && movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase());
      } else {
        return movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase());
      }
    });
  }

  const checkFormValidity = () => {
      const isSearchRequestValid = inputValue.length > 0 && searchRequest !== inputValue;
      isSearchRequestValid ?
      props.setIsSearchRequestValid(true)
      :
      props.setIsSearchRequestValid(false)
  }

  const getFilteredMovies = () => {
      setFilteredMovies(() => {
        return filterMovies(lsMovies);
      });
  }

  const renderMovies = () => {
    countCardsToRender();
    const moviesToRender = filteredMovies.splice(0, numToRender);
    setRenderedMovies([...renderedMovies, ...moviesToRender]);
}

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
    setTimeout(() => setWindowWidth(window.innerWidth), 1000);
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
    setError('');
    setRenderedMovies([]);
    props.setIsSearchRequestValid(false);
    setIsLoading(true);
    moviesApi.getMovies()
    .then(res => {
      if(res) {
        localStorage.setItem(currentUser._id, JSON.stringify({
          request: inputValue,
          movies: res,
        }));
        setSearchRequest(inputValue);
        setIsLoading(false);
      }
    })
    .catch(err => {
      setIsLoading(false);
      console.log(err);
      setError(SEARCH_REQUEST_ERROR);
    });
  }

  const handleLikeClick = (movie) => {
    const isLiked = savedMovies.some(m => m.movieId === movie.id);
    const movieToDelete = savedMovies.find(m => m.movieId === movie.id)
    const token = localStorage.getItem('token');
    setError('');
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
        setError(SEARCH_REQUEST_ERROR);
      });
    }
  }

  return(
    <main className="movies">
      <section className="movies__search-form">
        <SearchForm
          onSearchRequest={handleSearchSubmit}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isValid={props.isSearchRequestValid}
          onCheckBoxClick={handleCheckBoxClick}
        />
        <p className="movies__error-message">{error}</p>
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
