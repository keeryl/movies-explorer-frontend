import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList (props) {

  return(
    <ul className="movies-card-list">
      {props.movies.map(movie => {
        return (
          <MoviesCard
            key={movie.id}
            movie={movie}
          />
        )
      })}
    </ul>
  );
}

export default MoviesCardList;
