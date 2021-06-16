import { useContext, useEffect, useState } from "react"
import { VenueDetailContext } from "../venues/VenueDetailProvider"
import { FavoritesContext } from "./FavoritesProvider"



export const Favorites = () => {
    const { favorites, getFavorites } = useContext(FavoritesContext)
    const { venueDetail, getVenueDetail } = useContext(VenueDetailContext)
    
    useEffect(() => {
        getFavorites()
    }, [])
    
    let localFavorites = []
    let localVenueDetail = []

    for (let i = 0; i < favorites.length; i++){
        if (favorites[i].userId === localStorage.getItem("vibehunt_memberId")){
            localFavorites.push(favorites[i].venueId)
        }
    }

    console.log(localFavorites)

    useEffect(() => {
        getVenueDetail()
    }, [])

    for (let i = 0; i < localFavorites.length; i++){
        for (let n = 0; n < venueDetail.length; n++) {
            if (localFavorites[i] === venueDetail[n].id) {
                localVenueDetail.push(venueDetail[n])
            }
        }
    }

    console.log(localVenueDetail)
  
    return (
        <>
        <div className="fav_venues_title">Favorited Venues</div>
        {localVenueDetail.map(venue =>
            <div className="venue_card">
            <div className="venue_name">{venue.name}</div>
            <div className="venue_address">{venue.address}</div>
            </div>
        )}
        </>
    )
}


