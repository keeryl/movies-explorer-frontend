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
            console.log(res);
            setCurrentUser(res.user);
            console.log(currentUser);
            setLoggedIn(true);
            navigate('/movies', { replace: true });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  const handleOnSignin = () => {
    // tockenCheck();
    setLoggedIn(true);
  }

  function handleLogout () {
    setLoggedIn(false);
    setCurrentUser({});
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
            element={<Login onSignin={handleOnSignin}/>}
          />
          <Route
            path="/signup"
            element={<Register />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute loggedIn={loggedIn} onLogOut={handleLogout} component={Profile}/>}
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
