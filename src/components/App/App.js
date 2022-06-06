import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className="App">
      {/* <Header loggedIn={loggedIn}/> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/error_404" element={<NotFound />} />
        <Route path="/signin" element={<Login />} />
        {/* <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
