import React from 'react';
import { Link } from 'react-router-dom';
import { validate } from 'react-email-validator';

import './Login.css';
import Logo from '../Logo/Logo';

function Login (props) {

  React.useEffect(() => {
    console.log(props.userEmail);
    props.setIsValid(false);
    props.setUserEmail(props.userEmail);
    return () => {
      props.setUserEmail('');
    }
  }, []);

  React.useEffect(() => {
    checkFormValidity();
  }, [props.password, props.userEmail]);

  const checkFormValidity = () => {
    const isEmailValid = validate(props.userEmail) && props.userEmail.length > 0;
    const isPasswordValid = props.password.length > 5;
    isEmailValid && isPasswordValid ?
    props.setIsValid(true)
    :
    props.setIsValid(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  }

  const handleEmailChange = (e) => {
    props.setUserEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    props.setPassword(e.target.value);
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
            value={props.userEmail}
          >
          </input>
          <label className="login__input-lable">Пароль</label>
          <input
            type="password"
            className="login__form-input"
            onChange={handlePasswordChange}
            value={props.password}
          >
          </input>
        </fieldset>
        <button
          className="login__submit-btn"
          type="submit"
          disabled={!props.isValid}
        >
          Войти
        </button>
        <p className="login__text">Еще не зерегистрированы? <Link className="login__link" to="/signup">Регистрация</Link></p>
      </form>
    </main>
  );
}

export default Login;
