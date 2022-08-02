import './Techs.css';

function Techs () {

  return (
    <section className="techs" id="techs">
      <div className="techs__wrapper">
        <h2 className="techs__header">Технологии</h2>
        <article className="techs__article">
          <h3 className="techs__article-title">7 технологий</h3>
          <p className="techs__article-text">На курсе веб-разработки мы освоили технологии, которые применили
            в дипломном проекте.
          </p>
        </article>
        <ul className="techs__list">
          <li className="techs__list-item">HTML</li>
          <li className="techs__list-item">CSS</li>
          <li className="techs__list-item">JS</li>
          <li className="techs__list-item">React</li>
          <li className="techs__list-item">Git</li>
          <li className="techs__list-item">Express.js</li>
          <li className="techs__list-item">MongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
