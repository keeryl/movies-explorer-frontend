import './App.css';
import React from 'react';
// import { Route, withRouter, Switch, useHistory } from 'react-router-dom';
import Header from '../Header/Header.js';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="App">
      <Header loggedIn={loggedIn}/>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
