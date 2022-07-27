import './Profile.css';
import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile (props) {

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
      props.setUserName(currentUser.name);
      props.setUserEmail(currentUser.email);
    return () => {
      props.setUserName(currentUser.name);
      props.setUserEmail(currentUser.email);
    }
  }, [])

  React.useEffect(() => {
    checkFormValidity();
  }, [props.userName, props.userEmail])

  const [errors, setErrors] = React.useState({});

  const checkFormValidity = () => {
    currentUser.name !== props.userName || currentUser.email !== props.userEmail ?
    props.setIsValid(true)
    :
    props.setIsValid(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  }

  const handleUserNameChange = (e) => {
    props.setUserName(e.target.value);
  }

  const handleUserEmailChange = (e) => {
    props.setUserEmail(e.target.value);
  }

  const handleLogOut = () => {
    props.onLogOut();
  }

  return(
    <main className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h2 className="profile__header">{`Привет, ${currentUser.name}!`}</h2>
        <fieldset className="profile__inputs">
          <label className="profile__input-lable profile__input-lable_type_border-bottom">
            Имя
            <input
              className="profile__input"
              value={props.userName}
              onChange={handleUserNameChange}
            >
            </input>
          </label>
          <label className="profile__input-lable">
            E-mail
            <input
              className="profile__input"
              value={props.userEmail}
              onChange={handleUserEmailChange}
            >
            </input>
          </label>
        </fieldset>
        <div className="profile__buttons">
          <button type="submit" disabled={!props.isValid} className="profile__button profile__button_type_submit">
            Редактировать
          </button>
          <button onClick={handleLogOut} className="profile__button profile__button_type_exit">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
