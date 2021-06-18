import React from "react";
import { Dropdown, Badge } from "react-bootstrap";
import "./NavBar.css"

export const NavBar = () => {
    return (
    <nav className="nav_bar">
        <div className="vibehunt_title">
            VibeHunt
        </div>
        <div className="dropdown_holder">
            <Dropdown id="vibehunt_dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Menu
                </Dropdown.Toggle>
                    <Dropdown.Menu id="dropdown-background">
                        <Dropdown.Item className="dropdown-item" href="/">Home</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="dropdown-item" href="/favorites">
                            Favorite Venues <Badge variant="light">9</Badge>
                            <span className="sr-only">unread messages</span>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="dropdown-item" href="/shared_venues">
                            Shared Venues <Badge variant="light">9</Badge>
                            <span className="sr-only">unread messages</span>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="dropdown-item" href="/" onClick={() => {
                            localStorage.removeItem("vibehunt_memberId")}
                        } to="/login">Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
            </Dropdown>
        </div>
    </nav>
    )
}