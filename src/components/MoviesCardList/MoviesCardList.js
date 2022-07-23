import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList (props) {

  return(
    <ul className="movies-card-list">
      {
        props.movies.length !== 0 ?
        props.movies.map((movie, index) => {
          return (
            <MoviesCard
              key={index}
              movie={movie}
              onLikeClick={props.onLikeClick}
              urlPrefix={props.urlPrefix}
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
