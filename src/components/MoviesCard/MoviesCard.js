import './MoviesCard.css';

function MoviesCard () {

  const handleCardClick = () => {

  }

  const handleLikeClick = () => {

  }

  return(
    <li onClick={handleCardClick} className="movies-card">
      <img
        className="movies-card__image"
        src="https://api.nomoreparties.co/uploads/medium_posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg"
        alt={`Картинка фильма «Роллинг Стоунз» в изгнании`}
      />
      <div className="movies-card__description-container">
        <h2 className="movies-card__title">«Роллинг Стоунз» в изгнании</h2>
        <button onClick={handleLikeClick} className="movies-card__like-button" type="button"></button>
      </div>
      <span className="movies-card__duration">1ч 42м</span>
    </li>
  );
}

export default MoviesCard;
