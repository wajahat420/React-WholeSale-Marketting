import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideDrawer.css';

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li><NavLink to="../Home" onClick={props.drawerToggleClickHandler}>Home</NavLink></li>
        <li><NavLink to="../Item" onClick={props.drawerToggleClickHandler}>Items</NavLink></li>
        <li><NavLink to="../" onClick={props.drawerToggleClickHandler}>About Us</NavLink></li>
        <li><NavLink to="../Login" onClick={props.drawerToggleClickHandler}>Login / Signup ?</NavLink></li>
    </ul>
    </nav>
  );
};

export default sideDrawer;
