import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';

function Register (props) {

  const { userEmail, userName, password } = props.formValues;
  const isUserNameInvalid = Object.values(props.errors.userName).some(Boolean) || userName.length < 1;
  const isUserEmailInvalid = Object.values(props.errors.userEmail).some(Boolean) || userEmail.length < 1;
  const isPasswordInvalid = Object.values(props.errors.password).some(Boolean) || password.length < 1;
  const isSubmitDisabled = isUserNameInvalid || isUserEmailInvalid || isPasswordInvalid || props.isApiRequesting;

  useEffect(() => {
    props.setApiErrorMessage('');
    props.setApiSuccessMessage('');
    return () => {
      props.setApiErrorMessage('');
      props.setApiSuccessMessage('');    }
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();

    console.log('props.isApiRequesting', props.isApiRequesting);
    console.log('isSubmitDisabled', isSubmitDisabled);
  }

  const handleNameChange = (e) => {
    props.onInputChange(e);
  }

  const handleEmailChange = (e) => {
    props.onInputChange(e);
  }

  const handlePasswordChange = (e) => {
    props.onInputChange(e);
  }

  return(
    <main className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <Logo />
        <h2 className="register__header">Добро пожаловать!</h2>
        <fieldset className="register__form-inputs">
        <label className="register__input-lable">Имя</label>
          <input
            type="text"
            name="userName"
            className="register__form-input"
            onChange={handleNameChange}
            value={userName}
            required
          >
          </input>
          {
            props.errors.userName.required &&
              <p className="register__input-error-message">Не указано имя</p>
          }
          {
            props.errors.userName.format &&
              <p className="register__input-error-message">Имя может содержать только латиницу, кириллицу, дефис или пробел</p>
          }
          <label className="register__input-lable">E-mail</label>
          <input
            type="email"
            name="userEmail"
            className="register__form-input"
            onChange={handleEmailChange}
            value={userEmail}
            required
          >
          </input>
          {
            props.errors.userEmail.required &&
              <p className="register__input-error-message">Не указан email</p>
          }
          {
            props.errors.userEmail.isEmail &&
              <p className="register__input-error-message">Значение не является адресом email</p>
          }
          <label className="register__input-lable">Пароль</label>
          <input
            type="password"
            name="password"
            className="register__form-input"
            onChange={handlePasswordChange}
            value={password}
            required
          >
          </input>
          {
            props.errors.password.required &&
              <p className="register__input-error-message">Не указан пароль</p>
          }
        </fieldset>
        <p className="register__error-message">{ props.apiErrorMessage }</p>
        <p className="register__success-message">{ props.apiSuccessMessage }</p>
        <button
          className="register__submit-btn"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Зарегистрироваться
        </button>
        <p className="register__text">Уже зерегистрированы? <Link className="register__link" to="/signin">Войти</Link></p>
      </form>
    </main>
  );
}

export default Register;
