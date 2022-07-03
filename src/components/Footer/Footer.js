import './Footer.css';

function Footer () {

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <h3 className="footer__first-line">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__second-line">
          <span className="footer__year">&copy; Keeryl 2022</span>
          <ul className="footer__links">
            <li>
              <a
                className="footer__link"
                href="https://practicum.yandex.ru/web"
                target="_blank"
                rel="noreferrer">
                  Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href="https://github.com/keeryl"
                target="_blank"
                rel="noreferrer">
                  Github
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href="https://vk.com/zikevskiy"
                target="_blank"
                rel="noreferrer">
                  ВКонтакте
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
