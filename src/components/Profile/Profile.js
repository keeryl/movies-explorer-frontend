import './Profile.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function Profile (props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [userName, setUserName] = React.useState(currentUser.name);
  const [userEmail, setUserEmail] = React.useState(currentUser.email);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    mainApi.updateUserProfile(token, userEmail, userName)
      .then(res => {
        if(res) {
          console.log(res);
          setUserName(res.user.name);
          setUserEmail(res.user.email);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  }

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    props.onLogOut();
    navigate('/', { replace: true });
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
          <button type="submit" className="profile__button profile__button_type_submit">
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
