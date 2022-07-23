import './SavedMovies.css';
import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';

function SavedMovies () {

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    mainApi.getSavedMovies(token)
      .then(res => {
        if (res) {
          console.log(res);
          setSavedMovies(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [searchRequest, setSearchRequest] = React.useState('');

  const filterMovies = (unfilteredMovies) => {
    return unfilteredMovies.filter(movie => {
      if (isChecked === true) {
        return movie.duration <= 40 && movie.nameRU.includes(searchRequest);
      } else {
        return movie.nameRU.includes(searchRequest);
      }
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
          onSearchSubmit={handleSearchSubmit}
          isChecked={isChecked}
          searchRequest={searchRequest}
          setSearchRequest={setSearchRequest}
          setIsChecked={setIsChecked}
        />
      </section>
      <section className="saved-movies__items">
        {
          savedMovies.length !== 0 ?
            <MoviesCardList movies={savedMovies}/>
            :
            <p>Нет соранённых фильмов</p>
        }
      </section>
    </main>
  );
}

export default SavedMovies;
