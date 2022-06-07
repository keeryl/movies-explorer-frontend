import './Profile.css';

function Profile () {

  return(
    <main className="profile">
      <form className="profile__form">
        <h2 className="profile__header">Привет, Виталий!</h2>
        <fieldset className="profile__inputs">
          <lable className="profile__input-lable profile__input-lable_type_border-bottom">
            Имя
            <input className="profile__input"></input>
          </lable>
          <lable className="profile__input-lable">
            E-mail
            <input className="profile__input"></input>
          </lable>
        </fieldset>
        <div className="profile__buttons">
          <button className="profile__button profile__button_type_submit">Редактировать</button>
          <button className="profile__button profile__button_type_exit">Выйти из аккаунта</button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
