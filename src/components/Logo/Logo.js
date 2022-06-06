import './Logo.css';
import logo from '../../images/logo.svg';

import { Link } from 'react-router-dom';

function Logo () {

  return(
    <Link className="logo" to="/" target="_self">
      <img className="logo__img" src={logo} alt="Логотип: буква С в кружочке"/>
    </Link>
  );
}

export default Logo;
