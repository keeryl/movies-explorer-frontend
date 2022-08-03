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

  const [formValues, setFormValues, errors, handleInputChange, resetForm] = useFormWithValidation();
  const [loggedIn, setLoggedIn] = useState(() => {
    if (localStorage.getItem('token') !== null) {
      return mainApi.getCurrentUser(localStorage.getItem('token'))
        .then(res => {
          if (res) {
            return true;
          }
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    } else {
      return false;
    }
  });
  const [currentUser, setCurrentUser] = useState({});
  const [apiSuccessMessage, setApiSuccessMessage] = useState('');
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [isSearchRequestValid, setIsSearchRequestValid] = useState(false);
  const [isApiRequesting, setIsApiRequesting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, userEmail, password } = formValues;

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      tokenCheck();
    }
  }, []);

  useEffect(() => {
    setApiErrorMessage('');
  },[formValues]);

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getCurrentUser(token)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res.user);
            setFormValues((prevState) => ({
              ...prevState,
              userName: res.user.name,
              userEmail: res.user.email
            }));
          }
        })
        .catch(err => {
          setLoggedIn(false);
          console.log(err);
        });
    }
  }

  const handleRegistrationSubmit = () => {
    setIsApiRequesting(true);
    setApiErrorMessage('');
    setApiSuccessMessage('');
    mainApi.signup(userEmail, password, userName)
    .then(res => {
      if(res) {
        setApiSuccessMessage('Регистрация прошла успешно.');
        setTimeout(() => handleLoginSubmit(), 2000);
      }
    })
    .catch(err => {
      setIsApiRequesting(false);
      console.log(err);
      if (err = 'Ошибка: 409') {
        setApiErrorMessage('Пользователь с таким email уже существует.');
      } else {
        setApiErrorMessage('При регистрации пользователя произошла ошибка.');
      }
    });
  }

  const handleLoginSubmit = () => {
    setIsApiRequesting(true);
    setApiErrorMessage('');
    setApiSuccessMessage('');
    mainApi.signin(password, userEmail)
    .then(res => {
      if(res) {
        localStorage.setItem('token', res.token);
        return res.token
      }
    })
    .then((token) => {
      mainApi.getCurrentUser(token)
      .then(res => {
        if (res) {
          setApiSuccessMessage('Авторизация прошла успешно.');
          setCurrentUser(res.user);
          setFormValues((prevState) => ({
            ...prevState,
            userName: res.user.name,
            userEmail: res.user.email
          }));
          setTimeout(() => {
            setLoggedIn(true);
            navigate('/movies', { replace: true });
          }, 2000);
        }
      })
      .catch(err => {
        console.log(err);
        return err;
      });
    })
    .catch(err => {
      console.log(err);
      setIsApiRequesting(false);
      if (err = 'Ошибка: 401') {
        setApiErrorMessage('Вы ввели неправильный логин или пароль.');
      } else {
        setApiErrorMessage('Произошла ошибка на сервере');
      }
      // При авторизации произошла ошибка. Токен не передан или передан не в том формате.
      // При авторизации произошла ошибка. Переданный токен некорректен.
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    resetForm();
    navigate('/', { replace: true });
  }

  const handleUpdateUserSubmit = () => {
    setIsApiRequesting(true);
    setApiErrorMessage('');
    setApiSuccessMessage('');
    const token = localStorage.getItem('token');
    mainApi.updateUserProfile(token, userEmail, userName)
      .then(res => {
        setIsApiRequesting(true);
        return res;
      })
      .then(res => {
        if(res) {
          setApiSuccessMessage('Данные аккаунта обновлены.');
          setCurrentUser(res.user);
          setFormValues((prevState) => ({
            ...prevState,
            userName: res.user.name,
            userEmail: res.user.email
          }));
        }
      })
      .catch(err => {
        console.log(err);
        setFormValues((prevState) => ({
          ...prevState,
          userName: currentUser.name,
          userEmail: currentUser.email
        }));
        if (err = 'Ошибка: 409') {
          setApiErrorMessage('Пользователь с таким email уже существует.');
        } else {
          setApiErrorMessage('При обновлении профиля произошла ошибка.');
        }
      })
      .finally(() => {
        setIsApiRequesting(false);
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        {
          (location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ||
          location.pathname === '/profile' ||
          location.pathname === '/') &&
          <Header loggedIn={loggedIn}/>
        }
        <Routes>
          <Route
            path="/"
            element={<Main/>}
          />
          <Route
            path="/signin"
            element={
              <Login
                onSubmit={handleLoginSubmit}
                formValues={formValues}
                onInputChange={handleInputChange}
                errors={errors}
                apiSuccessMessage={apiSuccessMessage}
                setApiSuccessMessage={setApiSuccessMessage}
                apiErrorMessage={apiErrorMessage}
                setApiErrorMessage={setApiErrorMessage}
                resetForm={resetForm}
                isApiRequesting={isApiRequesting}
                setIsApiRequesting={setIsApiRequesting}
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
                apiSuccessMessage={apiSuccessMessage}
                setApiSuccessMessage={setApiSuccessMessage}
                apiErrorMessage={apiErrorMessage}
                setApiErrorMessage={setApiErrorMessage}
                resetForm={resetForm}
                isApiRequesting={isApiRequesting}
                setIsApiRequesting={setIsApiRequesting}
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
                apiSuccessMessage={apiSuccessMessage}
                setApiSuccessMessage={setApiSuccessMessage}
                apiErrorMessage={apiErrorMessage}
                setApiErrorMessage={setApiErrorMessage}
                isApiRequesting={isApiRequesting}
                setIsApiRequesting={setIsApiRequesting}
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
          (location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ||
          location.pathname === '/') &&
          <Footer />
        }
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
