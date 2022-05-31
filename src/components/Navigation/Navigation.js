import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation (props) {

  return (
    <nav className="navigation">
      <div className="navigation__wrapper">
        <Link className="navigation__link" to="/movies">Фильмы</Link>
        <Link className="navigation__link" to="/saved-movies">Сохранённые фильмы</Link>
      </div>
      <Link className="navigation__account-link" to="/profile">
        Аккаунт
        <div className="navigation__icon"></div>
      </Link>
      <button className="navigation__humburger-btn"></button>
      <ul className="navigation__side-menu">
        <button>Х</button>
        <li>Главная</li>
        <li>Фильмы</li>
        <li>Сохранённые фильмы</li>
        <li>Аккаунт</li>
      </ul>
    </nav>
  )
}

export default Navigation;
