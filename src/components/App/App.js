import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className="App">
      {/* <Header loggedIn={loggedIn}/> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/error_404" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
