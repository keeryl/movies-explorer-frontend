import './App.css';
import React from 'react';
// import { Route, withRouter, Switch, useHistory } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="App">
      <Header loggedIn={loggedIn}/>
      <Main />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
