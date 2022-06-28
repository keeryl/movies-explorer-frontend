import './App.css';
import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {

  const location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className="App">
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
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {
        location.pathname !== '/profile' &&
        location.pathname !== '/signin' &&
        location.pathname !== '/signup' &&
        <Footer />
      }
    </div>
  );
}

export default App;
