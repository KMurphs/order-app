import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';

import {reduxStore, reduxLoadIsOnline} from './datastore';

import NavBar from './components/NavBar';
import Default from './components/Default';
import SuppliersManager from './components/suppliers/SuppliersManager';
import ClientsManager from './components/clients/ClientsManager';
import ProductsManager from './components/products/ProductsManager';





// import logo from './logo.svg';
import './App.css';

function App() {
  const [timerID, setTimerID] = useState(null)
  const [isOnline, setIsOnline] = useState(true)

  if(timerID === null){ setTimerID(setInterval(()=>pingServer(setIsOnline), 5000)); }

  return (
    <React.Fragment>
      <NavBar isOnline={isOnline}></NavBar>
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


















const pingServer = (cb)=>{
  (new window.XmlHttpRequest()).getData('http://localhost:5000/ping', {})
  .then((res) => {
    reduxStore.dispatch(reduxLoadIsOnline(res.msg === 'pong'))
    cb(res.msg === 'pong')
  })
  .catch((err) => {
    reduxStore.dispatch(reduxLoadIsOnline(false))
    cb(false)
  })
}