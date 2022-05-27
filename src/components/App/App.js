import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="App">
      <Header loggedIn={loggedIn}/>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
