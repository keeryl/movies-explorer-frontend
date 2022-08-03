import './SavedMovies.css';
import { useEffect, useState, useContext } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader  from '../Preloader/Preloader';

function SavedMovies (props) {

  const currentUser = useContext(CurrentUserContext);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] =useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [searchRequest, setSearchRequest] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputValue === '') {
      getSavedMovies();
      setSearchRequest('');
    }
  },[inputValue]);

  useEffect(() => {
    checkFormValidity();
  },[inputValue, searchRequest]);

  useEffect(() => {
    getSavedMovies();
  },[currentUser]);

  useEffect(() => {
    renderMovies();
  },[filteredMovies]);

  useEffect(() => {
    getFilteredMovies();
  },[savedMovies, isChecked, searchRequest]);

  const checkFormValidity = () => {
    const isRequestValid = inputValue.length > 0 && inputValue !== searchRequest;
    isRequestValid && savedMovies.length > 0 ?
    props.setIsSearchRequestValid(true)
    :
    props.setIsSearchRequestValid(false)
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

  const renderMovies = () => {
    setRenderedMovies(filteredMovies);
  }

  const getFilteredMovies = () => {
    setFilteredMovies(() => {
      return filterMovies(savedMovies);
    });
  }

  const getSavedMovies = () => {
    const token = localStorage.getItem('token');
    setIsLoading(true);
    mainApi.getSavedMovies(token)
      .then(res => {
        if (res) {
          setSavedMovies(() => res.filter(m => m.owner === currentUser._id));
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }

  const handleCheckBoxClick = () => {
    setIsChecked(!isChecked);
  }

  const handleLikeClick = (movie) => {
    const token = localStorage.getItem('token');
    mainApi.deleteMovie(token, movie._id)
      .then(res => {
        if (res) {
          setSavedMovies(savedMovies => savedMovies.filter(m => m._id !== res.deletedMovie._id));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleSearchSubmit = () => {
    setSearchRequest(inputValue);
  }

  return(
    <main className="saved-movies">
      <section className="saved-movies__search-form">
        <SearchForm
          onSearchRequest={handleSearchSubmit}
          isChecked={isChecked}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setIsChecked={setIsChecked}
          isValid={props.isSearchRequestValid}
          onCheckBoxClick={handleCheckBoxClick}
        />
      </section>
      <section className="saved-movies__items">
        {
          isLoading &&
          <Preloader />
        }
        {
          renderedMovies.length !== 0 && !isLoading ?
            <MoviesCardList
              movies={renderedMovies}
              onLikeClick={handleLikeClick}
              urlPrefix={''}
              savedMovies={savedMovies}
            />
            :
            <p>Нет сохранённых фильмов</p>
        }
      </section>
    </main>
  );
}

export default SavedMovies;
