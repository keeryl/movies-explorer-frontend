import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';
import Logo from '../Logo/Logo';
import mainApi from '../../utils/MainApi';



function Login (props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    mainApi.signin(password, email)
    .then(res => {
      if(res) {
        console.log(res);
        localStorage.setItem('token', res.token);
        props.onSignin();
        navigate('/movies', { replace: true });
        setEmail('');
        setPassword('');
      }
    })
    .catch(err => console.log(err));
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
