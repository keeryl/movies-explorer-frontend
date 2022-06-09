import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies () {

  return(
    <main className="movies">
      <section className="movies__search-form">
        <SearchForm />
      </section>
      <section className="movies__items">
        <MoviesCardList />
      </section>
    </main>
  );
}

export default Movies;
