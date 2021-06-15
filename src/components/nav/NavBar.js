import React from "react";
import { Link } from "react-router-dom";

export const NavBar = (props) => {
    return (
        <nav className="nav_bar">
            <div className="nav_item">
                <Link className="nav__link" to="/">Home</Link>
            </div>
            <div className="nav_item">
                <Link className="nav__link" to="/my_profile">My Profile</Link>
            </div>
            <div className="nav_item">
                <Link className="navbar__link" to="/favorites">Favorites</Link>
            </div>
            <div className="nav_item">
                <Link className="navbar__link" to="/shared_venues">Shared</Link>
            </div>
            <div className="nav_item">
                <Link className="navbar__link" onClick={() => {
                      localStorage.removeItem("vibehunt_memberId")}
                    } to="/login">Logout</Link>
            </div>
        </nav>
    )
}