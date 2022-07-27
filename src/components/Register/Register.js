import React from 'react';
import { Link } from 'react-router-dom';
import { validate } from 'react-email-validator';


import './Register.css';
import Logo from '../Logo/Logo';

function Register (props) {

  React.useEffect(() => {
    props.setIsValid(false);
    return () => {
      props.setUserName('');
      props.setUserEmail('');
      props.setPassword('');
    }
  }, []);

  React.useEffect(() => {
    checkFormValidity();
  }, [props.password, props.userEmail, props.userName]);

  const checkFormValidity = () => {
    const isEmailValid = validate(props.userEmail) && props.userEmail.length > 0;
    const isUserNameValid = props.userName.length > 0;
    const isPasswordValid = props.password.length > 5;
    isEmailValid && isUserNameValid && isPasswordValid ?
    props.setIsValid(true)
    :
    props.setIsValid(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  }

  const handleNameChange = (e) => {
    props.setUserName(e.target.value);
  }

  const handleEmailChange = (e) => {
    props.setUserEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    props.setPassword(e.target.value);
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
            className="register__form-input"
            onChange={handleNameChange}
            value={props.userName}
            required
          >
          </input>
          <label className="register__input-lable">E-mail</label>
          <input
            type="email"
            className="register__form-input"
            onChange={handleEmailChange}
            value={props.userEmail}
            required
          >
          </input>
          <label className="register__input-lable">Пароль</label>
          <input
            type="password"
            className="register__form-input"
            onChange={handlePasswordChange}
            value={props.password}
            required
          >
          </input>
        </fieldset>
        <button
          className="register__submit-btn"
          type="submit"
          disabled={!props.isValid}
        >
          Зарегистрироваться
        </button>
        <p className="register__text">Уже зерегистрированы? <Link className="register__link" to="/signin">Войти</Link></p>
      </form>
    </main>
  );
}

export default Register;
