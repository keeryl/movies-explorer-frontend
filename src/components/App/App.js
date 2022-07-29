import './App.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Route, Routes } from 'react-router-dom';

import Header from '../Header/Header.js';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function App() {

  const [
    formValues,
    setFormValues,
    errors,
    handleInputChange,
    resetForm ] = useFormWithValidation();

  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [resErrorMessage, setResErrorMessage] = useState('');
  const [isSearchRequestValid, setIsSearchRequestValid] = useState(true);
  const { userName, userEmail, password } = formValues;
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getCurrentUser(token)
        .then(res => {
          if (res) {
            console.log(res);
            setCurrentUser(res.user);
            setFormValues((prevState) => ({
              ...prevState,
              userName: res.user.name,
              userEmail: res.user.email
            }));
            setLoggedIn(true);
            navigate('/movies', { replace: true });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  const handleRegistrationSubmit = () => {
    mainApi.signup(userEmail, password, userName)
    .then(res => {
      if(res) {
        setFormValues((prevState) => ({
          ...prevState,
          userName: '',
          userEmail: res.user.email,
          password: ''
        }));
        navigate('/signin', { replace: true });
      }
    })
    .catch(err => {
      console.log(err);
        // Пользователь с таким email уже существует.
        // При регистрации пользователя произошла ошибка.
    });
  }

  const handleLoginSubmit = () => {
    setResErrorMessage('');
    mainApi.signin(password, userEmail)
    .then(res => {
      if(res) {
        console.log(res);
        localStorage.setItem('token', res.token);
        navigate('/movies', { replace: true });
        tokenCheck();
      }
    })
    .catch(err => {
      console.log(err);
      if (err = 'Ошибка: 401') {
        setResErrorMessage('Вы ввели неправильный логин или пароль.');
      } else {
        setResErrorMessage('Произошла ошибка на сервере');
      }
      // При авторизации произошла ошибка. Токен не передан или передан не в том формате.
      // При авторизации произошла ошибка. Переданный токен некорректен.
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    setFormValues({
      userName: '',
      userEmail: '',
      password: ''
    });

    navigate('/', { replace: true });
  }

  const handleUpdateUserSubmit = () => {
    setResErrorMessage('');
    const token = localStorage.getItem('token');
    mainApi.updateUserProfile(token, userEmail, userName)
      .then(res => {
        if(res) {
          setCurrentUser(res.user);
          setFormValues((prevState) => ({
            ...prevState,
            userName: res.user.name,
            userEmail: res.user.email
          }));
        }
      })
      .catch(err => {
        console.log(err.statusCode);
        console.log(err.message);
        console.log(err);
        if (err = 'Ошибка: 409') {
          setResErrorMessage('Пользователь с таким email уже существует.');
        } else {
          setResErrorMessage('При обновлении профиля произошла ошибка.');
        }
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        {
          location.pathname !== '/signin' &&
          location.pathname !== '/signup' &&
          <Header loggedIn={loggedIn}/>
        }
        <Routes>
          <Route
            index
            path="/"
            element={<Main />}
          />
          <Route
            path="/signin"
            element={
              <Login
                onSubmit={handleLoginSubmit}
                formValues={formValues}
                onInputChange={handleInputChange}
                errors={errors}
                resErrorMessage={resErrorMessage}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onSubmit={handleRegistrationSubmit}
                formValues={formValues}
                onInputChange={handleInputChange}
                errors={errors}
                resErrorMessage={resErrorMessage}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                onSubmit={handleUpdateUserSubmit}
                formValues={formValues}
                onInputChange={handleInputChange}
                errors={errors}
                resErrorMessage={resErrorMessage}
                onLogOut={handleLogout}
                component={Profile}/>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                isSearchRequestValid={isSearchRequestValid}
                setIsSearchRequestValid={setIsSearchRequestValid}
                component={Movies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                isSearchRequestValid={isSearchRequestValid}
                setIsSearchRequestValid={setIsSearchRequestValid}
                component={SavedMovies}
              />
            }
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
        {
          location.pathname !== '/profile' &&
          location.pathname !== '/signin' &&
          location.pathname !== '/signup' &&
          <Footer />
        }
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
