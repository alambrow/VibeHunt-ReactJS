import React, { useContext, useEffect, useState } from "react"
import { VenueInfoContext } from "./VenueInfoProvider"
import { FavoritesContext } from "../favorites/FavoritesProvider"
import "./venues.css"
import { Dropdown } from "react-bootstrap";
import { UserContext } from "../auth/UserProvider";
import { ShareContext } from "../shared/ShareProvider";


export const VenueDetail = ({venue}) => {
    const { getVenueInfo } = useContext(VenueInfoContext)
    const { favorites, addVenueToFavorites, getFavorites, removeFavorite } = useContext(FavoritesContext)
    const [localVenueState, setLocalVenueState] = useState({})
    const { users, getUsers } = useContext(UserContext)
    const { addShare } = useContext(ShareContext)

    useEffect(() => {
        getVenueInfo(venue.venId).then((data) => {
            setLocalVenueState(data.analysis.hour_analysis)
        })
    }, [])
   
    useEffect(() => {
        getFavorites()
    }, [])

    useEffect(() => {
        getUsers()
    }, [])

    const intensity = parseInt(localVenueState.intensity_nr)
    let intensity_display = ""

    if (intensity <= 333) {
        intensity_display += '***'
    } else if (intensity <= 666) {
        intensity_display += "**"
    } else {
        intensity_display += "*"
    }


    const showFavoriteButton = (venueId) => {
        for (let i = 0; i < favorites.length; i++){
            if (favorites[i].venueId === venueId && favorites[i].userId === localStorage.getItem("vibehunt_memberId")){
                return (
                    <button className="unfav_button" onClick={event => {
                        event.preventDefault()
                        handleUnfavoriteVenue(venue.id)
                    }}>Remove Favorite</button>
                )
            }
        }
        return (
            <button className="fav_button" onClick={event => {
                event.preventDefault()
                handleFavoriteVenue(venue.id)
            }}>Favorite</button>
        )
    }

    const handleFavoriteVenue = (venueId) => {
        for (let i = 0; i < favorites.length; i++){
            if (favorites[i].venueId === venueId && favorites[i].userId === localStorage.getItem("vibehunt_memberId")){
                return
            }
        }
        addVenueToFavorites({
            userId: localStorage.getItem("vibehunt_memberId"),
            venueId: venueId
        })
    }

    const handleUnfavoriteVenue = (venueId) => {
        removeFavorite(venueId)
    }

    const displayUserDropdownItems = () => {

        let usersArray = []

        for (let i = 0; i < users.length; i++) {
            if (users[i].id != parseInt(localStorage.getItem("vibehunt_memberId"))) {
                usersArray.push(users[i])
            }
        }

        return (
        <Dropdown id="vibehunt_dropdown"
        onSelect={handleSelect}
        >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
                Share
        </Dropdown.Toggle>
            <Dropdown.Menu id="dropdown-background">
                {usersArray.map(userListItem)}
            </Dropdown.Menu>
        </Dropdown>
        )
    }

    const userListItem = (user) => {
        return (
            <>
            <Dropdown.Item className="dropdown-item" eventKey={user.id}>{user.userName}</Dropdown.Item>
            <Dropdown.Divider />
            </>
            )
        
    }

    const handleSelect = (e) => {
        addShare({
            userId: parseInt(localStorage.getItem("vibehunt_memberId")),
            recipientId: parseInt(e),
            venueId: venue.id
        })
    }

    return (
        <div className="venue_card">
        <div className="venue_name">{venue.name}</div>
        <div className="venue_address">{venue.address}</div>
        <div className="venue_open">{localVenueState.intensity_txt}</div>
        <div className="venue_vibe">Current Vibe: {intensity_display}</div>
        <div className="favorite_button">{showFavoriteButton(venue.id)}</div>
        <div className="share_dropdown">
 
            {displayUserDropdownItems()}
         
        </div>
        </div>
    )
}