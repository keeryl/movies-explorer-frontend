import './Profile.css';
import { useEffect, useContext} from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile (props) {

  const currentUser = useContext(CurrentUserContext);
  const { userEmail, userName  } = props.formValues;
  const isUserNameInvalid = Object.values(props.errors.userName).some(Boolean);
  const isUserEmailInvalid = Object.values(props.errors.userEmail).some(Boolean);
  const isUserDataNotDifferent = currentUser.name === userName && currentUser.email === userEmail;
  const isSubmitDisabled = isUserNameInvalid || isUserEmailInvalid || isUserDataNotDifferent || props.isApiRequesting;

  useEffect(() => {
    props.setIsApiRequesting(false);
    props.setApiErrorMessage('');
    props.setApiSuccessMessage('');
    return () => {
      props.setApiErrorMessage('');
      props.setApiSuccessMessage('');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  }

  const handleUserNameChange = (e) => {
    props.setApiErrorMessage('');
    props.setApiSuccessMessage('');
    props.onInputChange(e);
  }

  const handleUserEmailChange = (e) => {
    props.setApiErrorMessage('');
    props.setApiSuccessMessage('');
    props.onInputChange(e);
  }

  const handleLogOut = () => {
    props.setApiErrorMessage('');
    props.setApiSuccessMessage('');
    props.onLogOut();
  }

  return(
    <main className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h2 className="profile__header">{`Привет, ${currentUser.name}!`}</h2>
        <fieldset className="profile__inputs">
          {
            props.errors.userName.required &&
              <p className="register__input-error-message">Не указано имя</p>
          }
          {
            props.errors.userName.format &&
              <p className="register__input-error-message">Имя может содержать только латиницу, кириллицу, дефис или пробел</p>
          }
          <label className="profile__input-lable profile__input-lable_type_border-bottom">
            Имя
            <input
              className="profile__input"
              name="userName"
              value={userName}
              onChange={handleUserNameChange}
            >
            </input>
          </label>
          <label className="profile__input-lable">
            E-mail
            <input
              className="profile__input"
              name="userEmail"
              value={userEmail}
              onChange={handleUserEmailChange}
            >
            </input>
          </label>
          {
            props.errors.userEmail.required &&
              <p className="profile__input-error-message">Не указан email</p>
          }
          {
            props.errors.userEmail.isEmail &&
              <p className="profile__input-error-message">Значение не является адресом email</p>
          }
        </fieldset>
        <div className="profile__buttons">
          <p className="profile__error-message">{ props.apiErrorMessage }</p>
          <p className="profile__success-message">{ props.apiSuccessMessage }</p>
          <button type="submit" disabled={isSubmitDisabled} className="profile__button profile__button_type_submit">
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
