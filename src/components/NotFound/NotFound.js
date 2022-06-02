import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound () {

  return (
    <main className="not-found">
      <h3 className="not-found__error-number">404</h3>
      <p className="not-found__error-text">Страница не найдена</p>
      <Link className="not-found__link" to="/">Назад</Link>
    </main>
  );
}

export default NotFound;
