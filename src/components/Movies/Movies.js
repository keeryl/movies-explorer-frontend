import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';

function Movies () {

  return(
    <main className="movies">
      <section className="movies__search-form">
        <SearchForm />
      </section>
    </main>
  );
}

export default Movies;
