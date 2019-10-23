import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg'; // Downloaded from https://www.iconfinder.com/icons/171508/call_phone_smart_icon
import {ButtonContainer} from './Button';
import styled from 'styled-components';
// import "./NavBar.css"

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/">
          <img src={logo} alt="store" className="navbar-brand" style={{height: '75px', color: 'white'}}/>
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-items ml-5">
            <Link to="/" className="nav-link">Products</Link>
          </li>
        </ul>
        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <span>
              <i className="fas fa-cart-plus"/>
            </span>
            My Cart
          </ButtonContainer>
        </Link>
      </NavWrapper> 
    );
  }
}
 
export const NavWrapper = styled.nav `
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }

`


export default NavBar;