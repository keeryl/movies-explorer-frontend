import './MoviesCard.css';
import React from 'react';

function MoviesCard (props) {

  const [isLiked, setIsLiked] = React.useState(
    () => props.savedMovies.some(m => props.movie.id === undefined ?
      m.movieId === props.movie.movieId
      :
      m.movieId === props.movie.id
      )
  );
  const cardLikeBtnClassName = (
    `movies-card__like-button ${ isLiked && `movies-card__like-button_liked`}`
  );

  React.useEffect(() => {
    setIsLiked(() => props.savedMovies.some(m => props.movie.id === undefined ?
      m.movieId === props.movie.movieId
      :
      m.movieId === props.movie.id
      ));
  },[props.savedMovies]);

  const handleLikeClick = () => {
    props.onLikeClick(props.movie);
  }

  const countMovieDuration = (mins) => {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  return(
    <li className="movies-card">
      <a
        className="movies-card__image-container"
        href={props.movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={`${props.urlPrefix}${props.movie.image.url === undefined ? props.movie.image : props.movie.image.url}`}
          alt={`Картинка фильма ${props.movie.nameRU}`}
        />
      </a>
      <div className="movies-card__description-container">
        <h2 className="movies-card__title">{props.movie.nameRU}</h2>
        <button
          onClick={handleLikeClick}
          className={cardLikeBtnClassName}
          type="button">
        </button>
      </div>
      <span className="movies-card__duration">
        {countMovieDuration(props.movie.duration)}
      </span>
    </li>
  );
}

export default MoviesCard;
