import React, { useContext, useEffect, useState } from "react"
import { VenueInfoContext } from "./VenueInfoProvider"

export const VenueDetail = ({venue}) => {
    const { getVenueInfo } = useContext(VenueInfoContext)
    const [localVenueState, setLocalVenueState] = useState({})

    useEffect(() => {
        getVenueInfo(venue.venId).then((data) => {
            setLocalVenueState(data)
        })
    }, [])
   

    const venLat = venue.lat
    const venLong = venue.long

    console.log(venLat)
    console.log(venLong)

    return (
        <div className="venue_card">
        <div className="venue_name">{venue.name}</div>
        <div className="venue_address">{venue.address}</div>
        </div>
    )
}