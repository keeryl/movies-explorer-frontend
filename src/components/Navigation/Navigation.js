import './Navigation.css';
import { Link } from 'react-router-dom';
import accountIcon from '../../images/account_icon.svg';

function Navigation (props) {

  return (
    <nav className="navigation">
      <Link className="navigation__link" to="/movies">Фильмы</Link>
      <Link className="navigation__link" to="/saved-movies">Сохранённые фильмы</Link>
      <Link className="navigation__account-link" to="/profile">
        <span className="navigation__account-text">Аккаунт</span>
        <img className="navigation__icon" src={accountIcon} alt="Иконка аккаунта"/>
      </Link>
    </nav>
  )
}

export default Navigation;
