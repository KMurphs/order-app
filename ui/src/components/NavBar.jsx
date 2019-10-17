import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return ( 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-0">
          <li class="nav-item active"><Link to="/" className="nav-link">Home</Link></li>
          <li class="nav-item"><Link to="/products" className="nav-link">Products</Link></li>
          <li class="nav-item"><Link to="/clients" className="nav-link">Clients</Link></li>
          <li class="nav-item"><Link to="/suppliers" className="nav-link">Suppliers</Link></li>
        </ul>
      </div>

    </nav>
  );
}
 
export default NavBar;