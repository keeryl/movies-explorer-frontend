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
        <NavLink
          className={
            ({ isActive }) =>
            isActive ? `navigation__link navigation__link_active` : `navigation__link`
          }
          to="/movies"
        >
          Фильмы
        </NavLink>
        <NavLink
          className={
            ({ isActive }) =>
            isActive ? `navigation__link navigation__link_active` : `navigation__link`
          }
          to="/saved-movies"
        >
          Сохранённые фильмы
        </NavLink>
      </div>
      <Link className="navigation__account-link" to="/profile">
        Аккаунт
        <div className="navigation__icon"></div>
      </Link>
      <button className="navigation__humburger-btn" onClick={openMenu}></button>
      <div
        onClick={closeMenu}
        className={`navigation__popup ${isOpened ? "navigation__popup_opened" : ""}`}
      >
        <div className="navigation__side-menu" onClick={closeMenu}>
          <button className="navigation__side-menu-close-btn" onClick={closeMenu}></button>
          <div className="navigation__side-menu-content-wrapper" onClick={closeMenu}>
            <ul onClick={closeMenu} className="navigation__side-menu-links">
              <li>
                <NavLink
                  className={
                    ({ isActive }) =>
                    isActive ?
                    `navigation__side-menu-link navigation__side-menu-link_active`
                    :
                    `navigation__side-menu-link`
                  }
                  to="/"
                  onClick={closeMenu}
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    ({ isActive }) =>
                    isActive ?
                    `navigation__side-menu-link navigation__side-menu-link_active`
                    :
                    `navigation__side-menu-link`
                  }
                  to="/movies"
                  onClick={closeMenu}
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    ({ isActive }) =>
                    isActive ?
                    `navigation__side-menu-link navigation__side-menu-link_active`
                    :
                    `navigation__side-menu-link`
                  }
                  to="/saved-movies"
                  onClick={closeMenu}
                >
                  Сохранённые фильмы
                </NavLink>
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
