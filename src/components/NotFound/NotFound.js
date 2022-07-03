import './NotFound.css';
import { useNavigate } from 'react-router-dom';

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
      <button className="not-found__link" onClick={goBack}>Назад</button>
    </main>
  );
}

export default NotFound;
