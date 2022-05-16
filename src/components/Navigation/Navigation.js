import './Navigation.css';
import { Link } from 'react-router-dom';
import accountIcon from '../../images/account_icon.svg';

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
    </nav>
  )
}

export default Navigation;
