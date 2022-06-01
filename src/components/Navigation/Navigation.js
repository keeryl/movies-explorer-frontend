import './Navigation.css';
import { Link } from 'react-router-dom';
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
        <ul className="navigation__side-menu">
          <button className="navigation__side-menu-close-btn" onClick={closeMenu}>Х</button>
          <li>Главная</li>
          <li>Фильмы</li>
          <li>Сохранённые фильмы</li>
          <li>Аккаунт</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
