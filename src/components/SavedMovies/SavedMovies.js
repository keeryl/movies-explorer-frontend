import './SavedMovies.css';
import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader  from '../Preloader/Preloader';

function SavedMovies () {

  const currentUser = React.useContext(CurrentUserContext);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [searchRequest, setSearchRequest] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (searchRequest === '') {
      getSavedMovies();
    }
  },[searchRequest]);

  const filterMovies = (unfilteredMovies) => {
    return unfilteredMovies.filter(movie => {
      if (isChecked === true) {
        return movie.duration <= 40 && movie.nameRU.includes(searchRequest);
      } else {
        return movie.nameRU.includes(searchRequest);
      }
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
    const filteredMovies = filterMovies(savedMovies);
    setSavedMovies(filteredMovies);
  }

  return(
    <main className="saved-movies">
      <section className="saved-movies__search-form">
        <SearchForm
          onSearchRequest={handleSearchSubmit}
          isChecked={isChecked}
          searchRequest={searchRequest}
          setSearchRequest={setSearchRequest}
          setIsChecked={setIsChecked}
        />
      </section>
      <section className="saved-movies__items">
        {
          isLoading &&
          <Preloader />
        }
        {
          savedMovies.length !== 0 && !isLoading ?
            <MoviesCardList
              movies={savedMovies}
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
