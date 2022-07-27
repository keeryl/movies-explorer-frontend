import './App.css';
import React from 'react';
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

function App() {

  const location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getCurrentUser(token)
        .then(res => {
          if (res) {
            // console.log(res);
            setCurrentUser(res.user);
            setUserName(res.user.name);
            setUserEmail(res.user.email);
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
    setIsValid(false);
    mainApi.signup(userEmail, password, userName)
    .then(res => {
      if(res) {
        console.log(res.user.email);
        setUserEmail(res.user.email);
        navigate('/signin', { replace: true });
        setIsValid(true);
        setPassword('');
        setUserName('');
      }
    })
    .catch(err => {
      console.log(err);
      setIsValid(true);
    });
  }

  const handleLoginSubmit = () => {
    setIsValid(false);
    mainApi.signin(password, userEmail)
    .then(res => {
      if(res) {
        console.log(res);
        localStorage.setItem('token', res.token);
        navigate('/movies', { replace: true });
        tokenCheck();
        setPassword('');
        setIsValid(true);
      }
    })
    .catch(err => {
      console.log(err);
      setIsValid(true);
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/', { replace: true });
  }

  const handleUpdateUserSubmit = () => {
    const token = localStorage.getItem('token');
    setIsValid(false);
    mainApi.updateUserProfile(token, userEmail, userName)
      .then(res => {
        if(res) {
          setCurrentUser(res.user);
          setIsValid(true);
        }
      })
      .catch(err => {
        console.log(err);
        setIsValid(true);
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
                userEmail={userEmail}
                password={password}
                setUserEmail={setUserEmail}
                setPassword={setPassword}
                isValid={isValid}
                setIsValid={setIsValid}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onSubmit={handleRegistrationSubmit}
                userName={userName}
                userEmail={userEmail}
                password={password}
                setUserName={setUserName}
                setUserEmail={setUserEmail}
                setPassword={setPassword}
                isValid={isValid}
                setIsValid={setIsValid}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                onSubmit={handleUpdateUserSubmit}
                userName={userName}
                userEmail={userEmail}
                setUserName={setUserName}
                setUserEmail={setUserEmail}
                isValid={isValid}
                setIsValid={setIsValid}
                onLogOut={handleLogout}
                component={Profile}/>
            }
          />
          <Route
            path="/movies"
            element={<ProtectedRoute loggedIn={loggedIn} component={Movies}/>}
          />
          <Route
            path="/saved-movies"
            element={<ProtectedRoute loggedIn={loggedIn} component={SavedMovies}/>}
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
