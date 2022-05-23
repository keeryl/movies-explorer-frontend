
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation.js';
import { Link } from 'react-router-dom';
import './Header.css';

function Header (props) {

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link className="header-logo__link" to="/" target="_self">
          <img className="header-logo__img" src={logo} alt="Логотип: буква С в кружочке"/>
        </Link>
        {
          props.loggedIn ?
          (
            <Navigation />
          )
          :
          (
            <nav className="header__auth-menu">
              <Link className="header__signup-link" to="/sign-up">Регистрация</Link>
              <Link className="header__signin-link" to="/sign-in">
                <button className="header__signin-btn">Войти</button>
              </Link>
            </nav>
          )
        }
      </div>
    </header>
  );
}

export default Header;
