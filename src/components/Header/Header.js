import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation.js';
import { Link } from 'react-router-dom';

function Header (props) {

  return (
    <header className="header">
      <div className="header__wrapper">
        <Logo />
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
