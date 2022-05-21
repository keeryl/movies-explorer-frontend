import './AboutProject.css';

function AboutProject () {

  return (
    <section className="about-project">
      <h2 className="about-project__header">О проекте</h2>
      <ul className="about-project__items">
        <li className="about-project__item">
          <h3 className="about-project__item-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__item-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и финальные доработки.
          </p>
        </li>
        <li className="about-project__item">
          <h3 className="about-project__item-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__item-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__graphics">
            <div className="one-week">
              <p className="graphics-text">1 неделя</p>
            </div>
            <div className="four-weeks">
              <p className="graphics-text">4 недели</p>
            </div>
            <div className="back-end">
              <p className="graphics-text graphics-text_color-grey">Back-end</p>
            </div>
            <div className="front-end">
              <p className="graphics-text graphics-text_color-grey">Front-end</p>
            </div>
      </div>
    </section>
  );
}

export default AboutProject;
