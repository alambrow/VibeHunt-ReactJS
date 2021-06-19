import React, { useContext, useEffect } from "react";
import { Dropdown, Badge } from "react-bootstrap";
import { FavoritesContext } from "../favorites/FavoritesProvider"
import "./NavBar.css"
import { ShareContext } from "../shared/ShareProvider";

export const NavBar = () => {
    const { favorites, getFavorites } = useContext(FavoritesContext)
    const { shares, getShares } = useContext(ShareContext)

    useEffect(() => {
        getFavorites()
    }, [])

    useEffect(() => {
        getShares()
    }, [])

    let myFavorites = 0

    for (let i = 0; i < favorites.length; i++){
        if (favorites[i].userId === parseInt(localStorage.getItem("vibehunt_memberId"))){
            myFavorites++
        }
    }

    let sharedWithMe = 0

    for (let i = 0; i < shares.length; i++) {
        if (shares[i].recipientId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
            sharedWithMe++
        }
    }

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
                            Favorite Venues <Badge variant="light">{myFavorites}</Badge>
                            <span className="sr-only">unread messages</span>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="dropdown-item" href="/shared_venues">
                            Shared Venues <Badge variant="light">{sharedWithMe}</Badge>
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