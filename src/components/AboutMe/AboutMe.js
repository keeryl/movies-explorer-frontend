import './AboutMe.css';
import photo from '../../images/student_photo.jpg';

function AboutMe () {

  return (
    <section className="about-me" id="about-me">
      <div className="about-me__wrapper">
        <h2 className="about-me__title">Студент</h2>
        <article className="about-me__article">
          <div className="about-me__text-column">
            <div className="about-me__text">
              <h3 className="about-me__name">Зикевский Кирилл</h3>
              <h4 className="about-me__description">Фронтенд-разработчик, 32 года</h4>
              <p className="about-me__intro">
                Я живу в Москве, закончил юридический факультет РУДН.
                Я люблю слушать музыку, в свободное время хожу в спорт-зал.
                Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал поиск работы.
              </p>
            </div>
            <ul className="about-me__links">
              <li>
                <a
                  className="about-me__link"
                  href="https://vk.com/zikevskiy"
                  target="_blank"
                  rel="noreferrer">
                    ВКонтакте
                </a>
              </li>
              <li>
                <a
                  className="about-me__link"
                  href="https://github.com/keeryl"
                  target="_blank"
                  rel="noreferrer">
                    Github
                </a>
              </li>
            </ul>
          </div>
          <img className="about-me__photo" src={photo} alt="Фотография студента"/>
        </article>
      </div>
    </section>
  );
}

export default AboutMe;
