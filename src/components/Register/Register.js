import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Register.css';
import Logo from '../Logo/Logo';
import mainApi from '../../utils/MainApi';

function Register () {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    mainApi.signup(email, password, name)
    .then(res => {
      if(res) {
        console.log(res)
        navigate('/signin', { replace: true });
        setPassword('');
        setEmail('');
        setName('');
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
            value={name}
            required
          >
          </input>
          <label className="register__input-lable">E-mail</label>
          <input
            type="email"
            className="register__form-input"
            onChange={handleEmailChange}
            value={email}
            required
          >
          </input>
          <label className="register__input-lable">Пароль</label>
          <input
            type="password"
            className="register__form-input"
            onChange={handlePasswordChange}
            value={password}
            required
          >
          </input>
        </fieldset>
        <button
          className="register__submit-btn"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <p className="register__text">Уже зерегистрированы? <Link className="register__link" to="/signin">Войти</Link></p>
      </form>
    </main>
  );
}

export default Register;
