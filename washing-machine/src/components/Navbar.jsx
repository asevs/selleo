import React from 'react';
import './Navbar.scss';
const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <a href="/">Reservations</a>
        <a href="/users">Users</a>
        <a href="/">Reservations</a>
        <div id="indicator" />
      </nav>
    </div>
  );
};
export default Navbar;
