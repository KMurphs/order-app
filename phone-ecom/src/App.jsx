import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Cart from './components/cart';
import NavBar from './components/NavBar.jsx';
import Details from './components/Details.jsx';
import ProductList from './components/ProductList.jsx';
import Default from './components/Default.jsx';
import Modal from './components/Modal.jsx';



function App() {
    return (
        <React.Fragment> 
            <NavBar>

            </NavBar>
            <Switch>
                <Route exact path="/" component={ProductList}/>
                <Route path="/details" component={Details}/>
                <Route path="/cart" component={Cart}/>
                <Route component={Default}/>
            </Switch>
            <Modal />
        </React.Fragment>
    );
}

export default App;