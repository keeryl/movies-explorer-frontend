import './MoviesCard.css';
import React from 'react';

function MoviesCard (props) {

  const [isLiked, setIsLiked] = React.useState(false);
  const cardLikeBtnClassName = (
    `movies-card__like-button ${ isLiked && `movies-card__like-button_liked`}`
  );

  const handleCardClick = () => {

  }

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    console.log(props.movie);
    props.onLikeClick(props.movie);
  }

  const countMovieDuration = (mins) => {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  return(
    <li onClick={handleCardClick} className="movies-card">
      <div className="movies-card__image-container">
        <img
          className="movies-card__image"
          src={`${props.urlPrefix}${props.movie.image.url === undefined ? props.movie.image : props.movie.image.url}`}
          alt={`Картинка фильма ${props.movie.nameRU}`}
        />
      </div>
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
