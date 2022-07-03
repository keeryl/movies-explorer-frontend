import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies () {

  return(
    <main className="saved-movies">
      <section className="saved-movies__search-form">
        <SearchForm />
      </section>
      <section className="saved-movies__items">
        <MoviesCardList />
      </section>
    </main>
  );
}

export default SavedMovies;
