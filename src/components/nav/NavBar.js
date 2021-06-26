import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Badge, Form } from "react-bootstrap";
import { FavoritesContext } from "../favorites/FavoritesProvider"
import "./NavBar.css"
import { ShareContext } from "../shared/ShareProvider";
import VibeHuntBanner from "../images/VibeHunt-tiled.jpg";


export const NavBar = () => {
    const { favorites, getFavorites } = useContext(FavoritesContext)
    const { shares, getShares } = useContext(ShareContext)
    const [myFavorites, setMyFavorites] = useState([])
    const [sharedWithMe, setSharedWithMe] = useState([])
    const [myShares, setMyShares] = useState([])

    useEffect(() => {
        getFavorites()
    }, [])

    useEffect(() => {
        getShares()
    }, [])

    useEffect(() => {
        let my_Favorites = 0
        for (let i = 0; i < favorites.length; i++){
            if (favorites[i].userId === parseInt(localStorage.getItem("vibehunt_memberId"))){
                my_Favorites++
            }
        }
        setMyFavorites(my_Favorites)
    }, [favorites])

    useEffect(() => {
        let shared_withMe = 0
        for (let i = 0; i < shares.length; i++) {
            if (shares[i].recipientId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
                shared_withMe++
            }
        }
        setSharedWithMe(shared_withMe)
    }, [shares])

    useEffect(() => {
        let my_Shares = 0
        for (let i = 0; i < shares.length; i++) {
            if (shares[i].userId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
                my_Shares++
            }
        }
        setMyShares(my_Shares)
    }, [shares])

    return (
    <nav className="nav_bar">
        <div className="vibehunt_title">
            <img src={VibeHuntBanner} width="260rem" height="60rem" />
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
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="dropdown-item" href="/shared_venues">
                            Shared Venues <Badge variant="light">{sharedWithMe}</Badge> <Badge variant="light">{myShares}</Badge>
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