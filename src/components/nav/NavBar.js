import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = (props) => {
    return (
        <ul className="navbar">
        <li className="navbar__item">
            <Link className="navbar__link" to="/">Home</Link>
        </li>
        <li className="navbar__item">
            <Link className="navbar__link" to="/locations">Locations</Link>
        </li>
        <li className="navbar__item">
            <Link className="navbar__link" to="/animals">Animals</Link>
        </li>
        <li className="navbar__item">
                <Link className="navbar__link" onClick={() => {
                    localStorage.removeItem("vibehunt_memberId")
                }
                } to="/">Logout</Link>
            </li>
        </ul>
    )
}