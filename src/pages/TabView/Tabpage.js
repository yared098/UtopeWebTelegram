import React from 'react';
import { NavLink } from 'react-router-dom';
import "../TabView/TabView.css";
function TabView({ children }) {
  return (
    <div>
      <nav>
        <NavLink to="/nearby" activeClassName="active">Nearby..</NavLink>
        <NavLink to="/orders" activeClassName="active">Orders</NavLink>
        <NavLink to="/home" activeClassName="active">Home</NavLink>
        <NavLink to="/about" activeClassName="active">About</NavLink>
      </nav>
      <div>
        {children}
      </div>
    </div>
  );
}

export default TabView;