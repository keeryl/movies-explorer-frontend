import './App.css';
import React from 'react';
import { Route, withRouter, Routes, useHistory } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/">
          <Header loggedIn={loggedIn}/>
          <Main />
          <Footer />
        </Route>
        <Route exact path="/movies">
          <Header loggedIn={loggedIn}/>
          {/* <Movies /> */}
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header loggedIn={loggedIn}/>
          {/* <SavedMovies /> */}
          <Footer />
        </Route>
        <Route exact path="/profile">
          <Header loggedIn={loggedIn}/>
          {/* <Profile /> */}
        </Route>
        <Route exact path="/signin">
          <Header loggedIn={loggedIn}/>
          <Footer />
        </Route>
        <Route exact path="/signup">
          <Header loggedIn={loggedIn}/>
          <Footer />
        </Route>
        <Route exact path="/error_404">
          {/* <Error_404 /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
