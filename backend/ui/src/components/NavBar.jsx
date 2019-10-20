import React, { useState } from 'react';
import {Link} from 'react-router-dom';


const NavBar = (props) => {
 
  const navBarItems = ['Home', 'Products', 'Clients', 'Suppliers']
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  const buildNavLink = (linkText, linkIndex) => {
    return (
      <li key={linkIndex} 
          className={`nav-item ${activeLinkIndex === linkIndex ? 'active' : ''}`} 
          onClick={() => setActiveLinkIndex(linkIndex)}>

            <Link to={`/${linkIndex === 0 ? '' : linkText.toLowerCase()}`} 
                  className="nav-link">
              {linkText}
            </Link>

      </li>
    )
  }

  return ( 
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Celiah Inc.</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleItems" aria-controls="navbarToggleItems" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarToggleItems">
          <ul className="navbar-nav align-items-end">
            {navBarItems.map((item, index) => buildNavLink(item, index))}
          </ul>
        </div>
      </nav>

      <div className={`alert alert-danger offline-msg ${props.isOnline ? '': 'offline-msg--visible'}`} role="alert">
        Device is Offline. Using cached Data
      </div>
    </React.Fragment>


  );
}



export default NavBar;


