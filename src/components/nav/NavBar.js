import React from "react";
import { NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'

export const NavBar = (props) => {
    return (
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}

    // <Navbar bg="dark" variant="dark">
    // <Nav className="vibehunt__nav">
    //     <NavDropdown title="VibeHunt" id="basic-nav-dropdown">
    //         <NavDropdown.Item>
    //             <Link className="navbar__link" to="/favorites">Favorites</Link>
    //         </NavDropdown.Item>
    //         <NavDropdown.Item>
    //             <Link className="navbar__link" to="/shared_venues">Shared Venues</Link>
    //         </NavDropdown.Item>
    //         <NavDropdown.Item>
    //             <Link className="navbar__link" onClick={() => {
    //                 localStorage.removeItem("vibehunt_memberId")}
    //             } to="/login">Logout</Link>
    //         </NavDropdown.Item>
    //     </ NavDropdown>
    // </Nav>
    // </Navbar>