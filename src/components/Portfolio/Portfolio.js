import './Portfolio.css';

function Portfolio () {

  return (
    <section className="portfolio">
      <div className="portfolio__wrapper">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__links">
          <li>
            <a
              className="portfolio__link"
              href="https://github.com/keeryl/how-to-learn"
              target="_blank"
              rel="noreferrer">
                <span>
                  Статичный сайт
                </span>
                <span>
                  &#8599;
                </span>
            </a>
          </li>
          <li>
            <a
              className="portfolio__link"
              href="https://github.com/keeryl/russian-travel"
              target="_blank"
              rel="noreferrer">
                <span>
                  Адаптивный сайт
                </span>
                <span>
                  &#8599;
                </span>
            </a>
          </li>
          <li>
            <a
              className="portfolio__link portfolio__link_last-link"
              href="https://keeryl-mesto.nomoredomains.work"
              target="_blank"
              rel="noreferrer">
                <span>
                  Одностраничное приложение
                </span>
                <span>
                  &#8599;
                </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
