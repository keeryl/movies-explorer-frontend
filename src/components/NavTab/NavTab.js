import './NavTab.css';

function NavTab () {

  return (
    <nav className="navtab">
      <a className="navtab__link" href="#about-project" target="_self">О проекте</a>
      <a className="navtab__link" href="#techs" target="_self">Технологии</a>
      <a className="navtab__link" href="#about-me" target="_self">Студент</a>
    </nav>
  );
}

export default NavTab;
