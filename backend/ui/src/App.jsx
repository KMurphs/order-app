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


  if(timerID === null){ 
    setTimerID(
      setInterval(()=>{

        pingServer()
        .then((didServerReplyPong)=>{
          reduxStore.dispatch(reduxLoadIsOnline(didServerReplyPong))
          setIsOnline(didServerReplyPong)
        })

      }, 5000)
    ); 
  }

  return (
    <React.Fragment>
      <NavBar isOnline={isOnline}></NavBar>
      <Switch>
        <Route exact path='/' render={(props) => <SuppliersManager {...props} isOnline={isOnline} />} /*component={SuppliersManager}*/></Route>
        <Route exact path='/suppliers' render={(props) => <SuppliersManager {...props} isOnline={isOnline} />} /*component={SuppliersManager}*/ ></Route>
        <Route exact path='/clients'   render={(props) => <ClientsManager {...props} isOnline={isOnline} />} /*component={ClientsManager}*/></Route>
        <Route exact path='/products'  render={(props) => <ProductsManager {...props} isOnline={isOnline} />} /*component={ProductsManager}*/></Route>
        <Route component={Default}></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;










const pingServer = ()=>{

  return new Promise((resolve) => {
    (new window.XmlHttpRequest()).getData(`${process.env.REACT_APP_BASE_URL}/ping`, {})
    .then((res) => resolve(res.msg === 'pong'))
    .catch((err) => resolve(false))
  })

}