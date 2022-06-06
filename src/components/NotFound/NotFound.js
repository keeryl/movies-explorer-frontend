import './NotFound.css';
import { Link, useNavigate } from 'react-router-dom';

function NotFound () {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <main className="not-found">
      <div className="not-found__text-container">
        <h3 className="not-found__error-number">404</h3>
        <p className="not-found__error-text">Страница не найдена</p>
      </div>
      <Link className="not-found__link" to={goBack}>Назад</Link>
    </main>
  );
}

export default NotFound;
