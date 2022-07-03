import './Profile.css';
import React from 'react';

function Profile (props) {

  const [userName, setUserName] = React.useState('Виталий');
  const [userEmail, setUserEmail] = React.useState('vitaliy@yandex.ru');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  }

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  }

  return(
    <main className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h2 className="profile__header">{`Привет, ${userName}!`}</h2>
        <fieldset className="profile__inputs">
          <label className="profile__input-lable profile__input-lable_type_border-bottom">
            Имя
            <input
              className="profile__input"
              value={userName}
              onChange={handleUserNameChange}
            >
            </input>
          </label>
          <label className="profile__input-lable">
            E-mail
            <input
              className="profile__input"
              value={userEmail}
              onChange={handleUserEmailChange}
            >
            </input>
          </label>
        </fieldset>
        <div className="profile__buttons">
          <button type="submit" className="profile__button profile__button_type_submit">Редактировать</button>
          <button className="profile__button profile__button_type_exit">Выйти из аккаунта</button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
