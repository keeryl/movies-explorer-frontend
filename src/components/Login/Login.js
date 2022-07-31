import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';

function Login (props) {

  const { userEmail, password } = props.formValues;
  const isUserEmailInvalid = Object.values(props.errors.userEmail).some(Boolean);
  const isPasswordInvalid = Object.values(props.errors.password).some(Boolean);
  const isSubmitDisabled = isUserEmailInvalid || isPasswordInvalid

  useEffect(() => {
    props.setResErrorMessage('');
    return () => {
      props.resetForm();
    }
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  }

  const handleEmailChange = (e) => {
    props.onInputChange(e);
  }

  const handlePasswordChange = (e) => {
    props.onInputChange(e);
  }

  return (
    <main className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <Logo />
        <h2 className="login__header">Рады видеть!</h2>
        <fieldset className="login__form-inputs">
          <label className="login__input-lable">E-mail</label>
          <input
            type="email"
            className="login__form-input"
            onChange={handleEmailChange}
            value={userEmail}
            name="userEmail"
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
          <label className="login__input-lable">Пароль</label>
          <input
            type="password"
            className="login__form-input"
            onChange={handlePasswordChange}
            value={password}
            name="password"
          >
          </input>
          {
            props.errors.password.required &&
              <p className="register__input-error-message">Не указан пароль</p>
          }
        </fieldset>
        <p className="login__error-message">{ props.resErrorMessage }</p>
        <button
          className="login__submit-btn"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Войти
        </button>
        <p className="login__text">Еще не зерегистрированы? <Link className="login__link" to="/signup">Регистрация</Link></p>
      </form>
    </main>
  );
}

export default Login;
