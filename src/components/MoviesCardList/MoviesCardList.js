import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList (props) {

  return(
    <ul className="movies-card-list">
      {
        props.movies.length !== 0 ?
        props.movies.map((movie) => {
          return (
            <MoviesCard
              key={movie._id || movie.id}
              movie={movie}
              onLikeClick={props.onLikeClick}
              urlPrefix={props.urlPrefix}
              savedMovies={props.savedMovies}
            />
          )
        })
        :
        <p>Ничего не найдено</p>
      }
    </ul>
  );
}

export default MoviesCardList;
