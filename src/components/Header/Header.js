
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header (props) {

  let location = useLocation();

  return (
    <header className="header">
      <Link className="header-logo__link" to="/" target="_self">
        <img className="header-logo__img" src={logo} alt="Логотип: буква С в кружочке"/>
      </Link>
      {
        location.pathname === "/" ?
        (
          <div>
            <Link className="header__signup-link" to="/sign-up">Регистрация</Link>
            <Link className="header__signin-link" to="/sign-in">Войти</Link>
          </div>

        )
        :
        (
          <Navigation />
        )
      }
    </header>
  );
}

export default Header;
