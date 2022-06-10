import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList () {

  return(
    <ul className="movies-card-list">
      <MoviesCard
        url="https://api.nomoreparties.co/uploads/medium_posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg"
        title="«Роллинг Стоунз» в изгнании"
      />

      <MoviesCard
        url="https://api.nomoreparties.co/uploads/small_zagruzhennoe_1_fd5faff237.jpeg"
        title="196 ударов в минуту"
      />

      <MoviesCard
        url="https://api.nomoreparties.co/uploads/images_244e1fd56f.jpeg"
        title="Просто какое-то длинное название фильма я не знаю какое"
      />

      <MoviesCard
        url="https://api.nomoreparties.co/uploads/small_590x400_2eccd40a93.jpeg"
        title="Hit So Hard: Школа жизни Патти Шемель"
      />

      <MoviesCard
        url="https://api.nomoreparties.co/uploads/small_ballad_of_genesis_and_lady_jaye_10c27afa96.jpeg"
        title="Баллада о Дженезисе и Леди Джей"
      />
    </ul>
  );
}

export default MoviesCardList;
