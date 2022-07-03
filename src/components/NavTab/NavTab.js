import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab () {

  return (
    <nav className="navtab">
      <Link className="navtab__link" to="#" target="_self">О проекте</Link>
      <Link className="navtab__link" to="#" target="_self">Технологии</Link>
      <Link className="navtab__link" to="#" target="_self">Студент</Link>
    </nav>
  );
}

export default NavTab;
