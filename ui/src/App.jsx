import React from 'react';
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import SuppliersManager from './components/suppliers/SuppliersManager';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Switch>
        <Route exact path='/' component={SuppliersManager}></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
