import './Login.css';
import Logo from '../Logo/Logo';

import React from 'react';
import { Link } from 'react-router-dom';

function Login () {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
            value={email}
          >
          </input>
          <label className="login__input-lable">Пароль</label>
          <input
            type="password"
            className="login__form-input"
            onChange={handlePasswordChange}
            value={password}
          >
          </input>
        </fieldset>
        <button
          className="login__submit-btn"
          type="submit"
        >
          Войти
        </button>
        <p className="login__text">Еще не зерегистрированы? <Link className="login__link" to="/signup">Регистрация</Link></p>
      </form>
    </main>
  );
}

export default Login;
