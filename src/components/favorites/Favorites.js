import { useContext, useEffect, useState } from "react"
import { VenueDetailContext } from "../venues/VenueDetailProvider"
import { FavoritesContext } from "./FavoritesProvider"
import { VenueDetail } from "../venues/VenueDetail"
import "./favorites.css"

export const Favorites = () => {
    const { favorites, getFavorites } = useContext(FavoritesContext)
    const { venueDetail, getVenueDetail } = useContext(VenueDetailContext)
    const [localFavs, setLocalFavs] = useState([])
    const [localVenDetail, setLocalVenDetail] = useState([])
    
    useEffect(() => {
        getFavorites()
    }, [])
    
    useEffect(() => {
        getVenueDetail()
    }, [])

    useEffect(() => {
        let localFavorites = []
        for (let i = 0; i < favorites.length; i++){
            if (favorites[i].userId === parseInt(localStorage.getItem("vibehunt_memberId"))) {
                localFavorites.push(favorites[i].venueId)
            }
        }
        setLocalFavs(localFavorites)
    }, [favorites])

    useEffect(() => {
        let localVenueDetail = []
        for (let i = 0; i < localFavs.length; i++){
            for (let n = 0; n < venueDetail.length; n++) {
                if (localFavs[i] === venueDetail[n].id) {
                    localVenueDetail.push(venueDetail[n])
                }
            }
        }
        setLocalVenDetail(localVenueDetail)
    }, [localFavs])
  
    return (
        <>
        <div className="favs_wall">
            <div className="fav_venues_title">Favorited Venues</div>
                {
                    localVenDetail.map(venue => {
                        return <VenueDetail venue={venue} />
                    })
                }
        </div>
        </>
    )
}


