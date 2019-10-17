import React from 'react';
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Default from './components/Default';
import SuppliersManager from './components/suppliers/SuppliersManager';
import ClientsManager from './components/clients/ClientsManager';
import ProductsManager from './components/products/ProductsManager';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Switch>
        <Route exact path='/' component={SuppliersManager}></Route>
        <Route exact path='/suppliers' component={SuppliersManager}></Route>
        <Route exact path='/clients' component={ClientsManager}></Route>
        <Route exact path='/products' component={ProductsManager}></Route>
        <Route component={Default}></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
