import React from "react";
import { NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'

export const NavBar = (props) => {
    return (
      <Navbar bg="dark" variant="dark">
      <Nav className="vibehunt__nav">
          <NavDropdown title="VibeHunt" id="basic-nav-dropdown">
              <NavDropdown.Item>
                  <Link className="navbar__link" to="/favorites">Favorites</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                  <Link className="navbar__link" to="/shared_venues">Shared Venues</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                  <Link className="navbar__link" onClick={() => {
                      localStorage.removeItem("vibehunt_memberId")}
                  } to="/login">Logout</Link>
              </NavDropdown.Item>
          </ NavDropdown>
      </Nav>
      </Navbar>
    )
}