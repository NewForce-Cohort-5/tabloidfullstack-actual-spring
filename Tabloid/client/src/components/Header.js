import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import {Category} from './categories/Category';

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
               { /* When isLoggedIn === true, we will render the Home link */ }
            {isLoggedIn &&
              <>
            <NavItem>
              <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
            {/*checking if the current logged in user has usertype id of 1 (Admin) */}
            {currentUser.userTypeId === 1 ?  <NavItem>
                  <NavLink tag={RRNavLink} to="/users">User Profiles</NavLink>
                </NavItem>  : "" } 
                <NavItem> 
                <NavLink tag={RRNavLink} to="/Category">Category Management</NavLink>
                </NavItem>
                <NavItem>
                <NavLink tag={RRNavLink} to="/posts">Posts</NavLink>
                </NavItem>
                <NavItem> 
                <NavLink tag={RRNavLink} to="/tags">Tag Management</NavLink>
                </NavItem>
                <NavItem> 
                {/* <NavLink tag={RRNavLink} to="/myposts">My Posts</NavLink> */}
                </NavItem> 
            </>
}
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
