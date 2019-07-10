import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import {NavLink} from 'react-router-dom';

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo"><NavLink to="/">E - Dealers</NavLink></div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
        <ul>
          <li><NavLink to="/Home">Home</NavLink></li>
          <li><NavLink to="/Item">Items</NavLink></li>
          <li><NavLink to="/">About Us</NavLink></li>
          <li><NavLink to="/Login">Login / Signup ?</NavLink></li>
          <li><NavLink to="/Upload">Upload Item</NavLink></li>

        </ul>
      </div>
    </nav>
  </header>
);

export default toolbar;
