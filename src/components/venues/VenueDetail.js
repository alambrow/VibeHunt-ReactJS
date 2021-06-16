import React, { useContext, useEffect, useState } from "react"
import { VenueInfoContext } from "./VenueInfoProvider"
import { FavoritesContext } from "../favorites/FavoritesProvider"
import "./venues.css"


export const VenueDetail = ({venue}) => {
    const { getVenueInfo } = useContext(VenueInfoContext)
    const { addVenueToFavorites, favorites } = useContext(FavoritesContext)
    const [localVenueState, setLocalVenueState] = useState({})

    useEffect(() => {
        getVenueInfo(venue.venId).then((data) => {
            setLocalVenueState(data.analysis.hour_analysis)
        })
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

    return (
        <div className="venue_card">
        <div className="venue_name">{venue.name}</div>
        <div className="venue_address">{venue.address}</div>
        <div className="venue_open">{localVenueState.intensity_txt}</div>
        <div className="venue_vibe">Current Vibe: {intensity_display}</div>
        <button className="fav_button" onClick={event => {
            event.preventDefault()
            handleFavoriteVenue(venue.id)
        }}>Favorite</button>
        </div>
    )
}