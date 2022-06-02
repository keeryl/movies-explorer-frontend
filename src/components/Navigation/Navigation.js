import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import React from 'react';

function Navigation (props) {

  const [isOpened, setIsOpened] = React.useState(false);

  function openMenu () {
    setIsOpened(true);
  }

  function closeMenu () {
    setIsOpened(false);
  }

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
      <button className="navigation__humburger-btn" onClick={openMenu}></button>
      <div className={`navigation__popup ${isOpened ? "navigation__popup_opened" : ""}`}>
        <div className="navigation__side-menu">
          <button className="navigation__side-menu-close-btn" onClick={closeMenu}>Х</button>
          <div className="navigation__side-menu-content-wrapper">
            <ul className="navigation__side-menu-links">
              <li>
                <NavLink className="navigation__side-menu-link" to="/">Главная</NavLink>
              </li>
              <li>
                <NavLink className="navigation__side-menu-link" to="/movies">Фильмы</NavLink>
              </li>
              <li>
                <NavLink className="navigation__side-menu-link" to="/saved-movies">Сохранённые фильмы</NavLink>
              </li>
            </ul>
            <Link className="navigation__side-menu-account-link" to="/profile">
              Аккаунт
              <div className="navigation__icon"></div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
