import './MoviesCard.css';

function MoviesCard (props) {

  const handleCardClick = () => {

  }

  const handleLikeClick = () => {

  }

  return(
    <li onClick={handleCardClick} className="movies-card">
      <div className="movies-card__image-container">
        <img
          className="movies-card__image"
          src={props.url}
          alt={`Картинка фильма «Роллинг Стоунз» в изгнании`}
        />
      </div>
      <div className="movies-card__description-container">
        <h2 className="movies-card__title">{props.title}</h2>
        <button onClick={handleLikeClick} className="movies-card__like-button" type="button"></button>
      </div>
      <span className="movies-card__duration">1ч 42м</span>
    </li>
  );
}

export default MoviesCard;
