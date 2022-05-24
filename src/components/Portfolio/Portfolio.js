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
              href="https://"
              target="_blank"
              rel="noreferrer">
                <button className="portfolio__btn">
                  Статичный сайт
                  <div className="portfolio__btn-icon"></div>
                </button>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
